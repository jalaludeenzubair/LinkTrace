import { QUEUE_NAME } from '../../constants/queue.js';

interface LinkInterface {}

const LinkController = () => ({
  createLink: (payload, ip, ch) => {
    const { url } = payload;
    const queuePayload = {
      body: { originalUrl: 'url', ip: '24.48.0.1' },
      type: 'CREATE_DATA',
    };
    ch.publishToQueue(QUEUE_NAME.IP, queuePayload);
    return 'Pushed to the Queue Successfully';
  },
  deleteLink: () => {},
  getLink: () => {},
  updateLink: () => {},
});

export default LinkController;
