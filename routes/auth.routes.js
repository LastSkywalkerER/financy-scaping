'use strict';

const {
  Router
} = require('express');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/register', async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body;

    const candidate = await User.findOne({
      name,
      email,
      phone
    });

    if (candidate) {
      return res.status(400).json({
        message: 'User exist'
      });
    }

  } catch (e) {
    res.status(500).json({
      message: 'Something wrong :('
    });
  }
});

// /api/auth/login
router.post('/login', async (req, res) => {

});

module.exports = router;