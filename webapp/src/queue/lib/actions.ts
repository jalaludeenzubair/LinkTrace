import { convertIpToDetails } from '../../library/link.js';

const actions = {
  CREATE_DATA: async (payload) => {
    const { originalUrl, ip } = payload;
    const data = await convertIpToDetails(ip);
    //TODO: Save the data to the database
  },
};

export default actions;
