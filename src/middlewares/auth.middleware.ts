import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { secretTokenAccess } from '../services/config/environment.service';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const accessToken = request.body.accessToken;
    if (!accessToken) {
        return response.status(401).end('Access token is required');
    }
    try {
        const decodedToken = jwt.verify(accessToken, secretTokenAccess);
        if (decodedToken) {
            return next();
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return response.status(401).end('Access token is expired');
        }
        if (error instanceof JsonWebTokenError) {
            return response.status(401).end('Access token is invalid');
        }
    }
    return next();
}
