import Client from '../database';

export interface Order {
  id?: number
  status: string
  user_id: number
  items: Item[]
}

interface Item {
  id?: number
  quantity: number
  order_id: number
  product_id: number
}

export class OrderStore {
  async show (id: string): Promise<Order> {
    try {
      const conn = await Client.connect();

      const sql = 'SELECT * FROM "order" WHERE id = $1';
      const resultOrder = await conn.query(sql, [id]);

      if (resultOrder.rows.length == 0) {
        throw new Error(`Order with id ${id} not found!`);
      }

      const sql2 = 'SELECT quantity, order_id, product_id FROM "order" o INNER JOIN order_item i on $1 = i.order_id';
      const resultItems = await conn.query(sql2, [id]);
      conn.release();

      const items: Item[] = resultItems.rows.map<Item>((item: Item): Item => {
        const currentItem = {
          id: item.id,
          quantity: item.quantity,
          order_id: item.order_id,
          product_id: item.product_id
        };

        return currentItem;
      });

      const currentOrder: Order = {
        id: resultOrder.rows[0].id,
        status: resultOrder.rows[0].status,
        user_id: resultOrder.rows[0].user_id,
        items: Array<Item>()
      };

      items.forEach(item => {
        currentOrder.items.push(item);
      });

      return currentOrder;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
