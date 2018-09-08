
import _user  from './user.json';
import _searches from './original-searches.json';
import _reports from './reports.json';

const TIMEOUT = 2000;

class PrivateApi {

    static getUser() {
        console.log('getting user....');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('return user');
                resolve(_user);
            }, TIMEOUT * 2);
        });
    }

    static getSearches() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(_searches);
            }, TIMEOUT * 3);
        });
    }

    static getReports() {
        console.log('getting reports....');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('return reports');
                resolve(_reports);
            }, TIMEOUT * 1);
        });
    }
}
   
export default PrivateApi;
   