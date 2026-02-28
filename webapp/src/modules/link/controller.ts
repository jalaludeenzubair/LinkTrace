import { generateShortenUrl, generateUniqueID } from '../../core/helper.js';
import LinkModel from './link.model.js';

const LinkController = () => ({
  createLink: async (payload) => {
    const { url } = payload;
    const shortenUrl = generateUniqueID();
    await LinkModel.insertOne({ originalUrl: url, shortenUrl });
    return shortenUrl;
  },
  deleteLink: async (payload) => {
    const { id } = payload;
    const result = await LinkModel.findByIdAndDelete(id);
    if (!result) throw new Error('Link not found');
    return 'Deleted successfully';
  },
  getLink: async (id, ip, userAgent, queue) => {
    const projection = {
      alive: 0,
      __v: 0,
    };
    const data = await LinkModel.findById(id, projection);
    if (!data) throw new Error('Link not found');
    const body = {
      ip: '122.164.80.239',
      // ip,
      userAgent,
      id,
    };
    const payload = {
      type: 'CREATE_DATA',
      body,
    };
    queue.publishToQueue('IP', payload);
    return generateShortenUrl(data.originalUrl);
  },
});

export default LinkController;
