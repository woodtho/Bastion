// FILE: ./facilities/WarRoom.mjs

/*
A War Room is used to plan military actions with loyal lieutenants.
Default Space is Vast.
Prerequisite: Fighting Style feature or Unarmored Defense feature.
*/

export const WarRoom = {
  name: "War Room",
  levelReq: 17,
  prereq: "Fighting Style feature or Unarmored Defense feature",
  canEnlarge: false,
  defaultSpace: "Vast",
  baseOrderOptions: ["Recruit"],
  desc: `
    <h2>War Room (Level 17)</h2>
    <p><strong>Prerequisite:</strong> Fighting Style feature or Unarmored Defense feature</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 2+ (battle-hardened lieutenants)</p>
    <p><strong>Order:</strong> Recruit (Lieutenant, Soldiers)</p>
    <p>
      The War Room contains a large table and chairs for strategy sessions. You start with two Veteran Warrior lieutenants; you can add more (up to ten). They reduce Bastion Defender losses if attacked.
    </p>
    <p>
      <strong>Recruit Options.</strong>
      <ul>
        <li><strong>Lieutenant.</strong> Gain one new lieutenant (max ten).</li>
        <li><strong>Soldiers.</strong> Each lieutenant can muster 100 Guards or 20 mounted Guards in 7 days, costing 1 GP/day each for food. The army disbands if not fed or led by you/a lieutenant.</li>
      </ul>
    </p>
  `,
  subOrders: {
    Recruit: [
      { label: "Lieutenant", key: "WarRoomLieutenant" },
      { label: "Soldiers", key: "WarRoomSoldiers" }
    ]
  }
  // No randomEffects because no explicit random dice are involved
};
