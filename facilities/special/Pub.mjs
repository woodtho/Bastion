// FILE: ./facilities/Pub.mjs

/*
A Pub is where people come to socialize. It might be a bar, coffee shop, or tea room.
Default Space is Roomy, can enlarge to Vast for 2,000 GP.
Prerequisite: None.
*/

export const Pub = {
  name: "Pub",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true, // Can enlarge from Roomy->Vast
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 2000
  },
  baseOrderOptions: ["Research"],
  desc: `
    <h2>Pub (Level 13)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 2,000 GP)</p>
    <p><strong>Hirelings:</strong> 1 (bartender)</p>
    <p><strong>Order:</strong> Research (Information Gathering)</p>
    <p>
      A Pub provides beverages and a place to gather. The bartender maintains a spy network.
    </p>
    <p>
      <strong>Research: Information Gathering.</strong> Commission the bartender to gather info for 7 days. They can reveal the location of a familiar creature within 50 miles, unless it’s hidden by magic or otherwise inaccessible.
    </p>
    <p>
      <strong>Pub Special.</strong> One magical beverage on tap (can be changed at the start of a Bastion turn). Options include:
      <ul>
        <li><em>Bigby’s Burden</em> (enlarge effect for 24 hours)</li>
        <li><em>Kiss of the Spider Queen</em> (<em>Spider Climb</em> for 24 hours)</li>
        <li><em>Moonlight Serenade</em> (gain or extend <em>Darkvision</em> for 24 hours)</li>
        <li><em>Positive Reinforcement</em> (Resistance to Necrotic damage for 24 hours)</li>
        <li><em>Sterner Stuff</em> (auto-succeed on saves vs. <em>Frightened</em> for 24 hours)</li>
      </ul>
      Enlarging the Pub lets you have two magical beverages on tap simultaneously and adds three more hirelings (servers).
    </p>
  `,
  subOrders: {
    Research: [
      { label: "Information Gathering", key: "PubInformationGathering" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Pub
};
