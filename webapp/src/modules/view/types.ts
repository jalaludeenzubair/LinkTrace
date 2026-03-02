import { UserType } from '../user/user.model.js';

export interface getLinksPayload {
  limit: number;
  page: number;
}
export interface getDetailsPayload {
  id: string;
  limit: number;
  page: number;
}

export interface ViewControllerInterface {
  getLinks: (payload: getLinksPayload, user: UserType) => Promise<any>;
  getDetails: (payload: getDetailsPayload) => Promise<any>;
  getInsights: (id: string, user: UserType) => Promise<any>;
}

export interface ViewValidatorInterface {
  getLinks: (payload: getLinksPayload, user: UserType) => void;
  getDetails: (payload: getDetailsPayload, user: UserType) => void;
  getInsights: (id: string, user: UserType) => void;
}
