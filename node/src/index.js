const express = require('express');

const app = express();
const port = 3001;
const {MongoClient} = require('mongodb');
const cors = require('cors');
const ResponseTimer = require('./models/responseTimer');
const logger = require('./logger');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL/:
const url = 'mongodb://mongo:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'quoteDatabase';
app.use(cors({
  origin: '*'
}));
app.options('*', cors());
app.get('/', async (req, res) => {

  const quoteList = await getQuotes();
  res.send(quoteList);
  logger.info(quoteList);
});
app.get('/random', async (req, res) => {
  const quoteList = await getQuotes();
  const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

  res.send(quote);
  logger.info(quote);
});

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
  logger.info('Paw patrol ready for action Ryder, SIR!');
});


async function getQuotes() {
  const timer = new ResponseTimer();
  // Use connect method to connect to the server
  await client.connect();
  timer.setConnection();
  logger.info(`connected to server after ${timer.connectTime}ms`);
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const quoteList = await collection.find({}).toArray();
  timer.setDocuments();
  logger.info(`Fetched documents after ${timer.documentTime}`);
  logger.info(`Found documents: ${quoteList.length}ms`);
  // the following code examples can be pasted here...
  timer.setResponse();

  logger.info(`Sending response after ${timer.responseTime} ms`);
  return quoteList;
}
