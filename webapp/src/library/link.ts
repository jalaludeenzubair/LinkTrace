import axios from 'axios';

interface IpDetails {
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  pinCode: string;
  lat: string;
  lon: string;
  timezone: string;
  status: string;
  zip: string;
}

export interface DeviceInfo {
  type: string;
  app: string;
  appVersion: string;
  deviceType: string;
  deviceModel: string;
  os: string;
  osVersion: string;
  platform: string;
}

export interface DeviceData {
  client: {
    type: string;
    name: string;
    version: string;
  };
  device?: {
    type: string;
    model: string;
  };
  os?: {
    name: string;
    version: string;
    platform: string;
  };
}
type LinkData = Omit<IpDetails, 'status' | 'zip'> & {
  pinCode: string;
};
const convertData = (data: IpDetails) => {
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

export const convertIpToDetails = async (ip: string): Promise<LinkData> => {
  try {
    const response = await axios.get(`${process.env.IP_API}${ip}`);
    return convertData(response.data);
  } catch (error) {
    console.error(`Error fetching IP details for ${ip}:`, error);
    return null;
  }
};

export const convertDeviceInfo = (data: DeviceData): DeviceInfo => {
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
