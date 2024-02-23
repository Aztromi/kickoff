import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import classNames from "classnames";

export default function NavBar() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  const [menu, setMenu] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser([]);
    navigate("/login");
  };
  const currentWindow = window.location.pathname;
  const link = [
    { link: "/", title: "Dashboard" },
    { link: "/employees", title: "Employees" },
    { link: "/analytics", title: "Analytics" },
  ];
  return (
    <>
      {menu && (
        <div
          className="absolute z-[90] bg-black opacity-30 h-screen w-screen"
          onClick={() => setMenu(false)}
        />
      )}
      <section
        className={classNames(
          "absolute z-[100] h-screen bg-gray-200 shadow flex flex-col justify-between overflow-hidden transition-all duration-200",
          menu ? "w-[16rem]" : "w-[0rem]"
        )}
      >
        <div className="flex justify-between p-2">
          <img
            src="./../../public/unmg_logo_plain_colored.png"
            className="h-8"
          />
          <button
            className="text-[2rem] text-gray-950"
            onClick={() => setMenu(false)}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="h-full flex flex-col mt-4 gap-2">
          {link.map((item, index) => (
            <a
              className={classNames(
                "hover:text-blue-900 hover:bg-blue-600 hover:bg-opacity-50 rounded-md p-2 mx-2 font-semibold",
                item.link === currentWindow
                  ? "text-blue-900 bg-blue-600 bg-opacity-50"
                  : ""
              )}
              key={index}
              href={item.link}
            >
              {item.title}
            </a>
          ))}
        </div>
        {/* <button
          className="bg-blue-900 hover:bg-blue-600 text-gray-50 px-2 py-1 rounded-md m-2"
          onClick={handleLogout}
        >
          Logout
        </button> */}
      </section>
      {!menu && (
        <button
          className="absolute top-2 left-2 text-gray-950 text-[2rem]"
          type="button"
          onClick={() => setMenu(true)}
        >
          <GiHamburgerMenu />
        </button>
      )}
    </>
  );
}
