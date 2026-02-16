import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected successfully');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
