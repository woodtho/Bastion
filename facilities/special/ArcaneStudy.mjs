// FILE: ./facilities/ArcaneStudy.mjs

/*
An Arcane Study is a place of quiet research containing desks and bookshelves.
Default Space is Roomy. 
Prerequisite: Ability to use an Arcane Focus or tool as a Spellcasting Focus.
*/

export const ArcaneStudy = {
  name: "Arcane Study",
  levelReq: 5,
  prereq: "Ability to use an Arcane Focus or tool as a Spellcasting Focus",
  canEnlarge: false, // No mention of enlarging in the description
  defaultSpace: "Roomy",
  baseOrderOptions: ["Craft"], // This facility offers the Craft order
  desc: `
    <h2>Arcane Study (Level 5)</h2>
    <p><strong>Prerequisite:</strong> Ability to use an Arcane Focus or tool as a Spellcasting Focus</p>
    <p><strong>Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Craft (Arcane Focus, Book, or Magic Item [Arcana])</p>
    <p>
      An Arcane Study is a place of quiet research that contains one or more desks and bookshelves.
    </p>
    <p>
      <strong>Arcane Study Charm.</strong> After spending a Long Rest in your Bastion, gain a magical Charm that lets you cast <em>Identify</em> without a spell slot or Material components (lasts 7 days or until used). You can't gain this Charm again while you still have it.
    </p>
    <p>
      <strong>Craft Options.</strong> When issuing the Craft order here:
      <ul>
        <li><strong>Arcane Focus.</strong> Commission the facility’s hireling to craft an Arcane Focus (7 days, no cost).</li>
        <li><strong>Book.</strong> Commission the facility’s hireling to craft a blank book (7 days, costs 10 GP).</li>
        <li><strong>Magic Item (Arcana).</strong> If you are level 9+, commission a Common or Uncommon magic item from the Arcana tables in chapter 7. See “Crafting Magic Items” for time/cost.</li>
      </ul>
    </p>
  `,
  subOrders: {
    Craft: [
      { label: "Arcane Focus", key: "ArcaneStudyFocus" },
      { label: "Book", key: "ArcaneStudyBook" },
      { label: "Magic Item (Arcana)", key: "ArcaneStudyMagicItem" }
    ],
  }
  // No randomEffects because no random tables or dice are mentioned for Arcane Study
};
