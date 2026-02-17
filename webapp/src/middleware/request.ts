import Producer from '../core/producer.js';

const producer = new Producer();

export const attachMQ = (req, _, next) => {
  req.amqp = producer.getInstance();
  console.log('Channel:', req.amqp);
  next();
};
