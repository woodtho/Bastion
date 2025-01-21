export const Sanctuary = {
  name: "Sanctuary",
  levelReq: 5,
  prereq: "HolySymbol",
  canEnlarge: false,
  baseOrderOptions: ["Craft"],
  desc: "Sanctuary Charm (Healing Word 1/week). Craft Sacred Focus in 7 days (no cost).",
  subOrders: {
    Craft: [
      { label: "Sacred Focus (7 days, no cost)", key: "SanctuaryFocus" },
    ],
  },
};
