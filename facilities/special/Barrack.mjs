export const Barrack = {
  name: "Barrack",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true,
  baseOrderOptions: ["Recruit"],
  desc: "Houses up to 12 defenders. Recruit 4 defenders for free if not full. Expand to Vast for up to 25 defenders.",
  subOrders: {
    Recruit: [
      { label: "Recruit up to 4 Defenders (no cost)", key: "BarrackRecruit" },
    ],
  },
};
