"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const verifyAuthToken_1 = require("../service/verifyAuthToken");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (e) {
        console.log(e);
        res.json("Error");
    }
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
};
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken_1.verifyAuthToken, create);
    app.delete('/products/:id', verifyAuthToken_1.verifyAuthToken, destroy);
};
exports.default = productRoutes;
