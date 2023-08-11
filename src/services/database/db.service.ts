import mongoose from 'mongoose';
import { mongoUri } from '../config/environment.service';

async function connectDatabase(): Promise<void> {
    try {
        await mongoose.connect(mongoUri);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);

        throw error;
    }
}

export { connectDatabase };
