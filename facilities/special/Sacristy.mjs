export const Sacristy = {
  name: "Sacristy",
  levelReq: 9,
  prereq: "HolySymbol",
  canEnlarge: false,
  baseOrderOptions: ["Craft"],
  desc: "Storage/preparation of sacred items. Spell Refreshment 1/Short Rest. Craft Holy Water or Magic Item (Relic).",
  subOrders: {
    Craft: [
      { label: "Holy Water (7 days, can spend extra GP)", key: "SacristyHolyWater" },
      { label: "Magic Item (Relic) (7+ days, costs vary)", key: "SacristyMagicRelic" },
    ],
  },
};
