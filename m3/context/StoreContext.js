import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext(null);

const initialProducts = [
  { id: '1', nama: 'Espresso Single Origin', harga: 18000 },
  { id: '2', nama: 'Kopi Susu Gula Aren', harga: 22000 },
  { id: '3', nama: 'Americano Ice/Hot', harga: 20000 },
  { id: '4', nama: 'Matcha Latte Cream', harga: 25000 },
  { id: '5', nama: 'Chocolate Ice Blend', harga: 23000 },
  { id: '6', nama: 'Croissant Butter', harga: 15000 },
];

const initialCustomers = [
  { id: '1', nama: 'Budi Santoso', email: 'budi@gmail.com', kategori: 'Gold Member' },
  { id: '2', nama: 'Siti Rahma', email: 'siti@yahoo.com', kategori: 'Silver Member' },
  { id: '3', nama: 'Andi Pratama', email: 'andi@gmail.com', kategori: 'Regular' },
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const value = {
    products,
    customers,
    cart,
    orders,
    addProduct: (product) => setProducts((current) => [
      { ...product, id: Date.now().toString() },
      ...current,
    ]),
    updateProduct: (id, updates) => setProducts((current) =>
      current.map((product) => product.id === id ? { ...product, ...updates } : product)
    ),
    deleteProduct: (id) => {
      setProducts((current) => current.filter((product) => product.id !== id));
      setCart((current) => current.filter((item) => item.id !== id));
    },
    addCustomer: (customer) => setCustomers((current) => [
      { ...customer, id: Date.now().toString() },
      ...current,
    ]),
    updateCustomer: (id, updates) => setCustomers((current) =>
      current.map((customer) => customer.id === id ? { ...customer, ...updates } : customer)
    ),
    deleteCustomer: (id) => setCustomers((current) => current.filter((customer) => customer.id !== id)),
    addToCart: (product) => setCart((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...current, { ...product, qty: 1 }];
    }),
    changeCartQuantity: (id, change) => setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, qty: item.qty + change } : item)
        .filter((item) => item.qty > 0)
    ),
    removeFromCart: (id) => setCart((current) => current.filter((item) => item.id !== id)),
    checkout: () => {
      if (cart.length === 0) return null;
      const order = {
        id: Date.now().toString(),
        items: cart,
        total: cart.reduce((total, item) => total + item.harga * item.qty, 0),
        createdAt: new Date().toISOString(),
      };
      setOrders((current) => [order, ...current]);
      setCart([]);
      return order;
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore harus digunakan di dalam StoreProvider.');
  }
  return context;
}
