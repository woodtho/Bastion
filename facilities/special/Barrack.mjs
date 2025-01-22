// FILE: ./facilities/Barrack.mjs

/*
A Barrack serves as sleeping quarters for Bastion Defenders.
Default Space is Roomy, can enlarge to Vast for 2,000 GP.
Prerequisite: None.
*/

export const Barrack = {
  name: "Barrack",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true, // Can enlarge from Roomy->Vast
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 2000
  },
  baseOrderOptions: ["Recruit"], // This facility offers the Recruit order
  desc: `
    <h2>Barrack (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 2,000 GP)</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Recruit (Bastion Defenders)</p>
    <p>
      A Bastion can have more than one Barrack, each housing up to twelve Bastion Defenders.
    </p>
    <p>
      <strong>Recruit: Bastion Defenders.</strong> Recruit up to four Defenders in 7 days. No monetary cost. Can't issue Recruit if Barrack is full.
    </p>
    <p>
      Track Defenders per Barrack. If you lose any, deduct them from your roster. You can assign names/personalities as desired.
    </p>
  `,
  subOrders: {
    Recruit: [
      { label: "Bastion Defenders", key: "BarrackBastionDefenders" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Barrack
};
