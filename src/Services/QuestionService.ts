import { QuestionDao } from "../Daos/QuestionDao";
import { QuestionModel } from "../Models/QuestionModel";
import { logger } from '../Config/LoggerConfig';
import { MESSAGE } from '../Config/Constants';


export class QuestionService {
    constructor(private questionDao: QuestionDao) { }

    async questionCreate(questions: QuestionModel): Promise<QuestionModel> {
        logger.info(MESSAGE.SERVICE_POST_INFO);
        return await this.questionDao.save(questions);
    }

    async questionGet(): Promise<QuestionModel[]> {
        logger.info(MESSAGE.SERVICE_GETALL_INFO);
        return await this.questionDao.getAll();
    }

    async questionRead(id: String): Promise<QuestionModel | null> {
        logger.info(MESSAGE.SERVICE_GET_INFO);
        return await this.questionDao.getById(id);
    }

    async questionUpdate(id: String, questions: QuestionModel): Promise<QuestionModel | null> {
        logger.info(MESSAGE.SERVICE_UPDATE_INFO);
        return await this.questionDao.findByIdAndUpdate(id, questions);
    }

    async questionDelete(id: String): Promise<void> {
        logger.info(MESSAGE.SERVICE_DELETE_INFO);
        return await this.questionDao.findByIdAndDelete(id);
    }
}