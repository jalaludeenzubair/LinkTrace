import amqp from 'amqplib';

class Producer {
  private ch: amqp.Channel | null = null;
  private con: amqp.Connection | null = null;
  private instance: Producer | null = null;
  constructor() {
    this.connect()
      .then(() => {
        console.log('Connected to RabbitMQ');
        this.instance = this;
      })
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
  getInstance() {
    return this.instance;
  }

  async publishToQueue(queueName: string, payload: any) {
    const ch = this.getChannel();
    if (!ch) throw new Error('RabbitMQ channel is not available');

    await ch.assertQueue(queueName, { durable: true });
    ch.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)));
    console.log(`Message sent to queue ${queueName}:`, queueName);
  }
}

export default Producer;
