// FILE: ./facilities/special/Trapworks.mjs

/*
A Trapworks is a workshop to craft a Portable Trap or a Mimic if level ≥ 9.
Steady Hands grants advantage on Sleight of Hand to disarm traps for 7 days.
*/

export const Trapworks = {
  name: "Trapworks",
  levelReq: 5,
  prereq: "ThievesToolsOrSleightOfHand",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Trapworks (Level 5)</h2>
    <p><strong>Default Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Craft -> Portable Trap or Mimic (level≥9)</p>
    <ul>
      <li><strong>Steady Hands:</strong> After a Long Rest here, gain advantage on disarming traps for 7 days.</li>
      <li><strong>Portable Trap (7 days, 50 GP):</strong> 4 uses, each can be set with a mode (Trip Wire, Decoy, etc.)
          and an effect (Pit, Poison, Fire, Shrapnel). DC=8+prof+DEX.</li>
      <li><strong>Mimic Familiar (level≥9):</strong> Takes 7 days to create, uses a Mimic stat block as a special "trap" familiar.</li>
    </ul>
  `,
  subOrders: {
    Craft: [
      { label: "Portable Trap (7 days, 50 GP)", key: "TrapworksPortableTrap" },
      { label: "Mimic Familiar (level≥9)", key: "TrapworksMimicFamiliar" }
    ],
  },
  randomEffects: [
    {
      label: "Random Trap Mode",
      functionName: "getRandomTrapMode"
    },
    {
      label: "Random Trap Effect",
      functionName: "getRandomTrapEffect"
    }
  ]
};

/*
Choose a random trap mode or trap effect.
*/
export function getRandomTrapMode() {
  const modes = ["Trip Wire","Decoy","Remote Trigger","Timer"];
  const i = Math.floor(Math.random() * modes.length);
  return modes[i];
}

export function getRandomTrapEffect() {
  const effects = ["Pit Trap","Poison Spray","Fire Gout","Shrapnel"];
  const i = Math.floor(Math.random() * effects.length);
  return effects[i];
}
