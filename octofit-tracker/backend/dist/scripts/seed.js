"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
async function seed() {
    await (0, database_1.connectToDatabase)();
    console.log('Connected to MongoDB for seeding');
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
        {
            name: 'Mina Chen',
            email: 'mina.chen@example.com',
            fitnessGoal: 'Build endurance',
            city: 'Seattle',
        },
        {
            name: 'Jamal Ortiz',
            email: 'jamal.ortiz@example.com',
            fitnessGoal: 'Increase strength',
            city: 'Austin',
        },
        {
            name: 'Aisha Khan',
            email: 'aisha.khan@example.com',
            fitnessGoal: 'Improve mobility',
            city: 'Denver',
        },
    ]);
    await team_1.Team.insertMany([
        {
            name: 'Peak Performers',
            captain: users[0].name,
            members: users.map((user) => user.name),
            focus: 'Endurance and recovery',
        },
        {
            name: 'Iron Crew',
            captain: users[1].name,
            members: [users[1].name, users[2].name],
            focus: 'Strength and HIIT',
        },
    ]);
    await activity_1.Activity.insertMany([
        {
            userId: users[0]._id.toString(),
            type: 'Run',
            duration: 35,
            calories: 420,
            date: new Date('2026-07-01T06:30:00Z'),
        },
        {
            userId: users[1]._id.toString(),
            type: 'Strength',
            duration: 50,
            calories: 510,
            date: new Date('2026-07-01T18:00:00Z'),
        },
        {
            userId: users[2]._id.toString(),
            type: 'Yoga',
            duration: 30,
            calories: 180,
            date: new Date('2026-07-01T20:00:00Z'),
        },
    ]);
    await leaderboard_1.Leaderboard.insertMany([
        { userId: users[0]._id.toString(), username: users[0].name, score: 980, rank: 1 },
        { userId: users[1]._id.toString(), username: users[1].name, score: 945, rank: 2 },
        { userId: users[2]._id.toString(), username: users[2].name, score: 912, rank: 3 },
    ]);
    await workout_1.Workout.insertMany([
        {
            title: 'Tempo Run',
            difficulty: 'Intermediate',
            duration: 40,
            focus: 'Cardio',
            equipment: ['Running shoes'],
        },
        {
            title: 'Full Body Strength',
            difficulty: 'Advanced',
            duration: 45,
            focus: 'Strength',
            equipment: ['Dumbbells', 'Bench'],
        },
        {
            title: 'Mobility Flow',
            difficulty: 'Beginner',
            duration: 25,
            focus: 'Recovery',
            equipment: ['Yoga mat'],
        },
    ]);
    console.log('Seed data inserted successfully');
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seeding failed', error);
    process.exit(1);
});
