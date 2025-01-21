export const GamingHall = {
  name: "Gaming Hall",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Trade"],
  desc: "A gambling den that yields random winnings after 7 days (roll 1d100 for your share). Must be Vast space.",
  subOrders: {
    Trade: [
      { label: "Gambling Hall (7 days, roll 1d100)", key: "GamingHallTrade" },
    ],
  },
};
