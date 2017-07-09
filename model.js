const fs = require('fs');
const {Controller} = require("./controller.js");

class Model {
  constructor() {
    this.ambilDataJson = JSON.parse(fs.readFileSync('data.json','utf8').trim())
  }

  addToSaveFile(userInput){

    let newObject =
    { id :this.ambilDataJson.length+1,
      completed : '[ ]',
      task: userInput}
    this.ambilDataJson.push(newObject)
    fs.writeFileSync('data.json',JSON.stringify(this.ambilDataJson))
  }
  deleteTask(userInput){
    this.ambilDataJson.splice(this.ambilDataJson.findIndex(data => data.task == userInput),1)
    fs.writeFileSync('data.json',JSON.stringify(this.ambilDataJson))
  }
  completedTask(userInput){
    let newObject =
    { id :this.ambilDataJson.length+1,
      completed : '[x]',
      task: userInput }
    this.ambilDataJson.splice(this.ambilDataJson.findIndex(data => data.task == userInput),1,newObject)
    fs.writeFileSync('data.json',JSON.stringify(this.ambilDataJson))
  }


}


module.exports = {
  Model
}
