class Todo {
    constructor (comment) {
        this.comment = comment;
        this.status = 'working';
    }

    statusText() {
        const statusToText = {
            working: '作業中',
            done:   '完了'
        }

        return statusToText[this.status];
    }
}


// todoの一覧
const todos = [];

(() => {
    const todoAddButton = document.getElementById('addTodo');
    todoAddButton.addEventListener('click', addTodo);
    
    /**
     * todoを追加する
     */
    function addTodo() {
        const commentElement = document.getElementById('comment');
        const newTodo = new Todo(commentElement.value);
        todos.push(newTodo);

        const todosTable = document.getElementById('todos');
        const newRow = todosTable.insertRow();

        displayTodo(newTodo, newRow);
        commentElement.value = '';
    }

    /**
     * paramのtodoを、画面上に描画する
     * @param {Todo} todo 
     */
    function displayTodo(todo, rowElement) {        
        const idCell = rowElement.insertCell();
        idCell.textContent = todos.length - 1;

        const commentCell = rowElement.insertCell();
        commentCell.textContent = todo.comment;

        const statusCell = rowElement.insertCell();
        const statusButton = document.createElement('button');
        statusButton.textContent = todo.statusText();
        statusCell.appendChild(statusButton);

        const deleteCell = rowElement.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteCell.appendChild(deleteButton);
    }
})();