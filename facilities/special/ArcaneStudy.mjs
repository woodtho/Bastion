export const ArcaneStudy = {
  name: "Arcane Study",
  levelReq: 5,
  prereq: "ArcaneFocus",
  canEnlarge: true,
  baseOrderOptions: ["Craft"],
  desc: "Arcane Study Charm (Identify 1/week). Craft Arcane Focus, Book, or Magic Item if level ≥9.",
  subOrders: {
    Craft: [
      { label: "Arcane Focus (7 days, no cost)", key: "ArcFocus" },
      { label: "Book (7 days, 10 GP)", key: "ArcBook" },
      { label: "Magic Item (Arcana) (level≥9)", key: "ArcMagicItem" },
    ],
  },
};
