import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { secretTokenAccess } from '../services/config/environment.service';

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const accessToken: string = request.body.accessToken;

    if (!accessToken || !jwt.verify(accessToken, secretTokenAccess)) {
        return response.status(401).end('Unauthorized');
    }

    return next();
}
