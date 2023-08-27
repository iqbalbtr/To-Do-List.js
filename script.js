const dateInput = document.querySelector("#date");
const listTasks = document.querySelector(".list-tasks");
const add = document.querySelector('.add');
const inputAdd = document.querySelector(".input-add");
const addBtn = document.querySelector('.add-btn');
const indicator = document.querySelector(".indicator");

let mainTasks = [];
let indexOp = "";

dateInput.addEventListener('change', () => {
    const dateValue = dateInput.value;
    const now = new Date(dateValue);
    const existingTask = mainTasks.findIndex(key => key.date.toDateString() === now.toDateString())
    if (existingTask === -1) {
        var task = {
            date: now,
            list: []
        };
        mainTasks.push(task);
        renderMainTask();
    } else {
        alert('Date have been added.');
        return;
    }

});

function deleteTask(index, task) {
    mainTasks.forEach(key => {
        key.splice(index, 1);
        renderTeksTask(task);
    })
}


function renderTeksTask(task, index) {
    const viewTop = document.querySelector(".top-display");
    const listTeks = document.querySelector(".task-list")
    viewTop.innerHTML = "";
    listTeks.innerHTML = "";
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const now = new Date(task.date);
    const keyDay = now.getDay();
    const getDay = week[keyDay];
    const getDate = now.getDate();
    const getMonth = now.toLocaleDateString("en-En", { month: "long" });
    const getYear = now.getFullYear();

    viewTop.innerHTML = `<span class="day">${getDay}</span>
    <div class="main-right">
        <span class="date-number">${getDate}</span>
        <div class="bottom-right">
            <span class="month">${getMonth}</span>
            <span class="year">${getYear}</span>
        </div>
    </div>`;

    indicator.innerHTML = "";
    const allTask = task.list.length;
    const completTask = (task.list.filter(list => list.completed)).length;
    const prcentTask = parseInt(completTask / allTask * 100);
    const notCmplet = (task.list.filter(list => !list.completed)).length;  

    const progerssTask = document.createElement("span");
    progerssTask.innerHTML = `
    You've completed ${completTask} out of ${allTask} tasks (${prcentTask}%). Just ${notCmplet} more task to go!
    `;
    const noTask = document.createElement("span");
    noTask.innerHTML = "Let's start today with enthusiasm! Create your tasks and see the progress you achieve.";
    const clearTask = document.createElement("span");
    clearTask.innerHTML = "There are no tasks to face at the moment. It's time to take a break!";
    if(allTask === 0) {
        indicator.appendChild(noTask);
    } else if (completTask === allTask) {
        indicator.appendChild(clearTask);
    } else if(allTask > 0) {
        indicator.appendChild(progerssTask);
    } 
    

    task.list.forEach((list, index) => {
        const taskTeks = document.createElement("div");
        taskTeks.className = "task-teks";
        const check = document.createElement("input");
        check.type = "checkbox";
        taskTeks.appendChild(check);

        const span = document.createElement("span");
        span.className = "teks";
        span.textContent = list.teks;
        taskTeks.appendChild(span);
        listTeks.appendChild(taskTeks);

        const del = document.createElement("button");
        del.textContent = "✕";
        del.className = "delete-teks";
        taskTeks.appendChild(del);
        del.addEventListener("click", () => {
            task.list.splice(index, 1);
            renderTeksTask(task);
        });

        check.addEventListener("change", () => {
            list.completed = !list.completed;
            if (list.completed) {
                span.style.color = "red";
                span.style.textDecoration = "line-through";
            } else {
                span.style.color = "white";
                span.style.textDecoration = "none";
            }
            renderTeksTask(task);
        });
        if (list.completed) {
            check.checked = true;
            span.style.color = "red";
            span.style.textDecoration = "line-through";
        } else {
            span.style.color = "white";
            span.style.textDecoration = "none";
        }
    });
}

function renderMainTask() {
    listTasks.innerHTML = "";
    mainTasks.forEach((task, index) => {
        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const now = new Date(task.date);
        const keyDay = now.getDay();
        const getDay = week[keyDay];
        const getDate = now.getDate();
        const getMonth = now.toLocaleDateString("en-En", { month: "long" });
        const getYear = now.getFullYear();
        const html = `
        <span class="day">${getDay}</span>
                    <div class="main-right">
                        <span class="date-number">${getDate}</span>
                        <div class="bottom-right">
                            <span class="month">${getMonth}</span>
                            <span class="year">${getYear}</span>
                        </div>
                    </div>
        `;
        const mainPage = document.createElement("div");
        mainPage.className = "main-list";
        mainPage.innerHTML = html;

        listTasks.appendChild(mainPage);
        mainPage.addEventListener("click", () => {
            const displayTask = document.querySelector(".display-task");

            displayTask.classList.add("active");
            renderTeksTask(task, index);
            indexOp = index;
            inputAdd.classList.remove("active");
            addBtn.style.display = "none";
        })
    })
}

function addTask() {
    const teksValue = inputAdd.value.trim();
    if (teksValue === "") {
        inputAdd.classList.remove("active");
        addBtn.style.display = "none";
    } else {
        var allTeks = {
            teks: teksValue,
            completed: false
        };
        const task2 = mainTasks[indexOp];
        task2.list.push(allTeks);
        inputAdd.value = "";
        renderTeksTask(task2);
    }
}


add.addEventListener("click", () => {
    inputAdd.classList.add("active");
    addBtn.style.display = "block";
})

addBtn.addEventListener("click", () => {
    addTask();
});

inputAdd.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addTask();
    }
})

const close = document.querySelector(".close");
close.addEventListener("click", () => {
    const displayTask = document.querySelector(".display-task");
    displayTask.classList.remove("active");
});

