"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthToken_1 = require("../service/verifyAuthToken");
const dotenv_1 = __importDefault(require("dotenv"));
const store = new user_1.UserStore();
dotenv_1.default.config();
const index = async (_req, res) => {
    const products = await store.index();
    res.json(products);
};
const show = async (req, res) => {
    const product = await store.show(req.params.id);
    res.json(product);
};
const create = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400);
            res.json(err.message);
        }
    }
};
const authenticate = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.firstName, user.password);
        var token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(401);
            res.json({ err });
        }
    }
};
const update = async (req, res) => {
    const user = {
        id: parseInt(req.params.id),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.user.id !== user.id) {
            throw new Error('User id does not match!');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400);
            res.json(err.message);
        }
        return;
    }
    try {
        const updated = await store.update(user);
        console.log("funcionou");
        res.json(updated);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400);
            res.json(err.message);
        }
    }
};
const userRoutes = (app) => {
    app.get('/users', verifyAuthToken_1.verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken_1.verifyAuthToken, show);
    app.post('/users', verifyAuthToken_1.verifyAuthToken, create);
    app.post('/users/authenticate', authenticate);
    app.put('/users/:id', verifyAuthToken_1.verifyAuthToken, update);
};
exports.default = userRoutes;
