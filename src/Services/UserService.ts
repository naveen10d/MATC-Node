import { UserDao } from '../Daos/UserDao';
import { UserModel } from '../Models/UserModel';
import { logger } from '../Config/LoggerConfig';
import { MESSAGE } from '../Config/Constants';

export class UserService {
    constructor(private userDao: UserDao) {

    }
    async login(users: UserModel): Promise<UserModel | null> {
        logger.info(MESSAGE.SERVICE_USER_LOGIN_INFO);
        return await this.userDao.getUser(users.email);
    }

    async register(users: UserModel): Promise<UserModel> {
        logger.info(MESSAGE.SERVICE_REGISTER_INFO);
        return await this.userDao.saveUser(users);
    }
}
