import axios from 'axios';

const convertData = (data: any) => {
  const {
    status,
    country,
    countryCode,
    region,
    regionName,
    city,
    zip: pinCode,
    lat,
    lon,
    timezone,
  } = data;

  if (status !== 'success') {
    throw new Error(`Failed to fetch`);
  }
  return {
    country,
    countryCode,
    region,
    regionName,
    city,
    pinCode,
    lat: lat.toString(),
    lon: lon.toString(),
    timezone,
  };
};

export const convertIpToDetails = async (ip: string): Promise<any> => {
  try {
    const response = await axios.get(`${process.env.IP_API}${ip}`);
    return convertData(response.data);
  } catch (error) {
    console.error(`Error fetching IP details for ${ip}:`, error);
    return null;
  }
};

export const convertDeviceInfo = (data) => {
  const { client, device, os } = data;
  return {
    type: client.type,
    app: client.name,
    appVersion: client.version,
    deviceType: device?.type || 'unknown',
    deviceModel: device?.model || 'unknown',
    os: os?.name || 'unknown',
    osVersion: os?.version || 'unknown',
    platform: os?.platform || 'unknown',
  };
};
