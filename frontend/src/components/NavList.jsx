import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

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
    { id: 5, url: "/admin", text: "dashboard" },
    { id: 6, url: "/admin/products", text: "products" },
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
        {link.text}
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
