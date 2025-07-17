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
}

module.exports = { SweetShop };
