export const Workshop = {
  name: "Workshop",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true,
  baseOrderOptions: ["Craft"],
  desc: "Workshop with 6 chosen tools. Source of Inspiration: after a Short Rest, gain Heroic Inspiration once until next Long Rest. Sub-options for crafting gear or magic implements (level≥9).",
  subOrders: {
    Craft: [
      { label: "Adventuring Gear (7 days)", key: "WorkshopGear" },
      { label: "Magic Item (Implement) (level≥9)", key: "WorkshopMagic" },
    ],
  },
};
