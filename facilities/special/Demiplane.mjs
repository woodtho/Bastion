export const Demiplane = {
  name: "Demiplane",
  levelReq: 17,
  prereq: "ArcaneFocus",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: "A vast extradimensional space. Empower: Arcane Resilience for 7 days. Fabrication once per Long Rest.",
  subOrders: {
    Empower: [
      { label: "Arcane Resilience (7 days)", key: "DemiplaneArcane" },
    ],
  },
};
