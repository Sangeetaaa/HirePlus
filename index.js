const express = require('express');
const Datastore = require('nedb');

const app = express();
app.listen(3011, () => console.log('listening at 3000'));
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
