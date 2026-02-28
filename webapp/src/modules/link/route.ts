import ResponseHandler, { ResponseType } from '../../core/Response.js';
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
    props: (req) => [req.body],
  }),
);

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

router.delete(
  '/delete',
  ResponseHandler({
    validator: validator.deleteLink,
    controller: controller.deleteLink,
    props: (req) => [req.body],
  }),
);

export default router;
