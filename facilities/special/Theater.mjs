export const Theater = {
  name: "Theater",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: "Stage/backstage/seats. Empower: Theatrical Event (14+ days, performance yields Theater die). Must be Vast.",
  subOrders: {
    Empower: [
      { label: "Theatrical Production (14+ days)", key: "TheaterProduction" },
    ],
  },
};
