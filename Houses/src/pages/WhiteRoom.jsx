import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import AutoSuggestBox from "../misc/AutoSuggestBox";
import { useNavigate } from "react-router";
import classNames from "classnames";
import Marquee from "react-fast-marquee";
import Background from "../misc/Background";
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
  console.log(house);
  return (
    <>
      <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
        <Marquee className="overflow-y-hidden" speed={30}>
          <Background
            color={
              house === 1
                ? "white"
                : house === 2
                ? "#00BFFF"
                : house === 3
                ? "#58b368"
                : house === 4
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <Marquee className="overflow-y-hidden pl-96" direction="right" speed={40}>
          <Background
            color={
              house === 1
                ? "white"
                : house === 2
                ? "#00BFFF"
                : house === 3
                ? "#58b368"
                : house === 4
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <Marquee className="overflow-y-hidden">
          <Background
            color={
              house === 1
                ? "white"
                : house === 2
                ? "#00BFFF"
                : house === 3
                ? "#58b368"
                : house === 4
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <Marquee className="overflow-y-hidden pl-40" direction="right" speed={60}>
          <Background
            color={
              house === 1
                ? "white"
                : house === 2
                ? "#00BFFF"
                : house === 3
                ? "#58b368"
                : house === 4
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <form onSubmit={handleSubmit} className="absolute z-10 flex flex-col items-center justify-center">
          <span className="text-5xl font-dela-gothic my-4 flex justify-center whitespace-nowrap">
            WHITE ROOM
          </span>
          <AutoSuggestBox setUserID={setUserID} roomType={1} />
          <div className="my-4">
            <span className="text-2xl">Select A House:</span>
            <div className="w-[20rem] grid grid-cols-2 gap-2 my-4">
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
                      <label
                        htmlFor={house.id}
                        className={classNames(
                          "ml-2 w-0 py-1 bg-transparent rounded-lg whitespace-nowrap transition-all duration-200 text-[1.2rem]",
                          house.id === "live_out_faith"
                            ? "peer-checked:w-[8.2rem] px-2 peer-checked:bg-white peer-checked:text-black"
                            : house.id === "financial_stewards"
                            ? "peer-checked:w-[12rem] px-2 peer-checked:bg-[#00BFFF] peer-checked:text-white"
                            : house.id === "career_&_growth"
                            ? "peer-checked:w-[10rem] px-2 peer-checked:bg-[#58b368] peer-checked:text-white"
                            : house.id === "fun_&_adventure"
                            ? "peer-checked:w-[10rem] px-2 peer-checked:bg-[#fb7756] peer-checked:text-white"
                            : "w-[0rem]"
                        )}
                      >
                        {house.name}
                      </label>
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
