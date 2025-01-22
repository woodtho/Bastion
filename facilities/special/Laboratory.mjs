// FILE: ./facilities/Laboratory.mjs

/*
A Laboratory for alchemical supplies and crafting various concoctions.
Default Space is Roomy.
Prerequisite: None.
*/

export const Laboratory = {
  name: "Laboratory",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Laboratory (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Craft (Alchemist’s Supplies or Poison)</p>
    <p>
      A Laboratory contains storage for alchemical supplies and workspaces for creating potions and poisons.
    </p>
    <p>
      <strong>Craft Options.</strong>
      <ul>
        <li><strong>Alchemist’s Supplies.</strong> The hireling crafts anything possible with Alchemist’s Supplies (PHB & chapter 7 rules).</li>
        <li><strong>Poison.</strong> Commission the hireling to craft certain poisons (Burnt Othur Fumes, Essence of Ether, Torpor) in 7 days at half cost.</li>
      </ul>
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Alchemist’s Supplies", key: "LaboratoryAlchemistSupplies" },
      { label: "Poison", key: "LaboratoryPoison" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Laboratory
};
