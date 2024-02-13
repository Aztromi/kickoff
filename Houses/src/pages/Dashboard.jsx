import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Employees from "./Employees";
import Analytics from "./Analytics";
import Main from "./Main";

export default function Dashboard() {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("redirect_to", window.location.pathname);
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login");
      return;
    }
  }, [localStorage]);
  return (
    <div className="relative">
      <NavBar />
      <div className="pt-10 px-4">
        <Routes>
          <Route path="/*" element={<Main/>} />
          <Route path="/employees/*" element={<Employees/>} />
          <Route path="/analytics/*" element={<Analytics/>} />
        </Routes>
      </div>
    </div>
  );
}
