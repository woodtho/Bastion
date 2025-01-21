export const Inn = {
  name: "Inn",
  levelReq: 9,         // Must be level 9 or higher
  prereq: "None",
  canEnlarge: false,    // The text gives it a starting space of Vast with no mention of further enlargement
  baseOrderOptions: ["Empower"],
  desc: `
    An Inn is a place of respite for travelers, offering comfortable lodgings and unique
    rest benefits. Sweet Dreams grants additional Long Rest recovery (remove extra
    exhaustion, awareness of curses). Empower: Well Rested gives a 1-hour Long Rest
    to all who remain here for 7 consecutive days of Bastion Turns.
  `,
  subOrders: {
    Empower: [
      {
        label: "Well Rested (7 days of dedicated relaxation)",
        key: "InnWellRested"
      },
    ],
  },
};