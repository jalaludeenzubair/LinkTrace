const UserValidator = () => ({
  register: (payload) => {
    const { userName, password } = payload;
    if (!userName) throw new Error('Username is required');
    if (!password) throw new Error('Password is required');
    if (password.length < 6)
      throw new Error('Password must be at least 6 characters long');
  },
  login: (payload) => {
    const { userName, password } = payload;
    if (!userName) throw new Error('Username is required');
    if (!password) throw new Error('Password is required');
  },
});

export default UserValidator;
