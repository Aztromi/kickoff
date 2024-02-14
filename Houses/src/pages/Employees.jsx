import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import EmployeeTable from "../components/EmployeeTable";
import BatchUploadModal from "../misc/BatchUploadModal";
import classNames from "classnames";

export default function Employees() {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="w-full h-[50rem] bg-gray-300 mt-2 rounded-md">
        <div className="px-2 pt-4 flex justify-between items-center">
          <span className="text-2xl font-semibold">Employees</span>
          <div className="flex gap-2">
            <button className="bg-blue-900 text-gray-50 hover:bg-blue-600 px-2 py-1 rounded-md">
              Add Employee
            </button>
            <button
              className="bg-gray-50 hover:bg-gray-200 px-2 py-1 rounded-md"
              onClick={() => setModal(true)}
            >
              Batch Upload
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end pr-2 py-4">
          <label htmlFor="search" className="bg-gray-50 p-2 rounded-l-md">
            <CiSearch className="text-[1rem]" />
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search"
            className="p-1 text-[1rem] rounded-r-md"
          />
        </div>
        <div className="p-2">
          <EmployeeTable />
        </div>
      </div>
      {modal && <BatchUploadModal closeModal={setModal} />}
      <div
        className={classNames(
          "bg-[#00000035] fixed h-full w-full z-[21] top-0 left-0 animate-fade pointer-events-auto",
          modal === false && "z-[-1] hidden pointer-events-none"
        )}
        onClick={() => {
          setModal(false);
        }}
      />
    </>
  );
}
