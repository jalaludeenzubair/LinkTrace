import { convertDeviceInfo, convertIpToDetails } from '../../library/link.js';

import DeviceDetector from 'device-detector-js';
import HistoryModel from '../../modules/link/history.model.js';

const deviceDetector = new DeviceDetector();
interface CreateDataPayload {
  id: string;
  ip: string;
  userAgent: string;
}
const actions = {
  CREATE_DATA: async (payload: CreateDataPayload) => {
    const { id, ip, userAgent } = payload;
    const data = await convertIpToDetails(ip);
    const deviceDetails = deviceDetector.parse(userAgent);
    const deviceInfo = convertDeviceInfo(deviceDetails);
    const finalData = {
      linkId: id,
      ...data,
      metadata: deviceInfo,
    };
    try {
      await HistoryModel.insertOne(finalData);
    } catch (error) {
      console.error('Error inserting history data:', error);
    }
  },
};

export default actions;
