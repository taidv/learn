import * as express from 'express';
import * as path from 'path';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { router as index } from './routes/index.router';
import { router as users } from './routes/users.router';

const app: express.Express = express();

class HttpError extends Error {
    public status: number;

    constructor(status: number, mesg?: string) {
        super(mesg);
        this.status = status;
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/index', index);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new HttpError(404, 'Not Found');
    next(err);
});

// error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).send('error');
});

export = app;
