export const Dungeon = {
  name: "Dungeon",
  levelReq: 13,         // Must be level 13 or higher
  prereq: "None",
  canEnlarge: true,     // Can enlarge from Roomy to Vast
  baseOrderOptions: ["Trade"],
  desc: `
    A Dungeon is a small chain of rooms and corridors used to lure adventurers who may
    leave behind treasure if they fail. The Dungeon DC is 15 by default, modified by
    Trapworks, Menagerie, or Prison facilities if present. Baiting the dungeon (Trade order)
    involves risking gold in hopes of profit or losing it to successful adventurers.
    Enlarging the Facility: Costs 10,000 GP to enlarge from Roomy to Vast,
    increasing the dungeon from 3 rooms to 5 rooms and raising its maximum bait to
    10,000 GP.
  `,
  subOrders: {
    Trade: [
      {
        // Represents the "Bait Dungeon" action, placing up to 5,000 (or 10,000 if Vast) GP
        label: "Bait Dungeon",
        key: "DungeonBait"
      },
    ],
  },
};