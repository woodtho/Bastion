export const Temple = {
  name: "Temple",
  levelReq: 13,      // Must be level 13 or higher
  prereq: "None",
  canEnlarge: true,  // Can enlarge from Roomy to Vast for 4,000 GP
  baseOrderOptions: ["Recruit"],
  desc: `
    A Temple houses a sect of devoted followers. You can channel their prayers to heal
    or harm once per Long Rest. Recruiting new devotees adds a random number of
    worshipers (d12). Enlarging to a Vast facility raises devotee capacity to 5× your
    character level (instead of 3×).
  `,
  subOrders: {
    Recruit: [
      { label: "Devotee (gather d12 new followers)", key: "TempleRecruitDevotee" }
    ],
  },
};