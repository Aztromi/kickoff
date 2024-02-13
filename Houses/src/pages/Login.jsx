import React from "react";

export default function Login() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="w-[25rem] bg-gray-300 h-[20rem] rounded-md shadow p-4 flex flex-col gap-2">
          <span className="text-3xl font-semibold text-center mb-6">Login</span>
          <form>
            <div className="w-full flex flex-col gap-8">
              <div className="w-full flex flex-col justify-between">
                <label className="text-[1rem]" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 rounded-md"
                  placeholder="Username"
                />
              </div>
              <div className="w-full flex flex-col justify-between">
                <label className="text-[1rem]" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 rounded-md"
                  placeholder="Password"
                />
              </div>
            </div>
            <button type="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
}
