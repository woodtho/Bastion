export const Sanctum = {
  name: "Sanctum",
  levelReq: 17,
  prereq: "HolySymbol",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: "Sanctum Charm (Heal 1/week). Empower: Fortifying Rites for 7 days. Sanctum Recall with Word of Recall.",
  subOrders: {
    Empower: [
      { label: "Fortifying Rites (7 days)", key: "SanctumFortify" },
    ],
  },
};
