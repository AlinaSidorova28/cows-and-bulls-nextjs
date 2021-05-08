import mongoose from 'mongoose';

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)

  if (mongoose.connections[0].readyState) {
    console.log('alredy connected');
    return;
  }

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
  });
  mongoose.connection.on('error', (err) => {
    console.log('error connecting', err);
  });
}

export default dbConnect;
