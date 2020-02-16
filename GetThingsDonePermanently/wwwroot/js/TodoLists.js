const server = `http://localhost:5001/`;
const uriTodoLists = `${server}api/TodosLists`;
let todosList = [];
let myApiKey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik56QTVORGN3TVRRMU5qSkdSVVkxUXpCRVJFUTJNRVZCT0VaRVJqVTRNVEpDUTBVMlJVVkRSZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1pbmtmMWUzNy5ldS5hdXRoMC5jb20vIiwic3ViIjoiMEk3M0JXblJvVjU2ek13U09saWRjRDV1M0hSenhESHhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZ3RkLWFwaS1TdGVmYW5HQy5jb20iLCJpYXQiOjE1ODE1MDkyMTMsImV4cCI6MTU4MTU5NTYxMywiYXpwIjoiMEk3M0JXblJvVjU2ek13U09saWRjRDV1M0hSenhESHgiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.rhV5qXfNBK8Np5HqDisRVIArHTEtX44LW39E3waQneTxcwzaAhPQ-J_pM6sfluUx7ZIz9COfRKLYWTRYEJUaLi25WFnRgJ0UItBlORv216y5huYhZmo_G1yzmFbmW9uCs9T1V8SCzAhjbB2j8gqdy5lkBJ8-GJNDFz4IAhuvcr1lwNprBcEs-nbkzWPHP-z2dVh7iN5CJWV13UWsWjhYWHckzBNGsTBjtepGz4ZiAZvIK8lbZ9a6yt5BZHlYM6_1cN6Y3-qeS2B0ctF6vWiJhM_MRJmfzyg-Z7pFefTiS232-tV88jLqbqqTPzQCfx_H-mqq2hqpaOIkyfYhzcjQOw";
//getNewKey();

function getNewKey() {

    const item = {
        "client_id": "0I73BWnRoV56zMwSOlidcD5u3HRzxDHx",
        "client_secret": "GAXQvhgGobdjfPBlhXGBew5JXD06UrMhBpMy5k-TyHBxaTQRNiphHYBgg8KHOURk",
        "audience": "https://gtd-api-StefanGC.com",
        "grant_type": "client_credentials"
    };

    fetch('https://dev-inkf1e37.eu.auth0.com/oauth/token', {
        method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
            mode: `no-cors`
        })
        .then(response => response.json())
        .then(function (data) {
            myApiKey = data.access_token;
            })
            .catch(error => console.error('Unable to get token.', error));
}

function getItems() {
    fetch(uriTodoLists)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addUserIdTextbox = document.getElementById('userId');

    const item = {
        name: addNameTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        ownerId: addUserIdTextbox.value.trim()
    };

    fetch(uriTodoLists, {
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
            addDescriptionTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uriTodoLists}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todosList.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-description').value = item.description;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        name: document.getElementById('edit-name').value.trim(),
        description: document.getElementById('edit-description').value.trim()
    };

    fetch(`${uriTodoLists}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayItems(data) {
    const tBody = document.getElementById('myLists');
    tBody.innerHTML = '';
    
    data.forEach(item => {
        let myDiv = `<div class="jumbotron">`;
        myDiv += `  <h1 class="display-4" id="name">${item.name}</h1>`;
        myDiv += `  <p class="lead" id="description">${item.description}</p>`;

        myDiv += `<div class="table-responsive" style="margin-top: 20px">`;
        myDiv += `    <table class="table table-hover text-center">`;
        myDiv += `        <tr class="text-primary">`;
        myDiv += `            <th width="20%">Är utförd?</th>`;
        myDiv += `            <th width="20%">Namn</th>`;
        myDiv += `            <th width="20%">Tags</th>`;
        myDiv += `            <th width="20%"></th>`;
        myDiv += `            <th width="20%"></th>`;
        myDiv += `        </tr>`;
        myDiv += `        <tbody id="todoItem${item.id}"></tbody>`;
        myDiv += `    </table>`;
        myDiv += `</div>`;

        
        myDiv += `<input type="submit" class="btn btn-success" onclick="displayEditForm(${item.id})" value="Redigera lista">`;
        myDiv += `<input type="submit" class="btn btn-danger" onclick="deleteItem(${item.id})" value="Ta bort lista" style="margin-left: 20px;">`;
        myDiv += `</div>`;
        myDiv += `</div>`;

        tBody.innerHTML += myDiv;
        getItemsTodoItems(item.id);
    });
    todosList = data;
}

 