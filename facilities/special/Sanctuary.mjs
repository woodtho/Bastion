// FILE: ./facilities/Sanctuary.mjs

/*
A Sanctuary displays icons of your religion and provides a quiet place for worship.
Default Space is Roomy.
Prerequisite: Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus.
*/

export const Sanctuary = {
  name: "Sanctuary",
  levelReq: 5,
  prereq: "Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Sanctuary (Level 5)</h2>
    <p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Craft (Sacred Focus)</p>
    <p>
      After a Long Rest here, you gain a Charm that allows one casting of <em>Healing Word</em>.
    </p>
    <p>
      <strong>Craft: Sacred Focus.</strong> Commission the hireling to craft a Druidic Focus or Holy Symbol in 7 days at no cost.
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Sacred Focus", key: "SanctuarySacredFocus" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Sanctuary
};
