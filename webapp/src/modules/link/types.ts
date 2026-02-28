import Producer from '../../core/producer.js';
import { UserType } from '../user/user.model.js';

export interface createLinkPayload {
  url: string;
}
export interface deleteLinkPayload {
  id: string;
}
export interface LinkControllerInterface {
  createLink: (payload: createLinkPayload, user: UserType) => Promise<string>;
  deleteLink: (payload: deleteLinkPayload) => Promise<string>;
  getLink: (
    id: string,
    ip: string,
    userAgent: string,
    queue: Producer,
  ) => Promise<string>;
}

export interface LinkValidatorInterface {
  createLink: (payload: createLinkPayload, user: UserType) => void;
  deleteLink: (payload: deleteLinkPayload, user: UserType) => void;
  getLink: (id: string, ip: string, userAgent: string, queue: Producer) => void;
}
