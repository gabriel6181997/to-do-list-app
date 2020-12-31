//Define parameter 
const button = document.getElementById('button');
const input = document.getElementById('myinput');
const ul = document.getElementById('myUL');
const li = ul.getElementsByTagName('li');


//Create a delete button and append it to each list item



//Input data and add/remove class .checked to (from) new list item
button.addEventListener('click',(e)=>{
  e.preventDefault();
  if(input.value !==''){
    const newli = document.createElement('li');
    newli.textContent = input.value;
    newli.addEventListener('click',()=>{
      newli.classList.toggle('checked');
    });
    ul.appendChild(newli);
    ul.insertAdjacentText = ('afterend', newli);
    input.value = "";
  } else{
    alert('タスクを入力してください');
  }
}); 

//Add/remove class .checked to (from) old list item
for(let i=0; i<li.length; i++){
  li[i].addEventListener('click',(e)=>{
  e.preventDefault();
  const target = e.target;
  target.classList.toggle('checked');
  });
};






