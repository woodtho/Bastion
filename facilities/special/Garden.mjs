export const Garden = {
  name: "Garden",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true,
  baseOrderOptions: ["Harvest"],
  desc: "A garden of a chosen type (Decorative, Food, Herb, Poison). Harvest yields resources in 7 days.",
  subOrders: {
    Harvest: [
      { label: "Garden Growth (7 days, no cost)", key: "GardenHarvest" },
    ],
  },
};
