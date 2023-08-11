import { Request, Response } from 'express';
import { User } from '../../repositories/user.repository';
import { client } from '../../services/database/redis.service';
import { generateTokens } from '../../services/user/generate-tokens';

export const refreshRoute = async (request: Request, response: Response) => {
    const refreshToken: string = request.body.refreshToken;

    if (!refreshToken) {
        return response.status(401).end('Unauthorized 1');
    }

    const username = await client.get(refreshToken);
    if (!username) {
        return response.status(401).end('Unauthorized 2');
    }

    const user = await User.findOne({ username: username });
    if (!user) {
        return response.status(404).end('Not found user');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);

    response.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
};
