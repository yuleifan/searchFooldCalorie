require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to the database'));

app.use(express.json());

const fooddietRouter = require('./routes/fooddietRouter');
app.use('/fooddiet', fooddietRouter);

app.listen(3001, () => {
  console.log('server started');
});
