'use strict'

class View {
  constructor() {
    
  }
  
  displayHelp() {
    console.log("\n===============================================================================");
    console.log("                                   HELP MENU :"                                   );
    console.log("\n===============================================================================");
    console.log("Type one of below command :");
    console.log("     'list'                                              Showing all ToDo lists");
    console.log("     'add'         <task_content>                        Adding new task");
    console.log("     'task'        <task_id>                             Show task by ID");
    console.log("     'delete'      <task_id>                             Delete task by ID");
    console.log("     'tag'         <task_id> <tag_name1> <tag_name2>     Adding tag to task by ID");
    console.log("     'completed'   <task_id>                             Mark task as completed");
    console.log("     'uncomplete'  <task_id>                             Mark task as uncomplete");
    console.log("     'list:outstanding' asc || desc                      Showing all list based on created date order by asc or desc");
    console.log("     'list:completed'   asc || desc                      Showing all completed list order by asc or desc");        
  }
  
  displayList(data) {
    return data.forEach((element, index) => {
      if (element.completed == true) {
        console.log(`${index + 1}. [x] ${element.task}`);
      } else {
        console.log(`${index + 1}. [ ] ${element.task}`);
      }
    });
  }
  
  displayAdd(taskContent) {
    console.log(`Task "${taskContent}" has been successfully added`);
  }
  
  displayTask(data, taskID) {
    let id = Number(taskID - 1);
    console.log(data[id]["task"]);
  }
  
  displayDelete(data, taskID) {
    let id = Number(taskID - 1);
    let taskName = data[id]["task"];
    console.log(`Task "${taskName}" has been successfully removed`);
  }
  
  displayTag(data, taskID, tag1) {
    let id = Number(taskID - 1);
    let taskName = data[id]["task"];
    console.log(`Tagged task "${taskName}" with tag: ${tag1}`);
  }
  
  displayTag2(data, taskID, tag1, tag2) {
    let id = Number(taskID - 1);
    let taskName = data[id]["task"];
    console.log(`Tagged task "${taskName}" with tags: ${tag1}, ${tag2}`);
  }
  
  displayCompleted(data, taskID) {
    let id = Number(taskID - 1);
    let taskName = data[id]["task"];
    console.log(`Task "${taskName}" has been successfully marked as completed`);
  }
  
  displayUncomplete(data, taskID) {
    let id = Number(taskID - 1);
    let taskName = data[id]["task"];
    console.log(`Task "${taskName}" has been successfully marked as uncomplete`);
  }
  
  displayOutstanding(data) {
    let filter = data.filter((element) => element["completed"]);
    let sorting = filter.sort((a, d) => a["completed_date"] > d["completed_date"]);
    console.log("Sorting by ascending :");;
    return sorting.forEach((element, index) => console.log(`${index + 1}. ${element["task"]}`));
  }
  
  displayOutstandingDesc(data) {
    let sorting = data.sort((a, d) => a["created_date"] < d["created_date"]);
    console.log("Sorting by descending :");
    return sorting.forEach((element, index) => console.log(`${index + 1}. ${element["task"]}`));
  }
  
  displayCompletedAsc(data) {
    let filter = data.filter((element) => element["completed"]);
    let sorting = filter.sort((a, d) => d["completed_date"] < a["completed_date"]);
    console.log("Sorting by ascending :");
    return sorting.forEach((element, index) => console.log(`${index + 1}. ${element["task"]}`));
  }
  
  displayCompletedDesc(data) {
    let filter = data.filter((element) => element["completed"]);
    let sorting = filter.sort((a, d) => a["completed_date"] < d["completed_date"]);
    console.log("Sorting by descending");
    return sorting.forEach((element, index) => console.log(`${index + 1}. ${element["task"]}`));
  }
  
  displayFilter(data, tag) {
    let filter = data.filter((element) => {
      if (element.hasOwnProperty("tag") && element["tag"].includes(tag)) {
        return element;
      }
      filter.forEach((element, index) => console.log(`${index + 1}. ${element["task"]} ${element["tag"]}`));
    })
  }
  
  displayError(error) {
    if (error === 1) {
      console.log("Todo List Empty!");
    } else if (error === 2) {
      console.log("ID Not Found, Please Correct Your Input");
    } else if (error === 3) {
      console.log("Command Not Found! type 'help' for Command List");
    }
  }
}

module.exports = View