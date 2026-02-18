import ResponseHandler from '../../core/Response.js';
import express from 'express';
import UserValidator from './validator.js';
import UserController from './controller.js';
import { Login } from './helper.js';
const router = express.Router();

const validator = UserValidator();
const controller = UserController();

router.post(
  '/register',
  ResponseHandler({
    validator: validator.register,
    controller: controller.register,
    props: (req) => [req.body],
  }),
);

router.post('/login', Login);

export default router;
