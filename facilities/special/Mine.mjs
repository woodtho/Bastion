// FILE: ./facilities/special/Mine.mjs

/*
A Mine is a Vast facility that yields random gems or magic items after 7 days.
*/

export const Mine = {
  name: "Mine",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Vast",
  baseOrderOptions: ["Harvest"],
  desc: `
    <h2>Mine (Level 9)</h2>
    <p><strong>Default Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 2</p>
    <p><strong>Order:</strong> Harvest -> Dig a Hole</p>
    <p>After 7 days, roll a d100 using the DMG's "Gemstones" or "Arcana" tables.</p>
  `,
  subOrders: {
    Harvest: [
      { label: "Dig a Hole (7 days)", key: "MineDigHole" },
    ],
  },
  // We'll store one random effect function for demonstration
  randomEffects: [
    {
      label: "Roll Mine Treasure (d100)",
      functionName: "rollMineTreasure"
    }
  ]
};

/*
Helper to roll a d100 for random Mine treasure.
*/
export function rollMineTreasure() {
  return Math.floor(Math.random() * 100) + 1;
}
