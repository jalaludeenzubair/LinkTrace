import express from 'express';
import ResponseHandler from '../../core/Response.js';
import UpdateUserController from './controller.js';
import UpdateUserValidator from './validator.js';

const router = express.Router();
const validator = UpdateUserValidator();
const controller = UpdateUserController();

router.patch(
  '/update-profile',
  ResponseHandler({
    validator: validator.updateProfile,
    controller: controller.updateProfile,
    props: (req) => [req.user?._id, req.body],
  }),
);

router.patch(
  '/update-password',
  ResponseHandler({
    validator: validator.updatePassword,
    controller: controller.updatePassword,
    props: (req) => [req.user?._id, req.body],
  }),
);

export default router;
