// FILE: ./facilities/special/Portentorium.mjs

/*
A Portentorium grants a once-per-7-days charm for Augury. 
Empower -> Fate's Favor yields Heroic Inspiration to you and a number of allies.
*/

export const Portentorium = {
  name: "Portentorium",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Portentorium (Level 5)</h2>
    <p><strong>Default Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Empower -> Fate's Favor</p>
    <ul>
      <li><strong>Destiny’s Decision.</strong> After a Long Rest here, gain a 7-day charm to cast
      <em>Augury</em> once without a slot. You cannot get this charm again if you still have it.</li>
      <li><strong>Fate’s Favor (7 days):</strong> The hireling’s ritual grants Heroic Inspiration to you
      and up to your proficiency bonus in allies.</li>
    </ul>
  `,
  subOrders: {
    Empower: [
      { label: "Fate’s Favor", key: "PortentoriumFatesFavor" },
    ],
  },
  randomEffects: []
};
