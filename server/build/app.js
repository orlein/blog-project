"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const app = express_1.default();
app.use(cors_1.default());
app.use(bodyParser.json());
app.get('*', (req, res) => {
    res.send('hi');
});
app.listen(1337, (err) => { console.log('Listening on 1337'); });
