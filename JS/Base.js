//Adding observer to have a shadow on nav on scroll
const navbarContainer = document.querySelector(".navbar-container")
const navbarTop = document.querySelector(".navbar-top")
const observer = new IntersectionObserver(
    ([e]) => {
        navbarContainer.classList.toggle("active-stucked", e.intersectionRatio < 1); //The second parameter can be used to determine whether the class is included or not. This example would include the class only if the element is sticked at top
    }, {
        threshold: [1]
    }
);
observer.observe(navbarTop);

//Showing action messages like success, error 
function showActionMessageFunc() {
    const newDiv = document.createElement("div");
    if (actionStatus == "error") {
        newDiv.className = "user-action-status-error user-action-status-container";
        newDiv.innerHTML = `<span class="message-icon"><i class="fa-solid fa-circle-exclamation"></i></span>
        <span class="message-text">${actionMessage}</span>
        <button><i class="fa-solid fa-xmark"></i></button>`;
    } else {
        newDiv.className = "user-action-status-success user-action-status-container";
        newDiv.innerHTML = `<span class="message-icon"><i class="fa-solid fa-circle-check"></i></span>
        <span class="message-text">${actionMessage}</span>
        <button><i class="fa-solid fa-xmark"></i></button>`;
    }
    document.querySelector("#user-action-status-messages").appendChild(newDiv);
    newDiv.querySelector("button").addEventListener('click', closingActionMessageFunc);
    setTimeout(() => {
        newDiv.remove()
    }, 4000);
}

//Closing func for action messages
function closingActionMessageFunc() {
    this.parentElement.remove();
}

let emojiDropdownBtn = document.querySelector(".emoji-dropdown-btn")
let emojiDropdown = document.querySelector(".emoji-dropdown")
emojiDropdownBtn.addEventListener('click', openEmojiDropDownFunc)
function openEmojiDropDownFunc(){
    if (emojiDropdown.style.display == "flex") {
        emojiDropdown.style.display = "none";
        this.classList.remove("active");
        document.body.removeEventListener('click', closeEmojiDropdownFunc)
    } else {
        emojiDropdown.style.display = "flex";
        this.classList.add("active")
        emojiDropdown.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        setTimeout(() => {
            document.body.addEventListener('click', closeEmojiDropdownFunc)
        }, 300);
    }
}

function closeEmojiDropdownFunc(e){
    let currentTarget = emojiDropdown.contains(e.target);
    if (!currentTarget) { //clikced outside of box
        emojiDropdown.style.display = "none";
        emojiDropdownBtn.classList.remove("active")
        document.body.removeEventListener('click', closeEmojiDropdownFunc)
    }
}

let emojiDropdownSpanTag = document.querySelectorAll(".emoji-dropdown button");
for (let i = 0; i < emojiDropdownSpanTag.length; i++) {
    emojiDropdownSpanTag[i].addEventListener('click', changingInputEmojiFunc)
}
function changingInputEmojiFunc(){
    emojiDropdownBtn.innerHTML = this.innerHTML;
    emojiDropdownBtn.style.fontSize = "18px";
    emojiDropdown.style.display = "none";
    emojiDropdownBtn.classList.remove("active")
    document.body.removeEventListener('click', closeEmojiDropdownFunc)
}

const todoInput =  document.querySelector(".todo-input");
const todoAddBtn =  document.querySelector(".todo-add-btn");
todoInput.addEventListener('input', todoInputValCheckFunc)
function todoInputValCheckFunc(){
    todoInput.value = todoInput.value.replace(/\s+/g, ' ');
    if (todoInput.value.replace(/\s+/g, ' ').trim() !== "") {
        todoAddBtn.style.display = "block";
    } else{
        todoAddBtn.style.display = "none";
    }
}


const toDoList = document.querySelector('.todo-list');
todoAddBtn.addEventListener('click', addToDo)
function addToDo() {
    if (todoInput.value.replace(/\s+/g, ' ').trim() == "") {
        actionStatus = "error";
        actionMessage = "Please write a task description";
        showActionMessageFunc();
        return
    } 
    if (!toDoList.querySelector(".added-task")) {
        toDoList.innerHTML = "";
    }
    // Create a task li
    const newTodo = document.createElement('li');
    newTodo.classList.add('added-task', 'd-flex', 'd-flex-just-cent');

    //Adding emoji
    if (!emojiDropdownBtn.querySelector("i")) {
        const newTodoEmoji = document.createElement('span');
        newTodoEmoji.innerHTML = emojiDropdownBtn.innerHTML;
        newTodoEmoji.classList.add('added-task-emoji', 'd-flex', 'd-flex-just-cent');
        newTodo.appendChild(newTodoEmoji);
    }
    const newTodoText = document.createElement('span');
    newTodoText.innerText = todoInput.value;
    newTodoText.classList.add('added-task-text');
    newTodo.appendChild(newTodoText);
    // check btn;
    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fa fa-check"></i>';
    checked.classList.add('check-btn');
    newTodo.appendChild(checked);
    checked.addEventListener('click', completeTaskFunc);
    // delete btn;
    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fa fa-trash"></i>';
    deleted.classList.add('delete-btn');
    newTodo.appendChild(deleted);
    deleted.addEventListener('click', deleteTaskFunc);
    // Append to list;
    toDoList.appendChild(newTodo);
    
    actionStatus = "success";
    actionMessage = "Task added successfully";
    showActionMessageFunc();

    // CLearing the input;
    todoInput.value = '';
    emojiDropdownBtn.innerHTML = `<i class="fa fa-smile-o"></i>`;
    emojiDropdownBtn.style.fontSize = "24px";
    todoAddBtn.style.display = "none";
}


function deleteTaskFunc() {
    this.parentElement.classList.add("fall");
    this.parentElement.addEventListener('animationend', function () {
        this.remove();
        actionStatus = "success";
        actionMessage = "Task has been removed successfully";
        showActionMessageFunc();
        if (!toDoList.querySelector(".added-task")) {
            toDoList.innerHTML = `<li>All caught up, no task to finish</li>`;
        }
    })
}
function completeTaskFunc() {
    this.parentElement.classList.toggle("completed-task");
    if (this.parentElement.classList.contains("completed")) {
        this.parentElement.classList.remove("completed");
        actionStatus = "success";
        actionMessage = "Task changes has been undone";
        showActionMessageFunc();
    } else {
        this.parentElement.classList.add("completed");
        actionStatus = "success";
        actionMessage = "Task has been completed, Hurray!";
        showActionMessageFunc();
    }
}