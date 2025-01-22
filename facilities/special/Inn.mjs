// FILE: ./facilities/special/Inn.mjs

/*
An Inn is always Vast. It removes extra exhaustion on a Long Rest, 
and "Empower -> Well Rested" for a 1-hour Long Rest if you remain for 7 days.
*/

export const Inn = {
  name: "Inn",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  defaultSpace: "Vast", // No enlargement
  // No enlargeCosts since it cannot be enlarged
  baseOrderOptions: ["Empower"],
  desc: `
    <h2>Inn (Level 9)</h2>
    <p><strong>Default Space:</strong> Vast (cannot enlarge further)</p>
    <p><strong>Hirelings:</strong> 2</p>
    <p><strong>Order:</strong> Empower -> Well Rested</p>
    <ul>
      <li><strong>Sweet Dreams.</strong> Remove an extra exhaustion on any Long Rest here, 
          and become aware of curses affecting you.</li>
      <li><strong>Well Rested (7 days).</strong> If you remain for 7 days, your next Long Rest 
          only takes 1 hour.</li>
    </ul>
  `,
  subOrders: {
    Empower: [
      { label: "Well Rested (7 days)", key: "InnWellRested" },
    ],
  },
  // Example: no randomEffects
  randomEffects: []
};
