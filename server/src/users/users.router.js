import { Router } from 'express';
import { UsersController } from './users.controller.js';

export const usersRouter = Router();

const route = '/';

usersRouter.post(route + 'register', UsersController.register);
usersRouter.post(route + 'login', UsersController.login);
