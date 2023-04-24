const form = document.querySelector(".form");
const input = document.querySelector(".input");
const addBtn = document.querySelector(".btn");
const section = document.querySelector(".section");
const list = document.querySelector(".list");
const fullDate = document.querySelector(".header__date");
const hour_title = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal__form");
const modalInput = document.querySelector(".modal__input");
const modalClose = document.querySelector(".modal__close");

let editItemId 


let data = JSON.parse(localStorage.getItem("task"))
  ? JSON.parse(localStorage.getItem("task"))
  : [];

if(data.length) renderTask();

//set todos
function setTodos() {
  localStorage.setItem("task", JSON.stringify(data));
}

//show error massage
function showMassage(where, massage) {
  document.getElementById(`${where}`).textContent = massage;
  setTimeout(() => {
    document.querySelector(`${where}`).textContent = "";
  }, 2500);
}



//time function
function getTime(){
    const now = new Date();
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth();
    const year = now.getFullYear();
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    const months = [
        'jan',
        'feb',
        'march',
        'apr',
        'may',
        'june',
        'july',
        'aug',
        'sept',
        'oct',
        'nov',
        'dec'
    ]
    const month_title = now.getMonth();
    fullDate.textContent = `${date} ${months[month_title]}, ${year}`

    hour_title.textContent = hour;
    minute.textContent = minutes;
    second.textContent = seconds;
    return `${hour}:${minutes}, ${date}.${month}.${year}`;
}
setInterval(getTime, 1000)



//show todos
function renderTask() {
  const data = JSON.parse(localStorage.getItem("task"));
 list.innerHTML = "";
  data.forEach((item, i) => {
    list.innerHTML += `<li onclick="setCompleted(${i})" class="item ${item.completed == true ? 'completed' : ''}">
        <p class="todo">${item.text}</p>
        <div class="btns">
        <span class="time">${item.time}</span>
          <button onclick=(editTodo(${i})) class="edit__btn">edit</button>
          <button onclick=(deleteTodo(${i})) class="delete__btn">delete</button>
        </div>
        </li>
        `;
  });
}

//form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let todoText = input.value.trim();
  console.log(todoText);
  form.reset();
  if (todoText.length) {
    data.push({ text: todoText,time:getTime(), id: new Date().getTime(), completed: false });
    console.log(data);
    setTodos();
    renderTask();
  } else {
    showMassage("error__text", "Please enter some task");
  }
  todoText = "";
});

//delete todo
function deleteTodo(id){
    const deletedTodos = data.filter((item, i)=>{
        return i !== id
    })
    console.log(deletedTodos);
    data = deletedTodos;
    setTodos();
    renderTask();
}

//set completed
function setCompleted(id){
    const completedTodos = data.map((item, i)=>{
        if(id == i){
            return {...item, completed: item.completed == true ? false : true}
        }else{
            return {...item}
        }
    })
    data = completedTodos
    setTodos()
    renderTask()
}

//edit form
modalForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let todoText = modalInput.value.trim();
    modalForm.reset();
    if (todoText.length) {
      data.splice(editItemId, 1, { text: todoText,time:getTime(), id: new Date().getTime(), completed: false });
      setTodos();
      renderTask();
      close();
    } else {
      showMassage("error__text", "Please enter some task");
    }
    todoText = "";

})

modalClose.addEventListener("click", close);

//edit todo
function editTodo(id){
open()
editItemId = id
}
function open(){
    modal.classList.remove("hidden")
}
function close(){
    modal.classList.add("hidden")
}
