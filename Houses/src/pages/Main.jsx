import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Main() {
  const [dataCount, setDataCount] = useState([]);
  useEffect(() => {
    const getDataCount = async () => {
      const parameters = {
        params: {
          employee_count: true,
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
    getDataCount();
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-8">
        <div>Total Vote Counter</div>
        <div>White Room Counter</div>
        <div>Black Room Counter</div>
      </div>
    </>
  );
}
