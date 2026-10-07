import mongoose from 'mongoose';
import { seedDatabase } from '../utils/seedData.js';

seedDatabase()
  .then(() => {
    console.log('Seed runner completed.');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed runner failed:', err);
    process.exit(1);
  });
