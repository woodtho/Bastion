// FILE: ./facilities/Reliquary.mjs

/*
A Reliquary is a vault that holds sacred objects.
Default Space is Cramped.
Prerequisite: Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus.
*/

export const Reliquary = {
  name: "Reliquary",
  levelReq: 13,
  prereq: "Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus",
  canEnlarge: false,
  defaultSpace: "Cramped",
  baseOrderOptions: ["Harvest"],
  desc: `
    <h2>Reliquary (Level 13)</h2>
    <p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</p>
    <p><strong>Space:</strong> Cramped</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Harvest (Talisman)</p>
    <p>
      A vault of sacred objects. After a Long Rest here, you gain a Charm that allows one casting of <em>Greater Restoration</em>.
    </p>
    <p>
      <strong>Harvest: Talisman.</strong> Commission the hireling to produce a talisman over 7 days at no cost. This talisman can replace costly spell components (up to 1,000 GP) once without being consumed.
    </p>
  `,
  subOrders: {
    Harvest: [
      { label: "Talisman", key: "ReliquaryTalisman" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Reliquary
};
