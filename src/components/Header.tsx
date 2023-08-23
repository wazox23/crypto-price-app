import React, { useState } from "react";
import moonImage from "../assets/moon.png";
import "../styles/Header.scss";
import { searchCryptocurrency, Cryptocurrency } from "../api/cryptoApi";
import { useNavigate } from "react-router-dom";
import searchImage from "../assets/search.png";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const coinDetails: Cryptocurrency | null = await searchCryptocurrency(
        query
      );
      if (coinDetails) {
        navigate(`/${coinDetails.id}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <header className="navbar d-flex flex-column align-items-center justify-content-center px-4">
      <h2 className="fw-bold navbar-brand text-white m-0 fs-1">
        to the Moon
        <img src={moonImage} className="logo ms-2" alt="logo" />
      </h2>
      <div className="d-flex align-items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a crypto currency..."
          style={{ maxWidth: "300px" }}
        />
        <button type="button" className="btn-round" onClick={handleSearch}>
          <img src={searchImage} className="img" alt="search" />
        </button>
      </div>
    </header>
  );
}

export default Header;
