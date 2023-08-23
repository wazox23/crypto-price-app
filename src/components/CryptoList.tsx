import React, { useState, useEffect } from "react";
import {
  fetchTrendingCryptocurrencies,
  Cryptocurrency,
  searchCryptocurrency,
} from "../api/cryptoApi";
import { Link } from "react-router-dom";
import "../styles/CryptoList.scss";
import bitcoinImage from "../assets/btc.png";
import loadingImage from "../assets/loading.gif";

const CryptoList: React.FC = () => {
  const [cryptos, setCryptos] = useState<Cryptocurrency[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingData = await fetchTrendingCryptocurrencies();
        setCryptos(trendingData);
      } catch (error) {
        console.error("Error fetching trending cryptos:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="container text-center p-5">
      {loading && (
        <div>
          Loading... <img src={loadingImage} alt="loading" />
        </div>
      )}
      <ul className="crypto-list">
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="crypto-item">
            <img src={crypto.thumb} alt={crypto.id} />
            <Link to={`/${crypto.id}`} className="text-white">
              {crypto.name} ({crypto.symbol})
            </Link>
            <div className="col-2 m-2">
              <img src={bitcoinImage} alt="Bitcoin" />{" "}
              {crypto.price_btc.toFixed(6)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
