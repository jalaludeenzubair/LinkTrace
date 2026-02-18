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
import { validateCSRFToken } from './modules/user/helper.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-csrf-token'],
  credentials: true,
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
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

app.use(attachMQ);

app.use('/api/link', validateCSRFToken, LinkRouter);
app.use('/api/user', UserRouter);

passportInit();
connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
