import * as jwt from 'jsonwebtoken';
import { UserModel } from '../Models/UserModel';


export class Jwt {
    constructor() { }

    async generateToken(user: UserModel): Promise<String> {
        const token = await jwt.sign({ user }, `${process.env.SECRET_KEY}`, {
            expiresIn: 86400
        });
        return token;
    }



    async verifyToken(req: any, res: any, next: any): Promise<any> {
        let token = req.headers && req.headers['authorization'];
        if (!token) {
            res.status(401).send({ authorization: false, message: 'No token provided.', status: 401 });
            return;
        }
        token = token.split(' ')[1] // Remove Bearer from string
        await jwt.verify(token, `${process.env.SECRET_KEY}`, (err: any, decoded: any) => {
            if (err)
                res.status(500).send({ authorization: false, message: 'Failed to authenticate Token', status: 500 });
            else {
                req.user = decoded.user;
                next()
            }

        })

    }

    // async isUser(req: any, res: any, next: any): Promise<any> {
    //     if (Number(req.user.userType) === 0 || Number(req.user.userType) === 1) {
    //         next();
    //     }
    //     else {
    //         res.status(401).send("Unauthorized!");
    //     }
    // }


    // async isAdmin(req: any, res: any, next: any): Promise<any> {
    //     if (Number(req.user.userType) === 1) {
    //         next();
    //     }
    //     else {
    //         res.status(401).send("Unauthorized!");

    //     }
    // }
}