const singularN = [
  "Rosa",
  "Aquila",
  "Draco",
  "Sanguis",
  "Lectica",
  "Ignis",
  "Dolor",
  "Daemon",
  "Spina",
  "Arbor",
  "Serpens",
  "Tigris",
  "Ego",
  "Tu",
  "Id",
];

const pluralN = [
  "Rosae",
  "Aquilae",
  "Dracones",
  "Sanguinum",
  "Lecticae",
  "Ignes",
  "Doloribus",
  "Daemones",
  "Spinae",
  "Arbores",
  "Viperae",
  "Tigrides",
  "Nos",
  "Vos",
  "Ea",
];

const singularG = ["Rosae", "Aquilae", "Draconis", "Sanguinis", "Spinae"];

const singularA = ["rubra", "viridis", "mortuus", "vocatus"];

const pluralA = ["rubrae", "viridi", "mortui", "vocati"];

const singularV = ["est", "erit", "erat", "amat", "dicit", "mavult", "timet"];

const pluralV = [
  "sunt",
  "erant",
  "erunt",
  "amant",
  "dicunt",
  "malunt",
  "timent",
];
const getRandom = (array) => {
  return array[Math.floor(Math.random() * (array.length - 1))];
};

export const generatePhrase = (turn) => {
  let text = [];
  for (let i = 0; i < turn / 10; i++) {
    let phrase = [];
    if (turn % 2 != 0) {
      phrase.push(getRandom(singularN));
      phrase.push(getRandom(singularA));
      phrase.push(getRandom(singularG));
      phrase.push(getRandom(singularV));
    } else {
      phrase.push(getRandom(pluralN));
      phrase.push(getRandom(pluralA));
      phrase.push(getRandom(singularG));
      phrase.push(getRandom(pluralV));
    }
    text.push(phrase.join(" "));
  }
  return text.join(", ") + ".";
};
