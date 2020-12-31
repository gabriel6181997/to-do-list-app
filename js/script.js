//Define parameter 
const button = document.getElementById('button');
const input = document.getElementById('myinput');
const ul = document.getElementById('myUL');
const li = ul.getElementsByTagName('li');

//click event for new list item
button.addEventListener('click',(e)=>{
  e.preventDefault();
  if(input.value !==''){

    //Input data
    const newli = document.createElement('li');
    newli.textContent = input.value;

    //Add(remove) class .checked to(from) new list item
    newli.addEventListener('click',()=>{
      newli.classList.toggle('checked');
    });

    //Back to data input
    ul.appendChild(newli);
    ul.insertAdjacentText = ('afterend', newli);
    input.value = "";

    //Create cross button for new list item
    const span = document.createElement('span');
    const cross = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(cross);
    newli.appendChild(span);
  } else{
    alert('タスクを入力してください');
  }
}); 

//Add(remove) class .checked to (from) old list item
for(let i=0; i<li.length; i++){
  li[i].addEventListener('click',(e)=>{
    e.preventDefault();
    //add .parentnode to ensure that .checked class is not added to span when the task is clicked
    const target = e.target.parentNode;
    target.classList.toggle('checked');
  });
};

//Create cross button for old list item
for(let u=0; u<li.length;u++){
  const span = document.createElement('span');
  const cross = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(cross);
  li[u].appendChild(span);
};








