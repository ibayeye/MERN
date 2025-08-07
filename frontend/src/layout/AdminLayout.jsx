import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import SideBar from "../components/SideBar";
import HeaderAdmin from "../components/HeaderAdmin";
const AdminLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <div>
        {/* <Header /> */}
        {/* <Nav /> */}
        <SideBar>
          <HeaderAdmin />
          {isPageLoading ? (
            <Loading />
          ) : (
            <main className="mx-auto max-w-6xl px-8 py-4 min-h-[80vh]">
              <Outlet />
            </main>
          )}
        </SideBar>

        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
