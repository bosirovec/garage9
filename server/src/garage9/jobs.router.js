import { Router } from 'express';
import { JobsController } from './jobs.controller.js';

export const jobsRouter = Router();

  const route = '/'
  const route2 = '/download/'

  jobsRouter.post(route, JobsController.create);

  jobsRouter.get(route, JobsController.get);

  jobsRouter.get(`${route}:id`, JobsController.getById);

  jobsRouter.delete(`${route}:id`, JobsController.delete);

  jobsRouter.get(`${route2}:id`, JobsController.download)