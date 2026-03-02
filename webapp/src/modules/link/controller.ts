import { generateShortenUrl, generateUniqueID } from '../../core/helper.js';
import Producer from '../../core/producer.js';
import { checkCache, setCache } from '../../core/Redis.js';
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
    const valid = validateFlag(user);
    if (!valid) throw new Error('Does not have permission to create link');
    const shortenUrl = generateUniqueID();
    await LinkModel.insertOne({
      originalUrl: url,
      shortenUrl,
      userName,
    });
    return generateShortenUrl(shortenUrl);
  },
  deleteLink: async (id: string): Promise<string> => {
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
    const cachedData = await checkCache(id);
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

    const result = data.originalUrl;

    await LinkModel.findOneAndUpdate(
      { shortenUrl: id },
      { $inc: { visitCount: 1 } },
    );
    await setCache(id, result);
    return result;
  },
});

export default LinkController;
