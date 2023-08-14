import { Request, Response } from 'express';
import { secretTokenAccess } from '../../services/config/environment.service';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
export const profileRoute = async (request: Request, response: Response) => {
    const TokenAccess = secretTokenAccess;
    const accessToken = request.headers.token;
    if (typeof accessToken !== 'string') {
        return response.status(401).end('Access token is required');
    }
    try {
        const payload = jwt.verify(accessToken, TokenAccess);
        if (payload) {
            return response.json((payload as jwt.JwtPayload).user);
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return response.status(401).end('Access token is expired');
        }
        if (error instanceof JsonWebTokenError) {
            return response.status(401).end('Access token is invalid');
        }
    }
};
