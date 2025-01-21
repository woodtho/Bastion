export const Greenhouse = {
  name: "Greenhouse",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Harvest"],
  desc: "Enclosed environment for rare plants. Fruit of Restoration. Harvest: Healing Herbs or Poison in 7 days.",
  subOrders: {
    Harvest: [
      { label: "Healing Herbs (7 days, no cost)", key: "GreenhouseHerbs" },
      { label: "Poison (7 days, no cost)", key: "GreenhousePoison" },
    ],
  },
};
