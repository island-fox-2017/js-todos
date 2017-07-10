"use strict"

const {Model} = require("./model.js");
const {View} = require("./view.js");
let fs = require('fs');

class Controller {
  constructor() {
  }

  getData() {
    let ambilData = new Model();
    let data = ambilData.dataFile();
    View.showData(data);
  }

  getDataDetail(task_id) {
    let ambilDataTask = new Model();
    let dataTask = ambilDataTask.dataFileDetail(task_id);
    View.showDataTask(dataTask,task_id);
  }

  insertData(inputTask) {
    let tambahData = new Model();
    tambahData.data = tambahData.dataFile();
    tambahData.insertData({task: inputTask, complete: false, time_created: new Date(), time_completed: false, tag: []});
    tambahData.saveToFile();
    View.successTambahData(`${inputTask} berhasil ditambahkan`);
  }

  deleteTask(task_id) {
    task_id = parseInt(task_id);
    if (!Number.isInteger(task_id)) {
      Controller.falseInput();
      return false;
    }
    task_id -= 1;

    let deleteData = new Model();
    deleteData.data = deleteData.dataFile();
    let isCanDelete = deleteData.deleteData(task_id);

    if (isCanDelete) {
      deleteData.saveToFile();
      View.successHapusData(`Task nomor ${task_id+1} sudah dihapus dari daftar list to do`);
    }
  }

  hapusSemuaData() {
    let hapusSemuanya = new Model();
    hapusSemuanya.hapusSemuaDataDariFile();
    View.successHapusSemua(`Semua data telah dihapus. Daftar telah kosong`);
  }

  completeTask(task_id) {
    task_id = parseInt(task_id);
    if (!Number.isInteger(task_id)) {
      Controller.falseInput();
      return false;
    }
    task_id -= 1;

    let completeTaskId = new Model();
    completeTaskId.dataFile();
    let isCanComplete = completeTaskId.changeToComplete(task_id);

    if (isCanComplete) {
      completeTaskId.saveToFile();
      View.successCompleteTask(`Task nomor ${task_id+1} sudah selesai`);
    }
  }

  uncompleteTask(task_id) {
    task_id = parseInt(task_id);
    if (!Number.isInteger(task_id)) {
      Controller.falseInput();
      return false;
    }
    task_id -= 1;

    let uncompleteTaskId = new Model();
    uncompleteTaskId.dataFile();
    let isCanUncomplete = uncompleteTaskId.changeToUncomplete(task_id);

    if (isCanUncomplete) {
      uncompleteTaskId.saveToFile();
      View.successUncompleteTask(`Task nomor ${task_id+1} diubah menjadi belum selesai`);
    }
  }

  sortTasksByCreationTime(ascAtauDes) {
    let sortCreate = new Model();
    sortCreate.dataFile();
    sortCreate.sortDataByCreationTime(ascAtauDes);
    sortCreate.saveToFile();

    View.showSortedByCreationTime(sortCreate.data);
  }

  sortTasksByCompletedTime(ascAtauDes) {
    let sortCompleted = new Model();
    sortCompleted.dataFile();
    sortCompleted.sortDataByCompletedTime(ascAtauDes);
    sortCompleted.saveToFile();

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
    tagging.dataFile();
    tagging.tagData(specificId, tag);
    tagging.saveToFile();
  }

  filterTask(specific) {
    let filtering = new Model();
    filtering.dataFile();
    let filtered = filtering.data;
    View.showFilteredList(filtered, specific);
  }

  static falseInput() {
    View.showAlertFalseInput("Maaf command salah");
  }

  static help() {
    View.showHelp("-------------------------------------------------- HELP --------------------------------------------------");
    View.showHelp("Ini adalah program Todo list");
    View.showHelp("1. Command <help> untuk bantuan memakai aplikasi ini");
    View.showHelp("2. Command <list> untuk melihat semua task yang ada di to do list.");
    View.showHelp("3. Command <detail><spasi><nomor task nya> untuk melihat detail task tertentu");
    View.showHelp("4. Command <add><spasi><isi task to do nya> untuk menambahkan tugas ke dalam to do list");
    View.showHelp("5. Command <delete><spasi><nomor task nya> untuk menghapus task tertentu dari to do list");
    View.showHelp("6. Command <delete:all> untuk menghapus semua task dari to do list");
    View.showHelp("7. Command <complete><spasi><nomor task nya> untuk merubah status menjadi selesai dari task tertentu");
    View.showHelp("8. Command <uncomplete><spasi><nomor task nya> untuk merubah status menjadi belum selesai dari task tertentu");
    View.showHelp("9. Command <list:completed> untuk melihat task-task yang sudah terselesaikan dari daftar.");
    View.showHelp("10. Command <list:outstanding> untuk melihat task-task yang belum terselesaikan dari task tertentu");
    View.showHelp("11. Command <tag><spasi><nomor tasknya><spasi><nama tagnya> untuk memberikan tag ke dalam task tertentu");
    View.showHelp("12. Command <filter><:><nama tagnya> untuk melihat task-task yang sesuai dengan tag tertentu");
    View.showHelp("----------------------------------------------------------------------------------------------------------");
  }
}

module.exports = {
  Controller
}
