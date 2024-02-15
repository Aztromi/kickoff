import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import Autosuggest from "react-autosuggest";

export default function BlackRoom() {
  const [loading, toggleLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const pathName = window.location.pathname;
  const setPath = (pathName) => {
    switch (pathName) {
      case "/black_room/live_out_faith":
        return "Live Out Faith";
      case "/black_room/financial_stewards":
        return "Financial Stewards";
      case "/black_room/career_&_growth":
        return "Career & Growth";
      case "/black_room/fun_&_adventure":
        return "Fun & Adventure";
        default:
          return "";
    }
  };


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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : employees.filter(
          (emp) => emp.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search Your Name Here",
    value,
    onChange,
    type: "search",
  };

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#050505]">
        <div className="text-gray-300">
          <span>{setPath(pathName)}</span>
        </div>
        <div className="text-[3rem] font-semibold my-4 text-gray-300 flex gap-2">
          <span>BLACK</span>
          <div className="relative">
            <span className="absolute text-red-600 blur">ROOM</span>
            <span className="text-red-500 animate-pulse">ROOM</span>
          </div>
        </div>
        <Autosuggest
          theme={{
            input: "bg-gray-300 outline-none rounded-md p-1 w-[20rem]",
            containerOpen: "bg-white rounded-md",
            suggestionsContainer: "px-2",
          }}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          className="border-2 border-black"
        />
      </div>
    </>
  );
}
