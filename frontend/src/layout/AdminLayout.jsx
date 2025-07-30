import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
const AdminLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <div>
        <Header />
        <Nav />
        {isPageLoading ? (
          <Loading />
        ) : (
          <main className="mx-auto max-w-6xl px-8 py-20 min-h-[80vh]">
            <Outlet />
          </main>
        )}
        <Footer />
      </div>
    </>
  );
};

export default AdminLayout;
