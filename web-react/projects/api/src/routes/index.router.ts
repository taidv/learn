import * as express from 'express';
import { Router } from 'express';

export let router: Router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('This is index service');
});
