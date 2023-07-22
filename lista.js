
const formAddTodo = document.querySelector('.addTodo')
const todoContainer = document.querySelector('.todoContainer')
const searchTodo = document.querySelector('.buscarTodo input')

const creatTodo = inputValue =>{
    if (inputValue) {
        todoContainer.innerHTML +=
            `<li class="d-flex">
            <div class="icons">
                <i class="fa-regular fa-square"></i>
                <i class="fa-regular fa-square-check" style="color: rgb(3, 252, 77); display: none;"></i>
            </div>
            <span class="editable">${inputValue}</span>
            <div class="icons">
                <i class="far fa-pen-to-square"></i>
                <i class="far fa-trash-alt"></i>
            </div>
            <div class="edit">
                <input name="edit" type="text">
                <div class="editIcons">
                    <i class="fa-solid fa-check"></i>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </li>`
    }
}


formAddTodo.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.add.value.trim().toLowerCase()
    creatTodo(inputValue)
    event.target.reset()
})

const deleteTodo = (element) => {
    element.parentElement.parentElement.remove();
    element.parentElement.remove();
}

const editTodo = (element, inputEdit, textLi) => {
    inputEdit.value = textLi.textContent;
    element.style.display = element.style.display === 'flex' ? 'none' : 'flex';
    inputEdit.focus();
}

const saveTodo = (element, inputEdit, textLi) => {
    textLi.textContent = inputEdit.value.toLowerCase();
    element.style.display = 'none';
}

const cancelEdit = (element) => {
    element.style.display = 'none';
}

const toggleTodoStatus = (element, textLi) => {
    if (element.classList.contains('fa-square')) {
        element.classList.remove('fa-square');
        element.classList.add('fa-square-check');
        textLi.classList.add('text');
    } else {
        element.classList.remove('fa-square-check');
        element.classList.add('fa-square');
        textLi.classList.remove('text');
    }
}



todoContainer.addEventListener('click', event => {
    const clickedElement = event.target;
    const liElement = clickedElement.closest('li');
    const edit = liElement.querySelector('.edit');
    const inputEdit = edit.firstElementChild;
    const textLi = liElement.querySelector('span.editable')

    const iconDelete = clickedElement.classList.contains('fa-trash-alt')
    const iconEdite = clickedElement.classList.contains('fa-pen-to-square')
    const iconSave = clickedElement.classList.contains('fa-check')
    const iconCancel = clickedElement.classList.contains('fa-xmark')
    const iconSquare = clickedElement.classList.contains('fa-square')
    const iconSquareCheck = clickedElement.classList.contains('fa-square-check')
    const isEditableSpan = clickedElement.classList.contains('editable');

    if (iconDelete) {
        deleteTodo(clickedElement);
    } else if (iconEdite || isEditableSpan) {
        editTodo(edit, inputEdit, textLi);
    } else if (iconSave) {
        saveTodo(edit, inputEdit, textLi);
    } else if (iconCancel) {
        cancelEdit(edit);
    } else if (iconSquare || iconSquareCheck ) {
        toggleTodoStatus(clickedElement, textLi);
    }
});

searchTodo.addEventListener('input', event => {
    const inputValue = event.target.value.trim().toLowerCase()
    Array.from(todoContainer.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(inputValue)
        )
        .forEach(todo => {
            todo.setAttribute('class', 'hidden')
        })
    Array.from(todoContainer.children)
        .filter(todo => todo.textContent.toLowerCase().includes(inputValue)
        )
        .forEach(todo => {
            todo.setAttribute('class', 'd-flex')
        })
})

