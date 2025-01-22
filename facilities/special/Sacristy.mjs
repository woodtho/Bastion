// FILE: ./facilities/Sacristy.mjs

/*
A Sacristy stores sacred items and religious vestments.
Default Space is Roomy.
Prerequisite: Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus.
*/

export const Sacristy = {
  name: "Sacristy",
  levelReq: 9,
  prereq: "Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Sacristy (Level 9)</h2>
    <p><strong>Prerequisite:</strong> Ability to use a Holy Symbol or Druidic Focus as a Spellcasting Focus</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Craft (Holy Water or Magic Item [Relic])</p>
    <p>
      A Sacristy stores sacred items. You can regain one expended spell slot (level 5 or lower) after a Short Rest here, once per Long Rest.
    </p>
    <p>
      <strong>Craft Options.</strong>
      <ul>
        <li><strong>Holy Water.</strong> 7 days to craft a flask at no cost. You can spend up to 500 GP for increased damage (+1d8 per 100 GP).</li>
        <li><strong>Magic Item (Relic).</strong> If you are level 9+, craft a Common or Uncommon magic item from the Relics tables in chapter 7 (time/cost per “Crafting Magic Items”).</li>
      </ul>
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Holy Water", key: "SacristyHolyWater" },
      { label: "Magic Item (Relic)", key: "SacristyMagicItem" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Sacristy
};
