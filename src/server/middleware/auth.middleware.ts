import config from 'config';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare interface Request {
  method: string;
  headers: { [key: string]: string };
  user: string | jwt.JwtPayload;
}

declare interface Response {
  status: (payload: number) => { json: (payload: any) => void };
}

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.auth.replace(/^Bearer\s/, '');

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;

    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};
