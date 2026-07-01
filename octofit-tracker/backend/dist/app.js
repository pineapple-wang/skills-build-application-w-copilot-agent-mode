"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const getApiBaseUrl = (port = Number(process.env.PORT || 8000)) => {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName
        ? `https://${codespaceName}-${port}.app.github.dev`
        : `http://localhost:${port}`;
};
exports.getApiBaseUrl = getApiBaseUrl;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.locals.baseUrl = (0, exports.getApiBaseUrl)();
const sendHealthResponse = (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        baseUrl: app.locals.baseUrl,
    });
};
app.get('/', sendHealthResponse);
app.get('/api/health', sendHealthResponse);
app.get('/health', sendHealthResponse);
const createCollectionRoute = (model, resource) => {
    return async (_req, res) => {
        const items = await model.find({});
        res.json({
            resource,
            message: `${resource} endpoint ready`,
            items,
        });
    };
};
app.get('/api/users/', createCollectionRoute(user_1.User, 'users'));
app.get('/api/teams/', createCollectionRoute(team_1.Team, 'teams'));
app.get('/api/activities/', createCollectionRoute(activity_1.Activity, 'activities'));
app.get('/api/leaderboard/', createCollectionRoute(leaderboard_1.Leaderboard, 'leaderboard'));
app.get('/api/workouts/', createCollectionRoute(workout_1.Workout, 'workouts'));
exports.default = app;
