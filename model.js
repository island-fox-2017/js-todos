'use strict'

const fs = require('fs')

class Model{
  constructor(){
  }

  readFile(){
    let file = JSON.parse(fs.readFileSync('data.json', 'utf8')) //JSON.parse mengambil data yg diurai sepaket json
    return file
  }
  
  writeFile(data){
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3))
  }

}
