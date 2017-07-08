'use strict'
const {Controller} = require("./Controller.js")

let cont = new Controller();
let args = process.argv;



switch(args[2])
{
  case 'list':
    cont.callGetData();
  break;
  case 'add':
    let task = [];
    for(let i = 3; i < args.length; i++)
    {
      task.push(args[i]);
    }
    cont.callAddData(task.join(' '))
  break;
  case 'delete':
    cont.callDeleteData(args[3]-1);
  break;
  case 'task':
    cont.callTaskDetail(args[3]-1);
  break;
  case 'help':
    cont.callHelp();
  break;
  case 'complete':
    cont.callCompleteTask(args[3]-1);
  break;
  case 'uncomplete':
    cont.callUncompleteTask(args[3]-1);
  break;
  default:
    'menu tidak ada';
  break;
}

// if(args[2] == 'list')
// {
//   cont.callGetData();
// }
// else if(args[2] == 'add')
// {
//
// }
// else if(args[2] == 'delete')
// {
//   cont.callDeleteData(args[3]-1);
// }
// else if(args[2] == 'task')
// {
//   cont.callToggleTask(args[3]-1);
// }
// else if(args[2] == 'help')
// {
//   cont.callHelp();
// }
// else
// {
//   console.log('menu tidak ada');
// }
