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

    console.log('comment:', comment);

    const newTodo = new Todo(comment);
    todos.push(newTodo);

    const todosTable = document.getElementById('todos');
    const newRow = todosTable.insertRow();

    displayTodo(newTodo, newRow, todos.length - 1);
    commentElement.value = '';
};

/**
 * paramのtodoを、画面上に描画する
 * @param {Todo} todo 
 * @param {HTMLElement} rowElement 
 * @param {Int} todoIdx 
 */
const displayTodo = (todo, rowElement, todoIdx) => {
    const idCell = rowElement.insertCell();
    idCell.textContent = todoIdx;

    const commentCell = rowElement.insertCell();
    commentCell.textContent = todo.comment;

    const statusCell = rowElement.insertCell();
    const statusButton = document.createElement('button');
    statusButton.textContent = todo.statusText();
    statusCell.appendChild(statusButton);

    const deleteCell = rowElement.insertCell();
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
        const newRow = todosTable.insertRow();
        displayTodo(todo, newRow, todoIdx + index);
    });
};

/**
 * tableElementのうち、startIdx以降の行を削除する
 * @param {HTMLElement} tableElement 
 * @param {Int} startIdx 
 */
const deleteTable = (tableElement, startIdx = 0) => {
    const targetTableIdx = startIdx + 1;
    while (tableElement.rows[targetTableIdx]) {
        tableElement.deleteRow(targetTableIdx);
    }
};

(() => {
    const todoAddButton = document.getElementById('addTodo');
    todoAddButton.addEventListener('click', addTodo);

})();