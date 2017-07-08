'use strict'

let Model = require('./model')
let View = require('./view')

class Controller {
  constructor() {
    this._model = new Model();
    this._view = new View();
  }
  
  executeMenu(option, contentOrID, tag1, tag2) {
    let data = this._model.readData();
    let status = false;
    let createDate = new Date();
    let completedDate = new Date();
    
    if (option == "help") {
      return this._view.displayHelp();
      
    } else if (option === "list") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else {
        return this._view.displayList(data);
      }
      
    } else if (option === "add") {
      this._model.addData(data, contentOrID, status, createDate);
      return this._view.displayAdd(contentOrID);
      
    } else if (option === "task") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID > data.length) {
        return this._view.displayError(2);
      } else {
        return this._view.displayTask(data, contentOrID);
      }
      
    } else if (option === "delete") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID > data.length) {
        return this._view.displayError(2);
      } else {
        this._view.displayDelete(data, contentOrID);
        return this._model.deleteData(data, contentOrID);
      }
      
    } else if (option === "tag") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID > data.length) {
        return this._view.displayError(2);
      } else if (option != "") {
        this._view.displayTag2(data, contentOrID, tag1, tag2);
        return this._model.addTag2(data, contentOrID, tag1, tag2);
      } else {
        this._view.displayTag(data, contentOrID, tag1);
        return this._model.addTag(data, contentOrID, tag1);
      }
      
    } else if (option === "completed") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID > data.length) {
        return this._view.displayError(2);
      } else {
        status = true;
        this._model.markCompleted(data, contentOrID, status, completedDate);
        return this._view.displayCompleted(data, contentOrID);
      }
      
    } else if (option === "uncomplete") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID > data.length) {
        return this._view.displayError(2);
      } else {
        this._model.markUncomplete(data, contentOrID, status);
        return this._view.displayUncomplete(data, contentOrID);
      } 
           
    } else if (option === "list:outstanding") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID === "desc") {
        return this._view.displayOutstandingDesc(data);
      } else {
        return this._view.displayOutstanding(data);
      }
      
    } else if (option == "list:completed") {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else if (contentOrID == "desc") {
        return this._view.displayCompletedDesc(data);
      } else {
        return this._view.displayCompletedAsc(data);
      }
      
    } else if (option.includes("filter")) {
      if (data.length === 0) {
        return this._view.displayError(1);
      } else {
        let tag = option.slice(7);
        return this._view.displayFilter(data, tag);
      }
      
    } else {
      return this._view.displayError(3);
    }
  }
}

module.exports = Controller
