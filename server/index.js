const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const PORT = 3000;
const dbHelpers = require('./db/dbHelper.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(PORT, () => { console.log(`LISTENING AT PORT ${PORT}`) });

app.get('/api', (req, res) => {
  dbHelpers.get((err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send(results)
  })
})