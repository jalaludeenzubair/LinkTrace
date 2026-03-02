import { UserType } from '../user/user.model.js';
import {
  getDetailsPayload,
  getLinksPayload,
  ViewValidatorInterface,
} from './types.js';

const ViewValidator = (): ViewValidatorInterface => ({
  getLinks: (payload: getLinksPayload, user: UserType) => {
    const { limit, page } = payload;
    if (!limit) {
      throw new Error('Limit is required');
    }
    if (!page) {
      throw new Error('Page is required');
    }
  },
  getDetails: (payload: getDetailsPayload, user: UserType) => {
    const { id, limit, page } = payload;
    if (!id) {
      throw new Error('ID is required');
    }
    if (!limit) {
      throw new Error('Limit is required');
    }
    if (!page) {
      throw new Error('Page is required');
    }
  },
  getInsights: (id: string, user: UserType) => {
    if (!id) {
      throw new Error('Link ID is required');
    }
  },
});

export default ViewValidator;
