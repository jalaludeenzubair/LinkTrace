import Producer from '../core/producer.js';

const producer = new Producer();

export const attachMQ = (req, _, next) => {
  req.amqp = producer.getChannel();
  console.log('Channel:', req.amqp);
  next();
};
