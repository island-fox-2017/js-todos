"use strict"

const View = require('./view')
const Model = require('./model')

class Controller {
  constructor() {
    // this.arg = arg
    this.model = new Model()
    this.view = new View()
  }

  list(data) {
    if (!data && data.length === 0) {
      this.view.listKosong()
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === 'complete') {
          this.view.list(data[i], '[X]')
        } else {
          this.view.list(data[i], '[ ]')
        }
      }
    }
  }


  addToDo(toDo) {
    
    let id = 0 ;
    if(this.model.data.length === 0){
      id = 1
    }else{
      id = this.model.data[this.model.data.length-1].id+1
    }
    this.model.data.push({
      'id': id,
      'task': toDo,
      'status': 'uncomplete',
      'created_at': new Date().toISOString(),
      'tag': [],
      'completed_at': ' '
    })

    this.view.addToDo(this.model.data[this.model.data.length - 1])
    this.model.writeToFile(this.model.data)
  }

  deleteToDo(id) {
    if(this.model.data.length === 0){
      this.view.listKosong()
    }else if(id> this.model.data[this.model.data.length-1].id || id < this.model.data[0].id){
      this.view.outOfRange(id)
    }else{
    for (let i = 0; i < this.model.data.length; i++) {
      if (this.model.data[i].id == id) {
        this.view.deleteToDo(this.model.data[i].task);
        this.model.data.splice(i, 1);
        // console.log(this.model.data);
        this.model.writeToFile(this.model.data)
      }
    }
  }
}

  viewTask(id){
    for (let i = 0 ; i < this.model.data.length ; i++){
      // console.log(typeof(this.model.data[i].status));
      if(this.model.data[i].id == id && this.model.data[i].status == 'uncomplete'){
        this.view.list(this.model.data[i], '[ ]')
      } 
      if(this.model.data[i].id == id && this.model.data[i].status == 'complete'){
        this.view.list(this.model.data[i], '[X]')
      } 
      if(id > this.model.data.length || id < this.model.data.length ){
        this.view.outOfRange(id)
      }
    }
  }
  
  complete(id, data){
    for(let i = 0; i < data.length; i++){
      if(data[i].id.toString() === id.toString() && data[i].status !== 'complete'){
        this.view.complete(data[i].task)
        data[i].status = 'complete'
        data[i].completed_at = new Date().toUTCString()
        this.model.writeToFile(data)
      }
      else if (data[i].id.toString() === id.toString() && data[i].status === 'complete'){
        this.view.completealready()
      }
    }
  }
  
  uncomplete(id,data){
    for(let i = 0; i < data.length; i++){
      if(data[i].id.toString() === id.toString() && data[i].status !== 'uncomplete'){
        this.view.uncomplete(data[i].task)
        data[i].status = 'uncomplete'
        this.model.writeToFile(data)
      }
      else if (data[i].id.toString() === id.toString() && data[i].status === 'uncomplete'){
        this.view.uncompletealready()
      }
    }
  }
  
  listoutstanding(order,data){
    let undone = []
    for(let i = 0; i < data.length; i++){
      if(data[i].status === 'uncomplete'){
        undone.push(data[i])
        this.view.listoutstanding(undone)
      }
    }
    data = undone
    // console.log(data);
    switch (order) {
      case 'asc': data.sort((a,b) => (b.created_at) < (a.created_at));break
      case 'dsc':data.sort((a,b) => (a.created_at) < (b.created_at));break       
      default: data.sort((a,b) => (b.created_at) < (a.created_at));break        
    }
    if(data.length === 0){
      this.view.kosongtodo()
    }
    else{
    this.list(data)
    }
  }
  
  listcompleted(order,data){
    let done = []
    for(let i = 0; i < data.length; i++){
      if(data[i].status === 'complete'){
        done.push(data[i])
        this.view.listcompleted(done)
      }
    }
    data = done
    switch(order){
      case 'asc': data.sort((a,b) => new Date(a.completed_at) < new Date(b.completed_at));break
      case 'dsc': data.sort((a,b) => new Date(b.completed_at) < new Date(a.completed_at));break
      default: data.sort((a,b) => new Date(a.completed_at) < new Date(b.completed_at));break
    }
    if(data.length === 0){
      this.view.kosongcom()
    }
    else{
    this.list(data)
    }
  }
  
  tag(id,name1,name2,data){
    for(let i = 0; i < data.length; i++){
      if(data[i].id.toString() === id.toString()){
        this.view.tag(data[i].task,name1,name2)
        data[i].tag.push(name1,name2)
        this.model.writeToFile(data)
      }
    }  
  }
  
  filter(tag,data){
    let arr = []
    for(let i = 0; i < data.length; i++){
      for(let j = 0; j < data[i].tag.length; j++){
        if(tag === data[i].tag[j]){
          arr.push(data[i])    
        }
      }
    }
    if(arr.length === 0){
      this.view.notag(tag)
    }
    else{
      this.view.filter(tag,arr)
      this.list(arr)
    }
  }



  run(argumen) {
    this.argumen = argumen[2];
    this.argTask = argumen[3];
    this.argTask2 = argumen[4];
    this.argTask3 = argumen[5]
    switch (this.argumen) {
      case 'help':
        this.view.help();
        break;
      case 'list':
        this.list(this.model.data);
        break;
      case 'add':
        this.addToDo(this.argTask);
        break;
      case 'delete':
        this.deleteToDo(this.argTask);
        break;
      case 'task':
        this.viewTask(this.argTask); break;
      case 'complete':
        this.complete(this.argTask, this.model.data); break;
      case 'uncomplete':
        this.uncomplete(this.argTask, this.model.data); break;
      case 'list:outstanding':
        this.listoutstanding(this.argTask, this.model.data); break;
      case 'list:completed':
        this.listcompleted(this.argTask, this.model.data); break;
      case 'tag':
        this.tag(this.argTask, this.argTask2, this.argTask3, this.model.data); break;
      case 'filter':
        this.filter(this.argTask, this.model.data); break;
      default:
        this.view.salahInputPerintah()

    }
  }
}

let contr = new Controller()

module.exports = Controller;
