// FILE: ./facilities/special/Prison.mjs

/*
A Prison (Roomy) has 2 cells, each can hold 2 Medium or 1 Large creature.
Research -> Interrogation or Rehabilitation, after a prisoner fails an escape attempt.
*/

export const Prison = {
  name: "Prison",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Research"],
  desc: `
    <h2>Prison (Level 9)</h2>
    <p><strong>Default Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Research -> Interrogation or Rehabilitation</p>
    <p>
      Includes 2 cells (2 Medium or 1 Large each). The prisoner makes an escape check
      vs. DC = your Bastion Defenders + extras from Armory, Trapworks, or walls.
      If they fail, choose Interrogation (truth serum) or Rehabilitation (possibly turning
      them into a Bastion Defender).
    </p>
  `,
  subOrders: {
    Research: [
      { label: "Interrogation", key: "PrisonInterrogation" },
      { label: "Rehabilitation", key: "PrisonRehabilitation" }
    ],
  },
  randomEffects: []
};

/*
Helper function for the main code to compute Prison escape DC. 
DC = defenders + (armoryStocked ? defenders : 0) + (trapworks ? 5 : 0) + (wall ? 5 : 0)
*/
export function calculatePrisonEscapeDC(baseDefenders, isArmoryStocked, hasTrapworks, hasWall) {
  let dc = baseDefenders;
  if (isArmoryStocked) {
    // +1 per defender
    dc += baseDefenders;
  }
  if (hasTrapworks) {
    dc += 5;
  }
  if (hasWall) {
    dc += 5;
  }
  return dc;
}
