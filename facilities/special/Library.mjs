export const Library = {
  name: "Library",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Research"],
  desc: "A collection of books for research. 7 days yields up to 3 pieces of new info.",
  subOrders: {
    Research: [
      { label: "Topical Lore (7 days)", key: "LibraryResearch" },
    ],
  },
};
