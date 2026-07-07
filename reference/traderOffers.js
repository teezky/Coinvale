window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.traderOffers = [
  {
    id: "seasoned_timber",
    merchantType: "caravan",
    category: "conversion",
    fairness: "fair",
    weight: 10,
    give: [{ resource: "wood", mode: "cap", ratio: 0.09, min: 24, max: 180 }],
    take: [{ resource: "food", mode: "cap", ratio: 0.07, min: 18, max: 150 }],
    text: "A trader offers seasoned timber for preserved food.",
    logContext: "A fair exchange of staples for construction stock."
  },
  {
    id: "worked_stone",
    merchantType: "caravan",
    category: "conversion",
    fairness: "fair",
    weight: 10,
    give: [{ resource: "stone", mode: "cap", ratio: 0.08, min: 20, max: 170 }],
    take: [{ resource: "wood", mode: "cap", ratio: 0.07, min: 18, max: 145 }],
    text: "A caravan offers worked stone in exchange for wood.",
    logContext: "Useful when timber is ahead of masonry."
  },
  {
    id: "preserved_food",
    merchantType: "caravan",
    category: "conversion",
    fairness: "fair",
    weight: 10,
    give: [{ resource: "food", mode: "cap", ratio: 0.09, min: 24, max: 180 }],
    take: [{ resource: "stone", mode: "cap", ratio: 0.07, min: 18, max: 150 }],
    text: "Traveling merchants offer preserved food for stone.",
    logContext: "A standard staples-for-materials bargain."
  },
  {
    id: "split_cargo",
    merchantType: "caravan",
    category: "mixed",
    fairness: "fair",
    weight: 8,
    give: [
      { resource: "wood", mode: "cap", ratio: 0.07, min: 18, max: 145 },
      { resource: "stone", mode: "cap", ratio: 0.06, min: 16, max: 130 }
    ],
    take: [{ resource: "food", mode: "cap", ratio: 0.09, min: 24, max: 180 }],
    text: "A caravan will split its cargo between wood and stone if you can spare enough food.",
    logContext: "Flexible, but not especially generous."
  },
  {
    id: "quiet_gold",
    merchantType: "blackMarket",
    category: "advanced",
    fairness: "costly",
    weight: 5,
    requiresUnlocked: ["gold"],
    give: [{ resource: "gold", mode: "cap", ratio: 0.24, min: 8, max: 26 }],
    take: [
      { resource: "food", mode: "cap", ratio: 0.08, min: 30, max: 180 },
      { resource: "wood", mode: "cap", ratio: 0.05, min: 14, max: 90 }
    ],
    text: "A discreet trader offers gold for supplies and timber.",
    logContext: "Costly coin, but sometimes worth the treasury boost."
  },
  {
    id: "copied_ledgers",
    merchantType: "royalClerk",
    category: "advanced",
    fairness: "fair",
    weight: 5,
    requiresKnowledgeTrade: true,
    give: [{ resource: "knowledge", mode: "cap", ratio: 0.24, min: 10, max: 34 }],
    take: [
      { resource: "wood", mode: "cap", ratio: 0.06, min: 16, max: 110 },
      { resource: "stone", mode: "cap", ratio: 0.05, min: 12, max: 90 }
    ],
    text: "A traveling clerk offers copied ledgers and practical knowledge for materials.",
    logContext: "A fair civic exchange for records and technical notes."
  },
  {
    id: "court_messenger",
    merchantType: "royalClerk",
    category: "advanced",
    fairness: "favorable",
    weight: 3,
    requiresUnlocked: ["gold"],
    requiresKnowledgeTrade: true,
    give: [
      { resource: "knowledge", mode: "cap", ratio: 0.18, min: 8, max: 28 },
      { resource: "gold", mode: "cap", ratio: 0.10, min: 4, max: 14 }
    ],
    take: [{ resource: "food", mode: "cap", ratio: 0.07, min: 20, max: 140 }],
    text: "A court messenger will trade sealed notes and a little coin for fresh provisions.",
    logContext: "A favorable civic deal with both coin and learning attached."
  }
];

if (typeof module !== "undefined") {
  module.exports = { traderOffers: window.CoinvaleReference.traderOffers };
}
