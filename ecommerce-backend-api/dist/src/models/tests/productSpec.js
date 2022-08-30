"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.index).toBeDefined();
    });
    beforeAll(async () => {
        await store.create({
            id: 1,
            name: 'Nintendo Switch OLED',
            description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
            price: 350,
        });
    });
    it('create method should add a product', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'Nintendo Switch OLED',
            description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
            price: 350,
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                name: 'Nintendo Switch OLED',
                description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
                price: 350,
            }]);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'Nintendo Switch OLED',
            description: "Nintendo's Switch OLED model shines in handheld mode thanks to the console's vibrant new display.",
            price: 350,
        });
    });
    afterAll(async () => {
        await store.delete("1");
    });
    it('delete method should remove the product', async () => {
        const result = await store.show("1");
        expect(result).toThrowError;
    });
});
