const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');
const cors = require('cors');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'quoteDatabase';
app.use(cors({
  origin: '*'
}));
app.get('/', async (req, res) => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const quoteList = await collection.find({}).toArray();
  console.log('Found documents =>', quoteList.length);
  // the following code examples can be pasted here...

  const quote = quoteList[Math.floor(Math.random()*quoteList.length)]
  res.send(quote);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 console.log('Paw patrol ready for action Ryder, SIR!');
})
