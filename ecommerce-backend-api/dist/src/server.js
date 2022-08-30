"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./handlers/product"));
const user_1 = __importDefault(require("./handlers/user"));
const order_1 = __importDefault(require("./handlers/order"));
const app = (0, express_1.default)();
const address = "0.0.0.0:8080";
app.use(body_parser_1.default.json());
app.get('/', function (_req, res) {
    res.send('Hello World!');
});
(0, product_1.default)(app);
(0, user_1.default)(app);
(0, order_1.default)(app);
app.listen(8080, function () {
    console.log(`starting app on: ${address}`);
});
