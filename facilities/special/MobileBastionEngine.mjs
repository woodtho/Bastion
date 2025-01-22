// FILE: ./facilities/special/MobileBastionEngine.mjs

/*
A Mobile Bastion Engine can move your Bastion at a slow pace for 2 days 
(Roomy). If enlarged to Vast for 60,000 GP, it can fly for up to 5 days.
Also includes a table for random treasure (01-41, 42-73, etc.)
*/

export const MobileBastionEngine = {
  name: "Mobile Bastion Engine",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true,
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 60000
  },
  baseOrderOptions: ["Move"],
  desc: `
    <h2>Mobile Bastion Engine (Level 13)</h2>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 60,000 GP)</p>
    <p><strong>Hirelings:</strong> 2</p>
    <p><strong>Order:</strong> Move -> Relocate Bastion</p>
    <p>
      Allows your Bastion to relocate. If Roomy, you can only move it for 2 days 
      before resting. If Vast, you can fly up to 5 days. Not landing in time causes a crash
      that damages a random special facility for 1 turn.
    </p>
    <h3>D100 Treasure Table</h3>
    <table border="1" style="border-collapse: collapse;">
      <tr><th>01–41</th><td>3× 50 GP Gems + 5× 10 GP Gems</td></tr>
      <tr><th>42–73</th><td>3× 100 GP Gems + 2× 50 GP Gems</td></tr>
      <tr><th>74–95</th><td>1× 500 GP Gem</td></tr>
      <tr><th>96–00</th><td>1× Uncommon Magic Item</td></tr>
    </table>
  `,
  subOrders: {
    Move: [
      { label: "Relocate Bastion (2 days or 5 days if flying)", key: "MobileEngineRelocate" }
    ],
  },
  randomEffects: [
    {
      label: "Roll Engine Treasure (d100)",
      functionName: "rollEngineTreasureTable"
    }
  ]
};

/*
Helper function to roll on the D100 Treasure table above.
*/
export function rollEngineTreasureTable() {
  const rollVal = Math.floor(Math.random() * 100) + 1;
  let result;
  if (rollVal <= 41) {
    result = "3× 50 GP gems, 5× 10 GP gems";
  } else if (rollVal <= 73) {
    result = "3× 100 GP gems, 2× 50 GP gems";
  } else if (rollVal <= 95) {
    result = "1× 500 GP gem";
  } else {
    result = "1× Uncommon Magic Item (Arcana Table)";
  }
  return { roll: rollVal, treasure: result };
}
