"use strict"

const {Model} = require("./model.js");
const {View} = require("./view.js");
let fs = require('fs');

class Controller {
  constructor() {

  }

  showData() {
    let fetchData = new Model();
    let datafetched = fetchData.theData();
    View.showTheData(datafetched);
  }

  insertData(specific) {
    let addData = new Model();
    addData.data = addData.theData();
    addData.insertData({task: specific, complete: false, time_created: new Date(), time_completed: false, tag: []});

    let inserted = addData.saveToData();
    View.showInsertedInfo('The file has been saved!');
  }

  deleteTask(specific) {
    // Change specific input to integer, and check if it's actually a number
    specific = parseInt(specific);
    if (!Number.isInteger(specific)) {
      Controller.falseInput();
      return false;
    }
    specific -= 1;

    let del = new Model();
    del.data = del.theData();
    let delCheck = del.deleteData(specific);

    if (delCheck) {
      del.saveToData();
      View.showDeletedInfo(`The task has been deleted!`);
    } else { View.showDeletedInfo('Nothing to delete! :('); }
  }

  burnThemAll(specific) {
    let del = new Model();
    del.data = del.theData();

    del.burnThemAll();
    View.showFinishedBurning('All the file has been burned down to ashes!');
  }

  completeTask(specific) {
    specific = parseInt(specific);
    if (!Number.isInteger(specific)) {
      Controller.falseInput();
      return false;
    }
    specific -= 1;

    let compl = new Model();
    compl.theData();
    let completeCheck = compl.completeData(specific);

    if (completeCheck) {
      compl.saveToData();
      View.showCompleteInfo(`Task has been completed!`);
    } else { View.showCompleteInfo(`Can't be completed!`); }
  }

  uncompleteTask(specific) {
    specific = parseInt(specific);
    if (!Number.isInteger(specific)) {
      Controller.falseInput();
      return false;
    }
    specific -= 1;

    let uncompl = new Model();
    uncompl.theData();
    let uncompleteCheck = uncompl.uncompleteData(specific);

    if (uncompleteCheck) {
      uncompl.saveToData();
      View.showUncompleteInfo(`Task has been uncompleted!`);
    } else { View.showUncompleteInfo(`Can't be uncompleted!`); }
  }

  sortTasksByCreationTime(ascendOrDescend) {
    let sortCreate = new Model();
    sortCreate.theData();
    sortCreate.sortDataByCreationTime(ascendOrDescend);
    sortCreate.saveToData();

    View.showSortedByCreationTime(sortCreate.data);
  }

  sortTasksByCompletedTime(ascendOrDescend) {
    let sortCompleted = new Model();
    sortCompleted.theData();
    sortCompleted.sortDataByCompletedTime(ascendOrDescend);
    sortCompleted.saveToData();

    View.showSortedByCompletedTime(sortCompleted.data);
  }

  tagTask(specific) {
    let specificId = parseInt(specific[0]);
    if (!Number.isInteger(specificId)) {
      Controller.falseInput();
      return false;
    }
    specificId -= 1;
    let tag = specific.split(' ').splice(1);

    let tagging = new Model();
    tagging.theData();
    tagging.tagData(specificId, tag);
    tagging.saveToData();
  }

  filterTask(specific) {
    let filtering = new Model();
    filtering.theData();
    let filtered = filtering.data;
    View.showFilteredList(filtered, specific);
  }

  static falseInput() {
    View.showAlertFalseInput("That's a wrong input!");
  }
}

module.exports = { Controller }
