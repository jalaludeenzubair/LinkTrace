import HistoryModel from '../link/history.model.js';
import LinkModel from '../link/link.model.js';

const ViewController = () => ({
  getLinks: async (payload: any, user: any) => {
    const { limit, page } = payload;
    const { userName } = user;

    const query = { userName };
    const skip = (page - 1) * limit;
    const options = {
      skip,
      limit,
      sort: { createdAt: -1 },
    };
    const projection = {
      alive: 0,
      __v: 0,
    };

    const dataPrm = LinkModel.find(query, projection, options);
    const totalPrm = LinkModel.countDocuments(query);
    const [data, total] = await Promise.all([dataPrm, totalPrm]);
    const totalPages = Math.ceil(total / limit);
    return {
      links: data,
      total,
      page,
      totalPages,
    };
  },
  getDetails: async (id: string) => {
    const projection = {
      alive: 0,
      __v: 0,
    };
    const result = await HistoryModel.find({ linkId: id }, projection);
    return result;
  },
});

export default ViewController;
