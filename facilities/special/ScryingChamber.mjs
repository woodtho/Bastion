// FILE: ./facilities/special/ScryingChamber.mjs

/*
A Scrying Chamber is a dark room with a crystal ball. 
'Research -> Eye Open' (7 days) uses Scrying (DC 13) daily.
*/

export const ScryingChamber = {
  name: "ScryingChamber",
  levelReq: 9,
  prereq: "ArcaneFocusOrDruidicFocusOrHolySymbol",
  canEnlarge: false,
  defaultSpace: "Roomy",
  baseOrderOptions: ["Research"],
  desc: `
    <h2>Scrying Chamber (Level 9)</h2>
    <p><strong>Default Space:</strong> Roomy</p>
    <p><strong>Hirelings:</strong> 1</p>
    <p><strong>Order:</strong> Research -> Eye Open</p>
    <p>
      <strong>Eye Closed:</strong> No Divination spells or scry sensors can affect those inside.
      <strong>Eye Open:</strong> The hireling casts Scrying (DC 13) each day for 7 days 
      and reports the findings.
    </p>
  `,
  subOrders: {
    Research: [
      { label: "Eye Open (7 days)", key: "ScryingChamberEyeOpen" },
    ],
  },
  randomEffects: []
};
