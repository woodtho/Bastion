export const MobileBastionEngine = {
  name: "Mobile Bastion Engine",
  levelReq: 13,       // Must be level 13 or higher
  prereq: "None",
  canEnlarge: true,   // Can enlarge from Roomy to Vast by spending 60,000 GP
  baseOrderOptions: ["Move"],
  desc: `
    A Mobile Bastion Engine is a facility of mechanical or mystical components that allow
    your bastion to move. After 2 consecutive days of movement, the bastion must be
    set down until your next Bastion Turn. Enlarging to Vast for 60,000 GP allows flight
    for up to 5 days, but if not landed in time, the bastion crash-lands, damaging a random
    special facility.
  `,
  subOrders: {
    Move: [
      { label: "Relocate Bastion (slow travel, 2 days)", key: "MobileEngineRelocate" }
    ],
  },
};