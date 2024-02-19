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
} from "recharts";

export default function Main() {
  const [loading, toggleLoading] = useState(true);
  const [dataCount, setDataCount] = useState([]);
  const [roomCount, setRoomCount] = useState([]);
  const [whiteRoomDataCount, setWhiteRoomDataCount] = useState([]);
  const [blackRoomDataCount, setBlackRoomDataCount] = useState([]);
console.log(whiteRoomDataCount)
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

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-gray-100 rounded-lg flex flex-col gap-4">
          <p className="text-medium text-lg">{label}</p>
          <p className="text-sm text-gray-400">
            White Room:
            <span className="ml-2">{payload[0].value}</span>
          </p>
          <p className="text-sm text-[#CD4631]">
            Black Room:
            <span className="ml-2">{payload[1].value}</span>
          </p>
        </div>
      );
    }
  };

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="h-[10rem] w-full grid grid-cols-8 gap-4">
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[4rem] font-semibold">
            {dataCount &&
              `${dataCount.total_votes} / ${
                parseInt(dataCount.total_employees) +
                parseInt(dataCount.total_employees)
              }`}
          </span>
          <span className="text-[1.6rem] font-semibold">
            Total Votes Counter
          </span>
        </div>
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[4rem] font-semibold">
            {dataCount && dataCount.white_room}
          </span>
          <span className="text-[1.6rem] font-semibold">
            White Room Counter
          </span>
        </div>
        <div className="bg-white border rounded-lg p-4 flex flex-col items-center justify-between shadow">
          <span className="text-[4rem] font-semibold">
            {dataCount && dataCount.black_room}
          </span>
          <span className="text-[1.6rem] font-semibold">
            Black Room Counter
          </span>
        </div>
      </div>
      <div className="mt-10 w-full h-[50rem] grid grid-cols-2 gap-8">
        <div className="w-full h-full bg-gray-200 p-8 rounded-lg flex flex-col items-center justify-between">
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
              <Tooltip content={customTooltip} />
              <Legend />
              <Bar dataKey="white_room_value" fill="#9CA3AF" />
              <Bar dataKey="black_room_value" fill="#CD4631" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full h-full bg-gray-600 p-8 rounded-lg flex items-center justify-between">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={whiteRoomDataCount}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
            <span className="text-[3rem] font-semibold">White Room</span>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-between">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={blackRoomDataCount}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
            <span className="text-[3rem] font-semibold">Black Room</span>
          </div>
        </div>
      </div>
    </>
  );
}
