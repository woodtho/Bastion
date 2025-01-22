// FILE: ./facilities/Smithy.mjs

/*
A Smithy has a forge, an anvil, and needed tools to craft weapons, armor, or other equipment.
Default Space is Roomy.
Prerequisite: None.
*/

export const Smithy = {
  name: "Smithy",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Smithy (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 2</p>
    <p><strong>Order:</strong> Craft (Smith's Tools, Magic Item [Armament])</p>
    <p>
      A Smithy contains a forge, an anvil, and other tools for weapon/armor crafting.
    </p>
    <p>
      <strong>Craft Options.</strong>
      <ul>
        <li><strong>Smith’s Tools.</strong> Craft anything possible with Smith’s Tools (PHB rules).</li>
        <li><strong>Magic Item (Armament).</strong> If level 9+, craft a Common or Uncommon magic item from the Armaments tables in chapter 7 (see “Crafting Magic Items”).</li>
      </ul>
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Smith’s Tools", key: "SmithySmithsTools" },
      { label: "Magic Item (Armament)", key: "SmithyMagicItem" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Smithy
};
