"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.getMongoUrl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let connectionPromise = null;
const getMongoUrl = () => process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/octofit_db';
exports.getMongoUrl = getMongoUrl;
const connectToDatabase = async () => {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default.connection;
    }
    if (!connectionPromise) {
        mongoose_1.default.set('strictQuery', false);
        connectionPromise = mongoose_1.default.connect((0, exports.getMongoUrl)(), {
            serverSelectionTimeoutMS: 10000,
        });
    }
    try {
        await connectionPromise;
        return mongoose_1.default.connection;
    }
    catch (error) {
        connectionPromise = null;
        throw error;
    }
};
exports.connectToDatabase = connectToDatabase;
