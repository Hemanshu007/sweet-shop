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
}

module.exports = { SweetShop };

