import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import AutoSuggestBox from "../misc/AutoSuggestBox";
import { useNavigate } from "react-router";

export default function BlackRoom() {
  const [userID, setUserID] = useState(0);
  const [house, setHouse] = useState({
    ID: 0,
    name: "",
  });
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = window.location.pathname.split("/").pop();
    if (pathName === "live_out_faith") {
      setHouse({ ID: 1, name: "Live Out Faith" });
    } else if (pathName === "financial_stewards") {
      setHouse({ ID: 2, name: "Financial Stewards" });
    } else if (pathName === "career_&_growth") {
      setHouse({ ID: 3, name: "Career & Growth" });
    } else if (pathName === "fun_&_adventure") {
      setHouse({ ID: 4, name: "Fun & Adventure" });
    } else {
      setHouse("");
    }
  }, []);

  useEffect(() => {
    if (userID === 0) {
      setCheck(true);
    } else if (house === 0) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [house, userID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userID != 0 && house.ID != 0) {
      let formData = new FormData();
      formData.append("vote", true);
      formData.append("roomID", 2);
      formData.append("userID", userID);
      formData.append("house", house.ID);
      axios
        .post(url.submitVote, formData)
        .then((response) => {
          if (response.data === "success") {
            alert(response.data);
            navigate("/black_room/success");
          } else {
            alert(response.data);
          }
        })
        .catch((error) => alert(error));
    }
  };

  return house.name === "Live Out Faith" ||
    house.name === "Financial Stewards" ||
    house.name === "Career & Growth" ||
    house.name === "Fun & Adventure" ? (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#050505]">
        <form onSubmit={handleSubmit}>
          <div className="text-gray-300">
            <span>{house.name}</span>
          </div>
          <div className="relative text-[3rem] font-semibold my-4 text-gray-300 flex gap-2">
            <span className="absolute text-red-600 blur">BLACK ROOM</span>
            <span className="text-red-500 animate-pulse">BLACK ROOM</span>
          </div>
          <AutoSuggestBox setUserID={setUserID} roomType={2} />
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-gray-50 px-4 py-2 rounded-md disabled:bg-gray-500"
              disabled={check}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <>
      <span className="w-screen h-screen flex items-center justify-center">
        Please Scan The QR Properly!
      </span>
    </>
  );
}
