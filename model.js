"use strict"

let fs = require('fs')

class Model{
  constructor(){
    this.file = 'data.json'
    this.data = JSON.parse(fs.readFileSync(this.file, 'utf8'))
  }
  
  writeToFile(data){
    fs.writeFileSync(this.file, JSON.stringify(data), 'utf8')
  }
}


module.exports = Model;
