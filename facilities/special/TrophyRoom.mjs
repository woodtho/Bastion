// FILE: ./facilities/TrophyRoom.mjs

/*
A Trophy Room houses a collection of weapons, heads of creatures, and other memorabilia.
Default Space is Roomy.
Prerequisite: None.
*/

export const TrophyRoom = {
  name: "Trophy Room",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Research"],
  desc: `
    <h2>Trophy Room (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Research (Lore, Trinket Trophy)</p>
    <p>
      The Trophy Room contains items from past exploits or inherited relics.
    </p>
    <p>
      <strong>Research: Lore.</strong> Commission the hireling to research a topic (legend, creature, famous object) for 7 days, revealing up to three new pieces of info.
    </p>
    <p>
      <strong>Research: Trinket Trophy.</strong> Roll any die after 7 days:
      <ul>
        <li>Odd: No useful find.</li>
        <li>Even: A Common magic item (roll on the Implements—Common table in chapter 7).</li>
      </ul>
    </p>
  `,
  subOrders: {
    Research: [
      { label: "Lore", key: "TrophyRoomLore" },
      { label: "Trinket Trophy", key: "TrophyRoomTrinket" }
    ]
  },
  // Random effect for the even/odd roll for finding a trinket
  randomEffects: [
    {
      label: "Trinket Trophy Roll",
      functionName: "rollTrophyRoomTrinket"
    }
  ]
};

/*
Helper function for determining if a trinket is found (odd/even) and which Common magic item is discovered.
*/
export function rollTrophyRoomTrinket() {
  const roll = Math.floor(Math.random() * 6) + 1;
  if (roll % 2 === 1) {
    return { foundItem: false, roll };
  } else {
    // Found a Common magic item: 
    // In an actual implementation, you'd roll on a Common Items table. For now, pick a placeholder item.
    const commonItems = [
      "Potion of Climbing",
      "Spell Scroll (Cantrip)",
      "Potion of Healing",
      "Ammunition +1",
      "Driftglobe",
      "Bag of Holding (Uncommon, but example)"
    ];
    const idx = Math.floor(Math.random() * commonItems.length);
    return { foundItem: true, roll, item: commonItems[idx] };
  }
}
