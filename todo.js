'use strict'

const fs = require('fs')

class Model{
  constructor(){
    this.file = 'data.json';
    this.data = JSON.parse(fs.readFileSync(this.file,'UTF-8'));
  }

  add(data){
    fs.writeFileSync(this.file,JSON.stringify(data),'UTF-8')
  }

  delete(data){
    fs.writeFileSync(this.file,JSON.stringify(data),'UTF-8')
  }

  complete(data){
    fs.writeFileSync(this.file,JSON.stringify(data),'UTF-8')
  }

  uncomplete(data){
    fs.writeFileSync(this.file,JSON.stringify(data),'UTF-8')
  }

  tag(data){
    fs.writeFileSync(this.file,JSON.stringify(data),'UTF-8')
  }
}

class Controller{
  constructor(command){
    this.command = command;
    this.view = new View;
    this.model = new Model;

  }
//------------
  play(){
    switch(this.command[2]){
      case 'help' : this.view.help();break
      case 'list' : this.list(this.model.data);break
      case 'add'  : this.add(this.command.slice(3,this.command.length).join(' '));break
      case 'task' : this.task(this.command[3],this.model.data);break
      case 'delete': this.delete(this.command[3],this.model.data);break
      case 'complete': this.complete(this.command[3],this.model.data);break
      case 'uncomplete': this.uncomplete(this.command[3],this.model.data);break
      case 'list:outstanding':this.listoutstanding(this.command[3],this.model.data);break
      case 'list:completed': this.listcompleted(this.command[3],this.model.data);break
      case 'tag': this.tag(this.command[3],this.command[4],this.command[5],this.model.data);break
      case 'filter': this.filter(this.command[3],this.model.data);break
      default : this.view.help();break
    }
  }

  add(todo){
    this.model.data.push({
      'id': this.model.data.length+1,
      'task': todo,
      'status': 'uncomplete',
      'created_at': new Date().toUTCString(),
      'tag': [],
      'completed_at': ' '
    })
    this.view.add(this.model.data[this.model.data.length-1])
    this.model.add(this.model.data)
  }

  list(data){
    if(!data || data.length === 0){
      this.view.logNone()
    }
    else{
    for(let i = 0; i < data.length;i++){
    if(data[i].status === 'complete'){
        this.view.list(data[i],'[X]')
      }
      else{
        this.view.list(data[i],'[ ]')
        }
      }
    }
  }

  task(id,data){
    for(let i = 0; i < data.length; i++){
      if(data[i].id.toString() === id.toString()){
        this.view.logTask(data[i])
      }
    }
  }

  delete(id,data){
    if(data.length === 0){
      this.view.logNoItem()
    }

    for(let i = 0;i < data.length; i++){
      if(data[i].id.toString() === id.toString()){
        this.view.delete(data[i].task)
        data.splice(i,1)
        this.model.delete(data)
      }
    }
  }

  complete(id,data){
    for(let i = 0; i < data.length; i++){
      if(data[i].id.toString() === id.toString() && data[i].status !== 'complete'){
        this.view.complete(data[i].task)
        data[i].status = 'complete'
        data[i].completed_at = new Date().toUTCString()
        this.model.complete(data)
      }
      else if (data[i].id.toString() === id.toString() && data[i].status === 'complete'){
        this.view.haveCompleted()
      }
    }
  }

  uncomplete(id,data){
    for(let i = 0; i < data.length; i++){
      if(data[i].id.toString() === id.toString() && data[i].status !== 'uncomplete'){
        this.view.uncomplete(data[i].task)
        data[i].status = 'uncomplete'
        this.model.uncomplete(data)
      }
      else if (data[i].id.toString() === id.toString() && data[i].status === 'uncomplete'){
        this.view.haveBeenUncompleted()
      }
    }
  }

  listoutstanding(order,data){
    let notComplete = []
    for(let i = 0; i < data.length; i++){
      if(data[i].status === 'uncomplete'){
        notComplete.push(data[i])
        this.view.listoutstanding(notComplete)
      }
    }
    data = notComplete
    switch (order) {
      case 'asc': data.sort((a,b) => new Date(b.created_at) < new Date(a.created_at));break
      case 'desc':data.sort((a,b) => new Date(a.created_at) < new Date(b.created_at));break
      default: data.sort((a,b) => new Date(b.created_at) < new Date(a.created_at));break
    }
    if(data.length === 0){
      this.view.logNone()
    }
    else{
    this.list(data)
    }
  }

  listcompleted(order,data){
    let yesComplete = []
    for(let i = 0; i < data.length; i++){
      if(data[i].status === 'complete'){
        yesComplete.push(data[i])
        this.view.listcompleted(yesComplete)
      }
    }
    data = yesComplete
    switch(order){
      case 'asc': data.sort((a,b) => new Date(b.completed_at) < new Date(a.completed_at));break
      case 'desc': data.sort((a,b) => new Date(a.completed_at) < new Date(b.completed_at));break
      default: data.sort((a,b) => new Date(b.completed_at) < new Date(a.completed_at));break
    }
    if(data.length === 0){
      this.view.noCompletedTask()
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
        this.model.tag(data)
      }
    }
  }

  filter(tag,data){
    let arrayTag = []
    for(let i = 0; i < data.length; i++){
      for(let j = 0; j < data[i].tag.length; j++){
        if(tag === data[i].tag[j]){
          arrayTag.push(data[i])
        }
      }
    }
    if(arrayTag.length === 0){
      this.view.noTag(tag)
    }
    else{
      this.view.filter(tag,arrayTag)
      this.list(arrayTag)
    }
  }
}

class View{
  constructor(){
  }

  help(){
    this.clean()
    console.log(`\n      COMMAND LINE\n      ===============================================
      + node todo.js help
      + node todo.js list
      + node todo.js add [task content]
      + node todo.js task [id]
      + node todo.js delete [id]
      + node todo.js complete [id]
      + node todo.js uncomplete [id]
      + node todo.js list:outstanding asc/desc
      + node todo.js list:completed asc/desc
      + node todo.js tag [id] [tagName1] [tagName2]
      + node todo.js filter [tagName]`)
  }

  add(task){
    console.log(`${task.task} Added! Your Task ID: ${task.id}`)
  }

  delete(task){
    console.log(`${task} Deleted`)
  }

  list(data,status){
    console.log(`${data.id}. ${status} ${data.task}`)
  }

  complete(task){
    console.log(`${task} Completed`)
  }

  uncomplete(task){
    console.log(`${task} Uncompleted`)
  }

  logTask(data){
    console.log(`Id: ${data.id}\nStatus: ${data.status}\nTask: ${data.task}\nCreated_at: ${data.created_at}\nTags: ${data.tag}\nCompleted_at: ${data.completed_at}`)
  }

  tag(task,name1,name2){
    if(name1 && name2){
    console.log(`${name1} & ${name2} tag added to task ${task}`)
    }
    else{
    console.log(`${name1} tag added to task ${task}`)
    }
  }

  listoutstanding(data){
    if(data.length > 1){
    this.clean()
    console.log(`There are ${data.length} tasks that have not completed yet`)
    }
    else{
    console.log(`There is ${data.length} task that have not completed yet`)
    }
  }

  listcompleted(data){
    if(data.length > 1){
    this.clean()
    console.log(`There are ${data.length} tasks that have already completed`)
    }
    else{
    console.log(`There is ${data.length} task have already completed`)
    }
  }

  noTag(tag){
    console.log(`There is no task match tag '${tag}' `)
  }

  filter(tag,data){
    if(data.length > 1){
    console.log(`There are '${data.length}' tasks match for tag '${tag}'`)
    }
    else if(data.length === 1){
      console.log(`There is ${data.length} taks match for tag '${tag}' `)
    }
  }

  haveCompleted(){
    console.log('The Task already completed')
  }

  haveBeenUncompleted(){
    console.log('The Task Uncompleted')
  }

  logNone(){
    console.log('There is no list yet..')
  }

  logNoItem(){
    console.log('No Item to Delete!')
  }

  noCompletedTask(){
    console.log(`No completed task yet..`)
  }

  clean(){
      console.log("\x1B[2J")
  }
}

let argv = process.argv
let todo = new Controller(argv)
todo.play()
