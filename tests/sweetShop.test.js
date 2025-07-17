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
    test('should sort sweets by price (ascending)', () => {
    shop.addSweet({ id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: '1003', name: 'Candy', category: 'Sugar-Based', price: 10, quantity: 40 });

    const result = shop.sortSweets('price');
    expect(result[0].price).toBe(10);
    expect(result[2].price).toBe(50);
  });

  test('should sort sweets by name (alphabetically)', () => {
    shop.addSweet({ id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: '1003', name: 'Candy', category: 'Sugar-Based', price: 10, quantity: 40 });

    const result = shop.sortSweets('name');
    expect(result[0].name).toBe('Candy');
    expect(result[2].name).toBe('Kaju Katli');
  });

  test('should sort sweets by quantity (ascending)', () => {
    shop.addSweet({ id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: '1003', name: 'Candy', category: 'Sugar-Based', price: 10, quantity: 40 });

    const result = shop.sortSweets('quantity');
    expect(result[0].quantity).toBe(15);
    expect(result[2].quantity).toBe(40);
  });

  test('should throw an error if sorting field is invalid', () => {
    expect(() => shop.sortSweets('invalidField')).toThrow('Invalid sort field');
  });


    test('should reduce stock when sweets are purchased', () => {
    const sweet = { id: '1001', name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 };
    shop.addSweet(sweet);

    shop.purchaseSweet('1001', 5);
    const updated = shop.getAllSweets().find(s => s.id === '1001');
    expect(updated.quantity).toBe(15);
  });

  test('should throw error if purchasing more than available stock', () => {
    const sweet = { id: '1002', name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 10 };
    shop.addSweet(sweet);

    expect(() => shop.purchaseSweet('1002', 15)).toThrow('Not enough stock to complete the purchase');
  });

  test('should throw error if sweet ID is invalid during purchase', () => {
    expect(() => shop.purchaseSweet('9999', 1)).toThrow('Sweet not found');
  });


    test('should increase stock when sweets are restocked', () => {
    const sweet = { id: '1003', name: 'Candy', category: 'Sugar-Based', price: 10, quantity: 40 };
    shop.addSweet(sweet);

    shop.restockSweet('1003', 20);
    const updated = shop.getAllSweets().find(s => s.id === '1003');
    expect(updated.quantity).toBe(60);
  });

  test('should throw error if sweet ID is invalid during restock', () => {
    expect(() => shop.restockSweet('9999', 5)).toThrow('Sweet not found');
  });


});
