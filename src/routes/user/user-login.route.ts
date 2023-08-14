import { Request, Response } from 'express';
import { generateTokens } from '../../services/user/generate-tokens';
import { login } from '../../services/user/login.service';

export const loginRoute = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    const user = await login(username, password);

    if (!user) {
        return response.status(404).end('User not found!');
    }

    const { accessToken, refreshToken } = generateTokens(user);

    response.json({ accessToken, refreshToken });
};
