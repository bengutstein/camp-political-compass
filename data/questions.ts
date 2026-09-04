export type Question = {
  id: string;
  text: string;
  section: string;
  weights: { x: number; y: number };
  reverseScored?: boolean;
};

// Positive x scores toward Tradition; negative x scores toward Change.
// Positive y scores toward Independence; negative y scores toward Safety.
export const questions: Question[] = [
  {
    id: "gate-security",
    text: "Enhanced security is necessary at the gate of camp.",
    section: "risk",
    weights: { x: 0, y: -1 },
  },
  {
    id: "ditching-activities",
    text: "Ditching activities is an important part of the camp experience.",
    section: "risk",
    weights: { x: 0, y: 1 },
  },
  {
    id: "swim-tests",
    text: "Swim tests were pointless.",
    section: "risk",
    weights: { x: 0, y: 1 },
  },
  {
    id: "sundeck-risk",
    text: "The memories produced from jumping off the sundeck are worthy of the risk.",
    section: "risk",
    weights: { x: 0, y: 1 },
  },
  {
    id: "sneaking-out",
    text: "Sneaking out of your bunk at night is dangerous.",
    section: "risk",
    weights: { x: 0, y: -1 },
  },
  {
    id: "curfew",
    text: "Being late to curfew was no big deal.",
    section: "daily-life",
    weights: { x: 0, y: 1 },
  },
  {
    id: "bunk-initials",
    text: "Writing your names or initials on bunks is ultimately disrespectful to the camp.",
    section: "daily-life",
    weights: { x: 0, y: -1 },
  },
  {
    id: "bathroom-cooking",
    text: "In hindsight, it is disgusting we cooked in the bathroom.",
    section: "daily-life",
    weights: { x: 0, y: -1 },
  },
  {
    id: "meal-drinks",
    text: "Campers should be allowed to make tea or coffee during meals.",
    section: "daily-life",
    weights: { x: 0, y: 1 },
  },
  {
    id: "naked-morts",
    text: "Morts are better run naked.",
    section: "daily-life",
    weights: { x: 0, y: 1 },
  },
  {
    id: "adir-az",
    text: "In hindsight, Adir and Az are silly traditions.",
    section: "traditions",
    weights: { x: -1, y: 0 },
  },
  {
    id: "hookup-culture",
    text: "Hookup culture is toxic.",
    section: "traditions",
    weights: { x: -1, y: 0 },
  },
  {
    id: "palmer-day",
    text: "Palmer Day is taken too seriously.",
    section: "traditions",
    weights: { x: -1, y: 0 },
  },
  {
    id: "silent-football-bullying",
    text: "Silent Football constitutes bullying.",
    section: "traditions",
    weights: { x: -1, y: 0 },
  },
  {
    id: "phones-at-camp",
    text: "Having your phone at camp is detrimental to the experience.",
    section: "traditions",
    weights: { x: 1, y: 0 },
  },
  {
    id: "bench-after-meals",
    text: "We should bench after every meal.",
    section: "traditions",
    weights: { x: 1, y: 0 },
  },
  {
    id: "silent-football-important",
    text: "Silent Football is an important part of the camp experience.",
    section: "culture",
    weights: { x: 1, y: 0 },
  },
  {
    id: "nonkosher-food",
    text: "It is wrong to bring nonkosher food into camp.",
    section: "culture",
    weights: { x: 1, y: 0 },
  },
  {
    id: "hookup-lists",
    text: "Hookup lists on cubbies was harmless teen behavior.",
    section: "culture",
    weights: { x: 1, y: 0 },
  },
  {
    id: "required-prayer",
    text: "You shouldn’t be required to pray at camp.",
    section: "community",
    weights: { x: -1, y: 0 },
  },
  {
    id: "stealing-camp",
    text: "It is unethical to steal things from camp, even if you will return them at the end of the summer.",
    section: "community",
    weights: { x: -1, y: 0 },
  },
  {
    id: "stealing-chadar",
    text: "It is problematic to steal food from the Chadar.",
    section: "community",
    weights: { x: -1, y: 0 },
  },
  {
    id: "wacky-mac",
    text: "Wacky Mac is good.",
    section: "favorites",
    weights: { x: 1, y: 0 },
  },
  {
    id: "dumping-games",
    text: "Dumping games are harmless fun.",
    section: "favorites",
    weights: { x: 1, y: 0 },
  },
  {
    id: "a-side",
    text: "I like A-side better than B-side.",
    section: "favorites",
    weights: { x: -1, y: 0 },
  },
];
