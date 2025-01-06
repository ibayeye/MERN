import React from "react";
import { NavLink } from "react-router-dom";
import NavList from "./NavList";
import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import customAPI from "../api";
import { logoutUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const HandlingLogout = async () => {
    await customAPI.get("/auth/logout");
    dispatch(logoutUser());
    navigate("/login");
  }
  return (
    <nav className="bg-base">
      <div className="navbar mx-auto max-w-6xl px-8 lg:h-20">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            Logo
          </NavLink>

          {/*Tampilan Mobile*/}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavList />
            </ul>
          </div>
          {/*Tampilan PC*/}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal text-lg">
              <NavList />
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md mr-8">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-primary badge-sm indicator-item">
                8
              </span>
            </div>
          </NavLink>
          {user && (
            <button className="btn btn-error btn-outline btn-md" onClick={HandlingLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
