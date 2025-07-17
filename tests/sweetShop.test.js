const { SweetShop } = require('../src/sweetShop');

describe('SweetShop', () => {
  let shop;

  beforeEach(() => {
    shop = new SweetShop();
  });

  test('should add a sweet to the inventory', () => {
    const sweet = {
      id: '1001',
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };
    shop.addSweet(sweet);
    expect(shop.getAllSweets()).toContainEqual(sweet);
  });

  test('should throw error if sweet with same ID already exists', () => {
    const sweet = {
      id: '1001',
      name: 'Kaju Katli',
      category: 'Nut-Based',
      price: 50,
      quantity: 20
    };
    shop.addSweet(sweet);
    expect(() => shop.addSweet(sweet)).toThrow('Sweet with this ID already exists');
  });
});
