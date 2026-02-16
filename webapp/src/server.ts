import express from 'express';
import LinkRouter from './modules/link/route.js';
import connectDB from './db.js';
import bodyParser from 'body-parser';
import { attachMQ } from './middleware/request.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(attachMQ);

app.use('/api/link', LinkRouter);

connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
