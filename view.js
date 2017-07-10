"use strict"

class View {
  constructor() {
  }

  static showData(data) {
    if (data.length == 0) {
      console.log("Daftar list masih kosong");
    } else {
      for (let i = 0; i < data.length; i++) {
        console.log(`${i + 1}. [${data[i].complete?`V`:` `}] ${data[i].task}`);
      }
    }
  }

  static showDataTask(data,task_id) {
    if (data.length == 0) {
      console.log("Daftar list masih kosong");
    } else {
      if (data.complete) {
        console.log(`${task_id}. ${data.task}. Status: Sudah selesai. Tag: ${data.tag}`);
      } else {
        console.log(`${task_id}. ${data.task}. Status: Belum selesai. Tag: ${data.tag}`);
      }

    }
  }

  static successTambahData(success) {
    console.log(success);
  }

  static successHapusData(success) {
    console.log(success);
  }

  static successHapusSemua(success) {
    console.log(success);
  }

  static successCompleteTask(success) {
    console.log(success);
  }

  static successUncompleteTask(success) {
    console.log(success);
  }

  static showSortedByCreationTime(creationSorted) {
    for (let i = 0; i < creationSorted.length; i++) {
      if (creationSorted[i].complete == false) {
        console.log(`${i+1} ${creationSorted[i].task}`);
      }
    }
  }

  static showSortedByCompletedTime(completedSorted) {
    for (let i = 0; i < completedSorted.length; i++) {
      if (completedSorted[i].complete) {
        console.log(`${i+1} ${completedSorted[i].task}`);
      }
    }
  }

  static showFilteredList(filteredList, specific) {
    for (let i = 0; i < filteredList.length; i++) {
      if (filteredList[i].tag.includes(specific)) {
        console.log(`${i + 1} ${filteredList[i].task} [ ${filteredList[i].tag.join(', ')} ]`);
      }
    }
  }

  static showAlertFalseInput(infoFalseInput) {
    console.log(infoFalseInput);
  }

  static showHelp(infoHelp) {
    console.log(infoHelp);
  }
}

module.exports = {
  View
}
