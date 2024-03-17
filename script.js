document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoSummary = document.getElementById('todo-summary');
    const showCompletedBtn = document.getElementById('show-completed-btn');
    const showAllBtn = document.getElementById('show-all-btn');
    const showActiveBtn = document.getElementById('show-active-btn');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText.length < 3) {
            showError('Tehtävän on oltava vähintään 3 merkkiä pitkä');
            todoInput.classList.add('error'); // Lisäämme virheen luokan
            return;
        }
        todoInput.classList.remove('error'); // Poistamme virheen luokan, jos se on lisätty
        addTodoItem(todoText);
        todoInput.value = '';
        updateSummary();
        saveTodos();
    });

    todoInput.addEventListener('input', function() {
        if (todoInput.value.length >= 3) {
            todoInput.classList.remove('error');
        }
    });

    todoList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
            updateSummary();
            saveTodos();
        } else if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
            updateSummary();
            saveTodos();
        }
    });

    showCompletedBtn.addEventListener('click', function() {
        const allItems = document.querySelectorAll('.todo-item');
        allItems.forEach(item => {
            if (!item.classList.contains('completed')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    });

    showAllBtn.addEventListener('click', function() {
        const allItems = document.querySelectorAll('.todo-item');
        allItems.forEach(item => {
            item.style.display = 'block';
        });
    });

    showActiveBtn.addEventListener('click', function() {
        const allItems = document.querySelectorAll('.todo-item');
        allItems.forEach(item => {
            if (item.classList.contains('completed')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    });

    clearCompletedBtn.addEventListener('click', function() {
        const completedItems = document.querySelectorAll('.todo-item.completed');
        completedItems.forEach(item => {
            item.remove();
        });
        updateSummary();
        saveTodos();
    });

    function addTodoItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.classList.add('todo-item');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Poista';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    function showError(message) {
        alert(message);
    }

    function updateSummary() {
        const remainingTodos = document.querySelectorAll('#todo-list .todo-item:not(.completed)').length;
        todoSummary.textContent = `${remainingTodos} tehtävää jäljellä`;
    }

    function saveTodos() {
        localStorage.setItem('todos', todoList.innerHTML);
    }

    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            todoList.innerHTML = savedTodos;
        }
        updateSummary();
    }

    loadTodos();
});

