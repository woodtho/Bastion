// FILE: ./facilities/Demiplane.mjs

/*
A Demiplane is an extradimensional space accessible by a special door in another facility.
Default Space is Vast.
Prerequisite: Ability to use an Arcane Focus or tool as a Spellcasting Focus.
*/

export const Demiplane = {
  name: "Demiplane",
  levelReq: 17,
  prereq: "Ability to use an Arcane Focus or a tool as a Spellcasting Focus",
  canEnlarge: false, // It's already Vast
  defaultSpace: "Vast",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Demiplane (Level 17)</h2>
    <p><strong>Prerequisite:</strong> Ability to use an Arcane Focus or a tool as a Spellcasting Focus</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Empower (Arcane Resilience)</p>
    <p>
      A special door appears in one of your other facilities. Only you and your hirelings can open it, leading to an extradimensional Demiplane. Neither the Demiplane nor its door can be dispelled.
    </p>
    <p>
      <strong>Empower: Arcane Resilience.</strong> Commission runes on the walls that last 7 days, granting you Temporary Hit Points equal to 5 × your level after a Long Rest in the Demiplane.
    </p>
    <p>
      <strong>Fabrication.</strong> While in the Demiplane, you can take a Magic action to create a nonmagical object (max 5 ft in any dimension, worth ≤ 5 GP) from nothing once per Long Rest.
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Arcane Resilience", key: "DemiplaneArcaneResilience" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Demiplane
};
