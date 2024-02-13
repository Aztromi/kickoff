import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser, setCurrentUser } = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.username.length > 0 && userData.password.length > 0) {
      if (userData.username.length > 0) {
        if (userData.password.length > 0) {
          setError(false);
          setErrorMessage("");
          const response = await loginUser(userData);
          if (typeof response === "object") {
            setError(false);
            setErrorMessage("");
            setCurrentUser(JSON.stringify(response));
            localStorage.setItem("currentUser", JSON.stringify(response));
            if (localStorage.getItem("redirect_to")) {
              const redirectLink = localStorage.getItem("redirect_to");
              localStorage.removeItem("redirect_to");
              navigate(redirectLink);
            } else {
              navigate("/");
            }
          } else {
            setError(true);
            setErrorMessage(response);
          }
        } else {
          setError(true);
          setErrorMessage("Please enter your password!");
        }
      } else {
        setError(true);
        setErrorMessage("Username cannot be empty!");
      }
    } else {
      setError(true);
      setErrorMessage("Enter the required fields!");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="min-w-[23rem] max-w-[30rem] bg-gray-300 rounded-md shadow p-4 flex flex-col gap-2">
          <span className="text-3xl font-bold text-center mb-6">Login</span>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-8 mb-6">
              {error && (
                <span className="bg-red-300 p-2 rounded-md text-red-800">
                  {errorMessage}
                </span>
              )}
              <div className="w-full flex flex-col justify-between">
                <label className="text-[1rem]" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full p-2 rounded-md"
                  placeholder="Username"
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-md py-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
