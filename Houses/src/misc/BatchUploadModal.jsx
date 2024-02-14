import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { GrClose } from "react-icons/gr";
import * as XLSX from "xlsx";
//import { useFunction } from "../context/functionContext";
export default function BatchUploadModal({ closeModal, handleContinue }) {
    //const { caps } = useFunction();
    function caps(string) {
        const lowercase = string.toLowerCase();
        const capitalizeFirstLetter = (str) => {
            return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        }
        return capitalizeFirstLetter(lowercase);
      }
  const [data, setData] = useState([]);
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
          ID : index,
          first_name: caps(data.FIRST_NAME),
          last_name: caps(data.LAST_NAME),
      }))
      console.log(neededData);
      setData(neededData);
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // handleContinue(data);
  }
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
            {data.length > 0 && (
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
                    {data.map((item, index) => {
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
