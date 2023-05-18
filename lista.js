(function() {
    const form = document.querySelector('form');
    const inputForm = document.getElementById('inputForm');
    inputForm.focus()
    form.addEventListener('submit', adicionarLista);
    // Função para adicionar um novo item à lista
    function adicionarLista(e) {
      e.preventDefault();
  
      if (!inputForm.value) {
        alert('Preencha os dados')
      } else {
  
        const minhaUl = document.querySelector('ul');
        const list = document.createElement('li');
        minhaUl.appendChild(list);
  
        let checkIcons = document.createElement('span');
        checkIcons.className = 'material-symbols-outlined offChecked';
        checkIcons.innerHTML = 'check_box_outline_blank';
        list.appendChild(checkIcons);
  
        const texto = document.createElement('p');
        texto.textContent = inputForm.value;
        list.appendChild(texto);
  
        inputForm.value = '';
        inputForm.focus();
  
        const editIcons = document.createElement('span');
        editIcons.className = 'material-symbols-outlined iconsEditButton';
        editIcons.innerHTML = 'edit_document';
        list.appendChild(editIcons);
  
        const deleteIcons = document.createElement('span');
        deleteIcons.className = 'material-symbols-outlined deleteButton';
        deleteIcons.innerHTML = 'delete';
        list.appendChild(deleteIcons);
  
        const editListContainer = document.createElement('div');
        editListContainer.className = 'editList';
        list.appendChild(editListContainer);
  
        const editInput = document.createElement('input');
        editInput.className = 'inputEdit';
        editListContainer.appendChild(editInput);
  
        let isChecked = false;
        checkIcons.addEventListener('click', checkList);
  
        // Função para alternar o estado de checked/unchecked ao clicar no ícone de checkbox
        function checkList() {
          isChecked = !isChecked;
          if (isChecked) {
            checkIcons.className = 'material-symbols-outlined offChecked';
            checkIcons.innerHTML = 'check_box';
          } else {
            checkIcons.className = 'material-symbols-outlined offChecked';
            checkIcons.innerHTML = 'check_box_outline_blank';
          }
        }
  
        deleteIcons.addEventListener('click', deleteList);
  
        // Função para remover o item da lista ao clicar no ícone de exclusão
        function deleteList() {
          console.log('deletou');
          list.remove();
        }
  
        editIcons.addEventListener('click', editList);
        texto.addEventListener('click', editList);
  
        let editButtonsAdded = false;
        let isEditInputFocused = false;
        let previousTextValue = '';
  
        // Função para editar o texto do item ao clicar no ícone de edição ou no próprio texto
        function editList() {
          console.log('editou');
          let containerEdit = list.querySelector('.editList');
          if (containerEdit.style.display === 'block') {
            containerEdit.style.display = 'none';
          } else {
            containerEdit.style.display = 'block';
            containerEdit.style.top = list.offsetTop + list.offsetHeight + 'px';
  
            if (!editButtonsAdded) {
              editInput.style.display = 'inline-block';
              editListContainer.appendChild(editInput);
  
              if (!isEditInputFocused) {
                editInput.focus();
                isEditInputFocused = true;
              }
  
              editInput.value = texto.textContent;
              previousTextValue = texto.textContent;
  
              const editButton = document.createElement('button');
              editButton.textContent = 'Editar';
              editButton.className = 'editButton';
              editListContainer.appendChild(editButton);
  
              const cancelButton = document.createElement('button');
              cancelButton.textContent = 'Cancelar';
              cancelButton.className = 'cancelButton';
              cancelButton.addEventListener('click', () => {
                containerEdit.style.display = 'none';
                isEditInputFocused = false;
              });
              editListContainer.appendChild(cancelButton);
  
              editButton.addEventListener('click', () => {
                if (editInput.value.trim() === '') {
                  editInput.value = previousTextValue;
                }
  
                texto.textContent = editInput.value;
                containerEdit.style.display = 'none';
                isEditInputFocused = false;
              });
  
              editButtonsAdded = true;
            }
          }
        }
      }
    }
  })();
  