window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.techBranches = [
  {
    id: "growth",
    title: "Food & Growth",
    hint: "Fields, preservation, and village health.",
  },
  {
    id: "craft",
    title: "Wood & Craft",
    hint: "Wood flow, workshops, and storage discipline.",
  },
  {
    id: "stone",
    title: "Stone & Infrastructure",
    hint: "Quarries, masonry, and hard logistics.",
  },
  {
    id: "military",
    title: "Military & Expeditions",
    hint: "Soldiers, scouting, and safer campaigns.",
  },
  {
    id: "trade",
    title: "Trade & Gold",
    hint: "Coin, traders, and the late economy.",
  },
];

window.CoinvaleReference.techTreeUi = {
  compactLayout: true,
  showFutureNodes: true,
  detailMode: "hover_tooltip",
};

window.CoinvaleReference.techTree = {
  foodPreservation: {
    name: "Food Preservation",
    branch: "growth",
    unlocks: ["Granary", "Scribe Hall"],
    requires: [],
  },
  betterAgriculture: {
    name: "Better Agriculture",
    branch: "growth",
    unlocks: ["Food output bonus"],
    requires: ["foodPreservation"],
  },
  animalHusbandry: {
    name: "Animal Husbandry",
    branch: "growth",
    unlocks: ["Chicken Coop"],
    requires: ["foodPreservation"],
  },
  craftsmanship: {
    name: "Craftsmanship",
    branch: "craft",
    unlocks: ["Workshop"],
    requires: ["reinforcedAxes"],
  },
  storehousePlanning: {
    name: "Storehouse Planning",
    branch: "craft",
    unlocks: ["Warehouse"],
    requires: ["foodPreservation", "stonecutting"],
  },
  stonecutting: {
    name: "Stonecutting",
    branch: "stone",
    unlocks: ["Stone output bonus"],
    requires: ["foodPreservation"],
  },
  militaryDrills: {
    name: "Military Drills",
    branch: "military",
    unlocks: ["Expedition success bonus"],
    requires: ["stonecutting"],
  },
  watchfires: {
    name: "Watchfires",
    branch: "military",
    unlocks: ["Expedition success", "Guard support"],
    requires: ["militaryDrills"],
  },
  goldMining: {
    name: "Gold Mining",
    branch: "trade",
    unlocks: ["Gold Mine", "Gold economy"],
    requires: ["stonecutting", "craftsmanship"],
  },
  coinMinting: {
    name: "Coin Minting",
    branch: "trade",
    unlocks: ["Gold output bonus"],
    requires: ["goldMining"],
  },
};
