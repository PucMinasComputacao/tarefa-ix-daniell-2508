// =======================
// BASE DE DADOS (JSON)
// =======================
const data = {
  produtos: [
    { id: 1, nome: "iPhone 14", preco: 5000, categoria: "Celulares", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "iPhone top", emEstoque: true },
    { id: 2, nome: "Samsung Galaxy", preco: 3000, categoria: "Celulares", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Samsung potente", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 4500, categoria: "Notebooks", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Notebook rápido", emEstoque: false },
    { id: 4, nome: "MacBook", preco: 8000, categoria: "Notebooks", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Apple premium", emEstoque: true },
    { id: 5, nome: "Mouse Gamer", preco: 200, categoria: "Acessórios", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Mouse RGB", emEstoque: true },
    { id: 6, nome: "Teclado Mecânico", preco: 400, categoria: "Acessórios", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Teclado top", emEstoque: true },
    { id: 7, nome: "PS5", preco: 4500, categoria: "Games", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Console Sony", emEstoque: false },
    { id: 8, nome: "Xbox Series X", preco: 4200, categoria: "Games", imagem: "https://cdn-icons-png.flaticon.com/512/15/15874.png", descricao: "Console Microsoft", emEstoque: true }
  ]
};

// =======================
// SELEÇÃO DOM
// =======================
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

// =======================
// FUNÇÕES
// =======================

// Formatar preço
function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

// Criar card
function createProductCard(produto) {
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.backgroundColor = "#f9f9f9";

  card.innerHTML = `
    <img src="${produto.imagem}">
    <h3>${produto.nome}</h3>
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="details-btn">Ver detalhes</button>
    <button class="highlight-btn">Destacar</button>
  `;

  // Eventos
  card.querySelector(".details-btn").addEventListener("click", () => {
    showProductDetails(produto);
  });

  card.querySelector(".highlight-btn").addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

// Renderizar produtos
function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  // querySelectorAll obrigatório
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

// Renderizar categorias
function renderCategories() {
  const categorias = ["Todas"];

  data.produtos.forEach(p => {
    if (!categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });

  categorySelect.innerHTML = "";

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Mostrar detalhes
function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

// Filtrar produtos
function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto);
    const matchCategoria = categoria === "Todas" || p.categoria === categoria;
    return matchNome && matchCategoria;
  });
}

// =======================
// EVENTOS
// =======================

searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

// =======================
// INICIALIZAÇÃO
// =======================

renderCategories();
renderProducts(data.produtos);