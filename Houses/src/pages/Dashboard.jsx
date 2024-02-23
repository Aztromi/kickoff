import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Employees from "./Employees";
import Analytics from "./Analytics";
import Main from "./Main";
import Marquee from "react-fast-marquee";
import { BackgroundWhiteRoom, BackgroundBlackRoom } from "../misc/Background";

export default function Dashboard() {
  // if (!localStorage.getItem("currentUser")) {
  //   localStorage.setItem("redirect_to", window.location.pathname);
  // }
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("currentUser")) {
  //     navigate("/login");
  //     return;
  //   }
  // }, [localStorage]);
  return (
    <div className="relative w-screen h-screen bg-[#EBF1F4]">
      <div className="absolute z-[100]">
      <NavBar/>
      </div>
      <div className="absolute z-[1]">
        <Marquee className="overflow-y-hidden" speed={30}>
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
        </Marquee>
        <Marquee
          className="overflow-y-hidden"
          direction="right"
          speed={40}
        >
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
        <Marquee className="overflow-y-hidden">
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
        </Marquee>
        <Marquee
          className="overflow-y-hidden"
          direction="right"
          speed={60}
        >
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
        <Marquee className="overflow-y-hidden" speed={30}>
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
          <BackgroundBlackRoom color={"#424242"} />
        </Marquee>
        <Marquee
          className="overflow-y-hidden"
          direction="right"
          speed={40}
        >
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
      </div>
      <div className="absolute z-[10] pt-[6rem] px-10">
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/employees/*" element={<Employees />} />
          <Route path="/analytics/*" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
}
