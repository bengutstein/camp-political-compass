export const quizConfig = {
  title: "Berkshires Political Compass",
  description: "Answer a series of statements and see where your views place you on two dimensions.",
  answerOptions: [
    { label: "Strongly Disagree", value: -2 },
    { label: "Disagree", value: -1 },
    { label: "Agree", value: 1 },
    { label: "Strongly Agree", value: 2 },
  ],
  // Raise this to make strongly consistent answer patterns reach ±10 sooner.
  scoring: { intensityMultiplier: 1.65 },
  xAxis: { minLabel: "Change", maxLabel: "Tradition", title: "Change–Tradition Scale" },
  yAxis: { minLabel: "Safety", maxLabel: "Independence", title: "Safety–Independence Scale" },
  exampleResults: [
    { name: "Rabbi Resnick", x: 9, y: 2 },
    { name: "Canter Chesler", x: -6, y: 6 },
    { name: "Moose", x: 5, y: -2.5 },
    { name: "Rabbi Linden", x: -8, y: -8 },
    { name: "Cory Mais", x: -4, y: -5 },
  ],
  quadrants: {
    "upper-left": { name: "Camper Autonomy", description: "You tend to favor evolving camp traditions and programming alongside individual choice and independence.", color: "#e9a69b" },
    "upper-right": { name: "Old Camp", description: "You tend to value established camp traditions alongside individual choice and independence.", color: "#a9c5df" },
    "lower-left": { name: "New Camp", description: "You tend to favor evolving camp traditions and programming alongside structure, stability, and safety.", color: "#abd2bc" },
    "lower-right": { name: "Traditions with Safety", description: "You tend to value established camp traditions alongside structure, stability, and safety.", color: "#c8b4d8" },
  },
  sections: [
    { id: "risk", title: "Rules & Risk", intro: "How should camp balance freedom with safety?" },
    { id: "daily-life", title: "Daily Camp Life", intro: "Consider the choices campers make each day." },
    { id: "traditions", title: "Traditions", intro: "Think about the customs that shape camp culture." },
    { id: "culture", title: "Camp Culture", intro: "What should camp culture encourage or leave behind?" },
    { id: "community", title: "Community", intro: "Consider shared standards and responsibilities at camp." },
    { id: "favorites", title: "Camp Favorites", intro: "A few final questions about classic camp life." },
  ],
} as const;

export type Quadrant = keyof typeof quizConfig.quadrants;
