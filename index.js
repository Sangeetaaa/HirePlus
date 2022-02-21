const express = require('express');
const Datastore = require('nedb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('databasemain.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({},(err,data) => {
    if(err)
    {
      response.end();
      return;
    }
    response.send(data)
  });
 
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  console.log(data);
  
});
