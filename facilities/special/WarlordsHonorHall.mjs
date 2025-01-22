// FILE: ./facilities/special/WarlordsHonorHall.mjs

/*
A Warlord’s Honor Hall showcases martial prowess. 
Default space: Roomy. Not enlargeable. 
Long Rest -> commune with a recently defeated foe to gain one proficiency for 24h.
Empower -> 7 days => pick a Blessing (Health, Weapon Enhancement, or Valhalla).
*/

export const WarlordsHonorHall = {
  name: "Warlord’s Honor Hall",
  levelReq: 9,
  prereq: "WeaponMastery2Plus",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Warlord’s Honor Hall (Level 9)</h2>
    <p><strong>Default Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1 (squire)</p>
    <p><strong>Order:</strong> Empower -> Warrior’s Blessing (7 days)</p>
    <p>
      <strong>Honored Fallen:</strong> When you Long Rest, you can commune with one enemy
      defeated in the last 24 hours to gain a skill/tool proficiency they had for 24 hours.
      <br/>
      <strong>Warrior’s Blessing:</strong> After 7 days, choose one: Blessing of Health, Weapon
      Enhancement, or Valhalla (DMG). Only one blessing can be active at a time.
    </p>
  `,
  subOrders: {
    Empower: [
      { label: "Warrior’s Blessing (7 days)", key: "WarlordsHonorHallBlessing" },
    ],
  },
  randomEffects: []
};
