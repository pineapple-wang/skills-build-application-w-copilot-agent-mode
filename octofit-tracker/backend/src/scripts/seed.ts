import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seed() {
  await connectToDatabase();
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
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

  await Team.insertMany([
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

  await Activity.insertMany([
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

  await Leaderboard.insertMany([
    { userId: users[0]._id.toString(), username: users[0].name, score: 980, rank: 1 },
    { userId: users[1]._id.toString(), username: users[1].name, score: 945, rank: 2 },
    { userId: users[2]._id.toString(), username: users[2].name, score: 912, rank: 3 },
  ]);

  await Workout.insertMany([
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
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
