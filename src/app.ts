import express from 'express';
import cookieParser from 'cookie-parser';

import { UserRouter } from './routes/user';
import { AdminRouter } from './routes/admin/admin.router';

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/user', UserRouter);

app.use('/admin', AdminRouter);
