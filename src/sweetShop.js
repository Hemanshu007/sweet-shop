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

}

module.exports = { SweetShop };

