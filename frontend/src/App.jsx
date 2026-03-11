import React, { useState } from "react";
import MapPage from "./components/MapPage";
import AdminPage from "./components/AdminPage";
import Login from "./components/Login";
import PirateArena from "./PirateArena";

function App() {
  // State-based view management: 'login', 'map', or 'admin'
  const [view, setView] = useState("map"); // Default to 'map' for dev preview
  const [selectedProblem, setSelectedProblem] = useState(1);

  const handleLoginSuccess = () => {
    setView("map");
  };

  return (
    <div className="app-container">
      {/* Page Content */}
      {view === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {view === "map" && (
        <MapPage
          onIslandClick={(id) => {
            setSelectedProblem(id);
            setView("terminal");
          }}
        />
      )}
      {view === "admin" && <AdminPage />}
      {view === "terminal" && (
        <PirateArena
          problemId={selectedProblem}
          onBack={() => setView("map")}
        />
      )}

      {/* Dev Navigation Bar - Floating at the bottom */}
      <div
        className="dev-nav"
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          display: "flex",
          gap: "15px",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          padding: "12px 25px",
          borderRadius: "50px",
          border: "1px solid rgba(255, 215, 0, 0.4)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
        }}
      >
        <button
          onClick={() => setView("login")}
          style={{
            background: view === "login" ? "#FFD700" : "transparent",
            color: view === "login" ? "#000" : "#fff",
            border: "none",
            padding: "6px 18px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
          }}
        >
          LOGIN
        </button>
        <button
          onClick={() => setView("map")}
          style={{
            background: view === "map" ? "#FFD700" : "transparent",
            color: view === "map" ? "#000" : "#fff",
            border: "none",
            padding: "6px 18px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
          }}
        >
          MAP
        </button>
        <button
          onClick={() => setView("admin")}
          style={{
            background: view === "admin" ? "#FFD700" : "transparent",
            color: view === "admin" ? "#000" : "#fff",
            border: "none",
            padding: "6px 18px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
          }}
        >
          ADMIN
        </button>
        <button
          onClick={() => setView("terminal")}
          style={{
            background: view === "terminal" ? "#FFD700" : "transparent",
            color: view === "terminal" ? "#000" : "#fff",
            border: "none",
            padding: "6px 18px",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "1px",
            transition: "all 0.3s ease",
          }}
        >
          TERMINAL
        </button>
      </div>
    </div>
  );
}

export default App;
