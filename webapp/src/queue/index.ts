import Consumer from '../core/consumer.js';
import connectDB from '../db.js';

const consumer = new Consumer();

const arr = ['./link/index.js'];

export const consumeFromQueue = async (queueName, actions): Promise<void> => {
  const ch = consumer.getChannel();
  if (!ch) throw new Error('RabbitMQ channel is not available');

  await ch.assertQueue(queueName, { durable: true });

  ch.consume(queueName, async (payload) => {
    if (payload) {
      const { type, body } = JSON.parse(payload.content.toString('utf8'));
      console.log(`Message received from queue ${queueName}:`);
      if (!actions[type]) {
        console.log(
          `No action is registered for the queue ${queueName} and type ${type}`,
        );
        ch.ack(payload);
        return;
      }
      await actions[type](body);
      ch.ack(payload);
    }
  });
};

(async () => {
  connectDB();
  await consumer.connect();
  arr.forEach(async (path) => {
    const module = await import(path);
    const { queueName, actions } = module.default;
    consumeFromQueue(queueName, actions);
  });
})();
