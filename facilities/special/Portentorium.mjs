export const Portentorium = {
  name: "Portentorium",
  levelReq: 5,          // Must be level 5 or higher
  prereq: "None",
  canEnlarge: false,    // The text does not describe enlarging
  baseOrderOptions: ["Empower"],
  desc: `
    A Portentorium reveals future events. Once every 7 days, after a Long Rest, you gain
    a Charm that allows you to cast Augury once without a spell slot. When you use
    Empower (Fate’s Favor), you and allies gain Heroic Inspiration.
  `,
  subOrders: {
    Empower: [
      { label: "Fate’s Favor (grant Heroic Inspiration)", key: "PortentoriumFatesFavor" }
    ],
  },
};