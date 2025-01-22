// FILE: ./facilities/TrainingArea.mjs

/*
A Training Area might be a courtyard, gym, music hall, or hazard gauntlet.
Default Space is Vast.
Prerequisite: None.
*/

export const TrainingArea = {
  name: "Training Area",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Vast",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Training Area (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 4</p>
    <p><strong>Order:</strong> Empower (Training)</p>
    <p>
      A Training Area has an expert trainer type (Battle, Skills, Tools, Unarmed Combat, or Weapon). You can change the trainer type each Bastion turn.
    </p>
    <p>
      <strong>Empower: Training.</strong> Over 7 days, any character who trains for at least 8 hours each day gains a 7-day benefit according to the trainer type (damage reduction, skill proficiency, tool proficiency, extra unarmed damage, or weapon mastery).
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Training", key: "TrainingAreaTraining" }
    ]
  }
  // No randomEffects because the effect is chosen, not randomly determined
};
