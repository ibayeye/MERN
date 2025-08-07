import React from "react";
import NavList from "./NavList";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/userSlice";

const SideBar = ({ children }) => {
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
    <div className="drawer drawer-mobile lg:drawer-open">
      {/* Ini input untuk toggle drawer */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Konten utama */}
      <div className="drawer-content flex flex-col">
        {/* Tombol toggle hanya muncul di mobile */}
        <div className="lg:hidden p-4">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <FaBarsStaggered className="h-6 w-6"/>
          </label>
        </div>

        {/* Di sini konten admin akan ditampilkan */}
        <div>{children}</div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side flex flex-col z-50">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <NavLink
            to="/admin"
            className="flex btn btn-primary text-3xl items-center mb-4"
          >
            Logo
          </NavLink>
          <NavList />
          <div className="mt-auto text-center">
            <div className="divider m-1"></div>
            <button className="btn btn-ghost w-full" onClick={handleLogout}>
              <IoLogOutOutline className="text-lg" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideBar;
