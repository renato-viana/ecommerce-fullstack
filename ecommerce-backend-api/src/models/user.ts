import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import Client from '../database';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export interface User {
  id?: number
  name: string
  email: string
  password: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM user_account';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get Users. Error: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM user_account WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find User ${id}. Error: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO user_account (name, email, password_digest) VALUES($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [user.name, user.email, hash]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable create user (${user.name}): ${error}`);
    }
  }

  async update(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE user_account SET name = $1, email = $2, password_digest = $3 WHERE id = $4 RETURNING *';

      const passwordDigest = bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [user.name, user.email, passwordDigest, user.id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable update user (${user.name}): ${error}`);
    }
  }

  async authenticate(currentUser: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM user_account WHERE email = $1';
      const result = await conn.query(sql, [currentUser.email]);

      if (result.rows.length > 0) {
        const user = result.rows[0];

        if (bcrypt.compareSync(currentUser.password + pepper, user.password_digest)) {
          currentUser = user;
        } else {
          throw new Error('Password does not match!');
        }
      } else {
        throw new Error('User not found!');
      }

      return currentUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
