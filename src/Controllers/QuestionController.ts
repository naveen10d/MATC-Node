import { Request, Response } from 'express';
import { QuestionService } from '../Services/QuestionService';
import { QuestionModel } from '../Models/QuestionModel';
import { Jwt } from '../Config/JwtConfig';
import { logger } from '../Config/LoggerConfig';
import { MESSAGE } from '../Config/Constants';
export class QuestionController {

    constructor(private questionService: QuestionService, private jwt: Jwt) {
    }
    async questionCreate(req: Request, res: Response): Promise<void> {

        try {
            logger.info(MESSAGE.CONTROLLER_POST_INFO);
            const question: QuestionModel = await this.questionService.questionCreate(req.body);
            // const response = {
            //     question: question,
            //     token: await this.jwt.generateToken(question.questionId)
            // }
            console.log(question)
            res.status(201).send(question);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_POST_ERROR + err)
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }
    async questionGet(req: Request, res: Response): Promise<void> {
        try {
            logger.info(MESSAGE.CONTROLLER_GETALL_INFO);
            let query: any = req.query.questionType;
            const question: QuestionModel[] = await this.questionService.questionGet(query);
            res.status(200).send(question);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_GETALL_ERROR + err)
            res.status(500).send(err);
        }
    }

    async questionRead(req: Request, res: Response): Promise<void> {
        try {
            logger.info(MESSAGE.CONTROLLER_GET_INFO);
            const question: QuestionModel | null = await this.questionService.questionRead(req.params.id);
            res.status(200).send(question);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_GET_ERROR + err)
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }


    async questionUpdate(req: Request, res: Response): Promise<void> {

        try {
            logger.info(MESSAGE.CONTROLLER_UPDATE_INFO);
            const question: QuestionModel | null = await this.questionService.questionUpdate(req.params.id, req.body);
            res.status(201).send(question);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_UPDATE_ERROR + err)
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }
    async questionDelete(req: Request, res: Response): Promise<void> {
        try {
            logger.info(MESSAGE.CONTROLLER_DELETE_INFO);
            await this.questionService.questionDelete(req.params.id);
            res.status(204).send({ data: "Deleted" });
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_DELETE_ERROR + err)
            if (err) {
                res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }


}