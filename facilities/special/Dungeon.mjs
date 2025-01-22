// FILE: ./facilities/special/Dungeon.mjs

/*
A Dungeon has 3 rooms if Roomy, or 5 if Vast. 
You can bait up to 5,000 GP (Roomy) or 10,000 GP (Vast), then roll vs. DC=15.
If success, you gain loot; if fail, you lose your gold.
*/

export const Dungeon = {
  name: "Dungeon",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true,
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 10000
  },
  baseOrderOptions: ["Trade"],
  desc: `
    <h2>Dungeon (Level 13)</h2>
    <p><strong>Default Space:</strong> Roomy (3 rooms). Can enlarge to Vast (5 rooms) for 10,000 GP.</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Trade -> Bait Dungeon</p>
    <p>
      DC=15 minus any mods from Trapworks, Menagerie, or Prison. 
      Bait up to 5,000 GP if Roomy, 10,000 GP if Vast. 
      After 7 days, roll a d20 vs. DC:
    </p>
    <ul>
      <li><strong>Nat 20 or success by 5+:</strong> keep gold + gain 100% more loot</li>
      <li><strong>Success:</strong> keep gold + gain 50% more loot</li>
      <li><strong>Fail:</strong> lose bait</li>
      <li><strong>Nat 1 or fail by 5+:</strong> lose bait + any DC-reducing creatures are slain</li>
    </ul>
  `,
  subOrders: {
    Trade: [
      { label: "Bait Dungeon (7 days)", key: "DungeonBait" },
    ],
  },
  randomEffects: [
    {
      label: "Simulate Dungeon Outcome",
      functionName: "rollDungeonOutcome"
    }
  ]
};

/*
Helper to roll a d20 vs. a Dungeon DC.
We return an object with the roll, successMargin, isNat1, isNat20 for the main code to interpret.
*/
export function rollDungeonOutcome(dungeonDC) {
  const outcomeRoll = Math.floor(Math.random() * 20) + 1;
  return {
    roll: outcomeRoll,
    successMargin: outcomeRoll - dungeonDC,
    isNat1: (outcomeRoll === 1),
    isNat20: (outcomeRoll === 20),
  };
}
