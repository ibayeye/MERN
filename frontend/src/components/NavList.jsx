import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "about", text: "about" },
  { id: 2, url: "products", text: "products" },
  { id: 3, url: "orders", text: "orders" },
  { id: 4, url: "checkout", text: "checkout" },
];
const NavList = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === "checkout" || url === "orders") && !user) return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavList;
