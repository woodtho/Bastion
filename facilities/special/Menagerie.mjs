// FILE: ./facilities/Menagerie.mjs

/*
A Menagerie has enclosures for up to four Large creatures. 
Default Space is Vast.
Prerequisite: None.
*/

export const Menagerie = {
  name: "Menagerie",
  levelReq: 13,
  prereq: "None",
  canEnlarge: false, // Already Vast
  defaultSpace: "Vast",
  baseOrderOptions: ["Recruit"],
  desc: `
    <h2>Menagerie (Level 13)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 2</p>
    <p><strong>Order:</strong> Recruit (Creature)</p>
    <p>
      A Menagerie contains large enclosures for up to four Large creatures (or more smaller ones). Creatures here count as Bastion Defenders unless you choose otherwise.
    </p>
    <p>
      <strong>Recruit: Creature.</strong> Commission the hirelings to add a creature (cost and time vary based on CR). The hirelings look after it.
    </p>
    <table>
      <thead>
        <tr><th>Creature</th><th>Size</th><th>Cost</th></tr>
      </thead>
      <tbody>
        <tr><td>Ape</td><td>Medium</td><td>500 GP</td></tr>
        <tr><td>Black Bear</td><td>Medium</td><td>500 GP</td></tr>
        <tr><td>Brown Bear</td><td>Large</td><td>1,000 GP</td></tr>
        <tr><td>Constrictor Snake</td><td>Large</td><td>250 GP</td></tr>
        <tr><td>Crocodile</td><td>Large</td><td>500 GP</td></tr>
        <tr><td>Dire Wolf</td><td>Large</td><td>1,000 GP</td></tr>
        <tr><td>Giant Vulture</td><td>Large</td><td>1,000 GP</td></tr>
        <tr><td>Hyena</td><td>Medium</td><td>50 GP</td></tr>
        <tr><td>Jackal</td><td>Small</td><td>50 GP</td></tr>
        <tr><td>Lion</td><td>Large</td><td>1,000 GP</td></tr>
        <tr><td>Owlbear</td><td>Large</td><td>3,500 GP</td></tr>
        <tr><td>Panther</td><td>Medium</td><td>250 GP</td></tr>
        <tr><td>Tiger</td><td>Large</td><td>1,000 GP</td></tr>
      </tbody>
    </table>
    <p>
      With DM consent, other creatures can be added. See cost table by CR. Typically only Beasts and some Monstrosities are allowed.
    </p>
  `,
  subOrders: {
    Recruit: [
      { label: "Creature", key: "MenagerieCreature" }
    ]
  }
  // No randomEffects because no random tables or dice are mentioned for Menagerie
};
