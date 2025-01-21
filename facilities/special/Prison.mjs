export const Prison = {
  name: "Prison",
  levelReq: 9,       // Must be level 9 or higher
  prereq: "None",
  canEnlarge: false, // The text does not describe enlarging the Prison
  baseOrderOptions: ["Research"],
  desc: `
    A Prison holds evildoers away from the outside world. It contains 2 cells, each can
    hold up to 2 Medium (or 1 Large) creatures. When you issue a Research order, you
    attempt Interrogation or Rehabilitation of a prisoner who must first pass an escape
    check against your Bastion Defender DC (modified by Armory, Trapworks, or walls).
  `,
  subOrders: {
    Research: [
      { label: "Interrogation (truth serum)", key: "PrisonInterrogation" },
      { label: "Rehabilitation (persuade to your side)", key: "PrisonRehabilitation" }
    ],
  },
};
