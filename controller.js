'use strict'

const View = require('./view')
const Model = require('./model')


class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }
  
  list(data) {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        console.log(`${data[i].id}. [${data[i].completed ? "X" : " "}] ${data[i].task}`);
      }
    } else {
      console.log("Empty tasks");
    }
  }
  
  sortId(data){
    for(let i = 0; i < data.length; i++){
      data[i].id = i + 1
    }
    return data
  }
  
  add(task) {
    let data = this.model.rData();
    let object = {
      "id": 0,
      "task": task,
      "completed": false,
      "created_at": new Date(),
      // "completed_at": "",
      "tags": []
    };
    data.push(object);
    data = this.sortId(data)
    this.model.wData(data);
    console.log(`Added ${object.task} to your TODO list...`);
  }
  
  addTag(id, tags) {
    let data = this.model.rData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].tags = tags;
        console.log(`Tagged task ${data[i].task} with tags: ${data[i].tags}`);
        break;
      }
    }
    this.model.wData(data);
  }
  
  deleting(id) {
    let data = this.model.rData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data.splice(i, 1);
        console.log(`Deleted data with id: ${id} from your TODO list...`);
        break;
      }
    }
    data = this.sortId(data)
    this.model.wData(data);    
  }
  
  Complete(id) {
    let data = this.model.rData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].completed = true;
        data[i].completed_at = new Date();
        break;
      }
    }
    this.model.wData(data);
  }
  
  uncomplete(id) {
    let data = this.model.rData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].completed = false;
        break;
      }
    }
    this.model.wData(data);
  }
  
  sortAsc(data) {
    let data2 = data.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    data2 = this.sortId(data2);
    return data2;
  }
  
  sortDsc(data) {
    let data2 = data.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    data2 = this.sortId(data2);
    return data2;
  }
  
  sortBy(data, sortType) {
    if (sortType == "asc") {
      let data2 = this.sortAsc(data);
      return data2;
    } else if (sortType == "desc") {
      let data2 = this.sortDsc(data);
      return data2;
    } else {
      let data2 = this.sortAsc(data);
      return data2;
    }
  }
  
  listOutstanding(sortType) {
    let data = this.model.rData();
    if (data.length > 0) {
      let data2 = this.sortBy(data, sortType);
      for (let i = 0; i < data.length; i++) {
        if (data2[i].completed === false) {
          console.log(`${data2[i].id}. [${data2[i].completed ? "X" : " "}] ${data2[i].task} Date created: ${data2[i].created_at}`);
        }
      }
    } else {
      console.log("Empty tasks");
    }
  }

  listCompleted(sortType, completed = true) {
    let data = this.model.rData();
    if (data.length > 0) {
      let data2 = this.sortBy(data, sortType);
      for (let i = 0; i < data.length; i++) {
        if (data2[i].completed === completed) {
          console.log(`${data2[i].id}. [${data2[i].completed ? "X" : " "}] ${data2[i].task} Date completed: ${data2[i].completed_at}`);
        }
      }
    } else {
      console.log("Empty tasks");
    }
  }

  

  filter(tag) {
    let data = this.model.rData();
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].tags.length; j++) {
        if (data[i].tags[j] === tag) {
          console.log(`${data[i].id}. ${data[i].task} [${data[i].tags}]`);
          break;
        }
      }
    }
  }

  rAct(id) {
    let data = this.model.rData();
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          console.log(`${data[i].id}. ${data[i].task}`);
        }
      }
      console.log(`Task dengan id : ${id} tidak ditemukan.`);
    }
  }

  run(param) {
    switch (param[0]) {
      case "help":
        this.view.help();
        break;
      case "list":
        this.list(this.model.rData());
        break;
      case "list:outstanding":
        this.listOutstanding(param[1]);
        break;
      case "list:completed":
        this.listCompleted(param[1]);
        break;
      case "add":
        param.shift();
        this.add(param.join(" "));
        break;
      case "task":
        this.rAct(param[1]);
        break;
      case "delete":
        this.deleting(param[1]);
        break;
      case "complete":
        this.Complete(param[1]);
        break;
      case "uncomplete":
        this.uncomplete(param[1]);
        break;
      case "tag":
        let paramCopy = param.slice("");
        paramCopy.shift();
        paramCopy.shift();
        this.addTag(param[1], paramCopy);
        break;
      case "filter:":
        this.filter(param[1]);
        break;
      default:
        this.view.help();
        break;
    }
  }
}

module.exports = Controller
