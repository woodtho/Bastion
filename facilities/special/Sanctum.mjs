// FILE: ./facilities/Sanctum.mjs

/*
A Sanctum is a place of solace and healing.
Default Space is Roomy.
Prerequisite: Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus.
*/

export const Sanctum = {
  name: "Sanctum",
  levelReq: 17,
  prereq: "Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Sanctum (Level 17)</h2>
    <p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 4</p>
    <p><strong>Order:</strong> Empower (Fortifying Rites)</p>
    <p>
      After a Long Rest here, you gain a Charm that allows one casting of <em>Heal</em>.
    </p>
    <p>
      <strong>Empower: Fortifying Rites.</strong> Perform daily rites for 7 days, granting a named beneficiary Temporary Hit Points = your level after each Long Rest. 
      Also, you always have <em>Word of Recall</em> prepared and can designate the Sanctum as its destination. One creature arriving via this spell can benefit from a <em>Heal</em> spell.
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Fortifying Rites", key: "SanctumFortifyingRites" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Sanctum
};
