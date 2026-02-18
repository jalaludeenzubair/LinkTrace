import { generateUniqueID } from '../../core/helper.js';
import LinkModel from './link.model.js';

interface LinkInterface {}

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
  getLink: (id) => {
    const projection = {
      alive: 0,
      __v: 0,
    };
    const data = LinkModel.findById(id, projection);
    if (!data) throw new Error('Link not found');
    return data;
  },
});

export default LinkController;
