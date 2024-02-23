import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import AutoSuggestBox from "../misc/AutoSuggestBox";
import { useNavigate } from "react-router";
import Marquee from "react-fast-marquee";
import { BackgroundBlackRoom } from "../misc/Background";
import classNames from "classnames";
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
    } else if (pathName === "success") {
      setHouse({ ID: 5, name: "Success" });
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
      <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] overflow-y-hidden overflow-x-hidden">
        <Marquee className="overflow-y-hidden" speed={30}>
          <BackgroundBlackRoom
            color={
              house.name === "Live Out Faith"
                ? "#CCCCCC"
                : house.name === "Financial Stewards"
                ? "#00BFFF"
                : house.name === "Career & Growth"
                ? "#58b368"
                : house.name === "Fun & Adventure"
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <Marquee
          className="overflow-y-hidden pl-96"
          direction="right"
          speed={40}
        >
          <BackgroundBlackRoom
            color={
              house.name === "Live Out Faith"
                ? "#CCCCCC"
                : house.name === "Financial Stewards"
                ? "#00BFFF"
                : house.name === "Career & Growth"
                ? "#58b368"
                : house.name === "Fun & Adventure"
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <Marquee className="overflow-y-hidden">
          <BackgroundBlackRoom
            color={
              house.name === "Live Out Faith"
                ? "#CCCCCC"
                : house.name === "Financial Stewards"
                ? "#00BFFF"
                : house.name === "Career & Growth"
                ? "#58b368"
                : house.name === "Fun & Adventure"
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <Marquee
          className="overflow-y-hidden pl-40"
          direction="right"
          speed={60}
        >
          <BackgroundBlackRoom
            color={
              house.name === "Live Out Faith"
                ? "#CCCCCC"
                : house.name === "Financial Stewards"
                ? "#00BFFF"
                : house.name === "Career & Growth"
                ? "#58b368"
                : house.name === "Fun & Adventure"
                ? "#fb7756"
                : "#808080"
            }
          />
        </Marquee>
        <form
          onSubmit={handleSubmit}
          className="absolute z-10 flex flex-col items-center justify-center bg-[#DDE0E3] px-4 py-2 rounded-md shadow"
        >
          <div className="text-2xl font-dela-gothic text-black">
            <span>BLACK ROOM</span>
          </div>
          <div className="relative text-3xl font-dela-gothic my-4 flex justify-center">
            <span
              className={classNames(
                "text-center",
                house.name === "Live Out Faith"
                  ? "text-black"
                  : house.name === "Financial Stewards"
                  ? "text-[#00BFFF]"
                  : house.name === "Career & Growth"
                  ? "text-[#58b368]"
                  : house.name === "Fun & Adventure"
                  ? "text-[#fb7756]"
                  : "text-[#808080]"
              )}
            >
              {house.name}
            </span>
          </div>
          <AutoSuggestBox setUserID={setUserID} roomType={2} />
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className={classNames(
                "text-gray-50 px-4 py-2 rounded-md disabled:bg-gray-500",
                house.name === "Live Out Faith"
                  ? "bg-black"
                  : house.name === "Financial Stewards"
                  ? "bg-[#00BFFF]"
                  : house.name === "Career & Growth"
                  ? "bg-[#58b368]"
                  : house.name === "Fun & Adventure"
                  ? "bg-[#fb7756]"
                  : "bg-[#808080]"
              )}
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
