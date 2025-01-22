// FILE: ./facilities/Garden.mjs

/*
A Garden can produce decorative flowers, food, herbs, or poisons.
Default Space is Roomy, can enlarge to Vast for 2,000 GP.
Prerequisite: None.
*/

export const Garden = {
  name: "Garden",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true, // Can enlarge from Roomy->Vast
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 2000
  },
  baseOrderOptions: ["Harvest"], // This facility offers the Harvest order
  desc: `
    <h2>Garden (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 2,000 GP)</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Harvest (Garden Growth)</p>
    <p>
      A Bastion can have multiple Gardens. Each Garden is of a specific type: Decorative, Food, Herb, or Poison.
    </p>
    <p>
      Changing the Garden type takes 21 days of work (during which no other activity occurs here).
    </p>
    <p>
      <strong>Harvest: Garden Growth.</strong> Commission the hireling to collect items over 7 days. No cost.
    </p>
    <table>
      <thead>
        <tr><th>Garden Type</th><th>Description</th><th>Harvest</th></tr>
      </thead>
      <tbody>
        <tr><td>Decorative</td><td>Flowers and topiaries</td><td>Ten exquisite bouquets (5 GP each), or ten vials of Perfume, or ten Candles</td></tr>
        <tr><td>Food</td><td>Mushrooms or vegetables</td><td>100 days' worth of Rations</td></tr>
        <tr><td>Herb</td><td>Rare herbs</td><td>Herbs to create ten Healer's Kits or one Potion of Healing</td></tr>
        <tr><td>Poison</td><td>Plants/fungi for toxins</td><td>Ingredients for two Antitoxin vials or one Basic Poison vial</td></tr>
      </tbody>
    </table>
    <p>
      If enlarged to Vast, it counts as two Gardens (each with its own type).
    </p>
  `,
  subOrders: {
    Harvest: [
      { label: "Garden Growth", key: "GardenGrowth" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Garden
};
