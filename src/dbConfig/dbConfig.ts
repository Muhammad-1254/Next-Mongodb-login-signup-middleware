import mongoose from 'mongoose';

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('mongo db connected succesfully');
    });

    connection.on('error', (error) => {
      console.log(
        'mongo db connection error. Please make sure MongoDB is running. ',
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong: ', error);
  }
};
