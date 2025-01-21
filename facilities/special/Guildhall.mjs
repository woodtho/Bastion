export const Guildhall = {
  name: "Guildhall",
  levelReq: 17,
  prereq: "Expertise",
  canEnlarge: false,
  baseOrderOptions: ["Recruit"],
  desc: "You are a guild master. Recruit guild members for special assignments. Must have Expertise in a skill.",
  subOrders: {
    Recruit: [
      { label: "Guild Assignment (7 days)", key: "GuildAssignment" },
    ],
  },
};
