const express = require('express')
const app = express()
const port = 3001
const {MongoClient} = require('mongodb');
const cors = require('cors');
const ResponseTimer = require('./models/responseTimer');
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
app.get('/', async (req, res) => {
  const timer = new ResponseTimer();
  // Use connect method to connect to the server
  await client.connect();
  timer.setConnection();
  console.log('connectec to server after ', timer.connectTime );
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const quoteList = await collection.find({}).toArray();
  timer.setDocuments();
  console.log('Fetched documents after ', timer.documentTime);
  console.log('Found documents =>', quoteList.length);
  // the following code examples can be pasted here...

  const quote = quoteList[Math.floor(Math.random() * quoteList.length)]
  timer.setResponse();
  console.log('Sending response after ',timer.responseTime);
  res.send(quote);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('Paw patrol ready for action Ryder, SIR!');
})
