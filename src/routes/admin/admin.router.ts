import express, { Router } from 'express';
import { deleteUsers, getUsers } from '../../repositories/user.repository';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const AdminRouter: Router = express.Router();

AdminRouter.get('/users', authMiddleware, async (request, response) => {
    const users = await getUsers();

    response.json(users);
});

AdminRouter.post('/delete', async (request, response) => {
    await deleteUsers();

    response.send('Deleted');
});
