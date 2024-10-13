// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If save is true, create a new task from input field
        if (save) {
            taskText = taskInput.value.trim();
            // Check if the input is not empty
            if (taskText === "") {
                alert("Please enter a task."); // Alert if no task is entered
                return; // Exit the function if the task is empty
            }
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add event listener to the remove button
        removeButton.onclick = function () {
            // Remove the task from the DOM
            taskList.removeChild(li);
            // Update Local Storage
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the list item and the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field if save is true
        if (save) {
            taskInput.value = '';

            // Save task to Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', () => addTask(null, true));

    // Allow task addition with the Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(null, true); // Call addTask when Enter is pressed
        }
    });
});
