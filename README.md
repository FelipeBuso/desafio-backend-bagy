# desafio-backend-bagy

## Clonando o projeto
- no diretorio escolhido digitar:
```
git clone git@github.com:FelipeBuso/desafio-backend-bagy.git
```

## Instalando as dependências
- entrar no diretorio onde clonou o projeto e digitar
```
npm install
```
ou 
```
yarn
```

## Rodando o projeto
- No diretorio, digitar:
```
npm start
```
ou 
```
yarn start
```

## Docker
- Este projeto está configurado para rodar em um container. Para iniciar o projeto com docker:
  - Digite os comandos: 
  
  -``` docker build -t {nome_do_container}``` //Cria o container
  
  -``` docker run -p 3003:3003 -d {nome_do_container}```
  
 ## Documentação
  
  ### Mutations
  - Cliente:
    ```
    createCliente(
    id,
    nomeCompleto!: "Nome_liente",
    email!: "email_cliente",
    cpf!: "cpf_cliente",
    dataDeNascimento!: "dd/mm/yyyy",
    ) {}
    ```
    -Endereço:
    ```
    createEndereco(
      id,
      clienteId!: INTERGER,
      rua!: "rua_cliente",
      bairro!: "bairro ",
      cidade!: "Cidade",
      estado!: "Estado",
      pais!: "Pais",
      cep!: 12345678,
      numero!: 321,
      complemento: "teste-comp" 
    ) {}
    ```
  
    
  
