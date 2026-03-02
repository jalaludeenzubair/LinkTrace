import { api as axios } from "./axios";

export const userService = {
  updateProfile: async (data: any) => {
    const response = await axios.patch("/edit-user/update-profile", data);
    return response.data;
  },
  updatePassword: async (data: any) => {
    const response = await axios.patch("/edit-user/update-password", data);
    return response.data;
  },
};
