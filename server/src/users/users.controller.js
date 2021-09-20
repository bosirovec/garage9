import { UsersService } from './users.service.js';

export class UsersController {
  static async register(req, res) {
    let user = req.body;
    try {
      const token = await UsersService.register(user);
      res.send({ token });
    } catch (error) {
      res.status(error.code).send({ error: error.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const token = await UsersService.login(username, password);
      res.send({ token });
    } catch (error) {
      res.status(error.code).send({ error: error.message });
    }
  }
}
