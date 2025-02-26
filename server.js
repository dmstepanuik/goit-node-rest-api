require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
