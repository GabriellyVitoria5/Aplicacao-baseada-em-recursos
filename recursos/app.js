// consultar todos os dados do arquito data.txt e mostrar na tabela
fetch('http://127.0.0.1:5000/all')
    .then(response => response.json()) // converter resposta do servidor para JSON
    .then(data => {
        const recordsTable = document.getElementById("recordsTable");

        // adiciona linhas na tabela
        data.forEach(record => {
            const row = document.createElement('tr');
            const nameRecord = document.createElement('td');
            const emailRecord = document.createElement('td');

            nameRecord.textContent = record.name;
            emailRecord.textContent = record.email;

            row.appendChild(nameRecord);
            row.appendChild(emailRecord);
            recordsTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching records:', error);
    });

// filtrar a tabela com base no que o usuário digita
function filterTable() {
    const searchedRecord = document.getElementById('search-input').value.toLowerCase();
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
