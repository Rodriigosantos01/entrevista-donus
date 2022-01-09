# entrevista-donus
- Instalação
	1. Precisa ter rodando em sua maquina um banco de dados MySql
	2. Criar o banco de dados com o nome "donus"
	3. Configurar o arquivo de conexão do banco de dados "api/config/config.json" na parte "development"
	4. Roda o comando "npm i" na pasta raiz do projeto.
	5. Roda o seguinte comando para criar as tabelas no banco de dados "npx sequelize-cli db:migrate"
	6. Roda o seguinte comando para criar alguns registros no banco de dados na tabela status "npx sequelize-cli db:seed:all"
	7. Testar a api validando os itens do teste
- Considerações
	1. Foi criado alguns endpoints para facilitar o testes do teste. rsrs
		1. Para consultar conta por cpf.
		2. Para consultar todas as contas.
		3. Para buscar todas ações (Deposito e transferência).
- Endpoints
	1. Criar conta.
		localhost:3000/user
	1. Deposito.
		localhost:3000/account/deposit
	1. Transferencia
		localhost:3000/account/transfer
	1. Buscar conta por CPF.
		localhost:3000/user/2
	1. Buscar todas as contas.
		localhost:3000/user
	1. Buscar todas as transações.
		localhost:3000/account/transfer
