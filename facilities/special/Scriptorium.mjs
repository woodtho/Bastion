export const Scriptorium = {
  name: "Scriptorium",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Craft"],
  desc: "Desk/writing supplies. Craft Book Replica, Spell Scroll, or Paperwork in 7 days.",
  subOrders: {
    Craft: [
      { label: "Book Replica (7 days)", key: "ScriptoriumBook" },
      { label: "Spell Scroll (level ≤3, cost/time per PHB)", key: "ScriptoriumScroll" },
      { label: "Paperwork (7 days, 1 GP/copy)", key: "ScriptoriumPaperwork" },
    ],
  },
};
