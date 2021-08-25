const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Database up and running');
  });

mongoose.connection.on('error', function () {
  console.log('Error in the connection to the database');
});
mongoose.connection.on('disconnected', function () {
  console.log('Connection to the database lost');
});
