export const Aviary = {
  name: "Aviary",
  levelReq: 5,          // Must be level 5 or higher
  prereq: "None",       // No special prerequisite
  canEnlarge: true,     // The text allows enlargement from Cramped to Roomy
  baseOrderOptions: ["Recruit"],
  desc: `
    An Aviary is typically comprised of a large birdcage near a small desk with writing
    supplies used to send messages attached to winged creatures.
    Recruit: Avian Friend. When you issue the Recruit order to this facility, you train
    a flying animal companion that can find you and deliver items or orders, depending
    on your Aviary’s size. You may only have one such companion at a time.
    Enlarging the Facility: Costs 1,000 GP to enlarge from Cramped to Roomy,
    enabling stronger winged creatures (carrying ≤20 lbs) and adding Imp, Quasit,
    or Sphinx of Wonder to available options.
  `,
  subOrders: {
    Recruit: [
      {
        // Represents the basic Raven/Owl/Hawk recruit option
        label: "Avian Friend (Raven/Owl/Hawk)",
        key: "AviaryBasicAvianFriend"
      },
      {
        // Represents the advanced Imp/Quasit/Sphinx recruit option,
        // available when enlarged to Roomy or larger
        label: "Advanced Avian Friend (Imp/Quasit/Sphinx of Wonder)",
        key: "AviaryAdvancedAvianFriend"
      },
    ],
  },
};
