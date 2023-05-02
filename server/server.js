const dotenv = require('dotenv').config();
const app = require('./app')
const mongoose = require('mongoose');


const uri = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
  
  dbConnect().catch((err) => console.log(err));
  
  async function dbConnect() {
    await mongoose.connect(uri);
    console.log('Connected');
  }


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});