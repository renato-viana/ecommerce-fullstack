"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const verifyAuthToken_1 = require("../service/verifyAuthToken");
const store = new order_1.OrderStore();
const show = async (req, res) => {
    const order = await store.show(req.params.id);
    res.json(order);
};
const orderRoutes = (app) => {
    app.get('/orders/:id', verifyAuthToken_1.verifyAuthToken, show);
};
exports.default = orderRoutes;
