export const Observatory = {
  name: "Observatory",
  levelReq: 13,
  prereq: "ArcaneFocus",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: "Observatory Charm (Contact Other Plane 1/week). Empower for Eldritch Discovery (7 nights).",
  subOrders: {
    Empower: [
      { label: "Eldritch Discovery (7 nights)", key: "ObservatoryEldritch" },
    ],
  },
};
