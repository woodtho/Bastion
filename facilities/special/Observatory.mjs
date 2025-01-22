// FILE: ./facilities/Observatory.mjs

/*
An Observatory sits atop your Bastion with a telescope aimed at the night sky.
Default Space is Roomy.
Prerequisite: Ability to use a Spellcasting Focus.
*/

export const Observatory = {
  name: "Observatory",
  levelReq: 13,
  prereq: "Ability to use a Spellcasting Focus",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Observatory (Level 13)</h2>
    <p><strong>Prerequisite:</strong> Ability to use a Spellcasting Focus</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Empower (Eldritch Discovery)</p>
    <p>
      Peer into Wildspace and the Astral Plane. After a Long Rest here, gain a Charm that allows one casting of <em>Contact Other Plane</em>.
    </p>
    <p>
      <strong>Empower: Eldritch Discovery.</strong> Spend 7 nights exploring eldritch mysteries. At the end, roll a die:
      <ul>
        <li>If even, nothing happens.</li>
        <li>If odd, gain one of these Charms: Charm of Darkvision, Charm of Heroism, or Charm of Vitality.</li>
      </ul>
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Eldritch Discovery", key: "ObservatoryEldritchDiscovery" }
    ]
  },
  // Random effect for the odd/even roll
  randomEffects: [
    {
      label: "Odd/Even Eldritch Discovery",
      functionName: "getObservatoryDiscovery"
    }
  ]
};

/*
Helper function for Eldritch Discovery (odd vs. even roll).
*/
export function getObservatoryDiscovery() {
  const roll = Math.floor(Math.random() * 6) + 1; // 1-6 roll
  // Return whether it's odd or even and a possible charm
  if (roll % 2 === 0) {
    return { result: "No effect", roll };
  } else {
    // Odd: Gain one random charm from the 3
    const charms = ["Charm of Darkvision", "Charm of Heroism", "Charm of Vitality"];
    const idx = Math.floor(Math.random() * charms.length);
    return { result: `Gained ${charms[idx]}`, roll };
  }
}
