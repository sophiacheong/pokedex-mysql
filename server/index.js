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

app.get('/types', (req, res) => {
  dbHelpers.getTypes((err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send(results)
  })
})

app.get('/api', (req, res) => {
  dbHelpers.get((err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send(results)
  })
})

app.patch('/api/:id', (req, res) => {
  dbHelpers.update(req, (err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send(results)
  })
})

app.delete('/api/:id', (req, res) => {
  dbHelpers.delete(req, (err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send(results)
  })
})

app.post('/api', (req, res) => {
  dbHelpers.post(req, (err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send('Posted')
  })
})

app.post('/api/photo', (req, res) => {
  dbHelpers.postPhoto(req, (err, results) => {
    if (err) res.status(404).send(err)
    else res.status(200).send('Posted')
  })
})

app.get('/api/photo', (req, res) => {
  dbHelpers.getPhoto((err, results) => {
    if (err) res.status(4040).send(err)
    else res.status(200).send(results)
  })
})

// app.post('/api/type', (req, res) => {
//   dbHelpers.postType(req, (err, results) => {
//     if (err) res.status(404).send(err)
//     else res.status(200).send('Posted')
//   })
// })