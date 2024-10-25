// Fetch all records and display in the table
fetch('http://127.0.0.1:5000/all')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector("#recordsTable tbody");

        // Se for uma lista, adiciona linhas na tabela
        data.forEach(record => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const emailCell = document.createElement('td');

            nameCell.textContent = record.name;
            emailCell.textContent = record.email;

            row.appendChild(nameCell);
            row.appendChild(emailCell);
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching records:', error);
    });
