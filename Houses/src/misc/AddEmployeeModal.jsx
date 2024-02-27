import React, { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { GrClose } from "react-icons/gr";
import * as XLSX from "xlsx";
import { developmentAPIs as url } from "../context/apiList";
import { useFunction } from "../context/functionContext";

export function AddEmployeeModal({ closeModal }) {
  const { capitalizeFirstLetter } = useFunction();
  const [employeeData, setEmployeeData] = useState({
    first_name: "",
    last_name: "",
  });
  console.log(employeeData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (employeeData.first_name === "" || employeeData.last_name === "") {
      alert("Please fill all the fields");
    }
    else{
      let formData = new FormData();
      formData.append("insert_data", true);
      formData.append("employeeData", JSON.stringify(employeeData));
      axios
        .post(url.submitNewEmployee, formData)
        .then((response) => {
          if (response.data === "Success") {
            alert("Data uploaded successfully");
            closeModal(false);
            window.location.reload();
          } else {
            alert(response.data);
          }
        })
        .catch((error) => alert(error));
    }
  };
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md transition-all md:min-w-[70%] lg:min-w-[20%]">
        <form>
          {/* TITLE */}
          <div className="flex flex-row items-center justify-between border-b border-gray p-2 rounded-t-md">
            <span>Add Employee</span>
            <button
              className="text-[.7rem] px-1"
              onClick={() => closeModal(false)}
            >
              <GrClose />
            </button>
          </div>
          {/* MESSAGE */}
          <div className="flex flex-col items-center p-2 gap-4">
            <div className="w-full flex justify-between items-center">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                id="first_name"
                className="w-[15rem] border-[1px] border-gray-500 px-2 py-1 rounded-md"
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    first_name: capitalizeFirstLetter(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                id="last_name"
                className="w-[15rem] border-[1px] border-gray-500 px-2 py-1 rounded-md"
                onChange={(e) =>
                  setEmployeeData({
                    ...employeeData,
                    last_name: capitalizeFirstLetter(e.target.value),
                  })
                }
              />
            </div>
          </div>
          {/* FOOTER */}
          <div className="flex flex-row items-center justify-end gap-4 p-2">
            <button
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="text-white bg-blue-900 hover:bg-blue-600 p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export function BatchUploadModal({ closeModal, handleContinue }) {
  const { capitalizeFirstLetter } = useFunction();
  const [employeeData, setEmployeeData] = useState([]);
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const neededData = parsedData.map((data, index) => ({
        ID: index,
        first_name: capitalizeFirstLetter(data.FIRSTNAME),
        last_name: capitalizeFirstLetter(data.LASTNAME),
      }));
      setEmployeeData(neededData);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("insert_data", true);
    formData.append("employeeData", JSON.stringify(employeeData));
    axios
      .post(url.employeeBatchUpload, formData)
      .then((response) => {
        if (response.data === "Success") {
          alert("Data uploaded successfully");
          closeModal(false);
          window.location.reload();
        } else {
          alert(response.data);
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[90%] max-w-[90%] z-[26] bg-white rounded-md transition-all md:min-w-[70%] lg:min-w-[20%]">
        <form>
          {/* TITLE */}
          <div className="flex flex-row items-center justify-between border-b border-gray p-2 rounded-t-md">
            <span>Batch Upload</span>
            <button
              className="text-[.7rem] px-1"
              onClick={() => closeModal(false)}
            >
              <GrClose />
            </button>
          </div>
          {/* MESSAGE */}
          <div className="max-h-[30rem] flex flex-col items-center overflow-scroll p-2">
            <input
              type="file"
              accept=".xlsx, .xls"
              className="w-full my-2 px-2"
              onChange={handleFileUpload}
            />
            {employeeData.length > 0 && (
              <div className="w-[50rem]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* FOOTER */}
          <div className="flex flex-row items-center justify-end gap-4 p-2">
            <button
              className="text-dark-gray border border-dark-gray p-1 px-2 rounded-md text-[.9rem] hover:text-gray hover:border-gray"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <input
              type="submit"
              className="text-white bg-blue-900 hover:bg-blue-600 p-1 px-2 rounded-md text-[.9rem] hover:bg-un-blue disabled:bg-dark-gray"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}
