import express from 'express';
import bodyParser from 'body-parser';
import { jobsRouter } from './garage9/jobs.router.js';
import { apiRouter } from './api.router.js';
import config from 'config';

(async function () {

  const app = express();  
  app.use(bodyParser.json());
  app.use('/api', apiRouter);

  app.listen(config.get("server.port"), () => console.log(`Listening on ${config.get("server.port")}`));
})()