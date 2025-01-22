// FILE: ./facilities/special/Temple.mjs

/*
A Temple houses devotees: up to 3× character level (Roomy) or 5× (Vast).
You can channel that many points of healing or extra damage once per Long Rest.
*/

export const Temple = {
  name: "Temple",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true,
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 4000
  },
  baseOrderOptions: ["Recruit"],
  desc: `
    <h2>Temple (Level 13)</h2>
    <p><strong>Default Space:</strong> Roomy (3× your level devotees). Enlarge to Vast (5× your level) for 4,000 GP.</p>
    <p><strong>Hirelings:</strong> 1 (herald)</p>
    <p><strong>Order:</strong> Recruit -> Devotee</p>
    <p>
      Devotees do not live in the Bastion but gather daily. Once per Long Rest, you can
      add your total devotees in healing or radiant/necrotic damage. 
    </p>
    <p><strong>Recruit:</strong> Takes 7 days, roll a d12 for new devotees, up to your facility’s max.</p>
  `,
  subOrders: {
    Recruit: [
      { label: "Devotee (Roll d12)", key: "TempleRecruitDevotee" }
    ],
  },
  randomEffects: [
    {
      label: "Roll d12 Devotees",
      functionName: "rollDevotees"
    }
  ]
};

/*
Helper function to roll 1d12 for new devotees.
*/
export function rollDevotees() {
  return Math.floor(Math.random() * 12) + 1;
}
