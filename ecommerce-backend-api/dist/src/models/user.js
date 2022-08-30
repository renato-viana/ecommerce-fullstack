'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require('../database'));
const bcrypt_1 = __importDefault(require('bcrypt'));
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
  async index() {
    try {
      const conn = await database_1.default.connect();
      const sql = 'SELECT * FROM user_account';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get Users. Error: ${err}`);
    }
  }
  async show(id) {
    try {
      const conn = await database_1.default.connect();
      const sql = 'SELECT * FROM user_account WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find User ${id}. Error: ${err}`);
    }
  }
  async create(user) {
    try {
      const conn = await database_1.default.connect();
      const sql =
        'INSERT INTO user_account (name, email, password_digest) VALUES($1, $2, $3) RETURNING *';
      const hash = bcrypt_1.default.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [user.name, user.email, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable create user (${user.firstName}): ${err}`);
    }
  }
  async update(user) {
    try {
      const conn = await database_1.default.connect();
      const sql = `UPDATE user_account SET firstName = $1, lastName = $2, password_digest = $3 WHERE id = $4 RETURNING *`;
      const hash = bcrypt_1.default.hashSync(
        user.password + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [
        user.firstName,
        user.lastName,
        hash,
        user.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`unable update user (${user.firstName}): ${err}`);
    }
  }
  async authenticate(username, password) {
    const conn = await database_1.default.connect();
    const sql = 'SELECT password_digest FROM user_account WHERE username=($1)';
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (
        bcrypt_1.default.compareSync(password + pepper, user.password_digest)
      ) {
        return user;
      }
    }
    return null;
  }
}
exports.UserStore = UserStore;
