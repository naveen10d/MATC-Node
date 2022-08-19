import cors from 'cors';
import express from 'express';
import { MongoConfig } from './Config/MongoConfig'
import { Route } from './Routes/Routes';
import { QuestionController } from './Controllers/QuestionController';
import { QuestionService } from './Services/QuestionService';
import { QuestionDao } from './Daos/QuestionDao';
import { UserController } from './Controllers/UserController';
import { UserService } from './Services/UserService';
import { UserDao } from './Daos/UserDao';
import { Jwt } from './Config/JwtConfig';
import * as dotenv from 'dotenv';
import { logger } from './Config/LoggerConfig';

const questionDao = new QuestionDao();
const questionService = new QuestionService(questionDao);
const jwt = new Jwt();
const userDao = new UserDao();
const userService = new UserService(userDao);
const userController = new UserController(userService, jwt);
const questionController = new QuestionController(questionService, jwt);
const route = new Route(questionController, jwt, userController);
const app: express.Application = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();
new MongoConfig();
route.routes(app);
app.listen(4000, () => {
    logger.info('App is listening on port', 4000);
});
export default app;
