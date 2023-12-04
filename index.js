// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value;

    if (taskText.trim() !== "") {
        const task = {
            text: taskText,
            completed: false
        };

        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add the new task
        tasks.push(task);

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = "";
        renderTasks();
    }
}

// Function to render tasks
function renderTasks() {
    const pendingList = document.getElementById("pending-list");
    const completedList = document.getElementById("completed-list");

    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.text}</span>
            ${!task.completed ? `<button onclick="completeTask(${index})">Complete</button>` : ''}
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        if (task.completed) {
            li.classList.add("completed");
        }

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}


// Function to mark a task as complete
function completeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Mark the task as completed
    tasks[index].completed = !tasks[index].completed;

    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}

// Function to edit a task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedText = prompt("Edit task:", tasks[index].text);

    if (updatedText !== null) {
        // Update the task text
        tasks[index].text = updatedText;

        // Save updated tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Remove the task from the array
    tasks.splice(index, 1);

    // Save updated tasks to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}

// Initial render
renderTasks();
