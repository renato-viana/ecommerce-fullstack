import { OrderStore } from '../order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('show method should return the correct order', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      status: 'Active',
      user_id: 1,
      items: [
        {
          id: undefined,
          quantity: 1,
          order_id: 1,
          product_id: 1
        },
        {
          id: undefined,
          quantity: 3,
          order_id: 1,
          product_id: 2
        }
      ]
    });
  });
});
