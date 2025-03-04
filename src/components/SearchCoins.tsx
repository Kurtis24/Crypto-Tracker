"use client"; // Needed for useState and event handling

import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiX } from "react-icons/fi";
import { TrendingDown } from "lucide-react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

export default function SearchCoins() {
  const [query, setQuery] = useState<string>("");
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://pro-api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              sparkline: false,
            },
            headers: {
              "x-cg-api-key": API_KEY,
            },
          }
        );
        setCoins(response.data);
        setFilteredCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    setFilteredCoins(filtered);
  };

  // Open detailed view
  const handleSelectCoin = (coin: Coin) => {
    console.log("Selected Coin:", coin);
    setSelectedCoin(coin);
  };

  // Close modal
  const handleCloseDetail = () => {
    setSelectedCoin(null);
  };

  return (
    <div>
      {/* Floating Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <FiSearch size={24} />
      </button>

      {/* Search Modal */}
      {isOpen && !selectedCoin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">Search Crypto</h2>

            <input
              type="text"
              placeholder="Search for a coin..."
              value={query}
              onChange={handleSearch}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ul className="mt-4 max-h-60 overflow-y-auto">
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => (
                  <li
                    key={coin.id}
                    onClick={() => handleSelectCoin(coin)}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-md hover:bg-gray-200 transition mb-2 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                      <span className="font-semibold">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </span>
                    </div>
                    <span
                      className={`font-bold ${
                        coin.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-4">No coins found</p>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Coin Detail Modal */}
      {selectedCoin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            <button
              onClick={handleCloseDetail}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold text-center mb-4">
              {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
            </h2>

            <div className="flex flex-col items-center">
              <img src={selectedCoin.image} alt={selectedCoin.name} className="w-20 h-20 mb-4" />
              <p className="text-lg font-semibold text-green-600">
                ${selectedCoin.current_price.toFixed(2)}
              </p>
              <p className="text-gray-600">Market Cap: ${selectedCoin.market_cap.toLocaleString()}</p>
              <p className="text-gray-600">Volume: ${selectedCoin.total_volume.toLocaleString()}</p>

              {selectedCoin.price_change_percentage_24h < 0 && (
                <div className="flex items-center space-x-2 text-red-500">
                  <TrendingDown size={24} />
                  <span>{selectedCoin.price_change_percentage_24h.toFixed(2)}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
