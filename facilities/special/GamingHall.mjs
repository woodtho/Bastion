// FILE: ./facilities/GamingHall.mjs

/*
A Gaming Hall provides recreational activities such as chess, darts, cards, or dice.
Default Space is Vast.
Prerequisite: None.
*/

export const GamingHall = {
  name: "Gaming Hall",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Vast",
  baseOrderOptions: ["Trade"], // This facility offers the Trade order
  desc: `
    <h2>Gaming Hall (Level 9)</h2>
    <p><strong>Prerequisite:</strong> None</p>
    <p><strong>Space:</strong> Vast</p>
    <p><strong>Hirelings:</strong> 4</p>
    <p><strong>Order:</strong> Trade (Gambling Hall)</p>
    <p>
      Offers recreational activities. When you issue the Trade order, it becomes a gambling den for 7 days.
    </p>
    <p>
      <strong>Trade: Gambling Hall.</strong> At the end of 7 days, roll 1d100 for your winnings:
      <ul>
        <li>01–50: 1d6 × 10 GP</li>
        <li>51–85: 2d6 × 10 GP</li>
        <li>86–95: 4d6 × 10 GP</li>
        <li>96–00: 10d6 × 10 GP</li>
      </ul>
    </p>
  `,
  subOrders: {
    Trade: [
      { label: "Gambling Hall", key: "GamingHallGamblingHall" }
    ]
  },
  // Use a randomEffects function to roll 1d100 and determine winnings
  randomEffects: [
    {
      label: "Roll Gambling Hall Winnings",
      functionName: "rollGamingHallWinnings"
    }
  ]
};

/*
Roll 1d100 and return the appropriate winnings range.
*/
export function rollGamingHallWinnings() {
  const roll = Math.floor(Math.random() * 100) + 1; // 1-100
  let result;
  if (roll <= 50) {
    // 1d6 × 10 GP
    const d6 = Math.floor(Math.random() * 6) + 1;
    result = d6 * 10;
  } else if (roll <= 85) {
    // 2d6 × 10 GP
    const d6a = Math.floor(Math.random() * 6) + 1;
    const d6b = Math.floor(Math.random() * 6) + 1;
    result = (d6a + d6b) * 10;
  } else if (roll <= 95) {
    // 4d6 × 10 GP
    const dice = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    const sum = dice.reduce((a, b) => a + b, 0);
    result = sum * 10;
  } else {
    // 10d6 × 10 GP
    const dice = Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) + 1);
    const sum = dice.reduce((a, b) => a + b, 0);
    result = sum * 10;
  }
  return result; // Return the GP amount
}
