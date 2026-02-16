import amqp from 'amqplib';
class Consumer {
  private ch: amqp.Channel | null = null;
  private con: amqp.Connection | null = null;
  constructor() {
    this.connect()
      .then(() => console.log('Connected to RabbitMQ'))
      .catch((err) => {
        console.error('Failed to connect to RabbitMQ:', err);
      });
  }
  async connect() {
    this.con = await amqp.connect(process.env.RABBITMQ_URL);
    this.ch = await this.con.createChannel();
  }
  getChannel() {
    return this.ch;
  }

  async consumeFromQueue(name, actions) {
    const ch = this.getChannel();
    if (!ch) throw new Error('RabbitMQ channel is not available');
    await ch.assertQueue(name, { durable: true });
    ch.consume(name, async (payload) => {
      if (payload) {
        const { queueName, type, data } = payload;
        console.log(`Queue: ${queueName} | Type:`, type);
        const fn = actions[type];
        await fn(data);
        ch.ack(payload);
      }
    });
  }
}

export default Consumer;
