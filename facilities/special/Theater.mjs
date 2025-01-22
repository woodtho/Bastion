// FILE: ./facilities/Theater.mjs

/*
A Theater has a stage, backstage, and seating. It can host concerts or productions.
Default Space is Vast.
Prerequisite: None.
*/

export const Theater = {
  name: "Theater",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Vast",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Theater (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 4</p>
    <p><strong>Order:</strong> Empower (Theatrical Event)</p>
    <p>
      The Theater contains a stage, backstage, and seating. Commission a production or concert that takes 14 days to rehearse, then at least 7 days of performances.
    </p>
    <p>
      <strong>Empower: Theatrical Event.</strong> At the end of the rehearsal, each contributing character makes a DC 15 Charisma (Performance) check. If more succeed than fail, each gains a Theater die (d6, d8 at level 13, d10 at level 17) that can be added to one d20 Test before the next production.
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Theatrical Event", key: "TheaterEvent" }
    ]
  },
  // Optional random effect for simulating a Performance check
  randomEffects: [
    {
      label: "Performance Check (DC 15)",
      functionName: "rollTheaterPerformanceCheck"
    }
  ]
};

/*
Helper function simulating a DC 15 Charisma (Performance) check.
*/
export function rollTheaterPerformanceCheck(charismaMod = 0, proficiencyBonus = 0) {
  const d20 = Math.floor(Math.random() * 20) + 1;
  const total = d20 + charismaMod + proficiencyBonus;
  return {
    roll: d20,
    total,
    success: total >= 15
  };
}
