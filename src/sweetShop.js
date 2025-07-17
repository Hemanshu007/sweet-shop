class SweetShop {
  constructor() {
    this.inventory = [];
  }

  addSweet(sweet) {
    const exists = this.inventory.find(item => item.id === sweet.id);
    if (exists) {
      throw new Error('Sweet with this ID already exists');
    }
    this.inventory.push(sweet);
  }

  getAllSweets() {
    return this.inventory;
  }

  deleteSweet(id) {
    const index = this.inventory.findIndex(sweet => sweet.id === id);
    if (index === -1) {
      throw new Error('Sweet with this ID does not exist');
    }
    this.inventory.splice(index, 1);
  }

    searchByName(name) {
    return this.inventory.filter(sweet =>
      sweet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  searchByCategory(category) {
    return this.inventory.filter(sweet =>
      sweet.category.toLowerCase() === category.toLowerCase()
    );
  }

  searchByPriceRange(min, max) {
    return this.inventory.filter(sweet =>
      sweet.price >= min && sweet.price <= max
    );
  }
 
    sortSweets(field) {
    const validFields = ['price', 'name', 'quantity'];
    if (!validFields.includes(field)) {
      throw new Error('Invalid sort field');
    }

    return [...this.inventory].sort((a, b) => {
      if (typeof a[field] === 'string') {
        return a[field].localeCompare(b[field]);
      } else {
        return a[field] - b[field];
      }
    });
  }

    purchaseSweet(id, quantity) {
    const sweet = this.inventory.find(item => item.id === id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    if (sweet.quantity < quantity) {
      throw new Error('Not enough stock to complete the purchase');
    }
    sweet.quantity -= quantity;
  }

    restockSweet(id, quantity) {
    const sweet = this.inventory.find(item => item.id === id);
    if (!sweet) {
      throw new Error('Sweet not found');
    }
    sweet.quantity += quantity;
  }


}

module.exports = { SweetShop };

