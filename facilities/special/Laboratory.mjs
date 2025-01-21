export const Laboratory = {
  name: "Laboratory",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Craft"],
  desc: "Alchemical workspace. Craft Alchemist’s Supplies items or Poison (Burnt Othur, Ether, Torpor, etc.).",
  subOrders: {
    Craft: [
      { label: "Alchemist’s Supplies item (7 days)", key: "LabAlchemist" },
      { label: "Poison (pay half cost, 7 days)", key: "LabPoison" },
    ],
  },
};
