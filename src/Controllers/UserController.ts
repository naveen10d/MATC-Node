import { Request, Response } from 'express';
import { UserService } from '../Services/UserService';
import { UserModel } from '../Models/UserModel';
import { Jwt } from '../Config/JwtConfig';
import { logger } from '../Config/LoggerConfig';
import { MESSAGE } from '../Config/Constants';


export class UserController {

    constructor(private userService: UserService, private jwt: Jwt) {
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            logger.info(MESSAGE.CONTROLLER_USER_INFO);
            const user: UserModel | null = await this.userService.login(req.body);
            if (user !== null) {
                const accessToken = await this.jwt.generateToken(user)
                // user.token = accessToken;

                res.status(201).send(user);
            }
            else {
                res.status(401).send("Email or Password is wrong");
            }
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_LOGIN_ERROR + err)
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }


    async registration(req: Request, res: Response): Promise<void> {

        try {
            logger.info(MESSAGE.CONTROLLER_REGISTER_INFO);
            const user: UserModel = await this.userService.register(req.body);
            const accessToken = await this.jwt.generateToken(user)
            console.log("accessToken", accessToken)
            // user.token = accessToken;
            res.status(201).send(user);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_REGISTER_ERROR + err)
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }
}
