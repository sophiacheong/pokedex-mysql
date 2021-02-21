const db = require('./index.js');

const dbHelpers = {
  get: (callback ) => {
    db.query(`SELECT pokemon.id, name, images.img, types.type FROM pokemon
    INNER JOIN images ON pokemon.imageNum = images.id
    INNER JOIN types ON pokemon.typeNum = types.id`, (err, results) => {
      callback(err, results)
    })
  },
  update: (req, callback) => {
    db.query(`UPDATE pokemon SET name='${req.body.name}' WHERE id=${req.params.id}`, (err, results) => {
      callback(err, results);
    })
  }
}

module.exports = dbHelpers