import { UserType } from '../user/user.model.js';

export const validateFlag = (user: UserType): boolean => {
  const { featureFlags } = user;
  if (!featureFlags || !featureFlags.includes('createLink')) {
    return false;
  }
  return true;
};
