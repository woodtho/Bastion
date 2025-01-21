export const Storehouse = {
  name: "Storehouse",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Trade"],
  desc: "Cool, dark storage for trade goods. 7 days to buy/sell up to 500 GP in goods (scales with level).",
  subOrders: {
    Trade: [
      { label: "Procure/Sell Goods (7 days)", key: "StorehouseTrade" },
    ],
  },
};
