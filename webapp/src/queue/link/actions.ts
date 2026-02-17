import { convertIpToDetails } from '../../library/link.js';

const actions = {
  CREATE_DATA: async (payload) => {
    const { originalUrl, ip } = payload;
    const data = await convertIpToDetails(ip);
    console.log('Data to be saved:', { originalUrl, ...data });
    //TODO: Save the data to the database
  },
};

export default actions;
