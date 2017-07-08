'use strict'

class View{
  constructor(){

  }

  viewData(data){
    for(let i = 0; i < data.length; i++)
    {
      let status = '[ ]';
      if(data[i].status == true)
      {
        status = '[x]'
      }
      console.log(`${i+1}. ${status} tugas hari ini: ${data[i].task}`);
    }
  }

  taskDetail(id, data){
      let status = '[ ]';
      if(data[id].status == true)
      {
        status = '[x]'
      }
      console.log(`${id+1}. ${status} tugas hari ini: ${data[id].task}`);
  }

  viewDataDate(data){
    
  }

  help(){
    console.log('ketik "list" untuk melihat semua to do list');
    console.log('ketik "add"<spasi><text> untuk menambahkan task baru');
    console.log('ketik "task"<spasi><id> untuk melihat detail task');
    console.log('ketik "delete"<spasi><id> untuk mendelete task');
    console.log('ketik "complete"<spasi><id> untuk menandai task complete');
    console.log('ketik "uncomplete"<spasi><id> untuk menandai task uncomplete');
  }

}

module.exports = {
  View
}
