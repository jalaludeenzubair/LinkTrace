import express from 'express';
import LinkRouter from './modules/link/route.js';
import connectDB from './db.js';

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/link', LinkRouter);

connectDB();

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
