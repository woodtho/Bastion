export const WarRoom = {
  name: "WarRoom",
  levelReq: 17,
  prereq: "FightingStyle",
  canEnlarge: false,
  baseOrderOptions: ["Recruit"],
  desc: "Plan military actions with lieutenants. Recruit lieutenant or raise an army. Must have Fighting Style/Unarmored Def.",
  subOrders: {
    Recruit: [
      { label: "Lieutenant (7 days)", key: "WarRoomLieutenant" },
      { label: "Soldiers (7 days, 100 per lieutenant)", key: "WarRoomArmy" },
    ],
  },
};
