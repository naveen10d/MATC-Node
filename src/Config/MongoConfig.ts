import mongoose from 'mongoose'
import { logger } from './LoggerConfig';

export class MongoConfig {
    constructor() {
        mongoose.connect('mongodb+srv://naveen_matc:oXq2l0iFb3dabReZ@cluster0.2cikj.mongodb.net/?retryWrites=true&w=majority').then(() => {
            logger.info('DB Connnected');
        }).catch((e) => {
            logger.error('Err on connection', e);
        });
    }
}