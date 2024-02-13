import { useEffect, useState } from "react";
import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import Dashboard from "./pages/Dashboard";
import WhiteRoom from "./pages/WhiteRoom";
import BlackRoom from "./pages/BlackRoom";

function App() {
  useEffect(() => {
    const url = "./../../public/unmg_logo_plain.png";
    document.head.querySelector("link").href = url;
  }, []);
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/white_room" element={<WhiteRoom/>} />
          <Route path="/black_room" element={<BlackRoom/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
