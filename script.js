
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('tasks-list');

    const saveTask = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTask = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({text, completed}) => addTask(text, completed, false));

    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if(!taskText) {
           
            alert("Please Enter any Task to Add");
            return;
        }

        const li = document.createElement('li');
        li.innerHTML =`
        <div>
        <input type = "checkbox" class = "checkbox">
        <span>${taskText}</span>
        </div>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
        `

        const checkbox = li.querySelector('.checkbox');
        
        const editBtn = li.querySelector('.edit-btn');

        editBtn.addEventListener('click',() => {
            if(!checkbox.checked){
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                addTask(e);
                saveTask();
            }
        });

        li.querySelector('.delete-btn').addEventListener('click',() => {
            li.remove();
            saveTask();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTask();
    };

    addTaskBtn.addEventListener('click',addTask);
    taskInput.addEventListener('keypress',(e) => {
        if(e.key === 'Enter'){
            addTask(e);
        }
    });
    loadTask();
});

