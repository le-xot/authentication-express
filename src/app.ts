import express from 'express';
import cors from 'cors';

import { UserRouter } from './routes/user';
import { AdminRouter } from './routes/admin/admin.router';

export const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', UserRouter);

app.use('/admin', AdminRouter);
