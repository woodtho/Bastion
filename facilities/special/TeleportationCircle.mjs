// FILE: ./facilities/TeleportationCircle.mjs

/*
  A Teleportation Circle is a permanent circle (from the spell) inscribed on the floor.
Default Space is Roomy.
Prerequisite: None.
*/
  
  export const TeleportationCircle = {
    name: "Teleportation Circle",
    levelReq: 9,
    prereq: "None",
    canEnlarge: false,
    defaultSpace: "Roomy",
    baseOrderOptions: ["Recruit"],
    desc: `
    <h2>Teleportation Circle (Level 9)</h2>
      <p><strong>Prerequisite:</strong> None</p>
      <p><strong>Space:</strong> Roomy</p>
      <p><strong>Hirelings:</strong> 1</p>
      <p><strong>Order:</strong> Recruit (Spellcaster)</p>
      <p>
      A permanent <em>Teleportation Circle</em> is inscribed on the floor. You can invite a Friendly NPC spellcaster to arrive. 
    </p>
      <p>
      <strong>Recruit: Spellcaster.</strong> Roll any die:
      <ul>
      <li>Odd: The invitee declines.</li>
      <li>Even: They accept and stay for up to 14 days or until they cast a spell for you.</li>
      </ul>
      Spell level up to 4, or up to 8 if you're level 17+. You must pay for any costly material components.
    </p>
  `,
  subOrders: {
    Recruit: [
      { label: "Spellcaster", key: "TeleportationCircleSpellcaster" }
    ]
  },
  // Random effect for odd/even acceptance
  randomEffects: [
    {
      label: "Spellcaster Invitation Roll",
      functionName: "rollTeleportationInvitation"
    }
  ]
};

/*
Helper function for rolling an odd/even acceptance.
*/
export function rollTeleportationInvitation() {
  const roll = Math.floor(Math.random() * 6) + 1; // 1-6
  return (roll % 2 === 0)
    ? { accepted: true, roll }
    : { accepted: false, roll };
}
