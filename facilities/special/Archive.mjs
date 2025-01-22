// FILE: ./facilities/Archive.mjs

/*
An Archive is a repository of valuable books, maps, and scrolls.
Default Space is Roomy, can enlarge to Vast for 2,000 GP.
Prerequisite: None.
*/

export const Archive = {
  name: "Archive",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true, // Can enlarge from Roomy->Vast
  defaultSpace: "Roomy",
  enlargeCosts: {
    "Roomy->Vast": 2000
  },
  baseOrderOptions: ["Research"], // This facility offers the Research order
  desc: `
    <h2>Archive (Level 13)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Default Space:</strong> Roomy (can enlarge to Vast for 2,000 GP)</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Research (Helpful Lore)</p>
    <p>
      An Archive is a repository of valuable books, maps, and scrolls. Usually attached to a Library behind a locked or secret door.
    </p>
    <p>
      <strong>Research: Helpful Lore.</strong> Commission the facility’s hireling to search the Archive for lore over 7 days. The hireling gains knowledge as if they cast <em>Legend Lore</em>, then shares it with you.
    </p>
    <p>
      <strong>Reference Book.</strong> Your Archive contains one copy of a rare reference book, providing a benefit when you Study in the Bastion. 
      Options include:
      <ul>
        <li><em>Bigby’s Handy Arcana Codex</em> (Advantage on Intelligence (Arcana) checks)</li>
        <li><em>The Chronepsis Chronicles</em> (Advantage on Intelligence (History) checks)</li>
        <li><em>Investigations of the Inquisitive</em> (Advantage on Intelligence (Investigation) checks)</li>
        <li><em>Material Musings on the Nature of the World</em> (Advantage on Intelligence (Nature) checks)</li>
        <li><em>The Old Faith and Other Religions</em> (Advantage on Intelligence (Religion) checks)</li>
      </ul>
      If enlarged to Vast, you gain two additional reference books.
    </p>
  `,
  subOrders: {
    Research: [
      { label: "Helpful Lore", key: "ArchiveHelpfulLore" }
    ],
  }
  // No randomEffects because no random tables or dice are mentioned for Archive
};
