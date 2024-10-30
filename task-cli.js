


const fs = require('fs'); // fs module to read and write the directory
const filePath = './tasks.json';

// Check if the tasks.json file exists; if not, create it
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Read tasks from JSON
const readTasks = () => JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Write tasks to JSON
const writeTasks = (tasks) => fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

// Get the next available ID
const getNextId = (tasks) => {
    const ids = tasks.map(task => task.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1; // Start from 1 if no tasks exist
};

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0]; // add, update, delete, etc.
const commandArgs = args.slice(1); // Task details

switch (command) {
    case 'add':
        if (commandArgs.length === 0) {
            console.error('Error: Task description is required');
            process.exit(1);
        }

        const tasks = readTasks();
        const newTask = {
            id: getNextId(tasks), // Get the next available ID
            description: commandArgs.join(' '), // Task description
            status: 'todo', // Default status
            createdAt: new Date().toISOString(), // Creation date
            updatedAt: new Date().toISOString() // Update date
        };

        tasks.push(newTask);
        writeTasks(tasks);
        console.log(`Task added successfully (ID: ${newTask.id})`);
        break;

    case 'update':
        if (commandArgs.length < 2) {
            console.error('Error: Task ID and new description are required');
            process.exit(1);
        }

        const updateId = parseInt(commandArgs[0], 10); // Convert to integer
        const tasksToUpdate = readTasks();
        const newDesc = commandArgs.slice(1).join(' ');

        const taskToUpdate = tasksToUpdate.find(task => task.id === updateId);
        if (!taskToUpdate) {
            console.log('Error: Task with the specified ID does not exist');
            process.exit(1);
        }
        taskToUpdate.description = newDesc;
        taskToUpdate.updatedAt = new Date().toISOString();
        writeTasks(tasksToUpdate);
        console.log(`Task with ID ${updateId} updated successfully`);
        break;

    case 'delete':
        if (commandArgs.length !== 1) {
            console.log('Error: ID is required');
            process.exit(1);
        }

        const deleteID = parseInt(commandArgs[0], 10);
        const tasksToDelete = readTasks();
        const filteredTasks = tasksToDelete.filter(task => task.id !== deleteID);
        writeTasks(filteredTasks);
        console.log(`Task with ID ${deleteID} deleted successfully`);
        break;

    case 'list':
        const list = readTasks();
        if (list.length === 0) {
            console.log('No tasks added yet');
            process.exit(1);
        }

        if (commandArgs.length === 1) {
            const statusFilter = commandArgs[0].toLowerCase();
            const filteredList = list.filter(task => task.status === statusFilter);
            if (filteredList.length === 0) {
                console.log(`No tasks with status "${statusFilter}" found.`);
            } else {
                filteredList.forEach(task => {
                    console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`);
                });
            }
        } else {
            list.forEach(task => {
                console.log(`ID: ${task.id} | Description: ${task.description} | Status: ${task.status} | Created At: ${task.createdAt} | Updated At: ${task.updatedAt}`);
            });
        }
        break;

    case 'mark-in-progress':
        if (commandArgs.length !== 1) {
            console.log('Error: ID is required');
            process.exit(1);
        }

        const markID = parseInt(commandArgs[0], 10);
        const tasksToMark = readTasks();
        const markTask = tasksToMark.find(task => task.id === markID);
        if (!markTask) {
            console.log('Error: No task found with the specified ID');
            process.exit(1);
        }
        markTask.status = 'in-progress';
        markTask.updatedAt = new Date().toISOString();
        writeTasks(tasksToMark);
        console.log(`Task with ID ${markID} marked as in-progress successfully`);
        break;

    case 'mark-done':
        if (commandArgs.length !== 1) {
            console.log('Error: ID is required');
            process.exit(1);
        }

        const doneID = parseInt(commandArgs[0], 10);
        const tasksToDone = readTasks();
        const doneTask = tasksToDone.find(task => task.id === doneID);
        if (!doneTask) {
            console.log('Error: No task found with the specified ID');
            process.exit(1);
        }
        doneTask.status = 'done';
        doneTask.updatedAt = new Date().toISOString();
        writeTasks(tasksToDone);
        console.log(`Task with ID ${doneID} marked as done successfully`);
        break;

    default:
        console.log('Error: Command not recognized');
        break;
}
