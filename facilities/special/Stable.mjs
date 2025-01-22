// FILE: ./facilities/Stable.mjs

/*
A Stable houses mounts or pack animals. 
Default Space is Roomy, can enlarge to Vast for 2,000 GP.
Prerequisite: None.
*/

export const Stable = {
  name: "Stable",
  levelReq: 9,
  prereq: "None",
  canEnlarge: true, // Roomy->Vast
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 2000
  },
  baseOrderOptions: ["Trade"],
  desc: `
    <h2>Stable (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 2,000 GP)</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Trade (Animals)</p>
    <p>
      Each Stable comes with certain mounts (Riding Horse or Camel, plus Ponies/Mules). The hireling cares for them. If a Beast stays for 14 days here, you gain Advantage on Animal Handling checks regarding it.
    </p>
    <p>
      <strong>Trade: Animals.</strong> Commission the hireling to buy or sell mounts over 7 days. You pay normal cost for purchases; selling yields higher-than-standard prices (increasing with your level).
    </p>
  `,
  subOrders: {
    Trade: [
      { label: "Animals", key: "StableAnimals" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Stable
};
