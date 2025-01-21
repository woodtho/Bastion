export const Pub = {
  name: "Pub",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true,
  baseOrderOptions: ["Research"],
  desc: "A social hub. Research: Information Gathering (7 days). Magical beverages on tap, can be swapped each turn.",
  subOrders: {
    Research: [
      { label: "Information Gathering (7 days)", key: "PubInfo" },
    ],
  },
};
