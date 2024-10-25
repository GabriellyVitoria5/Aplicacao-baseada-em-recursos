// consultar todos os dados do arquito data.txt e mostrar na tabela
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

// filtrar a tabela com base no que o usuário digita
function filterTable() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('recordsTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const nameCell = rows[i].getElementsByTagName('td')[0];
        const emailCell = rows[i].getElementsByTagName('td')[1];

        if (nameCell || emailCell) {
            const nameValue = nameCell.textContent || nameCell.innerText;
            const emailValue = emailCell.textContent || emailCell.innerText;

            // verifica se o valor do input está contido no nome ou email
            if (nameValue.toLowerCase().indexOf(filter) > -1 || emailValue.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = ""; // exibe a linha se corresponder
            } else {
                rows[i].style.display = "none"; // oculta a linha se não corresponder
            }
        }
    }
    
}
