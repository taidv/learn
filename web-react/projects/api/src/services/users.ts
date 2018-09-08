import { user } from './stubs/userData';

const TIMEOUT = 800;

class UserServices {
    public static getUser() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(user);
            }, TIMEOUT);
        });
    }
}

export { UserServices };
