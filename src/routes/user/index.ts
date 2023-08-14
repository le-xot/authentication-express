import { Router } from 'express';
import { loginRoute } from './user-login.route';
import { refreshRoute } from './user-refresh.route';
import { registerRoute } from './user-register.route';
import { profileRoute } from './user-profile.route';

export const UserRouter = Router();

UserRouter.post('/login', loginRoute);
UserRouter.post('/refresh', refreshRoute);
UserRouter.post('/register', registerRoute);
UserRouter.get('/profile', profileRoute);
