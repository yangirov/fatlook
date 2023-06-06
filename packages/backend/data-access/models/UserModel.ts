import mongoose, { Schema, Document, Model } from 'mongoose';

import { User } from '@fatlook/core/types';

interface UserWithDoc extends Omit<User, 'id'>, Document {}

const userSchema = new Schema<UserWithDoc>({
    name: { type: String, required: true },
    dailyAmount: { type: Number },
});

export const UserModel: Model<UserWithDoc> = mongoose.model<UserWithDoc>('User', userSchema);
