import { Router } from "express";
import { jobsRouter } from "./garage9/jobs.router.js";
import { usersRouter } from "./users/users.router.js";

export const apiRouter = Router();

apiRouter.use('/jobs', jobsRouter);
apiRouter.use('/users', usersRouter);