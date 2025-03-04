"use client";

import { useState, useEffect } from "react";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import BarChart from "@/components/BarChart";
import axios from "axios";
import { TrendingDown } from "lucide-react";

export default function Home() {
  const [cardData, setCardData] = useState<CardProps[]>([
    { label: "Bitcoin", amount: "$0", discription: "Bitcoin price", icon: TrendingDown },
    { label: "Ethereum", amount: "$0", discription: "Ethereum price", icon: TrendingDown },
    { label: "Solana", amount: "$0", discription: "Solana price", icon: TrendingDown },
    { label: "Dogecoin", amount: "$0", discription: "Dogecoin price", icon: TrendingDown },
  ]);

  const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY; // Ensure API key is in .env.local

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://pro-api.coingecko.com/api/v3/simple/price",
          {
            params: {
              ids: "bitcoin,ethereum,solana,dogecoin",
              vs_currencies: "usd",
            },
            headers: {
              "x-cg-api-key": API_KEY,
            },
          }
        );

        const updatedPrices = [
          { label: "Bitcoin", amount: `$${response.data.bitcoin.usd.toLocaleString()}`, discription: "Bitcoin price", icon: TrendingDown },
          { label: "Ethereum", amount: `$${response.data.ethereum.usd.toLocaleString()}`, discription: "Ethereum price", icon: TrendingDown },
          { label: "Solana", amount: `$${response.data.solana.usd.toLocaleString()}`, discription: "Solana price", icon: TrendingDown },
          { label: "Dogecoin", amount: `$${response.data.dogecoin.usd.toLocaleString()}`, discription: "Dogecoin price", icon: TrendingDown },
        ];

        setCardData(updatedPrices);
      } catch (error) {
        console.error("Error fetching live prices:", error);
      }
    };

    fetchPrices(); // Fetch immediately when the page loads
    const interval = setInterval(fetchPrices, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup function
  }, [API_KEY]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <main className="flex flex-col items-center justify-center 60px">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Crypto Search</h1>
        <p className="text-gray-600 mt-2">Click the search button (🔍) to find your favorite coins!</p>
      </main>

      {/* Live Crypto Prices */}
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card key={i} amount={d.amount} discription={d.discription} icon={d.icon} label={d.label} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">S&P BDM</p>
          <BarChart />
        </CardContent>

        <CardContent>
          <section>
            <p>Recent Views</p>
            <p className="text-sm text-gray-400">You viewed...</p>
          </section>
        </CardContent>
      </section>
    </div>
  );
}
