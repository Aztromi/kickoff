import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";

export default function EmployeeTable({ search }) {
  const [loading, toggleLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const getEmployees = async () => {
      const parameters = {
        params: {
          fetch_employees: true,
        },
      };
      try {
        const response = await axios.get(url.fetchEmployees, parameters);
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
        toggleLoading(false);
      }
    };

    getEmployees();
    toggleLoading(false);
  }, []);
  return loading ? (
    "Loading..."
  ) : (
    <div className="h-[32rem] overflow-scroll overflow-x-hidden">
      <table className="w-full bg-white rounded-md">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>White Room Status</th>
            <th>Black Room Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees
              .filter((emp) => {
                if (search === "") {
                  return true; // If search is empty, include all employees
                } else {
                  return (
                    emp.first_name
                      .toLowerCase()
                      .includes(search.toLowerCase()) || // Perform case-insensitive search
                    emp.last_name.toLowerCase().includes(search.toLowerCase())
                  );
                }
              })
              .map((employees, index) => (
                <tr key={index}>
                  <td className="text-center py-2">{index + 1}</td>
                  <td>
                    {employees.last_name}, {employees.first_name}
                  </td>
                  <td className="text-center py-2">Not Yet</td>
                  <td className="text-center py-2">Not Yet</td>
                  <td className="text-center py-2">Delete</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
