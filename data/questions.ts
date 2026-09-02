export type Question = {
  id: string;
  text: string;
  section: string;
  weights: { x: number; y: number };
  reverseScored?: boolean;
};

export const questions: Question[] = [
  { id: "q1", text: "Camp should prioritize a shared Jewish community over the preferences of individual bunks.", section: "world", weights: { x: -1, y: -0.3 } },
  { id: "q2", text: "Campers should have meaningful choice in which Jewish programs and activities they attend.", section: "world", weights: { x: 1, y: 0 } },
  { id: "q3", text: "Core camp experiences should be available to every camper regardless of their family's ability to pay extra fees.", section: "world", weights: { x: -1, y: 0.2 } },
  { id: "q4", text: "Bunks should be encouraged to develop their own distinct traditions and ways of doing things.", section: "world", weights: { x: 0.8, y: 0 } },
  { id: "q5", text: "Campers should accept small inconveniences when they help the whole machaneh run well.", section: "world", weights: { x: -0.3, y: 0.7 } },
  { id: "q6", text: "Older campers should take responsibility for looking out for younger campers.", section: "society", weights: { x: -0.5, y: 0.5 } },
  { id: "q7", text: "Campers should be able to express their Jewish identity in ways that differ from the camp majority.", section: "society", weights: { x: 0, y: -1 } },
  { id: "q8", text: "Long-standing camp rituals should be preserved even when some campers find them less meaningful.", section: "society", weights: { x: -0.2, y: 0.9 } },
  { id: "q9", text: "Camp should devote more resources to making its programs accessible to families with different financial means.", section: "society", weights: { x: -1, y: 0 } },
  { id: "q10", text: "Campers are usually better judges than administrators of what would improve daily camp life.", section: "society", weights: { x: 0.5, y: -0.6 } },
  { id: "q11", text: "Camp rules should be enforced consistently, even when a counselor thinks an exception would be harmless.", section: "institutions", weights: { x: 0, y: 0.8 } },
  { id: "q12", text: "Camp leadership should be able to set firm limits when a program threatens the well-being of the community.", section: "institutions", weights: { x: -0.4, y: 1 } },
  { id: "q13", text: "Bunks and edot should have a real voice in decisions that affect their schedules and spaces.", section: "institutions", weights: { x: -0.2, y: -0.9 } },
  { id: "q14", text: "Families should have a broad menu of optional camp experiences to choose from.", section: "institutions", weights: { x: 0.8, y: 0 } },
  { id: "q15", text: "A safe camp community sometimes requires clear limits on individual behavior.", section: "institutions", weights: { x: 0, y: 1 } },
  { id: "q16", text: "Campers should be allowed to opt out of activities that do not feel meaningful to them.", section: "values", weights: { x: 0, y: -1 } },
  { id: "q17", text: "Campers who have more experience should be expected to contribute more to the camp community.", section: "values", weights: { x: -0.8, y: 0.2 } },
  { id: "q18", text: "It is better for camp to make gradual changes than to reinvent major traditions each summer.", section: "values", weights: { x: 0, y: 0.9 } },
  { id: "q19", text: "Counselors should have wide latitude to adapt programs to their campers' needs.", section: "values", weights: { x: 0.9, y: -0.4 } },
  { id: "q20", text: "Each camper's responsibilities to their bunk matter as much as their personal preferences.", section: "values", weights: { x: -0.5, y: 0.6 } },
  { id: "q21", text: "Camp benefits when Jewish learning includes a wide range of voices, interpretations, and practices.", section: "culture", weights: { x: 0, y: -0.9 } },
  { id: "q22", text: "Camp should deliberately teach the songs, rituals, and stories that have shaped its community over time.", section: "culture", weights: { x: -0.2, y: 0.9 } },
  { id: "q23", text: "Camp should fund creative and arts programs even when they are less popular than athletics or waterfront activities.", section: "culture", weights: { x: -0.7, y: -0.2 } },
  { id: "q24", text: "Shared expectations around Shabbat and communal spaces make camp feel more welcoming and secure.", section: "culture", weights: { x: 0, y: 0.8 } },
  { id: "q25", text: "Camp should try new approaches to Jewish programming even if they challenge familiar routines.", section: "culture", weights: { x: 0.3, y: -0.8 } },
  { id: "q26", text: "Camp should invest in new programs that let campers pursue their own interests and ideas.", section: "future", weights: { x: 0.9, y: -0.1 } },
  { id: "q27", text: "Meeting camp's long-term challenges requires ambitious collective action from its whole community.", section: "future", weights: { x: -0.8, y: 0.4 } },
  { id: "q28", text: "Camp should adopt new technology cautiously when it changes how campers relate to one another.", section: "future", weights: { x: 0, y: 0.8 } },
  { id: "q29", text: "Campers should have a strong role in shaping the kind of camp community they will inherit.", section: "future", weights: { x: 0.3, y: -1 } },
  { id: "q30", text: "The future of camp is stronger when opportunities are shared more evenly across the community.", section: "future", weights: { x: -1, y: 0.1 } },
];
