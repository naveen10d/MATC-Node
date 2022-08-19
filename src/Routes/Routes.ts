import express from "express";
import { Request, Response } from "express";
import { QuestionController } from "../Controllers/QuestionController";
import { UserController } from '../Controllers/UserController';
import { Jwt } from "../Config/JwtConfig";
import { logger } from "../Config/LoggerConfig";
import { MESSAGE } from "../Config/Constants";
export class Route {
    constructor(private questionController: QuestionController, private jwt: Jwt, private userController: UserController) { }

    routes(app: express.Application) {
        app.post('/register', (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_POST_REGISTER_INFO);
            this.userController.registration(req, res)
        });

        app.post('/login', (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_POST_LOGIN_INFO);
            this.userController.login(req, res)
        });
        app.post("/question", (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_POST_INFO);
            this.questionController.questionCreate(req, res);
        });

        // app.get("/question", this.jwt.verifyToken, (req: Request, res: Response) => {
        app.get("/question", (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_GETALL_INFO);
            this.questionController.questionGet(req, res);
        });

        // app.get("/question/:id", this.jwt.verifyToken, (req: Request, res: Response) => {
        app.get("/question/:id", (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_GET_INFO);
            this.questionController.questionRead(req, res);
        });

        // app.put("/question/:id", this.jwt.verifyToken, (req: Request, res: Response) => {
        app.put("/question/:id", (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_UPDATE_INFO);
            this.questionController.questionUpdate(req, res);
        });

        // app.delete("/question/:id", this.jwt.verifyToken, (req: Request, res: Response) => {
        app.delete("/question/:id", (req: Request, res: Response) => {
            logger.info(MESSAGE.ROUTER_DELETE_INFO);
            this.questionController.questionDelete(req, res);
        }
        );
    }
}