// FILE: ./facilities/Workshop.mjs

/*
A Workshop is a creative space for crafting items.
Default Space is Roomy, can enlarge to Vast for 2,000 GP.
Prerequisite: None.
*/

export const Workshop = {
  name: "Workshop",
  levelReq: 5,
  prereq: "None",
  canEnlarge: true, // Roomy->Vast
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 2000
  },
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Workshop (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 2,000 GP)</p>
    <p><strong>Hirelings:</strong> 3</p>
    <p><strong>Order:</strong> Craft (Adventuring Gear or Magic Item [Implement])</p>
    <p>
      A Workshop has six different kinds of Artisan’s Tools (e.g. Carpenter’s, Cobbler’s, Glassblower’s, Jeweler’s, Leatherworker’s, Mason’s, Painter’s, Potter’s, Tinker’s, Weaver’s, or Woodcarver’s).
    </p>
    <p>
      <strong>Craft Options.</strong>
      <ul>
        <li><strong>Adventuring Gear.</strong> Anything creatable with the chosen tools.</li>
        <li><strong>Magic Item (Implement).</strong> If level 9+, craft a Common or Uncommon magic item from the Implements tables in chapter 7 (time/cost as per “Crafting Magic Items”).</li>
      </ul>
    </p>
    <p>
      <strong>Source of Inspiration.</strong> After a Short Rest here, gain Heroic Inspiration once per Long Rest.
    </p>
    <p>
      Enlarging to Vast adds two more hirelings and three additional types of Artisan’s Tools.
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Adventuring Gear", key: "WorkshopAdventuringGear" },
      { label: "Magic Item (Implement)", key: "WorkshopMagicItem" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Workshop
};
