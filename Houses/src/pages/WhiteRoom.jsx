import React, { useState, useEffect } from "react";
import axios from "axios";
import { developmentAPIs as url } from "../context/apiList";
import Autosuggest from "react-autosuggest";

export default function WhiteRoom() {
  const [loading, toggleLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    className: "border-[1px] border-gray-500 rounded-md p-1 w-[20rem]",
  };

  return loading ? (
    "Loading..."
  ) : (
    <>
      <div className="w-screen flex flex-col items-center">
        <span className="text-3xl font-semibold my-4">White Room</span>
        <Autosuggest
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
