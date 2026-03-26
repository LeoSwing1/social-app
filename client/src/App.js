import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(null);

  // 🔥 Sync token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>

        {/* 🔐 HOME / FEED */}
        <Route
          path="/"
          element={token ? <Feed /> : <Navigate to="/login" />}
        />

        {/* 🔐 PROFILE (SELF) */}
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        {/* 🔐 PROFILE (DYNAMIC) */}
        <Route
          path="/profile/:id"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        {/* 🔐 SETTINGS */}
        <Route
          path="/settings"
          element={token ? <Settings /> : <Navigate to="/login" />}
        />

        {/* 🔓 LOGIN */}
        <Route
          path="/login"
          element={
            !token ? <Login setToken={setToken} /> : <Navigate to="/" />
          }
        />

        {/* 🔓 SIGNUP */}
        <Route
          path="/signup"
          element={
            !token ? <Signup /> : <Navigate to="/" />
          }
        />

        {/* 🔁 FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;