import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";

import Slidermain from "../components/slider/Slidermain";

const SliderScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Slidermain />
      </main>
    </>
  );
};

export default SliderScreen;