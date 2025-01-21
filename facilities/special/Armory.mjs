export const Armory = {
  name: "Armory",
  levelReq: 5,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Trade"],
  desc: "Stock the Armory (100 GP + 100 GP per defender). While stocked, defenders roll d8 instead of d6 on casualties.",
  subOrders: {
    Trade: [
      { label: "Stock Armory (7 days)", key: "StockArmory" },
    ],
  },
};
