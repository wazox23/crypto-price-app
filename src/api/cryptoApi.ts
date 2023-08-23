import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3";

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  image: string;
  thumb: string;
  price_btc: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
}

export const fetchTrendingCryptocurrencies = async (): Promise<
  Cryptocurrency[]
> => {
  try {
    const response = await apiClient.get("/search/trending");
    return response.data.coins.map(
      (coin: { item: Cryptocurrency }) => coin.item
    );
  } catch (error) {
    console.error("Error fetching trending cryptos:", error);
    throw error;
  }
};

export const searchCryptocurrency = async (
  query: string
): Promise<Cryptocurrency | null> => {
  try {
    const searchResponse = await apiClient.get(`/search?query=${query}`);
    console.log("Search Response:", searchResponse.data);

    if (
      searchResponse.data &&
      searchResponse.data.coins &&
      searchResponse.data.coins.length > 0
    ) {
      const coinId = searchResponse.data.coins[0].id;
      if (coinId) {
        const coinResponse = await apiClient.get(`/coins/${coinId}`);
        console.log("Coin Response:", coinResponse.data);

        if (coinResponse.data) {
          const coinDetails: Cryptocurrency = {
            id: coinResponse.data.id,
            symbol: coinResponse.data.symbol,
            name: coinResponse.data.name,
            image: coinResponse.data.image.large,
            market_cap_rank: coinResponse.data.market_cap_rank,
            thumb: coinResponse.data.image.thumb,
            price_btc: coinResponse.data.market_data.current_price.btc,
            price_change_percentage_24h:
              coinResponse.data.market_data.price_change_percentage_24h,
            high_24h: coinResponse.data.market_data.high_24h.usd,
            low_24h: coinResponse.data.market_data.low_24h.usd,
          };
          return coinDetails;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error in searchCryptocurrency:", error);
    throw error;
  }
};

export const fetchMarketChartData = async (
  id: string,
  days: number | "max"
): Promise<any> => {
  try {
    const response = await apiClient.get(
      `/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentPrice = async (
  coinId: string
): Promise<number | null> => {
  try {
    const response = await apiClient.get(
      `/simple/price?ids=${coinId}&vs_currencies=usd`
    );
    console.log(response.data);
    return response.data[coinId].usd;
  } catch (error) {
    console.error("Error fetching current price:", error);
    throw error;
  }
};
