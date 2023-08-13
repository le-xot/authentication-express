import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
    role: 'admin' | 'user';
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export async function getUsers(): Promise<IUser[]> {
    const users: IUser[] = await User.find({});
    return users;
}

export async function deleteUsers(): Promise<void> {
    await User.deleteMany({ role: { $ne: 'admin' } });
}
