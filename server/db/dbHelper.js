const db = require('./index.js');

const dbHelpers = {
  get: (callback ) => {
    db.query(`SELECT pokemon.id, name, images.img, types.type FROM pokemon
    INNER JOIN images ON pokemon.imageNum = images.id
    INNER JOIN types ON pokemon.typeNum = types.id`, (err, results) => {
      callback(err, results)
    })
  },
  // post: () => {

  // }
}

module.exports = dbHelpers