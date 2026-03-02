import { api as axios } from "./axios";

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
}

interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  updateProfile: async (data: UpdateProfileData) => {
    const response = await axios.patch("/edit-user/update-profile", data);
    return response.data;
  },
  updatePassword: async (data: UpdatePasswordData) => {
    const response = await axios.patch("/edit-user/update-password", data);
    return response.data;
  },
};
