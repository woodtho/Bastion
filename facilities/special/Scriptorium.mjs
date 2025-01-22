// FILE: ./facilities/Scriptorium.mjs

/*
A Scriptorium contains desks and writing supplies.
Default Space is Roomy.
Prerequisite: None.
*/

export const Scriptorium = {
  name: "Scriptorium",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"],
  desc: `
    <h2>Scriptorium (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Craft (Book Replica, Spell Scroll, or Paperwork)</p>
    <p>
      A Scriptorium has desks and supplies for scribing or copying text.
    </p>
    <p>
      <strong>Craft Options.</strong>
      <ul>
        <li><strong>Book Replica.</strong> Copy a nonmagical book in 7 days (needs a blank book).</li>
        <li><strong>Spell Scroll.</strong> Scribe one Cleric or Wizard spell (level 3 or lower). Pay scribing time/cost.</li>
        <li><strong>Paperwork.</strong> Create up to fifty copies of a single-page document in 7 days (1 GP each), optionally distribute within 50 miles.</li>
      </ul>
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Book Replica", key: "ScriptoriumBookReplica" },
      { label: "Spell Scroll", key: "ScriptoriumSpellScroll" },
      { label: "Paperwork", key: "ScriptoriumPaperwork" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Scriptorium
};
