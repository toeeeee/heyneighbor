"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemType, TradeType, UserType } from "@/types/models";
import { useEffect, useState } from "react";

// This would be your actual data fetching function
// async function getData() {
//   // Replace with your actual API calls
//   const user = {
//     name: "Player123",
//     votes: 42
//   };

//   const items = [
//     { itemName: "Diamond Sword", itemDescription: "Sharp and shiny!" },
//     { itemName: "Golden Apple", itemDescription: "Restores health" }
//   ];

//   const trades = [
//     {
//       requestorItem: { itemName: "Iron Pickaxe" },
//       requesteeItem: { itemName: "Diamond Boots" },
//       status: "pending"
//     }
//   ];

//   return { user, items, trades };
// }

// useEffect(()=>{
//     getData();
// }, []);

export default function ProfilePage() {
    //   const { user, items, trades } = await getData();
    const [user, setUser] = useState<UserType | null>(null);
    const [items, setItems] = useState<ItemType[]>([]);
    const [trades, setTrades] = useState<TradeType[]>([]);

    useEffect(() => {
        localStorage.setItem("userId", "6783189ab0d8193ea042be3b"); // DELETE THIS WHEN ANNA IS DONE
        const userId = localStorage.getItem("userId");
        console.log("userId:", userId); //TESTING
        if (!userId) return; // ERROR PRETTY MUCH
        const getUserData = async () => {
            const response = await fetch(`/api/user/${userId}`);
            const userData: { user: UserType } | null = await response.json();
            console.log(userData); //TESTING
            if (!userData) return;
            setUser({
                _id: userData.user._id,
                name: userData.user.name,
                votes: userData.user.votes,
            });
        };
        getUserData();

        const getItemsFromUser = async () => {
            const response = await fetch(`/api/user/items/${userId}`);
            const itemsData: { items: ItemType[] } | null =
                await response.json();
            if(!itemsData) return;
            setItems(itemsData.items);//CHECK?
        };
        getItemsFromUser();

        const getTradesAsRequestee = async () => {
          const response = await fetch(`/api/user/trade/${userId}?who=requestee`);
          const tradeData: { trades: any } | null = await response.json();
          if(!tradeData) return;
          setTrades(tradeData.trades);
        };  
        getTradesAsRequestee();
    }, []);

    useEffect(() => {
        // console.log("user:", user); //TESTING
        // console.log('items:', items);//TESTING
        console.log('trades:', trades);//TESTING
    }, [trades]);

    return (
        <div className="min-h-screen bg-gray-800 p-8">
            {/* Minecraft-style container */}
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Username Card */}
                <Card className="border-4 border-gray-700 bg-gray-900">
                    <CardHeader className="border-b-2 border-gray-700">
                        <CardTitle className="text-2xl font-bold text-green-500 font-minecraft">
                            {user
                                ? `${user.name}'s Profile`
                                : "who could it be?"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            {/* Player skin placeholder */}
                            <div className="w-24 h-24 bg-gray-700 border-4 border-gray-600"></div>
                            <div>
                                <p className="text-green-400">
                                    {user
                                        ? `Reputation: ${user.votes} votes`
                                        : `no votes 🐣`}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Inventory Section */}
                <Card className="border-4 border-gray-700 bg-gray-900">
                    <CardHeader className="border-b-2 border-gray-700">
                        <CardTitle className="text-xl font-bold text-yellow-500">
                            Inventory
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {items.length == 0 && <p>Foodless and drinkless</p>}
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-800 border-2 border-gray-700 p-4 rounded hover:border-yellow-500 transition-colors"
                                >
                                    <h3 className="text-white font-bold">
                                        {item.itemName}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {item.itemDescription}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Active Trades Section */}
                <Card className="border-4 border-gray-700 bg-gray-900">
                    <CardHeader className="border-b-2 border-gray-700">
                        <CardTitle className="text-xl font-bold text-blue-500">
                            Active Trades
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {/* {trades.map((trade, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 border-2 border-gray-700 p-4 rounded mb-4 last:mb-0"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white">
                                            Offering:{" "}
                                            {trade.requestorItem.itemName}
                                        </p>
                                        <p className="text-white">
                                            For: {trade.requesteeItem.itemName}
                                        </p>
                                    </div>
                                    <span className="px-3 py-1 rounded bg-yellow-600 text-white uppercase text-sm">
                                        {trade.status}
                                    </span>
                                </div>
                            </div>
                        ))} */}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
