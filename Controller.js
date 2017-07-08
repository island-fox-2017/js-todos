'use strict'
const fs = require('fs');

const {Model} = require("./Model.js")
const {View} = require("./View.js")


class Controller{
  constructor(){
    this.view = new View();
    this.model = new Model('data.json');
  }

  callGetData(){
    let data = this.model.parseFile();
    this.view.viewData(data);
  }

  callAddData(data){
    this.model.addData(data);
    this.model.writeData();
  }

  callDeleteData(id){
    this.model.deleteData(id);
    this.model.writeData();
  }

  callToggleTask(id){
    this.model.toggleTask(id);
    this.model.writeData();
  }

  callCompleteTask(id){
    this.model.completeTask(id);
    this.model.writeData();
  }

  callUncompleteTask(id){
    this.model.uncompleteTask(id);
    this.model.writeData();
  }

  callTaskDetail(id){
    let data = this.model.parseFile();
    this.view.taskDetail(id, data);
  }

  callHelp(){
    this.view.help();
  }

}

module.exports = {
  Controller
}
