// FILE: ./facilities/MeditationChamber.mjs

/*
A Meditation Chamber is a relaxing space that aligns mind, body, and spirit.
Default Space is Cramped.
Prerequisite: None.
*/

export const MeditationChamber = {
  name: "Meditation Chamber",
  levelReq: 13,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Cramped",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Meditation Chamber (Level 13)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Cramped</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Empower (Inner Peace)</p>
    <p>
      A small chamber that helps align mind, body, and spirit.
    </p>
    <p>
      <strong>Empower: Inner Peace.</strong> Commission the hirelings to use the chamber for 7 days. The next time you roll for a Bastion event, roll twice and choose the result.
    </p>
    <p>
      <strong>Fortify Self.</strong> Meditate here for 7 uninterrupted days. At the end, gain Advantage on two random saving throw types for the next 7 days, determined by rolling on a 1d6 table (reroll duplicates).
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Inner Peace", key: "MeditationChamberInnerPeace" }
    ]
  },
  // Use randomEffects to determine which saving throws you get for Fortify Self
  randomEffects: [
    {
      label: "Random Fortify Saving Throws",
      functionName: "getRandomFortifySaves"
    }
  ]
};

/*
Helper function for random saving throw advantage from a 1d6 table:
1-Strength, 2-Dex, 3-Con, 4-Int, 5-Wis, 6-Cha
Returns an array of two distinct saving throw labels.
*/
export function getRandomFortifySaves() {
  const saves = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
  // Roll twice, ensuring distinct results
  const roll1 = Math.floor(Math.random() * 6);
  let roll2 = Math.floor(Math.random() * 6);
  while (roll2 === roll1) {
    roll2 = Math.floor(Math.random() * 6);
  }
  return [saves[roll1], saves[roll2]];
}
