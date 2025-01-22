// FILE: ./facilities/Guildhall.mjs

/*
A Guildhall comes with a guild (you are the guild master) of about fifty members.
Default Space is Vast.
Prerequisite: Expertise in a skill.
*/

export const Guildhall = {
  name: "Guildhall",
  levelReq: 17,
  prereq: "Expertise in a skill",
  canEnlarge: false,
  defaultSpace: "Vast",
  baseOrderOptions: ["Recruit"], // This facility offers the Recruit order
  desc: `
    <h2>Guildhall (Level 17)</h2>
    <p><strong>Prerequisite:</strong> Expertise in a skill</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Recruit (Guild Assignment)</p>
    <p>
      A Guildhall is a meeting space for roughly fifty skilled guild members who live and work nearby. You are the guild master.
    </p>
    <p>
      <strong>Recruit: Guild Assignment.</strong> Commission the hireling to recruit guild members for a special assignment. Types of guilds include:
      <ul>
        <li>Adventurers’ Guild (hunt down a Beast of CR 2 or lower in 1d6+1 days)</li>
        <li>Bakers’ Guild (create baked goods for 500 GP or a favor)</li>
        <li>Brewers’ Guild (deliver barrels of ale)</li>
        <li>Masons’ Guild (add a defensive wall for free)</li>
        <li>Shipbuilders’ Guild (build a vehicle from the PHB’s vehicles list)</li>
        <li>Thieves’ Guild (steal a nonmagical object of up to 5 ft dimension)</li>
      </ul>
      With DM’s permission, create new assignments.
    </p>
  `,
  subOrders: {
    Recruit: [
      { label: "Guild Assignment", key: "GuildhallAssignment" }
    ]
  },
  // A function for the Adventurers’ Guild hunt duration (1d6 + 1 days):
  randomEffects: [
    {
      label: "Adventurers’ Guild Hunt Duration",
      functionName: "getAdventurersGuildHuntDays"
    }
  ]
};

/*
Helper function for Adventurers’ Guild assignment.
*/
export function getAdventurersGuildHuntDays() {
  // Returns 1d6 + 1
  const roll = Math.floor(Math.random() * 6) + 1;
  return roll + 1;
}
