// Mock data layer — stands in for the backend API until MERN endpoints are wired in.
// Every function here is written so swapping to real fetch() calls later is a 1:1 replacement.

export const STAFF = [
  { id: "s1", name: "Ananya Rao", role: "Waiter", pin: "1234", email: "ananya@floorops.test", password: "password", avatarColor: "#4c8dbf" },
  { id: "s2", name: "Karthik Iyer", role: "Cashier", pin: "2345", email: "karthik@floorops.test", password: "password", avatarColor: "#e8a33d" },
  { id: "s3", name: "Divya Menon", role: "Kitchen Staff", pin: "3456", email: "divya@floorops.test", password: "password", avatarColor: "#3fae68" },
  { id: "s4", name: "Suresh Babu", role: "Shift Manager", pin: "4567", email: "suresh@floorops.test", password: "password", avatarColor: "#d6534a" },
];

export const MENU = [
  { id: "m1", name: "Paneer Butter Masala", category: "Main", price: 240, veg: true, available: true },
  { id: "m2", name: "Chicken Chettinad", category: "Main", price: 320, veg: false, available: true },
  { id: "m3", name: "Masala Dosa", category: "Breakfast", price: 90, veg: true, available: true },
  { id: "m4", name: "Mutton Biryani", category: "Main", price: 380, veg: false, available: false },
  { id: "m5", name: "Filter Coffee", category: "Beverage", price: 40, veg: true, available: true },
  { id: "m6", name: "Gulab Jamun", category: "Dessert", price: 80, veg: true, available: true },
  { id: "m7", name: "Veg Fried Rice", category: "Main", price: 180, veg: true, available: true },
  { id: "m8", name: "Butter Naan", category: "Bread", price: 45, veg: true, available: true },
  { id: "m9", name: "Fish Fry", category: "Starter", price: 260, veg: false, available: true },
  { id: "m10", name: "Sweet Lassi", category: "Beverage", price: 70, veg: true, available: true },
];

export const TABLES = Array.from({ length: 16 }, (_, i) => {
  const id = `t${i + 1}`;
  const seats = [2, 2, 4, 4, 4, 6, 2, 4, 4, 6, 2, 4, 8, 4, 2, 4][i];
  const zone = i < 6 ? "Main Hall" : i < 11 ? "Patio" : "Private Dining";
  return { id, number: i + 1, seats, zone, status: "free", x: (i % 4) * 130 + 30, y: Math.floor(i / 4) * 130 + 30 };
});
// Seed a few tables as occupied/reserved
TABLES[2].status = "occupied";
TABLES[5].status = "occupied";
TABLES[8].status = "reserved";
TABLES[12].status = "occupied";
TABLES[13].status = "billing";

export const INITIAL_ORDERS = [
  {
    id: "ORD-1042", type: "dine-in", tableId: "t3", customer: "Table 3",
    items: [
      { menuId: "m1", name: "Paneer Butter Masala", qty: 2, price: 240, notes: "" },
      { menuId: "m8", name: "Butter Naan", qty: 4, price: 45, notes: "" },
    ],
    status: "cooking", createdAt: Date.now() - 1000 * 60 * 12, staffId: "s1", discount: 0,
  },
  {
    id: "ORD-1043", type: "dine-in", tableId: "t6", customer: "Table 6",
    items: [
      { menuId: "m2", name: "Chicken Chettinad", qty: 1, price: 320, notes: "Extra spicy" },
      { menuId: "m5", name: "Filter Coffee", qty: 2, price: 40, notes: "" },
    ],
    status: "new", createdAt: Date.now() - 1000 * 60 * 3, staffId: "s1", discount: 0,
  },
  {
    id: "ORD-1044", type: "takeaway", tableId: null, customer: "Priya S.",
    items: [
      { menuId: "m3", name: "Masala Dosa", qty: 3, price: 90, notes: "" },
    ],
    status: "ready", createdAt: Date.now() - 1000 * 60 * 20, staffId: "s2", discount: 10,
  },
  {
    id: "ORD-1045", type: "delivery", tableId: null, customer: "Rahul M.",
    address: "12, Anna Nagar, Coimbatore", phone: "98765 43210",
    items: [
      { menuId: "m7", name: "Veg Fried Rice", qty: 1, price: 180, notes: "" },
      { menuId: "m9", name: "Fish Fry", qty: 1, price: 260, notes: "" },
    ],
    status: "cooking", createdAt: Date.now() - 1000 * 60 * 8, staffId: "s2", discount: 0,
  },
  {
    id: "ORD-1041", type: "dine-in", tableId: "t13", customer: "Table 13",
    items: [
      { menuId: "m4", name: "Mutton Biryani", qty: 2, price: 380, notes: "" },
      { menuId: "m10", name: "Sweet Lassi", qty: 2, price: 70, notes: "" },
    ],
    status: "billing", createdAt: Date.now() - 1000 * 60 * 45, staffId: "s4", discount: 5,
  },
  {
    id: "ORD-1039", type: "dine-in", tableId: "t14", customer: "Table 14",
    items: [
      { menuId: "m6", name: "Gulab Jamun", qty: 4, price: 80, notes: "" },
    ],
    status: "completed", createdAt: Date.now() - 1000 * 60 * 90, staffId: "s1", discount: 0,
  },
];

export const INITIAL_INVENTORY_ALERTS = [
  { id: "inv1", item: "Basmati Rice", level: "low", message: "Basmati rice stock below 5kg" },
  { id: "inv2", item: "Paneer", level: "low", message: "Paneer running low — 2 servings left" },
  { id: "inv3", item: "Mutton", level: "out", message: "Mutton is out of stock — Mutton Biryani disabled" },
];

export const INITIAL_NOTIFICATIONS = [
  { id: "n1", type: "order", message: "ORD-1043 placed for Table 6", time: Date.now() - 1000 * 60 * 3, read: false },
  { id: "n2", type: "kitchen", message: "ORD-1044 is ready for pickup", time: Date.now() - 1000 * 60 * 6, read: false },
  { id: "n3", type: "inventory", message: "Mutton is out of stock", time: Date.now() - 1000 * 60 * 30, read: true },
  { id: "n4", type: "table", message: "Table 8 reservation arriving in 15 min", time: Date.now() - 1000 * 60 * 10, read: false },
  { id: "n5", type: "system", message: "Shift handover notes added by Suresh Babu", time: Date.now() - 1000 * 60 * 120, read: true },
];

export function generateOrderId(seq) {
  return `ORD-${1046 + seq}`;
}
