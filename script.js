const produtos = [
    {
      "id": 1,
      "nome": "Camiseta",
      "preco": 29.99,
      "descricao": "Camiseta 100% algodão, tamanho M",
      "imagem": "img/ocular.jpg"
    },
    {
      "id": 2,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/ocular2.jpg"
    },
    {
      "id": 3,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/ocular3.jpg"
    }
    ,
    {
      "id": 4,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/ocular4.jpg"
    }
    ,
    {
      "id": 5,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/camiseta1.jpg"
    }
    ,
    {
      "id": 6,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/camiseta2.jpg"
    }
    ,
    {
      "id": 7,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/camiseta3.jpg"
    }
    ,
    {
      "id": 8,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/blusao1.jpg"
    }
    ,
    {
      "id": 9,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/blusao2.jpg"
    }
    ,
    {
      "id": 10,
      "nome": "Calça",
      "preco": 59.99,
      "descricao": "Calça jeans, tamanho 32",
      "imagem": "img/calca1.jpg"
    }
  ];

const carrinho = [];

function exibirCarrinho() {
    const modalCarrinho = document.getElementById("modal-carrinho");
    modalCarrinho.style.display = "block";
  
    const containerCarrinho = document.getElementById("cart-container");
    containerCarrinho.innerHTML = "";
  
    if (carrinho.length === 0) {
      containerCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
      return;
    }
  
    carrinho.forEach(item => {
      const divItemCarrinho = document.createElement("div");
      divItemCarrinho.innerHTML = `
        <h3>${item.nome}</h3>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
        <p>Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
        <button onclick="removerDoCarrinho(${item.id})">Remover</button>
      `;
      containerCarrinho.appendChild(divItemCarrinho);
    });
  
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const divTotal = document.createElement("div");
    divTotal.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    containerCarrinho.appendChild(divTotal);
}
function abrirModalCarrinho() {
  const modalCarrinho = document.getElementById("modal-carrinho");
  modalCarrinho.style.display = "block";
}

function fecharModalCarrinho() {
  const modalCarrinho = document.getElementById("modal-carrinho");
  modalCarrinho.style.display = "none";
}
function removerDoCarrinho(id) {
    const itemIndex = carrinho.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      if (carrinho[itemIndex].quantidade > 1) {
        carrinho[itemIndex].quantidade--;
      } else {
        carrinho.splice(itemIndex, 1);
      }
      atualizarCarrinho();
    }
}  

function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    const itemCarrinho = carrinho.find(item => item.id === id);
    
    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
      
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const containerCarrinho = document.getElementById("cart-container");
    containerCarrinho.innerHTML = "";
  
    if (carrinho.length === 0) {
      containerCarrinho.innerHTML = "<p>O carrinho está vazio.</p>";
      return;
    }
  
    carrinho.forEach(item => {
      const divItemCarrinho = document.createElement("div");
      divItemCarrinho.innerHTML = `
        <h3>${item.nome}</h3>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
        <p>Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
        <button onclick="removerDoCarrinho(${item.id})">Remover</button>
      `;
      containerCarrinho.appendChild(divItemCarrinho);
    });
  
    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const divTotal = document.createElement("div");
    divTotal.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    containerCarrinho.appendChild(divTotal);
}
  
exibirCarrinho();

function enviarPedidoWhatsApp() {
    const telefone = "989467822";
    let mensagem = "Pedido:\n";

    carrinho.forEach(item => {
        mensagem += `${item.nome} - ${item.quantidade} unidade(s)\n`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    mensagem += "Total: R$ " + total.toFixed(2);

    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefone}&text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp);
}

function exibirProdutos() {
    const containerProdutos = document.getElementById("product-container");
    console.log(produtos.id);
    produtos.forEach(produto => {
        const divProduto = document.createElement("div");
        divProduto.innerHTML = `
            <div class="product">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
            </div>
            `;
        containerProdutos.appendChild(divProduto);
    });
}

  

exibirProdutos();

