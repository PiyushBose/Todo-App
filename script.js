const input = document.querySelector("#inp");

let todos = [];

input.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        addTodo();
    }
})

function addTodo(){
    if(document.querySelector("#inp").value){
        todos.push({
            title : document.querySelector("#inp").value
        });
        document.querySelector("#inp").value = '';
    }
    else{
        console.error("Error");
    }
    render();
}

function deleteTodo(idx){
    todos.splice(idx, 1);
    render();
}

function changeStatus(idx){
    const stat = document.querySelector(`#check${idx}`);
    if(stat.checked){
        stat.parentNode.childNodes[1].style.textDecoration = "line-through";
    }
    else{
        stat.parentNode.childNodes[1].style.textDecoration = "none";
    }
    
}

function updateTodo(idx){
    const edittedTask = document.createElement("div");
    edittedTask.classList.add("task");

    todos[idx] = {title : document.querySelector("#up-inp").value}

    document.querySelector("#up-inp").remove();
    document.querySelector(`#edit${idx}`).parentNode.childNodes[0].after(edittedTask);

    document.querySelector(`#edit${idx}`).innerHTML = "Edit";

    render();
}

function editTodo(idx){
    const toEdit = document.querySelector(`#edit${idx}`).parentNode.childNodes[1];
    const newInput = document.createElement("input");

    newInput.classList.add("upt-inp");
    newInput.setAttribute("id", "up-inp");
    newInput.value = toEdit.innerHTML;

    toEdit.remove();
    document.querySelector(`#edit${idx}`).parentNode.childNodes[0].after(newInput);
    document.querySelector(`#edit${idx}`).innerHTML = "Done";

    newInput.addEventListener("keypress", (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            updateTodo(idx);
        }
    })

    document.querySelector(`#edit${idx}`).setAttribute("onclick", `updateTodo(${idx})`);
    
}

function createComponent(todo, idx){
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    const task = document.createElement("div");
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `check${idx}`);
    checkbox.setAttribute("onclick", `changeStatus(${idx})`);

    editBtn.setAttribute("onclick", `editTodo(${idx})`);
    editBtn.setAttribute("id", `edit${idx}`);

    delBtn.setAttribute("onclick", `deleteTodo(${idx})`);

    editBtn.innerHTML = "Edit";
    delBtn.innerHTML = "Delete";
    task.innerHTML = todo.title;

    editBtn.classList.add("edit");

    delBtn.classList.add("del");

    checkbox.classList.add("check");

    div.style.display = "flex";

    task.classList.add("task");


    div.appendChild(checkbox);
    div.appendChild(task);
    div.appendChild(editBtn);
    div.appendChild(delBtn);

    return div;
}

function render(){
    document.querySelector("#root").innerHTML = '';
    let idx = 0;
    todos.forEach((todo)=>{
        const element = createComponent(todo, idx);
        document.querySelector("#root").appendChild(element);
        idx++;
    })
}