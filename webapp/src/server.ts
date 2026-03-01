import express from 'express';
import LinkRouter from './modules/link/route.js';
import UserRouter from './modules/user/route.js';
import connectDB from './db.js';
import bodyParser from 'body-parser';
import { attachMQ } from './middleware/request.js';
import session from 'express-session';
import passport from 'passport';
import passportInit from './passport.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { isAuthenticated } from './modules/auth/library.js';
import ViewRouter from './modules/view/route.js';
import lnkRouter from './modules/visit/route.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-csrf-token'],
  credentials: true,
};

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(cors(corsOptions), apiLimiter);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', UserRouter);

app.use(attachMQ);

app.use('/api/lnk', lnkRouter);

app.use(isAuthenticated);

app.use('/api/link', LinkRouter);
app.use('/api/view', ViewRouter);

passportInit();
connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
