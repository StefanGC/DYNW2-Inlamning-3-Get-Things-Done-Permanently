const uriTodoItem = `${server}api/TodoLists/{TodoListId}/TodoItems`;
let todosItem = [];
let tags = "#Utamhus, #Värnamo, #Hälsa, #Fintväder";

function getItemsTodoItems(TodoListId) {
    fetch(`${server}api/TodoLists/${TodoListId}/TodoItems`)
        .then(response => response.json())
        .then(data => _displayItemsTodoItems(data, TodoListId))
        .catch(error => console.error('Unable to get items.', error));
}

function addItemTodoItems(TodoListId) {
    const addNameTextbox = document.getElementById(`add-nameItem${TodoListId}`);

    const item = {
        name: addNameTextbox.value.trim(),
        isComplete: false,
        todoListId: TodoListId,
        tags: tags
    };

    fetch(`${server}api/TodoLists/${TodoListId}/TodoItems`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myApiKey}`
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItemTodoItems(id) {
    fetch(`${uriTodoItem}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditFormTodoItems(id) {
    const item = todosItem.find(item => item.id === id);

    document.getElementById('edit-nameTodoItems').value = item.name;
    document.getElementById('edit-idTodoItems').value = item.id;
    document.getElementById('edit-todoListId').value = item.todoListId;
    document.getElementById('edit-isCompleteTodoItems').checked = item.isComplete;
    document.getElementById('editFormTodoItems').style.display = 'block';
}

function updateItemTodoItems() {
    const itemId = document.getElementById('edit-idTodoItems').value;
    const itemListId = document.getElementById('edit-todoListId').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isCompleteTodoItems').checked,
        name: document.getElementById('edit-nameTodoItems').value.trim(),
        todoListId: parseInt(itemListId, 10),
        tags: tags
    };

    fetch(`${uriTodoItem}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInputTodoItems();

    return false;
}

function closeInputTodoItems() {
    document.getElementById('editFormTodoItems').style.display = 'none';
}

function _displayItemsTodoItems(data, TodoListId) {
    const tBody = document.getElementById(`todoItem${TodoListId}`);
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Redigera';
        editButton.setAttribute('onclick', `displayEditFormTodoItems(${item.id})`);
        editButton.setAttribute("class", "btn btn-success");

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Ta bort';
        deleteButton.setAttribute('onclick', `deleteItemTodoItems(${item.id})`);
        deleteButton.setAttribute("class", "btn btn-danger");

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isCompleteCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.name);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(item.tags);
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    let addButton = button.cloneNode(false);
    addButton.innerText = 'Lägga till en ny uppgift';
    addButton.setAttribute('onclick', `addItemTodoItems(${TodoListId})`);
    addButton.setAttribute("class", "btn btn-primary");

    let tr2 = tBody.insertRow();
    let textNode = document.createTextNode("");

    let td21 = tr2.insertCell(0);
    td21.appendChild(textNode);

    let td22 = tr2.insertCell(1);
    td22.appendChild(textNode);

    let td23 = tr2.insertCell(2);
    td23.appendChild(textNode);

    let td24 = tr2.insertCell(3);
    let inputNode = document.createElement("input");
    inputNode.setAttribute("type", "text");
    inputNode.setAttribute("id", `add-nameItem${TodoListId}`);
    inputNode.setAttribute("placeholder", "Ange namn");
    td24.appendChild(inputNode);

    let td25 = tr2.insertCell(4);
    td25.appendChild(addButton);

    todosItem = data;
}