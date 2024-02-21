import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import { FloatingLabel } from "flowbite-react";

export default function AutoSuggestBox({ setUserID, roomType }) {
  const [loading, toggleLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  // const [filterEmployees, setFilterEmployees] = useState([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    // const getEmployees = async () => {
    //   const parameters = {
    //     params: {
    //       fetch_employees: true,
    //     },
    //   };
    //   try {
    //     const response = await axios.get(url.fetchEmployees, parameters);
    //     // setEmployees(response.data);
    //     toggleLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //     toggleLoading(false);
    //   }
    // };

    const getfilteredEmployees = async () => {
      const parameters = {
        params: {
          fetch_voter_names: true,
          room_id: roomType,
        },
      };
      try {
        const response = await axios.get(url.fetchVoterName, parameters);
        setEmployees(response.data);
        toggleLoading(false);
      } catch (error) {
        console.log(error);
        toggleLoading(false);
      }
    };

    getfilteredEmployees();
    // getEmployees();
  }, [roomType]);

useEffect(() => {
  
}, [])


  
  const matched = employees.some((employee) => {
    return inputValue.toLowerCase() === employee.full_name.toLowerCase();
  });

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setUserID(0);
    }
  }
  const handleName = (user_id, name) => {
    setUserID(parseInt(user_id));
    setInputValue(name);
  }
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="relative w-[20rem]">
      <FloatingLabel
          variant="outlined"
          label="Type Your Name Here..."
          onChange={handleChange}
          value={inputValue}
          // theme={{input: {default: }}}
          className="bg-white"
        />
        {/* <input
          type="text"
          placeholder="Type Your Name Here..."
          className="w-full p-2 border-[1px] rounded-md"
          onChange={handleChange}
          value={inputValue}
        /> */}
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
                        if (emp.full_name.toLowerCase().includes(inputValue.toLowerCase())) {
                          return true;
                        }
                        else {
                          return emp.full_name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase());
                        }
                      }
                    })
                    .map((employee, index) => (
                      <button
                        type="button"
                        key={index}
                        className="w-full text-left my-1"
                        value={employee.full_name}
                        onClick={(e) => handleName(employee.user_id, employee.full_name)}
                      >
                        {employee.full_name}
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
