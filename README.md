# Gerenciamento de Registros com Flask e Frontend em HTML

Este projeto consiste em uma aplicação simples baseada em recursos de gerenciamento de registros que utiliza um backend em Flask e um frontend em HTML/JavaScript. A aplicação permite criar, visualizar, atualizar, deletar e pesquisar registros de usuários, que são armazenados em um arquivo de texto no formato JSON.

## Funcionalidades

- **Exibir Registros**: Todos os registros armazenados são exibidos em uma tabela.
- **Pesquisar Registros**: O usuário pode buscar registros pelo nome ou email utilizando um campo de pesquisa. A tabela é filtrada conforme o que o usuário digita.
- **Adicionar Registro**: O usuário pode adicionar novos registros, que serão salvos no arquivo `data.txt`.
- **Atualizar Registro**: É possível atualizar registros existentes com base no nome do usuário usando o método PATCH ou PUT.
- **Deletar Registro**: Um registro pode ser removido com base no nome do usuário.
