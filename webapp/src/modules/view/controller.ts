import HistoryModel from '../link/history.model.js';
import LinkModel from '../link/link.model.js';
import { UserType } from '../user/user.model.js';
import {
  getLinksPayload,
  ViewControllerInterface,
  getDetailsPayload,
} from './types.js';

const ViewController = (): ViewControllerInterface => ({
  getLinks: async (payload: getLinksPayload, user: UserType) => {
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
  getDetails: async (payload: getDetailsPayload) => {
    const { id, limit, page } = payload;
    const skip = (page - 1) * limit;

    const projection = {
      alive: 0,
      __v: 0,
    };
    const query = { linkId: id };
    const options = {
      skip,
      limit,
      sort: { createdAt: -1 },
    };

    const dataPrm = HistoryModel.find(query, projection, options);
    const totalPrm = HistoryModel.countDocuments(query);
    const [data, total] = await Promise.all([dataPrm, totalPrm]);
    const totalPages = Math.ceil(total / limit);

    return {
      views: data,
      total,
      page,
      totalPages,
    };
  },
  getInsights: async (id: string, user: UserType) => {
    const totalClicks = await HistoryModel.countDocuments({ linkId: id });
    const regionAgg = await HistoryModel.aggregate([
      { $match: { linkId: id } },
      { $group: { _id: '$regionName', clicks: { $sum: 1 } } },
      { $project: { region: '$_id', clicks: 1, _id: 0 } },
    ]);
    const timeSeriesAgg = await HistoryModel.aggregate([
      { $match: { linkId: id } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          clicks: { $sum: 1 },
        },
      },
      { $project: { date: '$_id', clicks: 1, _id: 0 } },
      { $sort: { date: 1 } },
    ]);
    return {
      totalClicks,
      regionData: regionAgg,
      timeSeriesData: timeSeriesAgg,
    };
  },
});

export default ViewController;
