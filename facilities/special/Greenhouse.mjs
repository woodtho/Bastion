// FILE: ./facilities/Greenhouse.mjs

/*
A Greenhouse is an enclosure for rare plants and fungi, includes a magical fruit-bearing plant.
Default Space is Roomy.
Prerequisite: None.
*/

export const Greenhouse = {
  name: "Greenhouse",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Harvest"], // This facility offers the Harvest order
  desc: `
    <h2>Greenhouse (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Harvest (Healing Herbs or Poison)</p>
    <p>
      A Greenhouse has a controlled climate for rare plants/fungi.
    </p>
    <p>
      <strong>Fruit of Restoration.</strong> One plant has three magical fruits that grant the effect of <em>Lesser Restoration</em> if eaten within 24 hours of picking. They regrow daily.
    </p>
    <p>
      <strong>Harvest Options.</strong>
      <ul>
        <li><strong>Healing Herbs.</strong> Craft a Potion of Healing (greater) in 7 days at no cost.</li>
        <li><strong>Poison.</strong> Extract one application of Assassin’s Blood, Malice, Pale Tincture, or Truth Serum in 7 days at no cost.</li>
      </ul>
    </p>
  `,
  subOrders: {
    Harvest: [
      { label: "Healing Herbs", key: "GreenhouseHealingHerbs" },
      { label: "Poison", key: "GreenhousePoison" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Greenhouse
};
