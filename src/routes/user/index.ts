import { Router } from 'express';
import { authRoute } from './user-auth.route';
import { refreshRoute } from './user-refresh.route';
import { registerRoute } from './user-register.route';

export const UserRouter = Router();

UserRouter.post('/auth', authRoute);
UserRouter.post('/refresh', refreshRoute);
UserRouter.post('/register', registerRoute);
