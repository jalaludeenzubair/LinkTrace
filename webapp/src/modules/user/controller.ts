import bcrypt from 'bcryptjs';
import UserModel from './user.model.js';
import passport from 'passport';

const UserController = () => ({
  register: async (userData) => {
    const { userName, password, firstName, lastName } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempObj = {
      userName,
      password: hashedPassword,
      firstName,
      lastName,
    };
    const user = await UserModel.create(tempObj);
    return user;
  },
});

export default UserController;
