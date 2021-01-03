//Define parameter for all functions
const button = document.getElementById('button');
const input = document.getElementById('myinput');
const ul = document.getElementById('myUL');
const li = ul.getElementsByTagName('li');

//Get data from JSON file (WebAPI)
window.addEventListener("load", getTasks);
async function getTasks() {
  try{
    const res = await fetch("https://jsonplaceholder.typicode.com/todos",{
      method: "GET",
    });
    const tasks = await res.json();
    return tasks;
  } catch(error){
    alert("読み込みに失敗しました。時間が経ってから再度お試しください。");
  }
}

//Define function createTask(task)
function createTask(task){
  const liJSON = document.createElement("li");
  const spanJSON = document.createElement("span");
  const crossJSON = document.createTextNode("\u00D7");
  spanJSON.className = "close";
  spanJSON.appendChild(crossJSON);
  liJSON.appendChild(spanJSON);
  liJSON.textContent = task.title;
  //Add iDelete function
  spanJSON.setAttribute("onclick","liDelete(this)");
  // console.log(spanJSON);
  return liJSON;
}

//Create Tasks by using data from JSON file
window.addEventListener("load", createTasks);
async function createTasks(){
  const tasks = await getTasks();
  tasks.forEach(function(task){
    // console.log(task);
    const taskJSON = createTask(task);
    // console.log(taskJSON);
    ul.appendChild(taskJSON);
  });
}

//Click event for each new list item
button.addEventListener('click',(e)=>{
  e.preventDefault();
  if(input.value !==''){
    //Input data
    const newli = document.createElement('li');
    newli.textContent = input.value;
    
    //Add(remove) class .checked to(from) each new list item
    newli.addEventListener('click',()=>{
      newli.classList.toggle('checked');
    });
    
    //Back to data input
    ul.appendChild(newli);
    ul.insertAdjacentText = ('afterend', newli);
    input.value = "";
    
    //Create cross button for each new list item
    const span = document.createElement('span');
    //Add liDelete function // Element.setAttribute("CSS property", "function name")
    span.setAttribute("onclick","liDelete(this)");
    //Back to the creation of cross button
    const cross = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(cross);
    newli.appendChild(span);
    
  } else{
      alert('タスクを入力してください');
    }
  }); 
  
  
  //Create cross button for each old list item
  for(let u=0; u<li.length;u++){
    const span = document.createElement('span');
    const cross = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(cross);
    li[u].appendChild(span);
    //Add iDelete function
    span.setAttribute("onclick","liDelete(this)");
    //Add(remove) class .checked to (from) each old list item
    // li.setAttribute("onclick","liChecked(this)");
  };
  
  //Define liDelete function
  function liDelete(e){
    e.parentNode.remove();
  }

  //Define liChecked function
  // function liChecked(e){
  //   e.preventDefault();
  //   const target = e.target;
  //   target.classList.toggle('checked');
  // }
  
//Add(remove) class .checked to (from) each old list item (REFACTORING IS REQUIRED)
  for(let i=0; i<li.length; i++){
    li[i].addEventListener('click',(e)=>{
      e.preventDefault();
      /// Use .nodeName to ensure that class .checked can be added to list tag only
      if(e.target.nodeName === 'LI') {
        const target = e.target;
        target.classList.toggle('checked');      
      }
    });
 }













