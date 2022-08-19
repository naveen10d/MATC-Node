import { questionModel, QuestionModel } from '../Models/QuestionModel';
import { logger } from '../Config/LoggerConfig';
import { MESSAGE } from '../Config/Constants';

export class QuestionDao {
    constructor() {

    }
    async save(questions: QuestionModel): Promise<QuestionModel> {
        logger.info(MESSAGE.DAO_POST_INFO);
        const question: any = new questionModel(questions);
        return await question.save();
    }
    async getAll(): Promise<QuestionModel[]> {
        logger.info(MESSAGE.DAO_GETALL_INFO);
        return await questionModel.find();
    }
    async getById(id: String): Promise<QuestionModel | null> {
        logger.info(MESSAGE.DAO_GET_INFO);
        return await questionModel.findById(id);
    }
    async findByIdAndUpdate(id: String, questions: QuestionModel): Promise<QuestionModel | null> {
        logger.info(MESSAGE.DAO_UPDATE_INFO);
        return await questionModel.findByIdAndUpdate(id, questions, { new: true });
    }

    async findByIdAndDelete(id: String): Promise<void> {
        logger.info(MESSAGE.DAO_DELETE_INFO);
        await questionModel.findByIdAndDelete(id);
    }
}