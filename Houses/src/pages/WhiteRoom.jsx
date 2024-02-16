import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import AutoSuggestBox from "../misc/AutoSuggestBox";

export default function WhiteRoom() {
  const [house, setHouse] = useState(0);

  const houses = [
    { id: "live_out_faith", name: "Live Out Faith" },
    { id: "financial_stewards", name: "Financial Stewards" },
    { id: "career_&_growth", name: "Career & Growth" },
    { id: "fun_&_adventure", name: "Fun & Adventure" },
  ];

  const handleUserPick = (house) => {
    setHouse(house);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
        <span className="text-3xl font-semibold my-4">White Room</span>
        <AutoSuggestBox />
        <div className="w-[20rem] flex flex-col gap-2 my-4">
          <span>Select A House</span>
          {houses &&
            houses.map((house, index) => (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="house"
                    id={house.id}
                    value={index + 1}
                    onChange={(e) => handleUserPick(parseInt(e.target.value))}
                  />
                  <label htmlFor={house.id}>{house.name}</label>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-900 text-gray-50 px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
