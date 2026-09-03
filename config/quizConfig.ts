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
    { name: "Rabbi Resnick", x: -6, y: 6 },
    { name: "Canter Chesler", x: 5.5, y: 5 },
    { name: "Moose", x: -5, y: -2.5 },
    { name: "Rabbi Linden", x: 5, y: -2.5 },
    { name: "Corey Maize", x: -4, y: -5 },
  ],
  quadrants: {
    "upper-left": { name: "Change / Independence", description: "You tend to favor evolving camp traditions and programming alongside individual choice and independence.", color: "#e9a69b" },
    "upper-right": { name: "Tradition / Independence", description: "You tend to value established camp traditions alongside individual choice and independence.", color: "#a9c5df" },
    "lower-left": { name: "Change / Safety", description: "You tend to favor evolving camp traditions and programming alongside structure, stability, and safety.", color: "#abd2bc" },
    "lower-right": { name: "Tradition / Safety", description: "You tend to value established camp traditions alongside structure, stability, and safety.", color: "#c8b4d8" },
  },
  sections: [
    { id: "world", title: "The World Around You", intro: "Consider the forces that shape daily life." },
    { id: "society", title: "Society", intro: "Think about shared obligations and belonging." },
    { id: "institutions", title: "Institutions", intro: "Reflect on power, rules, and public systems." },
    { id: "values", title: "Personal Values", intro: "Consider autonomy, responsibility, and choice." },
    { id: "culture", title: "Culture", intro: "Think about continuity, expression, and community." },
    { id: "future", title: "The Future", intro: "Look ahead at change and collective priorities." },
  ],
} as const;

export type Quadrant = keyof typeof quizConfig.quadrants;
