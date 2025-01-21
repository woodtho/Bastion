export const Stable = {
  name: "Stable",
  levelReq: 9,
  prereq: "None",
  canEnlarge: true,
  baseOrderOptions: ["Trade"],
  desc: "Houses 3 Large animals. Trade to buy/sell mounts. Gains bigger capacity if enlarged to Vast.",
  subOrders: {
    Trade: [
      { label: "Animals (7 days, cost depends on mount)", key: "StableAnimals" },
    ],
  },
};
