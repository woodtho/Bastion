export const Reliquary = {
  name: "Reliquary",
  levelReq: 13,
  prereq: "HolySymbol",
  canEnlarge: false,
  baseOrderOptions: ["Harvest"],
  desc: "Vault of sacred objects. Reliquary Charm (Greater Restoration). Harvest Talisman for expensive material components.",
  subOrders: {
    Harvest: [
      { label: "Talisman (7 days, no cost)", key: "ReliquaryTalisman" },
    ],
  },
};
