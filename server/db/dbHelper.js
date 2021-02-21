const db = require('./index.js');

const dbHelpers = {
  getTypes: (callback) => {
    db.query(`SELECT * FROM types`, (err, results) => {
      callback(err, results)
    })
  },
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
  },
  delete: (req, callback) => {
    db.query(`DELETE pokemon, images, types FROM pokemon
    INNER JOIN images ON pokemon.imageNum = images.id
    INNER JOIN types ON pokemon.typeNum = types.id
    WHERE pokemon.id=${req.params.id}`, (err, results) => {
      callback(err, results);
    })
  },
  post: (req, callback) => {
    db.query(`INSERT INTO pokemon (name, typeNum, imageNum) VALUES ('${req.body.name}', ${req.body.typeNum}, ${req.body.imageNum})`, (err, results) => {
      callback(err, results);
    })
  },
  postPhoto: (req, callback) => {
    db.query(`INSERT INTO images (img) VALUES ('${req.body.img}')`, (err, results) => {
      callback(err, results);
    })
  },
  getPhoto: (callback) => {
    db.query(`SELECT * FROM images`, (err, results) => {
      callback(err, results);
    })
  }
  // postType(`INSERT INTO types VALUES ('${req.body.type}')`, (err, results) => {
  //   callback(err, results);
  // })
}

module.exports = dbHelpers