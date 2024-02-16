import { useEffect, useState } from "react";
import "./css/index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import { FunctionProvider } from "./context/functionContext";
import Dashboard from "./pages/Dashboard";
import WhiteRoom from "./pages/WhiteRoom";
import BlackRoom from "./pages/BlackRoom";

function App() {
  useEffect(() => {
    const url = "./../../public/logo_white.png";
    document.head.querySelector("link").href = url;
  }, []);
  return (
    <Router>
      <AuthProvider>
        <FunctionProvider>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/white_room" element={<WhiteRoom/>} />
          <Route path="/white_room/:id" element={<BlackRoom/>} />
          <Route path="/black_room" element={<BlackRoom/>} />
          <Route path="/black_room/:id" element={<BlackRoom/>} />
        </Routes>
        </FunctionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
