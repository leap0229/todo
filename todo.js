class Todo {
    constructor (comment) {
        this.comment = comment;
        this.status = 0;
    }

    statusText() {
        const statusToStatusText = ['作業中', '完了'];
        return statusToStatusText[this.status];
    }
}

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

        displayNewTodo(newTodo);
        commentElement.value = '';
    }

    /**
     * paramのtodoを、画面上に描画する
     * @param {Todo} todo 
     */
    function displayNewTodo(todo) {
        const todosTable = document.getElementById('todos');
        const newRow = todosTable.insertRow();
        
        const idCell = newRow.insertCell();
        idCell.textContent = todos.length - 1;

        const commentCell = newRow.insertCell();
        commentCell.textContent = todo.comment;

        const statusCell = newRow.insertCell();
        const statusButton = document.createElement('button');
        statusButton.textContent = todo.statusText();
        statusCell.appendChild(statusButton);

        const deleteCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteCell.appendChild(deleteButton);
    }
})();