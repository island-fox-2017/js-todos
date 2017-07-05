"use strict"

const View = require('./view')
const Model = require('./model')
 
class Controller{
  constructor(){
    this.model = new Model()
    this.view = new View()
  }
  
  addToDo(toDo){
    let id = 0;
    if(this.model.data.length === 0){
      id = 1;
    }else{
      id = this.model.data.length+1
    }
    this.model.data.push({
      'id': id,
      'task': toDo,
      'status': 'uncomplete',
      'created_at': new Date().toISOString(),
      'tag': [],
      'completed_at': ' '
    })
    
    this.model.writeToFile(this.model.data)
  }
  
}

let controller = new Controller() 
console.log(controller.addToDo("makan siang"));
// console.log(controller.model.data.length);
