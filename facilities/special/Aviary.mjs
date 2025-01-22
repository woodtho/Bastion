// FILE: ./facilities/special/Aviary.mjs

/*
An Aviary typically has a large birdcage near a desk of writing supplies.
Default space is Cramped. It can enlarge from Cramped to Roomy for 1,000 GP.
Includes a random companion helper function.
*/

export const Aviary = {
  name: "Aviary",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true,
  // The default space if not specified on creation
  defaultSpace: "Cramped",
  // Aviary can only enlarge from Cramped->Roomy for 1,000 GP
  enlargeCosts: {
    "Cramped->Roomy": 1000
  },
  baseOrderOptions: ["Recruit"],
  desc: `
    <h2>Aviary (Level 5)</h2>
    <p><strong>Default Space:</strong> Cramped (can enlarge to Roomy for 1,000 GP)</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Recruit (train a flying creature)</p>
    <p>
      This facility lets you send and receive messages by winged creatures (Raven/Owl/Hawk).
      When enlarged, you can train stronger fliers (Imp/Quasit/Sphinx) that can carry ≤ 20 lbs.
    </p>
    <ul>
      <li><strong>Recruit: Avian Friend.</strong> 7 days to train. Only one active Avian Friend at a time.</li>
      <li>You can issue "Aerial Orders" via the Avian Friend as if you were at the Aviary.</li>
    </ul>
  `,
  subOrders: {
    Recruit: [
      { label: "Train Basic Avian (Raven/Owl/Hawk)", key: "AviaryBasicAvianFriend" },
      { label: "Train Advanced Avian (Imp/Quasit/Sphinx)", key: "AviaryAdvancedAvianFriend" }
    ],
  },
  // If there's a random effect (like picking a random avian to train),
  // we can define a "randomEffects" section. Example:
  randomEffects: [
    {
      label: "Random Avian Companion",
      functionName: "getRandomAvianCompanion"
    }
  ]
};

/*
Helper function to pick a random flying companion. 
If isRoomy=false => picks from Raven/Owl/Hawk
If isRoomy=true  => also can pick Imp, Quasit, Sphinx
*/
export function getRandomAvianCompanion(isRoomy = false) {
  const basic = ["Raven", "Owl", "Hawk"];
  const advanced = ["Imp", "Quasit", "Sphinx of Wonder"];
  if (!isRoomy) {
    const i = Math.floor(Math.random() * basic.length);
    return basic[i];
  } else {
    const combined = basic.concat(advanced);
    const i = Math.floor(Math.random() * combined.length);
    return combined[i];
  }
}
