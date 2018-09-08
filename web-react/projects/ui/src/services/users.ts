const path = '/api/users';

class UserServices {
    public static getUser = async () => {
        try {
            const response: Response = await fetch(path, {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
                throw { statusCode: response.status, message: response.statusText };
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    };
}

export { UserServices };
