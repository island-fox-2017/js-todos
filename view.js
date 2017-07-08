"use strict"

class View {
  constructor() {

  }

  static showTheData(data) {
    for (let i = 0; i < data.length; i++) {
      console.log(`${i + 1}. [${data[i].complete?`X`:` `}] ${data[i].task}`);
    }
  }

  static showInsertedInfo(infoInserted) {
    console.log(infoInserted);
  }

  static showDeletedInfo(infoDeleted) {
    console.log(infoDeleted);
  }

  static showFinishedBurning(infoBurned) {
    console.log(infoBurned);
  }

  static showCompleteInfo(infoCompleted) {
    console.log(infoCompleted);
  }

  static showUncompleteInfo(infoUncompleted) {
    console.log(infoUncompleted);
  }

  static showSortedByCreationTime(creationSorted) {
    for (let i = 0; i < creationSorted.length; i++) {
      console.log(`${i + 1} ${creationSorted[i].task}`);
    }
  }

  static showSortedByCompletedTime(completedSorted) {
    for (let i = 0; i < completedSorted.length; i++) {
      console.log(`${i + 1} ${completedSorted[i].task}`);
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
}

module.exports = { View }
