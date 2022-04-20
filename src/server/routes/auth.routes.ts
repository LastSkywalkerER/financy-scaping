import { Router } from 'express';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import auth from '../middleware/auth.middleware';

const router = Router();

// /api/auth/register
router.post(
  '/register',
  [
    // check('name', 'Name must be more than 1 symbols').isLength({
    //   min: 2,
    // }),
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Password must be more than 6 symbols').isLength({
      min: 6,
    }),
    // check('phone', 'Incorrect phone').isMobilePhone(),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data',
        });
      }

      const { email, password } = req.body;

      const candidateEmail = await User.findOne({
        email,
      });

      if (candidateEmail) {
        return res.status(400).json({
          message: 'User exist',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name: new Date().toString(),
        email,
        password: hashedPassword,
        phone: new Date().toString(),
      });

      await user.save();

      res.status(201).json({
        message: 'User created',
      });
    } catch (e) {
      res.status(500).json({
        message: 'Something wrong :(',
      });
    }
  },
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Your email').normalizeEmail().isEmail(),
    check('password', 'Your password').exists(),
  ],
  async (req: any, res: any) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          message: 'User not find',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: 'Incorrect password',
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        },
      );

      res.json({
        token,
        userID: user.id,
      });
    } catch (e) {
      res.status(500).json({
        message: 'Something wrong :(',
      });
    }
  },
);

// /api/auth/status
router.get('/status', auth, async (req: any, res: any) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(400).json({
        message: 'User not find',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      config.get('jwtSecret'),
      {
        expiresIn: '1h',
      },
    );

    res.json({
      token,
      userID: user.id,
    });
  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :(',
    });
  }
});

export default router;
