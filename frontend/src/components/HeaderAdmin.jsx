import React from "react";
import { useDispatch, useSelector } from "react-redux";
import customAPI from "../api";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/userSlice";

const HeaderAdmin = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };
  return (
    <header className="p-4 text-neutral-content flex">
      <div className="flex items-center px-4">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      <div className="flex justify-end flex-1">
        <div className="flex flex-row items-center">
          <label className="input input-bordered flex flex-row items-center gap-2 lg:w-96 md:w-64 w-32">
            <input
              type="search"
              required
              placeholder="Search"
              className="w-full"
            />
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
          </label>
          <div className="hidden lg:flex md:flex dropdown dropdown-bottom dropdown-end ml-4">
            <div tabIndex={0} role="button" className="btn m-1">
              Hello, {user.name}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Akun Saya</a>
              </li>
              <li>
                <a>Pesanan Saya</a>
              </li>
              <div className="divider m-1"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-500"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
