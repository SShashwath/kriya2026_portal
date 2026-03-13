import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import ShipLanding from "./pages/ShipLanding";
import Anchorage from "./pages/Anchorage";
import SeaSolve from "./pages/SeaSolve";
import MapPage from "./components/MapPage";
import AdminPage from "./components/AdminPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import OtpPage from "./pages/OtpPage";
import PirateArena from "./PirateArena";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function TempNav() {
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.8)", padding: "10px", display: "flex", gap: "15px", zIndex: 99999, overflowX: "auto", fontFamily: "sans-serif" }}>
      <Link to="/codequest" style={{ color: "white" }}>Signup</Link>
      <Link to="/codequest/login" style={{ color: "white" }}>Login</Link>
      <Link to="/codequest/otp" style={{ color: "white" }}>OTP</Link>
      <Link to="/codequest/shiplanding" style={{ color: "white" }}>ShipLanding</Link>
      <Link to="/codequest/anchorage" style={{ color: "white" }}>Anchorage</Link>
      <Link to="/codequest/team/test/sea/1" style={{ color: "white" }}>SeaSolve</Link>
      <Link to="/codequest/map" style={{ color: "white" }}>MapPage</Link>
      <Link to="/codequest/admin" style={{ color: "white" }}>Admin</Link>
      <Link to="/codequest/arena" style={{ fontWeight: "bold", color: "gold" }}>Arena</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TempNav />
      <Routes>
        <Route path="/" element={<Navigate to="/codequest" replace />} />
        
        <Route path="/codequest">
          {/* Public Routes */}
          <Route index element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="otp" element={<OtpPage />} />
          
          {/* Protected Routes */}
          <Route path="shiplanding" element={<ProtectedRoute><ShipLanding /></ProtectedRoute>} />
          <Route path="anchorage" element={<ProtectedRoute><Anchorage /></ProtectedRoute>} />
          <Route path="team/:kriyaID/sea/:seaId" element={<ProtectedRoute><SeaSolve /></ProtectedRoute>} />
          <Route path="map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="arena" element={<ProtectedRoute><PirateArena /></ProtectedRoute>} />
          
          {/* 404 - Inside /codequest */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Global 404 */}
        <Route path="*" element={<Navigate to="/codequest/404" replace />} />
        <Route path="/codequest/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
