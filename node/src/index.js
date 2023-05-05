//Set up express
const express = require('express');

const app = express();
const port = 3001;
const cors = require('cors');

// Allow requests from everywhere
app.use(cors({
  origin: '*'
}));
app.options('*', cors());

const ResponseTimer = require('./models/responseTimer');
const logger = require('./logger');

// Connect to the database:
const {MongoClient} = require('mongodb');
const url = 'mongodb://mongo:27017';
const client = new MongoClient(url);
const dbName = 'quoteDatabase';

/**
 * Set up routes
 */

// Get all quotes
app.get('/', async (req, res) => {
  const quoteList = await getQuotes();
  res.send(quoteList);
  logger.info(quoteList);
});

// Get a random quote
app.get('/random', async (req, res) => {
  const quoteList = await getQuotes();
  const quote = quoteList[Math.floor(Math.random() * quoteList.length)];
  res.send(quote);
  logger.info(quote);
});

// Start listening
app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
  logger.info('Paw patrol ready for action Ryder, SIR!');
});

// Get quotes from database
async function getQuotes() {
  const timer = new ResponseTimer();
  // Connect to the server
  await client.connect();
  timer.setConnection();
  logger.info(`connected to server after ${timer.connectTime}ms`);
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // Retrieve quotelist
  const quoteList = await collection.find({}).toArray();
  timer.setDocuments();
  logger.info(`Fetched documents after ${timer.documentTime}`);
  logger.info(`Found documents: ${quoteList.length}ms`);
  timer.setResponse();

  logger.info(`Sending response after ${timer.responseTime} ms`);

  return quoteList;
}
