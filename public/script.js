class SweetShop {
  constructor() {
    this.inventory = [];
  }

  addSweet(sweet) {
    const exists = this.inventory.find(item => item.id === sweet.id);
    if (exists) throw new Error('Sweet with this ID already exists');
    this.inventory.push(sweet);
  }

  getAllSweets() {
    return this.inventory;
  }

  deleteSweet(id) {
    const index = this.inventory.findIndex(sweet => sweet.id === id);
    if (index === -1) throw new Error('Sweet not found');
    this.inventory.splice(index, 1);
  }

  searchByName(name) {
    return this.inventory.filter(sweet =>
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }
}

const shop = new SweetShop();

document.getElementById('addSweetForm').addEventListener('submit', e => {
  e.preventDefault();
  try {
    const sweet = {
      id: document.getElementById('id').value,
      name: document.getElementById('name').value,
      category: document.getElementById('category').value,
      price: parseFloat(document.getElementById('price').value),
      quantity: parseInt(document.getElementById('quantity').value),
    };
    shop.addSweet(sweet);
    renderSweets();
    e.target.reset();
  } catch (err) {
    alert(err.message);
  }
});

function renderSweets(sweets = shop.getAllSweets()) {
  const tbody = document.querySelector('#sweetTable tbody');
  tbody.innerHTML = '';
  sweets.forEach(sweet => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sweet.id}</td>
      <td>${sweet.name}</td>
      <td>${sweet.category}</td>
      <td>${sweet.price}</td>
      <td>${sweet.quantity}</td>
      <td>
        <button onclick="deleteSweet('${sweet.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function deleteSweet(id) {
  try {
    shop.deleteSweet(id);
    renderSweets();
  } catch (err) {
    alert(err.message);
  }
}

function searchByName() {
  const term = document.getElementById('searchName').value;
  const results = shop.searchByName(term);
  renderSweets(results);
}


