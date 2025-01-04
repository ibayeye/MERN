import React from "react";
import {Outlet} from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <div>
        <header>Header</header>
        <Outlet/>
        <footer>Footer</footer>
      </div>
    </>
  );
};

export default PublicLayout;
