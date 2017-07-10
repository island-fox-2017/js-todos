"use strict"

const {Controller} = require("./controller.js");

let args = process.argv.slice(2);
let task = args[0];
let ascAtauDes = args[0];
let inputTask = args.splice(1).join(' ');

if (task === 'help') {
  Controller.help();
} else if (task === 'list') {
  let showList = new Controller();
  showList.getData();
} else if (task === 'detail' && inputTask) {
  let detailData = new Controller();
  detailData.getDataDetail(inputTask);
} else if (task === 'add') {
  let tambahData = new Controller();
  tambahData.insertData(inputTask);
} else if (task === 'delete' && inputTask) {
  let hapusData = new Controller();
  hapusData.deleteTask(inputTask);
} else if (task === 'delete:all') {
  let hapusSemua = new Controller();
  hapusSemua.hapusSemuaData();
} else if (task === 'complete' && inputTask) {
  let complete = new Controller();
  complete.completeTask(inputTask);
} else if (task === 'uncomplete' && inputTask) {
  let uncomplete = new Controller();
  uncomplete.uncompleteTask(inputTask);
} else if (task === 'list:completed') {
  let SortCompleted = new Controller();
  SortCompleted.sortTasksByCompletedTime(ascAtauDes);
} else if (task === 'list:outstanding') {
  let SortCreate = new Controller();
  SortCreate.sortTasksByCreationTime(ascAtauDes);
} else if (task === 'tag') {
  let Tag = new Controller();
  Tag.tagTask(inputTask);
} else if (task.split(':')[0] === 'filter') {
  let filtering = new Controller();
  filtering.filterTask(task.split(':')[1]);
} else {
  Controller.falseInput();
}
