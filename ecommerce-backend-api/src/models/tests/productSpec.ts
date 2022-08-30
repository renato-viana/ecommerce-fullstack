import { ProductStore } from '../product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'Nintendo Switch OLED',
      description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
      price: 350.00
    });
    expect(result).toEqual({
      id: 3,
      name: 'Nintendo Switch OLED',
      description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
      price: '350.00'
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual(
      [
        {
          id: 1,
          name: 'Nintendo Switch OLED',
          description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
          price: '350.00'
        },
        {
          id: 2,
          name: 'Lenovo - Yoga 7i 16',
          description: 'Lenovo - Yoga 7i 16" 2.5K Touch 2-in-1 Laptop - Intel Evo Platform - Core i5-1240P - 8GB Memory - 256GB SSD - Storm Grey',
          price: '599.99'
        },
        {
          id: 3,
          name: 'Nintendo Switch OLED',
          description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
          price: '350.00'
        }
      ]
    );
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'Nintendo Switch OLED',
      description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
      price: '350.00'
    });
  });

  it('delete method should remove the product', async () => {
    const result = await store.delete('3');

    expect(result).toEqual(true);
  });
});
