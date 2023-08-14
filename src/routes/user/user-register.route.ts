import { Request, Response } from 'express';
import { generateTokens } from '../../services/user/generate-tokens';
import { register } from '../../services/user/register.service';

export const registerRoute = async (request: Request, response: Response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).end('Username and password are required');
    }

    const newUser = await register(username, password);

    if (!newUser) {
        return response.status(400).end('Registration failed');
    }

    const { accessToken, refreshToken } = generateTokens(newUser);

    response.json({ accessToken, refreshToken });
};
