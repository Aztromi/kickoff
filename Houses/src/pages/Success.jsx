import React from "react";
import Marquee from "react-fast-marquee";
import classNames from "classnames";
import { BackgroundWhiteRoom, BackgroundBlackRoom } from "../misc/Background";

export function SuccessWhiteRoom() {
  return (
    <>
      <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[#F4F5F6] overflow-y-hidden overflow-x-hidden">
        <Marquee className="overflow-y-hidden" speed={30}>
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
        <Marquee
          className="overflow-y-hidden pl-96"
          direction="right"
          speed={40}
        >
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
        <Marquee className="overflow-y-hidden">
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
        <Marquee
          className="overflow-y-hidden pl-40"
          direction="right"
          speed={60}
        >
          <BackgroundWhiteRoom color={"#424242"} />
        </Marquee>
        <div className="absolute z-10 flex flex-col items-center justify-center bg-white px-4 py-2 rounded-md shadow">
          <div className="text-2xl font-dela-gothic text-black">
            <span>WHITE ROOM</span>
          </div>
          <div className="relative text-3xl font-dela-gothic my-4 flex justify-center">
            <span className="text-[#58b368] text-center">
              Thank you for voting!
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export function SuccessBlackRoom() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#050505] overflow-y-hidden overflow-x-hidden">
      <Marquee className="overflow-y-hidden" speed={30}>
        <BackgroundBlackRoom color={"#424242"} />
      </Marquee>
      <Marquee className="overflow-y-hidden pl-96" direction="right" speed={40}>
        <BackgroundBlackRoom color={"#424242"} />
      </Marquee>
      <Marquee className="overflow-y-hidden">
        <BackgroundBlackRoom color={"#424242"} />
      </Marquee>
      <Marquee className="overflow-y-hidden pl-40" direction="right" speed={60}>
        <BackgroundBlackRoom color={"#424242"} />
      </Marquee>
      <div className="absolute z-10 flex flex-col items-center justify-center bg-white px-4 py-2 rounded-md shadow">
        <div className="text-2xl font-dela-gothic text-black">
          <span>BLACK ROOM</span>
        </div>
        <div className="relative text-3xl font-dela-gothic my-4 flex justify-center">
          <span className="text-[#58b368] text-center">
            Thank you for voting!
          </span>
        </div>
      </div>
    </div>
  );
}
