import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import classNames from "classnames";

export default function Main() {
  const [loading, toggleLoading] = useState(true);
  const [dataCount, setDataCount] = useState([]);
  const [roomCount, setRoomCount] = useState([]);
  const [whiteRoomDataCount, setWhiteRoomDataCount] = useState([]);
  const [blackRoomDataCount, setBlackRoomDataCount] = useState([]);
  useEffect(() => {
    const getDataCount = async () => {
      const parameters = {
        params: {
          employee_vote_count: true,
        },
      };
      try {
        const response = await axios.get(url.fetchGraphs, parameters);
        setDataCount(response.data);
        toggleLoading(false);
      } catch (error) {
        console.log(error);
        toggleLoading(false);
      }
    };
    const getRoomData = async () => {
      const parameters = {
        params: {
          room_vote_count: true,
        },
      };
      try {
        const response = await axios.get(url.fetchGraphs, parameters);
        setRoomCount(response.data);
        toggleLoading(false);
      } catch {
        console.log(error);
        toggleLoading(false);
      }
    };

    const getWhiteRoomDataCount = async () => {
      const parameters = {
        params: {
          white_room_vote_count: true,
        },
      };
      try {
        const response = await axios.get(url.fetchGraphs, parameters);
        const whiteRoomData = response.data.map((data) => ({
          name: data.name,
          value: parseInt(data.value),
        }));
        setWhiteRoomDataCount(whiteRoomData);
        toggleLoading(false);
      } catch {
        console.log(error);
      }
    };
    const getBlackRoomDataCount = async () => {
      const parameters = {
        params: {
          black_room_vote_count: true,
        },
      };
      try {
        const response = await axios.get(url.fetchGraphs, parameters);
        const blackRoomData = response.data.map((data) => ({
          name: data.name,
          value: parseInt(data.value),
        }));
        setBlackRoomDataCount(blackRoomData);
        toggleLoading(false);
      } catch {
        console.log(error);
      }
    };
    getDataCount();
    getRoomData();
    getWhiteRoomDataCount();
    getBlackRoomDataCount();

    const intervalIds = [
      setInterval(getDataCount, 2000), // Fetch data count every 60 seconds
      setInterval(getRoomData, 2000), // Fetch room data every 60 seconds
      setInterval(getWhiteRoomDataCount, 2000), // Fetch white room data every 60 seconds
      setInterval(getBlackRoomDataCount, 2000), // Fetch black room data every 60 seconds
    ];

    // Clear intervals on component unmount
    return () => {
      intervalIds.forEach(clearInterval);
    };
  }, []);
  const customBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-gray-100 rounded-lg flex flex-col gap-4">
          <p className="text-medium text-3xl">{label}</p>
          <p className="text-2xl text-gray-400">
            White Room:
            <span className="ml-2">{payload[0].value}</span>
          </p>
          <p className="text-2xl text-black">
            Black Room:
            <span className="ml-2">{payload[1].value}</span>
          </p>
        </div>
      );
    }
  };

  const customPieTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-gray-100 rounded-lg flex flex-col gap-4">
          <p className="text-[2rem] text-gray-400">
            {payload[0].name}
            <span className="ml-2">{payload[0].value}</span>
          </p>
        </div>
      );
    }
  };
  const customLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        fontSize={30} // Adjust the font size as needed
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };
  const COLORS1 = ["#EBF1F4", "#85E0FF", "#ABD8B3", "#fb7756"];
  const COLORS2 = ["#C2C2C2", "#00BFFF", "#58b368", "#F94F24"];
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[6rem] font-semibold">
            {dataCount &&
              `99${dataCount.employees_voted} / ${
                parseInt(dataCount.total_employees)
              }`}
          </span>
          <span className="text-[1.6rem] font-semibold">
            Employees Voted
          </span>
        </div>
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[6rem] font-semibold">
            {dataCount && dataCount.white_room}
          </span>
          <span className="text-[1.6rem] font-semibold">
            White Room
          </span>
        </div>
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[6rem] font-semibold">
            {dataCount && dataCount.black_room}
          </span>
          <span className="text-[1.6rem] font-semibold">
            Black Room
          </span>
        </div>
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[6rem] font-semibold">
            {dataCount && dataCount.change_vote}
          </span>
          <span className="text-[1.6rem] font-semibold">
            Changed Vote
          </span>
        </div>
      </div>
      <div className="mt-10 w-full h-[50rem] flex gap-8">
        <div className="w-full h-full bg-white p-8 rounded-lg flex flex-col items-center justify-between">
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={200}
              data={roomCount}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" tick={{ fontSize: 30, fill: "black" }} />
              <YAxis />
              <Tooltip content={customBarTooltip} />
              <Bar
                dataKey="white_room_value"
                fill={"#990000"}
                barSize={60}
                label={{ position: "top", fontSize: 30, fill: "black" }}
              >
                {roomCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS1[index % COLORS1.length]}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="black_room_value"
                fill="#5a5a5a"
                barSize={60}
                label={{ position: "top", fontSize: 30, fill: "black" }}
              >
                {roomCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS2[index % COLORS2.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="w-full flex flex-col">
            <span className="text-[2rem] font-semibold">Legend:</span>
            <div className="grid grid-cols-2">
              <div>
                <span className="text-[2rem]">White Room:</span>
                <div className="text-[1.6rem] flex flex-col">
                  {roomCount &&
                    roomCount.map((entry, index) => (
                      <div
                        className="ml-2 grid grid-cols-[1fr_4fr_3fr] gap-2"
                        key={index}
                      >
                        <span
                          className={classNames(
                            "rounded-md my-2",
                            entry.name === "Live Out Faith"
                              ? "bg-[#EBF1F4]"
                              : entry.name === "Financial Stewards"
                              ? "bg-[#85E0FF]"
                              : entry.name === "Career & Growth"
                              ? "bg-[#ABD8B3]"
                              : entry.name === "Fun & Adventure"
                              ? "bg-[#fb7756]"
                              : "bg-[#EBF1F4]"
                          )}
                        ></span>
                        <span className="whitespace-nowrap">{entry.name}</span>
                        <span>{entry.white_room_value}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <span className="text-[2rem]">Black Room:</span>
                <div className="text-[1.6rem] flex flex-col">
                  {roomCount &&
                    roomCount.map((entry, index) => (
                      <div
                        className="ml-2 grid grid-cols-[1fr_4fr_3fr] gap-2"
                        key={index}
                      >
                        <span
                          className={classNames(
                            "rounded-md my-2",
                            entry.name === "Live Out Faith"
                              ? "bg-[#C2C2C2]"
                              : entry.name === "Financial Stewards"
                              ? "bg-[#00BFFF]"
                              : entry.name === "Career & Growth"
                              ? "bg-[#58b368]"
                              : entry.name === "Fun & Adventure"
                              ? "bg-[#F94F24]"
                              : "bg-[#C2C2C2]"
                          )}
                        ></span>
                        <span className="whitespace-nowrap">{entry.name}</span>
                        <span>{entry.black_room_value}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-white p-8 rounded-lg flex items-center justify-between">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={whiteRoomDataCount}
                  fill="#8884d8"
                  label={false}
                  labelLine={false}
                >
                  {whiteRoomDataCount.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS1[index % COLORS1.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={customPieTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div>
              <span className="text-[2rem]">White Room:</span>
              <div className="text-[1.6rem] flex flex-col">
                {roomCount &&
                  roomCount.map((entry, index) => (
                    <div
                      className="ml-2 grid grid-cols-[1fr_4fr_3fr] gap-2"
                      key={index}
                    >
                      <span
                        className={classNames(
                          "rounded-md my-2",
                          entry.name === "Live Out Faith"
                            ? "bg-[#EBF1F4]"
                            : entry.name === "Financial Stewards"
                            ? "bg-[#85E0FF]"
                            : entry.name === "Career & Growth"
                            ? "bg-[#ABD8B3]"
                            : entry.name === "Fun & Adventure"
                            ? "bg-[#fb7756]"
                            : "bg-[#EBF1F4]"
                        )}
                      ></span>
                      <span className="whitespace-nowrap">{entry.name}</span>
                      <span>{entry.white_room_value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={blackRoomDataCount}
                  fill="#8884d8"
                  label={false}
                  labelLine={false}
                >
                  {blackRoomDataCount.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS2[index % COLORS2.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={customPieTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div>
                <span className="text-[2rem]">Black Room:</span>
                <div className="text-[1.6rem] flex flex-col">
                  {roomCount &&
                    roomCount.map((entry, index) => (
                      <div
                        className="ml-2 grid grid-cols-[1fr_4fr_3fr] gap-2"
                        key={index}
                      >
                        <span
                          className={classNames(
                            "rounded-md my-2",
                            entry.name === "Live Out Faith"
                              ? "bg-[#C2C2C2]"
                              : entry.name === "Financial Stewards"
                              ? "bg-[#00BFFF]"
                              : entry.name === "Career & Growth"
                              ? "bg-[#58b368]"
                              : entry.name === "Fun & Adventure"
                              ? "bg-[#F94F24]"
                              : "bg-[#C2C2C2]"
                          )}
                        ></span>
                        <span className="whitespace-nowrap">{entry.name}</span>
                        <span>{entry.black_room_value}</span>
                      </div>
                    ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
