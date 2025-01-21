export const WarlordsHonorHall = {
  name: "Warlord’s Honor Hall",
  levelReq: 9,    // Must be level 9 or higher
  // Prerequisite: Access to Weapon Mastery for two or more weapons
  prereq: "WeaponMastery2Plus",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: `
    A Warlord’s Honor Hall is a testament to martial prowess. Long Rest: commune with
    a felled enemy’s spirit to temporarily gain a skill or tool proficiency they possessed.
    Empower: Warrior’s Blessing. After 7 days, you gain a Blessing of Health, Weapon
    Enhancement, or Valhalla (DMG chapter 3). Only one such blessing can be active
    at a time.
  `,
  subOrders: {
    Empower: [
      { label: "Warrior’s Blessing (7-day ritual)", key: "WarlordsHonorHallBlessing" }
    ],
  },
};