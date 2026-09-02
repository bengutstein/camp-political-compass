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
  xAxis: { minLabel: "Secular", maxLabel: "Religious", title: "Secular–Religious Scale" },
  yAxis: { minLabel: "Libertarian", maxLabel: "Authoritarian", title: "Authority–Liberty Scale" },
  exampleResults: [
    { name: "Rabbi Resnick", x: -6, y: 6 },
    { name: "Canter Chesler", x: 5.5, y: 5 },
    { name: "Moose", x: -5, y: -2.5 },
    { name: "Rabbi Linden", x: 5, y: -2.5 },
    { name: "Jeremy Steinman", x: -1.5, y: 1.5 },
    { name: "Ben Gutstein", x: 2.5, y: -6 },
  ],
  quadrants: {
    "upper-left": { name: "Secular Authoritarian", description: "You tend to favor a more secular camp culture alongside stronger shared structure and leadership.", color: "#e9a69b" },
    "upper-right": { name: "Religious Authoritarian", description: "You tend to favor a more religious camp culture alongside stronger shared structure and leadership.", color: "#a9c5df" },
    "lower-left": { name: "Secular Libertarian", description: "You tend to favor a more secular camp culture alongside greater individual choice and flexibility.", color: "#abd2bc" },
    "lower-right": { name: "Religious Libertarian", description: "You tend to favor a more religious camp culture alongside greater individual choice and flexibility.", color: "#c8b4d8" },
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
