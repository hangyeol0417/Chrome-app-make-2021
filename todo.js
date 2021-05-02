const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishedList = document.querySelector(".js-finishesList");

const TODOS_LS = 'toDos';
const FINIISHED_LS = "finished"


let toDos = [];
let finished = [];

function checkToDo(event) {
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const text = li.children[0].innerText;
    paintToDo(text);
    deleteFinished(event);
}

function finishedToDo(event) {
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const text = li.children[0].innerText;
    paintFinished(text);
    deleteToDo(event);
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    finishedList.removeChild(li);
    const cleanToDos = finished.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finished = cleanToDos;
    finishedToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function finishedToDos() {
    localStorage.setItem(FINIISHED_LS, JSON.stringify(finished));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const fihBtn = document.createElement("button");
    const span = document.createElement("span");
    const div = document.createElement("div")
    const newId = toDos.length + 1;
    delBtn.addEventListener("click", deleteToDo);
    delBtn.innerHTML = "X";
    fihBtn.addEventListener("click", finishedToDo);
    fihBtn.innerHTML = "#";
    span.innerText = text
    li.appendChild(span);
    li.appendChild(div)
    div.appendChild(delBtn);
    div.appendChild(fihBtn);
    li.id = newId
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintFinished(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const fihBtn = document.createElement("button");
    const span = document.createElement("span");
    const div = document.createElement("div")
    const newId = finished.length + 1;
    delBtn.addEventListener("click", deleteFinished);
    delBtn.innerHTML = "X";
    fihBtn.addEventListener("click", checkToDo);
    fihBtn.innerHTML = "<";
    span.innerText = text
    li.appendChild(span);
    li.appendChild(div)
    div.appendChild(delBtn);
    div.appendChild(fihBtn);
    li.id = newId
    finishedList.appendChild(li);
    const finishedbj = {
        text: text,
        id: newId
    };
    finished.push(finishedbj);
    finishedToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS)
    const loadedfinished = localStorage.getItem(FINIISHED_LS)
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
    if (loadedfinished !== null) {
        const parsedFinished = JSON.parse(loadedfinished);
        parsedFinished.forEach(function(finished) {
            paintFinished(finished.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();