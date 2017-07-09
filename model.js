"use strict"
const fs = require('fs');

class Model {
  constructor() {

  }
  readFile() {
    let file = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
    return file;
  }
  writeData(data) {
    // console.log(data);
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        throw err;
      }
    });
  }
};

module.exports = Model;
