import ResponseHandler, { ResponseType } from '../../core/Response.js';
import LinkController from '../link/controller.js';
import LinkValidator from '../link/validator.js';
import express from 'express';
const router = express.Router();

const validator = LinkValidator();
const controller = LinkController();
router.get(
  '/get/:id',
  ResponseHandler({
    validator: validator.getLink,
    controller: controller.getLink,
    props: (req) => [
      req.params.id,
      req.ip,
      req.headers['user-agent'],
      req.amqp,
    ],
    type: ResponseType.REDIRECT,
  }),
);
export default router;
