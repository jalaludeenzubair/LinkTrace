import amqp from 'amqplib';

let ch: amqp.Channel | null = null;
let con: amqp.Connection | null = null;

export const connectRMQ = async (): Promise<void> => {
  try {
    con = await amqp.connect(process.env.RABBITMQ_URL);
    ch = await con.createChannel();
    console.log(`RabbitMQ connected...`);
  } catch (error) {
    console.error('RabbitMQ connection error: ', error);
    process.exit(1);
  }
};

export const getChannel = (): amqp.Channel | null => ch;
