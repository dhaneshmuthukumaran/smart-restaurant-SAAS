import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  STAFF, MENU, TABLES, INITIAL_ORDERS, INITIAL_INVENTORY_ALERTS,
  INITIAL_NOTIFICATIONS, generateOrderId,
} from "../data/mockData";

const AppContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

export function AppProvider({ children }) {
  const [currentStaff, setCurrentStaff] = useState(() => load("fo_currentStaff", null));
  const [shift, setShift] = useState(() => load("fo_shift", null)); // { staffId, clockIn, clockOut }
  const [orders, setOrders] = useState(() => load("fo_orders", INITIAL_ORDERS));
  const [tables, setTables] = useState(() => load("fo_tables", TABLES));
  const [menu, setMenu] = useState(() => load("fo_menu", MENU));
  const [notifications, setNotifications] = useState(() => load("fo_notifications", INITIAL_NOTIFICATIONS));
  const [inventoryAlerts] = useState(INITIAL_INVENTORY_ALERTS);
  const [orderSeq, setOrderSeq] = useState(() => load("fo_orderSeq", 0));

  useEffect(() => save("fo_currentStaff", currentStaff), [currentStaff]);
  useEffect(() => save("fo_shift", shift), [shift]);
  useEffect(() => save("fo_orders", orders), [orders]);
  useEffect(() => save("fo_tables", tables), [tables]);
  useEffect(() => save("fo_menu", menu), [menu]);
  useEffect(() => save("fo_notifications", notifications), [notifications]);
  useEffect(() => save("fo_orderSeq", orderSeq), [orderSeq]);

  // ---- Auth ----
  function loginWithPassword(email, password) {
    const found = STAFF.find((s) => s.email.toLowerCase() === email.toLowerCase() && s.password === password);
    if (found) { setCurrentStaff(found); return { ok: true }; }
    return { ok: false, error: "Email or password is incorrect." };
  }
  function loginWithPin(pin) {
    const found = STAFF.find((s) => s.pin === pin);
    if (found) { setCurrentStaff(found); return { ok: true }; }
    return { ok: false, error: "That PIN doesn't match anyone on staff." };
  }
  function loginWithGoogle() {
    // Stubbed OAuth — in production this redirects to Google and the backend verifies the token.
    setCurrentStaff(STAFF[0]);
    return { ok: true };
  }
  function logout() {
    setCurrentStaff(null);
  }

  // ---- Shift ----
  function clockIn() {
    if (!currentStaff) return;
    setShift({ staffId: currentStaff.id, clockIn: Date.now(), clockOut: null });
    pushNotification("system", `${currentStaff.name} clocked in.`);
  }
  function clockOut() {
    setShift((prev) => (prev ? { ...prev, clockOut: Date.now() } : prev));
    if (currentStaff) pushNotification("system", `${currentStaff.name} clocked out.`);
  }
  const isClockedIn = !!(shift && shift.staffId === currentStaff?.id && !shift.clockOut);

  // ---- Notifications ----
  function pushNotification(type, message) {
    setNotifications((prev) => [{ id: `n${Date.now()}`, type, message, time: Date.now(), read: false }, ...prev]);
  }
  function markNotificationRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }
  function markAllNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ---- Orders ----
  function createOrder(orderDraft) {
    const id = generateOrderId(orderSeq);
    setOrderSeq((s) => s + 1);
    const order = {
      id,
      status: "new",
      createdAt: Date.now(),
      staffId: currentStaff?.id ?? null,
      discount: 0,
      ...orderDraft,
    };
    setOrders((prev) => [order, ...prev]);
    if (order.tableId) {
      setTables((prev) => prev.map((t) => (t.id === order.tableId ? { ...t, status: "occupied" } : t)));
    }
    pushNotification("order", `${id} placed for ${order.customer}`);
    return order;
  }
  function updateOrder(id, patch) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }
  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    const order = orders.find((o) => o.id === id);
    if (status === "ready" && order) pushNotification("kitchen", `${id} is ready for ${order.type === "dine-in" ? order.customer : "pickup"}`);
    if (status === "completed" && order?.tableId) {
      setTables((prev) => prev.map((t) => (t.id === order.tableId ? { ...t, status: "free" } : t)));
    }
  }
  function cancelOrder(id, reason) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "cancelled", cancelReason: reason } : o)));
    const order = orders.find((o) => o.id === id);
    if (order?.tableId) setTables((prev) => prev.map((t) => (t.id === order.tableId ? { ...t, status: "free" } : t)));
    pushNotification("order", `${id} was cancelled${reason ? `: ${reason}` : ""}`);
  }
  function setTableStatus(tableId, status) {
    setTables((prev) => prev.map((t) => (t.id === tableId ? { ...t, status } : t)));
  }

  const value = useMemo(() => ({
    staffDirectory: STAFF,
    currentStaff, loginWithPassword, loginWithPin, loginWithGoogle, logout,
    shift, isClockedIn, clockIn, clockOut,
    orders, createOrder, updateOrder, updateOrderStatus, cancelOrder,
    tables, setTableStatus,
    menu, setMenu,
    notifications, pushNotification, markNotificationRead, markAllNotificationsRead, unreadCount,
    inventoryAlerts,
  }), [currentStaff, shift, isClockedIn, orders, tables, menu, notifications, unreadCount, inventoryAlerts]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
