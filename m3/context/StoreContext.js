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

const initialPromos = [
  { id: '1', kode: 'WELCOME10', deskripsi: 'Diskon 10% untuk pembelian pertama', diskon: 10, status: true },
  { id: '2', kode: 'HARIINI', deskripsi: 'Promo kopi spesial hari ini', diskon: 15, status: true },
  { id: '3', kode: 'MEMBER', deskripsi: 'Bonus member untuk pelanggan loyal', diskon: 20, status: false },
];

const initialTransactions = [
  { id: 'T-1001', createdAt: '2025-01-14T09:15:00.000Z', total: 54000, items: [{ nama: 'Espresso Single Origin', qty: 2, harga: 18000 }] },
  { id: 'T-1002', createdAt: '2025-01-15T14:20:00.000Z', total: 72000, items: [{ nama: 'Kopi Susu Gula Aren', qty: 2, harga: 22000 }, { nama: 'Croissant Butter', qty: 2, harga: 15000 }] },
  { id: 'T-1003', createdAt: '2025-01-16T18:40:00.000Z', total: 47000, items: [{ nama: 'Americano Ice/Hot', qty: 1, harga: 20000 }, { nama: 'Matcha Latte Cream', qty: 1, harga: 25000 }] },
];

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [promos, setPromos] = useState(initialPromos);
  const [transactions, setTransactions] = useState(initialTransactions);

  const value = {
    products,
    customers,
    cart,
    orders,
    promos,
    transactions,
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
    addPromo: (newPromo) => {
      const promo = {
        id: Date.now().toString(),
        kode: newPromo.kode.toUpperCase(),
        deskripsi: newPromo.deskripsi,
        diskon: Number(newPromo.diskon) || 0,
        status: true,
      };
      setPromos((current) => [promo, ...current]);
      return promo;
    },
    checkout: () => {
      if (cart.length === 0) return null;
      const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
      const order = {
        id: Date.now().toString(),
        items: cart,
        total,
        createdAt: new Date().toISOString(),
      };
      setOrders((current) => [order, ...current]);
      setTransactions((current) => [{
        id: `TRX-${Date.now().toString().slice(-6)}`,
        createdAt: order.createdAt,
        total,
        items: cart,
      }, ...current]);
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
