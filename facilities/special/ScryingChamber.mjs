export const ScryingChamber = {
  name: "Scrying Chamber",
  levelReq: 9,             // Must be level 9 or higher
  // The prerequisite is "The ability to use an Arcane Focus, Druidic Focus, or Holy Symbol"
  // If your system doesn't support multiple prereqs, store a custom string:
  prereq: "ArcaneFocusOrDruidicFocusOrHolySymbol",
  canEnlarge: false,
  baseOrderOptions: ["Research"],
  desc: `
    A Scrying Chamber is a dark room with a crystal ball at the center. Eye Closed:
    creatures in this room with the door closed cannot be targeted by Divination or
    perceived by scrying. Research (Eye Open): hireling casts Scrying (DC 13) once
    each day for 7 days, documenting findings.
  `,
  subOrders: {
    Research: [
      { label: "Eye Open (cast Scrying daily for 7 days)", key: "ScryingChamberEyeOpen" }
    ],
  },
};