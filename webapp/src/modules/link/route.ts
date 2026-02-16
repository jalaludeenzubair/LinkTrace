import ResponseHandler from '../../core/Response.js';
import LinkController from './controller.js';
import LinkValidator from './validator.js';
import express from 'express';

const router = express.Router();

const validator = LinkValidator();
const controller = LinkController();

router.post(
  '/create',
  ResponseHandler({
    validator: validator.createLink,
    controller: controller.createLink,
    props: (req) => [req.body, req.ip, req.amqp],
  }),
);

export default router;
