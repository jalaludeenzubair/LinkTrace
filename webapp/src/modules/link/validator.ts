import Producer from '../../core/producer.js';
import { UserType } from '../user/user.model.js';
import {
  createLinkPayload,
  deleteLinkPayload,
  LinkValidatorInterface,
} from './types.js';

const LinkValidator = (): LinkValidatorInterface => ({
  createLink: (payload: createLinkPayload, user: UserType) => {
    const { url } = payload;
    if (!url) {
      throw new Error('URL is required');
    }
  },
  deleteLink: (payload: deleteLinkPayload, user: UserType) => {
    const { id } = payload;
    if (!id) {
      throw new Error('ID is required');
    }
  },
  getLink: (id: string, ip: string, userAgent: string, queue: Producer) => {
    if (!id) {
      throw new Error('ID is required');
    }
  },
});

export default LinkValidator;
