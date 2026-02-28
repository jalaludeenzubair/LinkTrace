import { registerPayload } from './types.js';

const UserValidator = () => ({
  register: (userData: registerPayload) => {
    const { userName, password, firstName, lastName } = userData;
    if (!userName) throw new Error('Username is required');
    if (!password) throw new Error('Password is required');
    if (!firstName) throw new Error('First name is required');
    if (!lastName) throw new Error('Last name is required');
    if (password.length < 6)
      throw new Error('Password must be at least 6 characters long');
  },
});

export default UserValidator;
