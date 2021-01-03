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
  liJSON.append(task.title);
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
    const taskJSON = createTask(task);
    ul.appendChild(taskJSON);
  });
}

//Click event for each new list item
async function addTask(e) {
  e.preventDefault();
  const title = input.value;

  if(input.value ==''){
    alert("タスクを入力してください!");
    return;
  }
  
  try{
    const data = {
      userId: 1,
      id: 1,
      completed: true,
      title:title,
    };

    const res = await window.fetch(
      "https://jsonplaceholder.typicode.com/todos",
      { method:"POST",
        title: JSON.stringify(data),
        headers:{
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    //Input data
    const task = await res.json();
    const taskJSON = createTask(task);
    ul.prepend(taskJSON);  //NEED to CHECK FROM HERE
    const newli = document.createElement('li');
    newli.textContent = input.value;
    
    //Add(remove) class .checked to(from) each new list item
    newli.addEventListener('click',()=>{
      newli.classList.toggle('checked');
    });
    
    //Back to data input
    ul.appendChild(newli);
    ul.insertAdjacentText = ('afterend', newli);
    input.value = "";  //TILL HERE
    
    //Create cross button for each new list item
    const span = document.createElement('span');
    //Add liDelete function // Element.setAttribute("CSS property", "function name")
    span.setAttribute("onclick","liDelete(this)");
    //Back to the creation of cross button
    const cross = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(cross);
    newli.appendChild(span);
  } catch(error) {
    //error message
    alert("データ送信に失敗しました。時間が経ってから再度お試しください。")
  }
     
}; 
    
button.addEventListener('click', addTask);
  
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













