import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import FloorPlan from "./pages/FloorPlan";
import KDS from "./pages/KDS";
import Billing from "./pages/Billing";
import OrderHistory from "./pages/OrderHistory";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/floor-plan" element={<FloorPlan />} />
            <Route path="/kds" element={<KDS />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
