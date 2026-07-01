"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.getApiBaseUrl = void 0;
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const getApiBaseUrl = (port = Number(process.env.PORT || 8000)) => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-${port}.app.github.dev`
        : `http://localhost:${port}`;
};
exports.getApiBaseUrl = getApiBaseUrl;
const startServer = async () => {
    const port = Number(process.env.PORT || 8000);
    const baseUrl = (0, exports.getApiBaseUrl)(port);
    app_1.default.locals.baseUrl = baseUrl;
    console.log(`API base URL: ${baseUrl}`);
    await (0, database_1.connectToDatabase)();
    console.log('Connected to MongoDB');
    app_1.default.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
};
exports.startServer = startServer;
