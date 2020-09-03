
class Todo {
    constructor(comment) {
        this.comment = comment;
        this.status = 'working';
    }

    statusText() {
        const statusToText = {
            working: '作業中',
            done: '完了'
        }

        return statusToText[this.status];
    }

    /**
     * Todoのステータスを反転させる
     * working => done or done => working
     */
    toggleStatus() {
        if (this.status === 'working') {
            this.status = 'done';
        } else {
            this.status = 'working';
        }
    }
}


// todoの一覧
const todos = [];

/**
 * todoを追加する
 */
const addTodo = () => {
    const commentElement = document.getElementById('comment');
    const comment = commentElement.value;
    if (comment == '') {
        return;
    }

    const newTodo = new Todo(comment);
    todos.push(newTodo);

    const todosTable = document.getElementById('todos');

    displayTodo(newTodo, todosTable, todos.length - 1);
    commentElement.value = '';
};

/**
 * paramのtodoを、画面上に描画する
 * @param {Todo} todo 
 * @param {HTMLElement} rowElement 
 * @param {Int} todoIdx 
 */
const displayTodo = (todo, todosTable, todoIdx) => {
    const newRow = todosTable.insertRow(todoIdx);

    const idCell = newRow.insertCell();
    idCell.textContent = todoIdx;

    const commentCell = newRow.insertCell();
    commentCell.textContent = todo.comment;

    const statusCell = newRow.insertCell();
    const statusButton = document.createElement('button');
    statusButton.textContent = todo.statusText();
    statusButton.setAttribute('id', todoIdx);
    statusButton.addEventListener('click', updateStatus);
    statusCell.appendChild(statusButton);

    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.setAttribute('id', todoIdx);
    deleteButton.addEventListener('click', deleteTodo);
    deleteCell.appendChild(deleteButton);
};

/**
* 削除ボタンが押下されたTodoを削除する
* @param {MouseEvent} event 
*/
const deleteTodo = (event) => {
    const todoIdx = parseInt(event.target.id);

    todos.splice(todoIdx, 1);

    const todosTable = document.getElementById('todos');
    // 削除対象のID以降の行を、画面から削除する
    deleteTable(todosTable, todoIdx);

    // 削除対象のID以降のTodoを再描画する
    const redrawnTodos = todos.slice(todoIdx)
    redrawnTodos.map((todo, index) => {
        displayTodo(todo, todosTable, todoIdx + index);
    });
};

/**
 * tableElementのうち、startIdx以降の行を削除する
 * @param {HTMLElement} tableElement 
 * @param {Int} startIdx 
 */
const deleteTable = (tableElement, startIdx = 0) => {
    while (tableElement.rows[startIdx]) {
        tableElement.deleteRow(startIdx);
    }
};

/**
 * 押下されたTodoの状態を変更する
 * @param {HTMLElement} event 
 */
const updateStatus = (event) => {
    const todoIdx = parseInt(event.target.id);

    const targetTodo = todos[todoIdx];
    targetTodo.toggleStatus();

    const todosTable = document.getElementById('todos');
    todosTable.deleteRow(todoIdx);
    displayTodo(targetTodo, todosTable, todoIdx);
}

(() => {
    const todoAddButton = document.getElementById('addTodo');
    todoAddButton.addEventListener('click', addTodo);

})();