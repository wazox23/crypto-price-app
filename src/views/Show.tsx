import React, { useState, useEffect } from "react";
import CryptoChart from "../components/CryptoChart";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Show.scss";
import bitcoinImage from "../assets/btc.png";
import loadingImage from "../assets/loading.gif";
import {
  searchCryptocurrency,
  Cryptocurrency,
  fetchCurrentPrice,
} from "../api/cryptoApi";

const Show: React.FC = () => {
  const [coinDetails, setCoinDetails] = useState<Cryptocurrency | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const { coinId } = useParams<{ coinId?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      if (coinId) {
        const details = await searchCryptocurrency(coinId);
        setCoinDetails(details);

        const price = await fetchCurrentPrice(coinId);
        setCurrentPrice(price);
      }
    };
    fetchData();
  }, [coinId]);

  function renderPriceChange() {
    if (coinDetails) {
      const priceChange = coinDetails.price_change_percentage_24h.toFixed(2);
      const isNegative = priceChange.startsWith("-");
      const colorStyle = isNegative ? { color: "red" } : { color: "green" };

      return <span style={colorStyle}>{priceChange}%</span>;
    } else {
      return <img src={loadingImage} alt="Loading" />;
    }
  }

  return (
    <div className="main-container">
      <div className="show-container container d-flex flex-column justify-content-center">
        <div className="left-side-container text-center mb-3">
          {coinDetails && (
            <div>
              <h1>{coinDetails.name}</h1>
              <p className="text-uppercase d-none d-md-block">
                ({coinDetails.symbol})
              </p>
              <img src={coinDetails.image} alt={coinDetails.name} />
            </div>
          )}
        </div>

        {coinDetails && coinId && <CryptoChart id={coinId} />}
        <div className="row mt-3  text-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h4>Market cap rank</h4>
            <span>
              {coinDetails ? (
                coinDetails.market_cap_rank
              ) : (
                <img src={loadingImage} />
              )}
            </span>
          </div>
        </div>
        <div className="row mt-3  text-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h4>Price (USD)</h4>
            {currentPrice !== null ? (
              <span>${currentPrice.toFixed(2)}</span>
            ) : (
              <span>
                Loading... <img src={loadingImage} alt="Loading" />
              </span>
            )}
          </div>
        </div>

        <div className="row mt-3  text-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h4>Price (BTC)</h4>
            <div className="btc-price d-flex align-items-center">
              <img src={bitcoinImage} alt="Bitcoin" className="img-btc mr-2" />
              {coinDetails ? (
                coinDetails.price_btc.toFixed(6)
              ) : (
                <img src={loadingImage} />
              )}
            </div>
          </div>
        </div>
        <div className="row mt-3  text-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h4>24 price change</h4>
            {renderPriceChange()}
          </div>
        </div>
        <div className="row mt-3 text-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h4>24 high</h4>
            {coinDetails ? coinDetails.high_24h : <img src={loadingImage} />}$
          </div>
        </div>
        <div className="row mt-3  text-center">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h4>24 low</h4>
            {coinDetails ? coinDetails.low_24h : <img src={loadingImage} />}$
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
