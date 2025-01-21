export const Archive = {
  name: "Archive",
  levelReq: 13,
  prereq: "None",
  canEnlarge: true,
  baseOrderOptions: ["Research"],
  desc: "Repository of valuable tomes. Research: Helpful Lore (Legend Lore effect). Reference Book advantage.",
  subOrders: {
    Research: [
      { label: "Helpful Lore (7 days)", key: "ArchiveHelpfulLore" },
    ],
  },
};
