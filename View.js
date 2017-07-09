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

  viewDataDate(data, param){
    if(param == 'asc')
    {
      let asc = data.sort((a,b) => new Date(b.createAt) < new Date(a.createAt));
      this.viewData(asc);
    }
    else if(param == 'desc')
    {
      let desc = data.sort((a,b) => new Date(b.createAt) > new Date(a.createAt));
      this.viewData(desc);
    }
    else
    {
      this.viewData(data);
    }
  }

  viewCompleteList(data){
    for(let i = 0; i < data.length; i++)
    {
      if(data[i].status == true)
      {
        console.log(`${i+1}. [x] tugas hari ini: ${data[i].task}`);
      }
    }
  }

  viewTaggedData(key, data){
    for(let i = 0; i < data.length; i ++)
    {
      if(data[i].tag.includes(key))
      {
        console.log(`${i+1}. ${data[i].task} [${data[i].tag.join(', ')}]`);
      }
    }
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
