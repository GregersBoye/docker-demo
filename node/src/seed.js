const { MongoClient } = require('mongodb');
const quoteList = require('../quote_list.json');
// or as an es module:
// import { MongoClient } from 'mongodb'

const logger = require('./logger.js');
// Connection URL
const url = 'mongodb://mongo:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'quoteDatabase';

async function seed() {
  // Use connect method to connect to the server
  await client.connect();
  logger.info('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  const insertResult = await collection.insertMany(quoteList);
  logger.info(`Inserted documents => ${JSON.stringify(insertResult)}`);
  process.exit(0);
}

seed();
