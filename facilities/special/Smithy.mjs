export const Smithy = {
  name: "Smithy",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Craft"],
  desc: "Forge weapons/armor. If level≥9, craft Common/Uncommon armament magic items. Hirelings have 2 staff.",
  subOrders: {
    Craft: [
      { label: "Smith’s Tools item (PHB rules)", key: "SmithyTools" },
      { label: "Magic Item (Armament) (level≥9)", key: "SmithyMagic" },
    ],
  },
};
