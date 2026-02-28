import ResponseHandler, { ResponseType } from '../../core/Response.js';
import ViewController from './controller.js';
import ViewValidator from './validator.js';
import express from 'express';

const router = express.Router();

const validator = ViewValidator();
const controller = ViewController();

router.post(
  '/links',
  ResponseHandler({
    validator: validator.getLinks,
    controller: controller.getLinks,
    props: (req) => [req.body, req.user],
  }),
);

router.get(
  '/links/:id',
  ResponseHandler({
    validator: validator.getDetails,
    controller: controller.getDetails,
    props: (req) => [req.params.id, req.body],
  }),
);

export default router;
