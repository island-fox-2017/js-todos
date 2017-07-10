"use strict"

class View{
  constructor(){
    
  }
  
  help(){
    console.log(`           HowTo ToDo App
  ===============================
  - node todo.js help
  - node todo.js list
  - node todo.js add <task to add> <== to add task in todo app
  - node todo.js task <id> <== to view task based on id task
  - node todo.js delete <id> <== to delete task in todo app based on id task
  - node todo.js complete <id> <== to mark task from not complete to completed based on id task
  - node todo.js uncomplete <id> <== to unmark task from complete to uncomplete based on id task
  - node todo.js 
  - node todo.js list:outstanding asc/dsc
  - node todo.js list:completed asc/dsc
  - node todo.js tag <id> <name1> <name2>
  - node todo.js filter <tag_name>`);
  }
  
  addToDo(data){
    console.log(`${data.task} added, task id : ${data.id}`);
  }
  
  deleteToDo(data){
    console.log(`task ${data} success deleted!`);
  }
  
  list(data, status){
    console.log(`${data.id}. ${status} ${data.task}`);
  }
  
  listKosong(){
    console.log(`No todo list yet, please create one or more`);
  }
  
  salahInputPerintah(){
    console.log(`Anda salah memasukkan perintah!, lihat lagi help <node todo.js help> untuk panduan.`);
  }
  
  outOfRange(id){
    console.log(`Task ke ${id} tidak ditemukan, cek list task <node todo.js list>`);
  }
  
  complete(task){
    console.log(`${task} Completed!`)
  }
  
  uncomplete(task){
    console.log(`${task} Uncompleted!`)
  }
  
  task(data){
  console.log(`\nID: ${data.id}\nStatus: ${data.status}\nTask: ${data.task}\nCreated_at: ${data.created_at}\nTags: ${data.tag}\nCompleted_at: ${data.completed_at}`)
}

tag(task,name1,name2){
  if(name1 && name2){
  console.log(`${name1} and ${name2} added to ${task}!`)
  }
  else{
  console.log(`${name1} added to ${task}!`)
  }
}

listoutstanding(data){
  if(data.length > 1){
  this.clean()
  console.log(`You have ${data.length} todos that are not completed yet`)
  }
  else{
  console.log(`You have ${data.length} todo that is not completed yet`)  
  }
} 

listcompleted(data){
  if(data.length > 1){
  this.clean()
  console.log(`You have ${data.length} todos that already completed`)
  }
  else{
  console.log(`You have ${data.length} todo that already completed`)  
  }
}  
notag(tag){
  console.log(`There is no todo that match tag '${tag}' `)
}

filter(tag,data){
  if(data.length > 1){
  console.log(`There are '${data.length}'todos match for tag '${tag}'`)
  }
  else if(data.length === 1){
    console.log(`There is ${data.length} todo match for tag '${tag}' `)
  }
}

completealready(){
  console.log('This task already completed!')
}

uncompletealready(){
  console.log('This task already uncompleted!')
}

kosongtodo(){
  console.log('No todo list yet! please make one!')
}

kosongdelete(){
  console.log('There is nothing to delete!')
}

kosongcom(){
  console.log(`There is no completed todo yet!`)
}

clean(){
      console.log("\x1B[2J")
  }

}

let view = new View()


// console.log(view.help());

module.exports = View;
