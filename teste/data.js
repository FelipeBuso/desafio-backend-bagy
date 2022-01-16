const novoCliente = {
    nomeCompleto: "Joao Augusto",
    email: "joaoaugusto@teste.com",
    cpf: "12345678910",
    dataDeNascimento: "01/01/2001",
};

const novoEndereco = {
    clienteId: 1,
    rua: "Rua undefined",
    bairro: "Centro",
    cidade: "Cidade",
    estado: "Estado",
    pais: "Pais",
    cep: 12345678,
    numero: 321,
    complemento: "teste-comp"
};

const novoProduto = [
    {
        nome: "celular",
        imagem:  "http://loja.com/api/cel.img",
        descricao: "celular de teste",
        peso: 0.68,
        preco: 1100.99,
        quantidadeEmEstoque: 10, 
    },
    {
        nome: "tv",
        imagem:  "http://loja.com/api/tv.img",
        descricao: "tv de teste",
        peso: 2.0,
        preco: 2499.99,
        quantidadeEmEstoque: 7, 
    }

];

const novoPedido = {
    clienteId = 1,
};

const novoProdutosPedido = [
    {
        pedidoId: 1,
        produtoId: 1,
        quantidade: 1
    },
    {
        pedidoId: 1,
        produtoId: 2,
        quantidade: 1
    },
]