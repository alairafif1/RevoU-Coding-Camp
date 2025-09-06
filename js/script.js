const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const filterBtn = document.getElementById('filterBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = false) {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    if (filter) {
        const today = new Date().toISOString().split('T')[0];
        filteredTasks = tasks.filter(task => task.date === today);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<tr><td colspan="4">No task found</td></tr>';
        return;
    }

    filteredTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.date}</td>
            <td>${task.completed ? 'Done' : 'Pending'}</td>
            <td>
                <button onclick="toggleStatus(${index})">Toggle</button>
                <button class="danger" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function addTask() {
    const name = taskInput.value.trim();
    const date = dateInput.value;

    if (name === '' || date === '') {
        alert('Please enter both task and date!');
        return;
    }

    tasks.push({ name, date, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    dateInput.value = '';
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteAll() {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function toggleStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addBtn.addEventListener('click', addTask);
filterBtn.addEventListener('click', () => renderTasks(true));
deleteAllBtn.addEventListener('click', deleteAll);

renderTasks();
