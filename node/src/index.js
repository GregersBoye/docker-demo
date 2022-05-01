const express = require('express')
const app = express()
const port = 3000
const quoteList = require('../quote_list.json');

app.get('/', (req, res) => {
  const quote = quoteList[Math.floor(Math.random()*quoteList.length)]
  res.send(quote);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
 console.log('Paw patrol ready for action Ryder, SIR!');
})
