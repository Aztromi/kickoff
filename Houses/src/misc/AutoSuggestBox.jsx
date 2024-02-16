import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";

export default function AutoSuggestBox() {
  const [loading, toggleLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  useEffect(() => {
    const getEmployees = async () => {
      const parameters = {
        params: {
          fetch_employees: true,
        },
      };
      try {
        const response = await axios.get(url.fetchEmployees, parameters);
        const employees =
          response.data &&
          response.data.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
          }));
        setEmployees(employees);
        toggleLoading(false);
      } catch (error) {
        console.log(error);
        toggleLoading(false);
      }
    };

    getEmployees();
  }, []);
  const matched = employees.some((employee) => {
    return inputValue.toLowerCase() === employee.name.toLowerCase();
  });
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="relative w-[20rem]">
        <input
          type="text"
          placeholder="Type Your Name Here..."
          className="w-full p-2 border-[1px] rounded-md"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        {inputValue.length > 0 && (
          <>
            {!matched && (
              <>
                <div className="absolute top-[2.4rem] w-full rounded-md max-h-32 overflow-auto bg-gray-100 p-2">
                  {employees
                    .filter((emp) => {
                      if (inputValue === "") {
                        return true;
                      } else {
                        return emp.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase());
                      }
                    })
                    .map((employee, index) => (
                      <button
                        type="button"
                        key={index}
                        className="w-full text-left my-1"
                        value={employee.name}
                        onClick={() => setInputValue(employee.name)}
                      >
                        {employee.name}
                      </button>
                    ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
