import { UserModel } from '../Models/UserModel';
import { logger } from '../Config/LoggerConfig';
import { MESSAGE } from '../Config/Constants';

export class UserDao {
    constructor() {

    }
    async saveUser(userlogins: UserModel): Promise<UserModel> {
        logger.info(MESSAGE.DAO_USER_LOGIN_INFO);
        const user = new UserModel(userlogins);
        return await user.save();
    }
    async getUser(emailId: String): Promise<UserModel | null> {
        logger.info(MESSAGE.DAO_REGISTER_INFO);
        return await UserModel.findOne({ email: emailId });
    }
}
