// FILE: ./facilities/Storehouse.mjs

/*
A Storehouse is a cool, dark space for storing trade goods and other nonmagical items.
Default Space is Roomy.
Prerequisite: None.
*/

export const Storehouse = {
  name: "Storehouse",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Trade"],
  desc: `
    <h2>Storehouse (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Trade (Goods)</p>
    <p>
      A Storehouse contains nonmagical trade goods. You can buy or sell up to 500 GP worth of goods in 7 days (increases at level 9 & 13).
    </p>
    <p>
      <strong>Trade: Goods.</strong> Commission the hireling to purchase or sell items. Buying costs normal price, selling yields a markup that increases with your level.
    </p>
  `,
  subOrders: {
    Trade: [
      { label: "Goods", key: "StorehouseGoods" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Storehouse
};
