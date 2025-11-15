
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

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

        if(checkCompletion && totalTasks > 0 && completedTasks === totalTasks){
            Confetti();
        }
    }

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
        <input type = "checkbox" class = "checkbox" >
        <span>${taskText}</span>
        </div>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
        `

        const checkbox = li.querySelector('.checkbox');
        
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        checkbox.addEventListener('change',() => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed',isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            deleteBtn.disabled = isChecked;
            deleteBtn.style.opacity = isChecked ? '0.5' : '1';
            deleteBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
            updateProgress();
        })

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

const Confetti = () => {
    const count = 200,
    defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
        })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
