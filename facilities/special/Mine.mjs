export const Mine = {
  name: "Mine",
  levelReq: 9,           // Must be level 9 or higher
  prereq: "None",         // No special prerequisite
  canEnlarge: false,      // The text does not mention enlarging a Mine
  baseOrderOptions: ["Harvest"],
  desc: `
    A Mine is a small network of cave systems full of valuable ore, gems, and magic items.
    Harvest: Dig a Hole. After 7 days (until your next Bastion Turn), roll a d100 to
    determine what valuables are retrieved. Use the Gemstones and Arcana tables in
    Chapter 7 of the 2024 DMG for the results.
  `,
  subOrders: {
    Harvest: [
      { label: "Dig a Hole (roll d100 at next Bastion Turn)", key: "MineDigHole" }
    ],
  },
};