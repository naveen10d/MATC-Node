import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface QuestionModel {
    question: String,
    options: Array<String>,
    correctAnswer: String,
    questionType: String

}

export const questionSchema = new Schema({
    question: { type: String, required: true },
    options: { type: Array<String>, required: true },
    correctAnswer: { type: String, required: true },
    questionType: {
        type: String,
        enum: ['react', 'python', 'java', 'angular'],
        required: true
    },
});

export const questionModel = mongoose.model('questions', questionSchema);