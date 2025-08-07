import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiBox } from "react-icons/fi";

const NavList = () => {
  const user = useSelector((state) => state.userState.user);
  const isAdmin = user?.role === "admin";

  const baseLinks = [
    { id: 1, url: "about", text: "about" },
    { id: 2, url: "products", text: "products" },
  ];

  const userLinks = [
    { id: 3, url: "/orders", text: "orders" },
    { id: 4, url: "/checkout", text: "checkout" },
  ];

  const adminLinks = [
    { id: 5, url: "/admin", text: "dashboard", icon: <RxDashboard /> },
    { id: 6, url: "/admin/products", text: "product", icon: <FiBox /> },
  ];

  const renderNavLink = (link) => (
    <li key={link.id}>
      <NavLink
        className="capitalize"
        to={link.url}
        end={link.url === "/admin"}
        style={({ isActive }) => ({
          backgroundColor: isActive ? "#3b82f6" : "transparent",
          color: isActive ? "white" : "inherit",
        })}
      >
        <span className="text-lg">{link.icon} </span>
        <span>{link.text}</span>
      </NavLink>
    </li>
  );
  return (
    <>
      {!isAdmin && baseLinks.map(renderNavLink)}
      {user && !isAdmin && userLinks.map(renderNavLink)}
      {isAdmin && adminLinks.map(renderNavLink)}
    </>
  );
};

export default NavList;
