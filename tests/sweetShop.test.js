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

  // ✅ Make sure these are also inside the describe block
  test('should delete a sweet by ID', () => {
    const sweet1 = { id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 };
    const sweet2 = { id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 };
    
    shop.addSweet(sweet1);
    shop.addSweet(sweet2);

    shop.deleteSweet('1001');

    const sweets = shop.getAllSweets();
    expect(sweets).not.toContainEqual(sweet1);
    expect(sweets).toContainEqual(sweet2);
  });

  test('should throw an error when trying to delete a non-existent sweet', () => {
    expect(() => shop.deleteSweet('9999')).toThrow('Sweet with this ID does not exist');
  });

    test('should search sweets by name (case-insensitive)', () => {
    shop.addSweet({ id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });

    const result = shop.searchByName('kaju');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Kaju Katli');
  });

  test('should search sweets by category (case-insensitive)', () => {
    shop.addSweet({ id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });

    const result = shop.searchByCategory('milk-based');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gulab Jamun');
  });

  test('should search sweets within a price range', () => {
    shop.addSweet({ id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: '1003', name: 'Candy', category: 'Sugar-Based', price: 10, quantity: 50 });

    const result = shop.searchByPriceRange(20, 40);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gulab Jamun');
  });

});
