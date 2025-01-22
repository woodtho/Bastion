// FILE: ./facilities/Library.mjs

/*
A Library contains a collection of books, plus desks and reading chairs.
Default Space is Roomy.
Prerequisite: None.
*/

export const Library = {
  name: "Library",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Research"],
  desc: `
    <h2>Library (Level 5)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Research (Topical Lore)</p>
    <p>
      This Library contains a collection of books plus desks and reading chairs.
    </p>
    <p>
      <strong>Research: Topical Lore.</strong> Commission the hireling to research a specific topic for 7 days, discovering up to three new pieces of information about it.
    </p>
  `,
  subOrders: {
    Research: [
      { label: "Topical Lore", key: "LibraryTopicalLore" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Library
};
