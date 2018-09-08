import * as express from 'express';
import { Router } from 'express';
import { UserServices } from '../services';

export let router: Router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const user = await UserServices.getUser();
    res.send(user);
});
