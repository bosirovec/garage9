import mongodb from 'mongodb';
import { database } from '../database/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export class UsersService {
  static _collection = database.collection('users');

  static async register(user) {
    /*{
      username: string,
      password: string
    }
    }*/
    if (await UsersService._collection.findOne({ username: user.username })) {
      throw { code: 409, message: 'Username taken!' };
    }
    try {
      user.password = await bcrypt.hash(user.password, 10);
      await UsersService._collection.insertOne(user);
      const token = UsersService._signToken(user);
      return token;
    } catch (error) {
      throw { code: 500, message: 'Internal server error' };
    }
  }

  static async login(username, password) {
    try {
      const user = await UsersService._collection.findOne({ username });
      console.log(user);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw { code: 401, message: 'Wrong credentials!' };
      }
      return UsersService._signToken(user);
    } catch (error) {
      if (error.code === 401) {
        throw { code: 401, message: 'Wrong credentials!' };
      }
      throw { code: 500, message: 'Internal server error' };
    }
  }

  static _signToken(user) {
    const jwtConfig = config.get('jwt');
    return jwt.sign({ id: user._id, username: user.username }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }
}
