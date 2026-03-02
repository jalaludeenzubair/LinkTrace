import { UpdatePasswordPayload, UpdateProfilePayload } from '../user/types.js';
import UserModel from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import { UserType } from '../user/user.model.js';
export interface UserControllerInterface {
  updateProfile: (
    userId: string,
    data: UpdateProfilePayload,
  ) => Promise<UserType>;
  updatePassword: (
    userId: string,
    data: UpdatePasswordPayload,
  ) => Promise<void>;
}
const UpdateUserController = (): UserControllerInterface => ({
  updateProfile: async (userId: string, data: UpdateProfilePayload) => {
    const user = await UserModel.findByIdAndUpdate(userId, data, { new: true });
    if (!user) throw new Error('User not found');
    return user;
  },
  updatePassword: async (userId: string, data: UpdatePasswordPayload) => {
    const { currentPassword, newPassword } = data;
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password || '');
    if (!isMatch) throw new Error('Invalid current password');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
  },
});

export default UpdateUserController;
