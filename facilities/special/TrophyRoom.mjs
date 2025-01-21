export const TrophyRoom = {
  name: "Trophy Room",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Research"],
  desc: "Displays mementos. Research: Lore or search for a Trinket Trophy in 7 days.",
  subOrders: {
    Research: [
      { label: "Lore (7 days)", key: "TrophyLore" },
      { label: "Trinket Trophy (7 days)", key: "TrophyTrinket" },
    ],
  },
};
