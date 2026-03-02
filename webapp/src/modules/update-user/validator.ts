import { UpdatePasswordPayload, UpdateProfilePayload } from '../user/types.js';

export interface UserValidatorInterface {
  updateProfile: (data: UpdateProfilePayload) => void;
  updatePassword: (userId: string, data: UpdatePasswordPayload) => void;
}

const UpdateUserValidator = (): UserValidatorInterface => ({
  updateProfile: (data: any) => {
    const { firstName, lastName } = data;
    if (firstName && firstName.length < 2)
      throw new Error('First name too short');
    if (lastName && lastName.length < 2) throw new Error('Last name too short');
  },
  updatePassword: (userId: string, data: UpdatePasswordPayload) => {
    const { currentPassword, newPassword } = data;
    if (!currentPassword) throw new Error('Current password is required');
    if (!newPassword) throw new Error('New password is required');
    if (newPassword.length < 6)
      throw new Error('New password must be at least 8 characters long');
  },
});

export default UpdateUserValidator;
