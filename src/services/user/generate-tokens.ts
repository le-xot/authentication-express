import jwt from 'jsonwebtoken';
import { client } from '../database/redis.service';
import { secretTokenAccess, secretTokenRefresh } from '../config/environment.service';
import { IUser } from '../../repositories/user.repository';

export function generateTokens(user: IUser): {
    accessToken: string;
    refreshToken: string;
} {
    const accessToken = jwt.sign({ user }, secretTokenAccess, {
        expiresIn: '1m',
    });

    const refreshToken = jwt.sign({ user }, secretTokenRefresh, {
        expiresIn: '7d',
    });

    client.set(refreshToken, user.username, 'EX', 7 * 24 * 60 * 60);

    return { accessToken, refreshToken };
}
