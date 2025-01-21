export const Trapworks = {
  name: "Trapworks",
  levelReq: 5,                  // Must be level 5 or higher
  // The text states "Prerequisite: Proficiency with Thieves’ Tools or Sleight of Hand"
  // If your system doesn't allow multiple prereqs, store a combined descriptor:
  prereq: "ThievesToolsOrSleightOfHand",
  canEnlarge: false,
  baseOrderOptions: ["Craft"],
  desc: `
    A Trapworks is a workshop dedicated to designing traps. Long Rests here grant
    Advantage on Sleight of Hand checks to disarm traps for 7 days. Craft: Portable Trap
    or a Mimic companion (if level ≥ 9). The portable trap can be set in various modes
    and has multiple effect types, each with limited usage.
  `,
  subOrders: {
    Craft: [
      { label: "Portable Trap (7 days, 50 GP)", key: "TrapworksPortableTrap" },
      { label: "Mimic Familiar (level≥9)", key: "TrapworksMimicFamiliar" }
    ],
  },
};
