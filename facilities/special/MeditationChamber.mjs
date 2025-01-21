export const MeditationChamber = {
  name: "Meditation Chamber",
  levelReq: 13,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: "Helps align mind/body/spirit. Empower: Inner Peace (roll events twice) or Fortify Self (7 days).",
  subOrders: {
    Empower: [
      { label: "Inner Peace (improve next Bastion event roll)", key: "MeditationPeace" },
      { label: "Fortify Self (7 days -> advantage on saves)", key: "MeditationFortify" },
    ],
  },
};
