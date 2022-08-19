import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface UserModel {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    confirmPassword: String
}

export const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
});

export const UserModel = mongoose.model('users', userSchema);
