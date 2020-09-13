
class Todo {
    constructor(id, comment) {
        this.id = id;
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

    const newTodo = new Todo(todos.length, comment);
    todos.push(newTodo);

    const todosTable = document.getElementById('todos');

    displayTodo(newTodo, todosTable);
    commentElement.value = '';
};

/**
 * paramのtodoを、画面上に描画する
 * @param {Todo} todo 
 * @param {HTMLElement} rowElement 
 * @param {Int} todoIdx デフォルトは-1。tableの末行に行を追加する
 */
const displayTodo = (todo, todosTable, todoIdx = -1) => {
    // ステータスのフィルタリング条件に合致するか判定
    if ( !isDisplayingTodo(todo) ) {
        return;
    }
    
    const newRow = todosTable.insertRow(todoIdx);

    const idCell = newRow.insertCell();
    idCell.textContent = todo.id;

    const commentCell = newRow.insertCell();
    commentCell.textContent = todo.comment;

    const statusCell = newRow.insertCell();
    const statusButton = document.createElement('button');
    statusButton.textContent = todo.statusText();
    statusButton.setAttribute('id', todo.id);
    statusButton.addEventListener('click', updateStatus);
    statusCell.appendChild(statusButton);

    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.setAttribute('id', todo.id);
    deleteButton.addEventListener('click', deleteTodo);
    deleteCell.appendChild(deleteButton);
};

/**
 * ステータスラジオボタンで選択されている値を返す
 */
const getCheckedStatus = () => {
    const statusRadioButtons = document.getElementsByName('status');

    const checkedstatusRadioButton = 
        Array.from(statusRadioButtons).find(statusRadioButton => statusRadioButton.checked);

    return checkedstatusRadioButton.value;
};

/**
 * todoが表示対象の場合、true, 対象外の場合、falseを返す
 * @param {Todo} todo 
 */
const isDisplayingTodo = (todo) => {
    const checkedStatus = getCheckedStatus();
    
    if (checkedStatus === 'all') {
        return true;
    }

    if (todo.status === checkedStatus) {
        return true;
    }

    return false;
};

/**
* 削除ボタンが押下された当該のTodoを削除する
* @param {MouseEvent} event 
*/
const deleteTodo = (event) => {
    // table上の行数を取得
    const todoIdx = event.target.parentNode.parentNode.rowIndex - 1;
    const todosTable = document.getElementById('todos');

    // 削除対象のID以降の行を、画面から削除する
    deleteTable(todosTable, todoIdx);

    // todoリストから選択されたtodoを削除
    const todoId = parseInt(event.target.id);
    todos.splice(todoId, 1);

    // idを再割り当てする
    todos.forEach((todo, index) => {
        if (todoId < todo.id) {
            todo.id = index;
            displayTodo(todo, todosTable);
        }
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
 * @param {MouseEvent} event 
 */
const updateStatus = (event) => {
    const todoId = parseInt(event.target.id);
    const targetTodo = todos.find(todo => todoId === todo.id);
    targetTodo.toggleStatus();

    // table上の行数を取得
    const todoIdx = event.target.parentNode.parentNode.rowIndex - 1;
    const todosTable = document.getElementById('todos');
    todosTable.deleteRow(todoIdx);
    displayTodo(targetTodo, todosTable, todoIdx);
};

/**
 * 選択されたステータスに合致するtodoを一覧表示する
 */
const filterTodoByStatus = () => {
    const todosTable = document.getElementById('todos');

    // todoリストを画面からすべて削除する
    deleteTable(todosTable);
    
    // todoリストをすべて描画する
    todos.forEach(todo => {
        displayTodo(todo, todosTable);
    });
};

(() => {
    // Todo追加ボタンへのイベント登録
    const todoAddButton = document.getElementById('addTodo');
    todoAddButton.addEventListener('click', addTodo);

    // ステータスラジオボタンへのイベント登録
    const statusRadioButtons = document.getElementsByName('status');
    statusRadioButtons.forEach(statusRadioButton => {
        statusRadioButton.addEventListener('change', filterTodoByStatus)
    });
})();