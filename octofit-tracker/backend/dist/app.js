"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const sendHealthResponse = (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
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
