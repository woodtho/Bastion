// FILE: ./facilities/Armory.mjs

/*
An Armory contains mannequins for displaying armor, hooks for Shields, racks for weapons, and chests for ammunition.
Default Space is Roomy. 
Prerequisite: None.
*/

export const Armory = {
  name: "Armory",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false, // No enlarge cost mentioned
  defaultSpace: "Roomy",
  baseOrderOptions: ["Trade"], // This facility offers the Trade order
  desc: `
    <h2>Armory (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Trade (Stock Armory)</p>
    <p>
      Contains mannequins for armor, hooks for Shields, racks for weapons, and chests for ammunition.
    </p>
    <p>
      <strong>Trade: Stock Armory.</strong> Commission the hireling to stock the Armory in 7 days. Costs 100 GP plus 100 GP per Bastion Defender. If your Bastion has a Smithy, total cost is halved.
    </p>
    <p>
      While stocked, your Bastion Defenders are harder to kill during Bastion Events. Roll 1d8 instead of 1d6 when determining casualties. After the event, the Armory is depleted.
    </p>
  `,
  subOrders: {
    Trade: [
      { label: "Stock Armory", key: "ArmoryStockArmory" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Armory
};
