const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [];

// Function to add a new task
function addTask(description) {
    return new Promise((resolve) => {
        setTimeout(() => {
            tasks.push(description);
            console.log(`Task added: "${description}"`);
            resolve();
        }, 2000); // Delay of 2 seconds
    });
}

// Function to view all tasks
function viewTasks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (tasks.length === 0) {
                console.log("No tasks to show.");
            } else {
                console.log("Tasks:");
                tasks.forEach((task, index) => {
                    console.log(`${index + 1}: ${task}`);
                });
            }
            resolve();
        }, 1000); // Delay of 1 second
    });
}

// Function to ask user for action
function askAction() {
    rl.question('What would you like to do? (add/view/exit): ', async (action) => {
        if (action === 'add') {
            rl.question('Enter the task description: ', async (description) => {
                await addTask(description);
                askAction(); // Ask for the next action
            });
        } else if (action === 'view') {
            await viewTasks();
            askAction(); // Ask for the next action
        } else if (action === 'exit') {
            rl.close();
        } else {
            console.log('Invalid action. Please try again.');
            askAction(); // Ask for the next action
        }
    });
}

// Start the application
askAction();
