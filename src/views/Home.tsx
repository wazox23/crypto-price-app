import React from "react";
import CryptoList from "../components/CryptoList";
import Header from "../components/Header";
import "../styles/Home.scss";
function Home() {
  return (
    <div className="app-container">
      <Header />
      <CryptoList />
    </div>
  );
}

export default Home;
