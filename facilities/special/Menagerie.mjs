export const Menagerie = {
  name: "Menagerie",
  levelReq: 13,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Recruit"],
  desc: "Holds up to four Large creatures. Recruit creatures at various GP costs that can count as defenders.",
  subOrders: {
    Recruit: [
      { label: "Add Creature (7 days, cost varies)", key: "MenagerieRecruit" },
    ],
  },
};
