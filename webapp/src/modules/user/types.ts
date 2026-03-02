import { UserType } from './user.model.js';

export interface registerPayload {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface UserControllerInterface {
  register: (userData: registerPayload) => Promise<UserType>;
}

export interface UserValidatorInterface {
  register: (userData: registerPayload) => void;
}
