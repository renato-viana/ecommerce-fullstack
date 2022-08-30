import Client from '../database';

export interface Product {
  id?: number
  name: string
  description: string
  price: number | string
}

export class ProductStore {
  async index (): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM product';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
    }
  }

  async show (id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM product WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product ${id}. Error: ${error}`);
    }
  }

  async create (product: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO product (name, description, price) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [product.name, product.description, product.price]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not add new product ${name}. Error: ${error}`);
    }
  }

  async delete (id: string): Promise<boolean> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM product WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rowCount == 0) {
        throw new Error(`Product with id ${id} not found!`);
      }

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
