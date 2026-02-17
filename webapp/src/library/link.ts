import axios from 'axios';

export const convertIpToDetails = async (ip: string): Promise<any> => {
  try {
    const response = await axios.get(`${process.env.IP_API}${ip}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching IP details for ${ip}:`, error);
    return null;
  }
};
