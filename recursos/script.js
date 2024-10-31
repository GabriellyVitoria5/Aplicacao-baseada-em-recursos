// consultar todos os dados do arquito data.txt e mostrar na tabela
fetch('http://127.0.0.1:5000/all')
    .then(response => response.json()) // converter resposta do servidor para JSON
    .then(data => {
        const table = document.getElementById("recordsTable");

        // adiciona linhas na tabela
        data.forEach(record => {
            const row = document.createElement('tr');
            const nameRecord = document.createElement('td');
            const emailRecord = document.createElement('td');
            const deleteRecordButton = document.createElement('td');

            nameRecord.textContent = record.name;
            emailRecord.textContent = record.email;

            // criar botão de deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Deletar";
            deleteButton.onclick = () => deleteRecord(record.name, row); 
            deleteRecordButton.appendChild(deleteButton);

            row.appendChild(nameRecord);
            row.appendChild(emailRecord);
            row.appendChild(deleteRecordButton);
            table.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching records:', error);
    });

// filtrar a tabela com base no que o usuário digita
function searchRecord() {
    const searchedRecord = document.getElementById('searchInput').value.toLowerCase();
    const table = document.getElementById('recordsTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const nameRecord = rows[i].getElementsByTagName('td')[0];
        const emailRecord = rows[i].getElementsByTagName('td')[1];

        if (nameRecord || emailRecord) {
            const nameValue = nameRecord.textContent || nameRecord.innerText;
            const emailValue = emailRecord.textContent || emailRecord.innerText;

            // verifica se o valor do input está contido no nome ou email
            if (nameValue.toLowerCase().includes(searchedRecord) || emailValue.toLowerCase().includes(searchedRecord)) {
                rows[i].style.display = ""; // exibe a linha se corresponder
            } else {
                rows[i].style.display = "none"; // oculta a linha se não corresponder
            }
        }
    }
}

// adicionar registro na tabela 
function addRecord() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if(name.length != 0 || email.length != 0){
        // cria novo registro
        const newRecord = {
            name: name,
            email: email
        };

        // envia a requisição POST para criar um novo registro
        fetch("http://127.0.0.1:5000/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UFT-8'
            },
            body: JSON.stringify(newRecord)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('error to add new record');
            }
            return response.json();
        })
        .then(record => {
            // adicionar o novo registro na tabela
            const table = document.getElementById("recordsTable");
        
            const row = document.createElement('tr');
            const nameRecord = document.createElement('td');
            const emailRecord = document.createElement('td');
            const deleteRecordButton = document.createElement('td');

            nameRecord.textContent = record.name;
            emailRecord.textContent = record.email;

            // criar botão de deletar para o novo registro
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deleteRecord(record.name, row); 
            deleteRecordButton.appendChild(deleteButton);

            row.appendChild(nameCell);
            row.appendChild(emailCell);
            row.appendChild(deleteRecordButton);
            table.appendChild(row);

            // limpar os campos do formulário
            document.getElementById('record-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    else{
        console.error("Um ou mais campos em branco");
    }
}

// deletar um registro pelo nome
function deleteRecord(name, row) {
    fetch('http://127.0.0.1:5000/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error deleting record');
        }
        row.remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateRecord() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const method = document.querySelector('input[name="method"]:checked').value;

    const updatedRecord = {};
    if (name) updatedRecord.name = name;
    if (email) updatedRecord.email = email;

    const url = method === 'patch' ? `http://127.0.0.1:5000/?name=${name}` : 'http://127.0.0.1:5000/';

    fetch(url, {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecord)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error updating record with ${method}`);
        }
        return response.json();
    })
    .then(() => {
        // limpar o formulário após a edição
        document.getElementById('record-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
