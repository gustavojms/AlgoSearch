// Definindo a classe nó da árvore binária
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Definindo a árvore binária
class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Inserindo um novo nó na árvore
  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // Função auxiliar para inserção de nós na árvore
  insertNode(node, newNode) {
    const comparison = newNode.value.toLowerCase().localeCompare(node.value.toLowerCase());
    if (comparison < 0) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // Realizando a busca na árvore
  search(keyword) {
    return this.searchNode(this.root, keyword.toLowerCase());
  }

  // Função auxiliar para busca na árvore
  searchNode(node, keyword) {
    if (node === null) {
      return null;
    }

    if (node.value.toLowerCase().includes(keyword)) {
      return node.value;
    } else if (keyword.localeCompare(node.value.toLowerCase()) < 0) {
      return this.searchNode(node.left, keyword);
    } else {
      return this.searchNode(node.right, keyword);
    }
  }
}

// Exemplo de uso
const tree = new BinaryTree();

// Inserindo URLs na árvore
tree.insert("www.google.com");
tree.insert("www.facebook.com");
tree.insert("www.youtube.com");
tree.insert("www.classroom.com");


function search() {
  const searchInput = document.getElementById("searchInput");
  const searchResult = document.getElementById("searchResult");
  const keyword = searchInput.value;

  // Realizando a busca
  const result = tree.search(keyword);

  // Exibindo o resultado da busca
  if (result) {
    searchResult.innerHTML = "URL encontrado: " + result;
  } else {
    searchResult.innerHTML = "URL não encontrado.";
  }
}

// Função para exibir a árvore
function displayTree() {
  const treeDisplay = document.getElementById("treeDisplay");
  treeDisplay.innerHTML = ""; // Limpa o conteúdo anterior

  const ul = document.createElement("ul");
  traverseTree(tree.root, ul); // Inicia a função de percurso da árvore a partir da raiz

  // Função para percorrer a árvore (em ordem)
  function traverseTree(node, parentElement) {
    if (node !== null) {
      const li = document.createElement("li");
      li.textContent = node.value;

      const ulLeft = document.createElement("ul");
      traverseTree(node.left, ulLeft);

      const ulRight = document.createElement("ul");
      traverseTree(node.right, ulRight);

      if (ulLeft.childElementCount > 0) {
        li.appendChild(ulLeft);
      }

      if (ulRight.childElementCount > 0) {
        li.appendChild(ulRight);
      }

      parentElement.appendChild(li);
    }
  }

  // Exibe a representação visual da árvore
  if (ul.childElementCount > 0) {
    treeDisplay.appendChild(ul);
  }
}
