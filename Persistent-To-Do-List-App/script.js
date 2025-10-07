  // 1. Get references to the DOM elements
        const taskInput = document.getElementById('taskInput');
        const addTaskButton = document.getElementById('addTaskButton');
        const taskList = document.getElementById('taskList');
        
        
        let tasks = []; 

        // --- LOCAL STORAGE FUNCTIONS  ---

        const STORAGE_KEY = 'myTodoList';

        // Saves the current state of the tasks array to localStorage
        function saveTasks() {
            // Convert the JavaScript Array of Objects into a JSON string
            const tasksJSON = JSON.stringify(tasks);
            localStorage.setItem(STORAGE_KEY, tasksJSON);
            console.log("Tasks Saved to LocalStorage.");
        }

        // Loads tasks from localStorage and initializes the array
        function loadTasks() {
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            
            if (savedTasks) {
                // Convert the JSON string back into a JavaScript array
                tasks = JSON.parse(savedTasks);
            } else {
                // Initialize with placeholders if nothing is found (first load)
                tasks = [
                    { text: 'Complete Day 1 JS Persistence', completed: false },
                    { text: 'Plan tomorrow\'s half-hour practice', completed: true }
                ];
            }
        }


        // --- RENDER TASKS FUNCTION ---
        // Clears the DOM list and rebuilds it based on the current 'tasks' array.
        function renderTasks() {
            taskList.innerHTML = ''; // Clear existing list items

            tasks.forEach(task => {
                const listItem = document.createElement('li');
                
                // Determine CSS classes based on completion status
                const baseClasses = 'task-item flex justify-between items-center p-4 rounded-lg shadow-sm border-l-4 transition cursor-pointer';
                const statusClasses = task.completed 
                    ? 'completed bg-green-50 border-green-500 opacity-70' 
                    : 'bg-gray-50 border-red-500 hover:shadow-md';

                listItem.className = `${baseClasses} ${statusClasses}`;
                // Store the task text on the element for easy retrieval
                listItem.dataset.taskText = task.text;

                listItem.innerHTML = `
                    <span class="task-text text-gray-700 font-medium flex-grow">${task.text}</span>
                    <button class="delete-button text-gray-400 hover:text-red-500 transition duration-150 p-1 rounded-full hover:bg-red-50">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                `;
                
                taskList.appendChild(listItem);
            });
        }

        // --- ADD TASK FUNCTION ---
        function addTasks(){
            let taskEntered = taskInput.value.trim();

            if (taskEntered === "") {
                return;
            }
            
            tasks.unshift({ text: taskEntered, completed: false }); 
            taskInput.value = '';
            
            renderTasks();
            saveTasks(); 
        } 
        
        // --- REMOVE TASK FUNCTION (Using Filter) ---
        function removeTasks(taskTextToRemove) {
            // DATA MANAGEMENT: Filter creates a NEW array without the removed item.
            tasks = tasks.filter(task => task.text !== taskTextToRemove);
            
            renderTasks();
            saveTasks(); 
        }

        // --- TOGGLE TASK FUNCTION ---
        function toggleTask(taskTextToToggle) {
            // DATA MANAGEMENT: Find the task object and flip its completion status
            const taskIndex = tasks.findIndex(task => task.text === taskTextToToggle);
            
            if (taskIndex > -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
            }

            renderTasks();
            saveTasks(); 
        }
        
        // --- EVENT DELEGATION (Handles Clicks on the List) ---
        function handleListClick(event) {
            const taskElement = event.target.closest('.task-item');
            if (!taskElement) return;

            // Get the identifying text from the custom data attribute
            const taskText = taskElement.dataset.taskText;

            // Check if the delete button was clicked
            if (event.target.closest('.delete-button')) {
                removeTasks(taskText);
            } 
            // Otherwise, assume the user clicked the text/task item to toggle
            else {
                toggleTask(taskText);
            }
        }
        
        // --- INITIALIZATION AND EVENT LISTENERS ---
        
        // 1. Load tasks from localStorage first
        loadTasks();

        // 2. Initial render when the page loads
        renderTasks();

        // 3. Attach listeners
        addTaskButton.addEventListener('click', addTasks);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTasks();
            }
        });
        
        // Delegation listener for toggle and removal
        taskList.addEventListener('click', handleListClick);
        