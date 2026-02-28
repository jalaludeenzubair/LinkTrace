import {
  checkCache,
  generateShortenUrl,
  generateUniqueID,
  setCache,
} from '../../core/helper.js';
import Producer from '../../core/producer.js';
import { UserType } from '../user/user.model.js';
import { validateFlag } from './library.js';
import LinkModel from './link.model.js';
import {
  createLinkPayload,
  deleteLinkPayload,
  LinkControllerInterface,
} from './types.js';

const LinkController = (): LinkControllerInterface => ({
  createLink: async (
    payload: createLinkPayload,
    user: UserType,
  ): Promise<string> => {
    const { url } = payload;
    const { userName } = user;
    const check = validateFlag(user);
    if (!check) throw new Error('Does not have permission to create link');
    const shortenUrl = generateUniqueID();
    await LinkModel.insertOne({
      originalUrl: url,
      shortenUrl,
      userName,
    });
    return generateShortenUrl(shortenUrl);
  },
  deleteLink: async (payload: deleteLinkPayload): Promise<string> => {
    const { id } = payload;
    const result = await LinkModel.findByIdAndDelete(id);
    if (!result) throw new Error('Link not found');
    return 'Deleted successfully';
  },
  getLink: async (
    id: string,
    ip: string,
    userAgent: string,
    queue: Producer,
  ): Promise<string> => {
    const projection = {
      alive: 0,
      __v: 0,
    };
    const cachedData = checkCache(id);
    if (cachedData) {
      console.log(`Cache hit for key: ${id}`);
      return cachedData;
    }
    const data = await LinkModel.findOne(
      {
        shortenUrl: id,
      },
      projection,
    );
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
    const result = data.originalUrl;
    setCache(id, result);
    return result;
  },
});

export default LinkController;
