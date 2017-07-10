"use strict"

const fs = require('fs')

class Model {
  constructor() {

  }
  rData() { //r for read
    let parseData = JSON.parse(fs.readFileSync('data.json', "utf8"));
    return parseData
  }

  wData(data) { //w for write
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
  
  }
}

module.exports = Model
