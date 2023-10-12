

// const backlogs = []
const todo = []
// const inProgress = []
// const done = []

const taskName = document.getElementById("taskName")
const taskStatus = document.getElementById("taskStatus")
const addTaskBtn = document.getElementById("addTaskBtn")

const form = document.getElementById("formTask")



function addNewTask() {
    const newTask = {
        taskID: Date.now(),
        name: taskName.value,
        status: taskStatus.value
    }

    // newTask.status === "todo" ? todo.push(newTask) : (newTask.status === "inprogress" ? inProgress.push(newTask) : (newTask.status === "done" ? done.push(newTask) : backlogs.push(newTask)))

    todo.push(newTask)
    

    taskName.value = ""
    taskStatus.value = "backlog"
    // console.log(backlogs)
    console.log(todo)
    // console.log(inProgress)
    // console.log(done)

    //display the tasks depending on their status values

    
    function displayTodo() {
        const card = document.createElement("div");
        card.setAttribute("draggable", "true");
        card.setAttribute("id", newTask.taskID)
        card.classList.add("card", "new-task-card");

        const p = document.createElement("p");
        for (let i = 0; i < todo.length; i++) {
            p.textContent = todo[i].name;
        }
        // const newPcontent = p.textContent = todo[0].name;
        card.appendChild(p);

        const newTaskBox = document.querySelector(`.${newTask.status}`)
        newTaskBox.appendChild(card);

    }

    if (todo.length > 0) {
        displayTodo()
    }



    function dragStart(e) {
        console.log("dragging")
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add("hide")
        })
    }

    const cardTasks = document.querySelectorAll(".card");
    const box = document.querySelectorAll(".box");

    cardTasks.forEach(card => card.addEventListener("dragstart", dragStart));

    box.forEach(box => {
        box.addEventListener('dragenter', dragEnter)
        box.addEventListener('dragover', dragOver);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', drop);
    });


    function dragEnter(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragOver(e) {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    function drop(e) {
        e.target.classList.remove('drag-over');

        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        // add it to the drop target
        e.target.appendChild(draggable);

        // display the draggable element
        draggable.classList.remove('hide');
    }

    modal.style.display = "none"
}


// box.forEach(box => box.addEventListener("drop", drop));
// box.forEach(box => box.addEventListener("dragover", allowDrop));




// addTaskBtn.addEventListener("click", addNewTask)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTask()
})



// Get the modal
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("newTodo");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  taskName.focus();
}

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}