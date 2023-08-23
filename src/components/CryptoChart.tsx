import React, { useEffect, useState } from "react";
import "../styles/CryptoChart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchMarketChartData } from "../api/cryptoApi";

interface MarketData {
  name: string;
  price: number;
}

const CryptoChart: React.FC<{ id: string }> = ({ id }) => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [days, setDays] = useState<number | "max">(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMarketChartData(id, days);
        const transformedData: MarketData[] = data.prices.map(
          (entry: [number, number]) => {
            return {
              name: new Date(entry[0]).toLocaleDateString(),
              price: entry[1],
            };
          }
        );
        setMarketData(transformedData);
      } catch (error) {
        console.error("Failed to fetch market data:", error);
      }
    };

    fetchData();
  }, [id, days]);

  const formatTooltipValue = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const formatYAxisValue = (value: number) => {
    return `$${value}`;
  };

  return (
    <>
      <div className="button-container">
        <button className="btn-round fs-3 mx-2" onClick={() => setDays(7)}>
          7 days
        </button>
        <button className="btn-round fs-3 mx-2" onClick={() => setDays(30)}>
          30 days
        </button>
        <button className="btn-round fs-3 mx-2" onClick={() => setDays(365)}>
          365 days
        </button>
        <button className="btn-round fs-3 mx-2" onClick={() => setDays("max")}>
          Max
        </button>
      </div>
      <ResponsiveContainer width="70%" height={600}>
        <AreaChart
          width={730}
          height={250}
          data={marketData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatYAxisValue} />
          <Tooltip formatter={formatTooltipValue} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#e3c9ff"
            fill="#e3c9ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default CryptoChart;
