export const TrainingArea = {
  name: "Training Area",
  levelReq: 9,
  prereq: "None",
  canEnlarge: false,
  baseOrderOptions: ["Empower"],
  desc: "A yard/gym with a dedicated trainer. Empower: 7-day training for battle, skill, or tool benefits. Must be Vast.",
  subOrders: {
    Empower: [
      { label: "Training Exercises (7 days)", key: "TrainingExercise" },
    ],
  },
};
