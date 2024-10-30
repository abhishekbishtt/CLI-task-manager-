# To-Do List CLI Application

A simple command-line interface (CLI) application for managing tasks. This application allows you to add, update, delete, list, and manage the status of tasks.

## Features

- **Add Tasks:** Add a new task to the list.
- **Update Tasks:** Modify the description of an existing task.
- **Delete Tasks:** Remove a task from the list.
- **List Tasks:** View all tasks, with the option to filter by status (`todo`, `in-progress`, `done`).
- **Mark Tasks as In-Progress:** Change the status of a task to `in-progress`.
- **Mark Tasks as Done:** Change the status of a task to `done`.

### Example Commands

- **Add a Task:**
    ```bash
    node task-cli.js add "Buy groceries"
    ```
  
- **Update a Task:**
    ```bash
    node task-cli.js update 1 "Buy groceries and cook dinner"
    ```
  
- **Delete a Task:**
    ```bash
    node task-cli.js delete 1
    ```

- **List All Tasks:**
    ```bash
    node task-cli.js list
    ```

- **List Tasks with Filter:**
    ```bash
    node task-cli.js list todo
    ```

- **Mark Task as In-Progress:**
    ```bash
    node task-cli.js mark-in-progress 1
    ```

- **Mark Task as Done:**
    ```bash
    node task-cli.js mark-done 1
    ```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/abhishekbishtt/CLI-task-manager-.git
    ```

2. Navigate to the project directory:
    ```bash
    cd CLI-task-manager-
    ```

3. Install dependencies (if any):
    ```bash
    npm install
    ```

## Usage

1. Ensure that Node.js is installed on your machine.
2. Run commands as described above to manage your tasks.

## File Structure

- `task-cli.js`: The main file containing the application logic.
- `tasks.json`: A JSON file that stores tasks.
- `package.json`: A file that contains project metadata and dependencies.

## Contributing

Feel free to fork the repository and submit pull requests. For any issues or feature requests, please open an issue in the repository.

