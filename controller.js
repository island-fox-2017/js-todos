const fs = require('fs');
const {Model} = require("./model.js");
const{View} = require("./view.js");
var toModel = new Model()
var toView = new View()
class Controller {
  constructor() {

  }
  tambahTask(userInput){
    toModel.addToSaveFile(userInput)
    toView.viewAdd(userInput)
  }
  toList(){
    toView.viewList()
  }
  toDelete(userInput){
    toModel.deleteTask(userInput)
    toView.viewDelete(userInput)
  }
  toComplete(userInput){
    toModel.completedTask(userInput)
    toView.viewList()
  }

}
// console.log(tambahTask);

module.exports = {
  Controller
}
