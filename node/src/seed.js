const express = require('express')
const app = express()
const port = 3000
const quoteList = require('../quote_list.json');
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'quoteDatabase';

  async function seed(){
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

    const insertResult = await collection.insertMany(quoteList);
    console.log('Inserted documents =>', insertResult);
    process.exit(0);
}

seed();
