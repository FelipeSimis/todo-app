import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface ITokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

export default function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers;

  if (!authorization) throw new Error('Missing authorization JWT token');

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
