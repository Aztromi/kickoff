import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import AutoSuggestBox from "../misc/AutoSuggestBox";
import { useNavigate } from "react-router";
export default function WhiteRoom() {
  const [userID, setUserID] = useState(0);
  const [house, setHouse] = useState(0);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const houses = [
    { id: "live_out_faith", name: "Live Out Faith" },
    { id: "financial_stewards", name: "Financial Stewards" },
    { id: "career_&_growth", name: "Career & Growth" },
    { id: "fun_&_adventure", name: "Fun & Adventure" },
  ];
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
    if (userID != 0 && house != 0) {
      let formData = new FormData();
      formData.append("vote", true);
      formData.append("roomID", 1);
      formData.append("userID", userID);
      formData.append("house", house);
      axios
        .post(url.submitVote, formData)
        .then((response) => {
          if (response.data === "success") {
            alert(response.data);
            navigate("/white_room/success");
          } else {
            alert(response.data);
          }
        })
        .catch((error) => alert(error));
    } else {
      console.log("heee hee");
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
        <form onSubmit={handleSubmit}>
          <span className="text-3xl font-semibold my-4 flex justify-center">
            White Room
          </span>
          <AutoSuggestBox setUserID={setUserID} roomType={1} />
          <div className="my-4">
            <span>Select A House:</span>
            <div className="w-[20rem] grid grid-cols-2 gap-2">
              {houses &&
                houses.map((house, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="radio"
                        name="house"
                        id={house.id}
                        value={index + 1}
                        onChange={(e) => setHouse(parseInt(e.target.value))}
                        className="peer hidden"
                      />
                      <label htmlFor={house.id} className="peer-checked:bg-[#990000] bg-transparent p-2 rounded-lg peer-checked:text-white transition-all">{house.name}</label>
                    </div>
                  </div>
                ))}
            </div>
          </div>
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
  );
}
