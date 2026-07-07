window.CoinvaleReference = window.CoinvaleReference || {};

window.CoinvaleReference.randomEvents = [
  { id: "berry_patch", weight: 10, type: "good", effectType: "gain_resource", resource: "food", amountMode: "cap", ratio: 0.05, min: 14, max: 220, text: "Foragers found a rich berry patch: +{amount} Food." },
  { id: "spoiled_grain", weight: 10, type: "bad", effectType: "lose_resource", resource: "food", amountMode: "current", ratio: 0.06, min: 10, max: 240, requiresCurrentPositive: "food", text: "Rot spread through the pantry: -{amount} Food." },
  { id: "timber_cache", weight: 10, type: "good", effectType: "gain_resource", resource: "wood", amountMode: "cap", ratio: 0.05, min: 14, max: 200, text: "Villagers hauled in a dry timber cache: +{amount} Wood." },
  { id: "wet_lumber", weight: 10, type: "bad", effectType: "lose_resource", resource: "wood", amountMode: "current", ratio: 0.07, min: 10, max: 190, requiresCurrentPositive: "wood", text: "Heavy damp ruined part of the timber stock: -{amount} Wood." },
  { id: "stone_seam", weight: 10, type: "good", effectType: "gain_resource", resource: "stone", amountMode: "cap", ratio: 0.04, min: 12, max: 180, text: "Workers uncovered an easy stone seam: +{amount} Stone." },
  { id: "dropped_blocks", weight: 6, type: "bad", effectType: "lose_resource", resource: "stone", amountMode: "current", ratio: 0.06, min: 8, max: 170, requiresCurrentPositive: "stone", text: "Poor handling shattered stored blocks: -{amount} Stone." },
  { id: "coin_gift", weight: 6, type: "good", effectType: "gain_resource", resource: "gold", amountMode: "cap", ratio: 0.03, min: 4, max: 18, requiresUnlocked: ["gold"], text: "A passing noble paid generously for safe lodging: +{amount} Gold." },
  { id: "missing_purse", weight: 6, type: "bad", effectType: "lose_resource", resource: "gold", amountMode: "current", ratio: 0.08, min: 4, max: 20, requiresUnlocked: ["gold"], requiresCurrentPositive: "gold", text: "A purse chest went missing in the night: -{amount} Gold." },
  { id: "old_records", weight: 6, type: "good", effectType: "gain_resource", resource: "knowledge", amountMode: "cap", ratio: 0.04, min: 6, max: 28, requiresUnlocked: ["knowledge"], text: "Old records were recovered and studied: +{amount} Knowledge." },
  { id: "ink_ruin", weight: 6, type: "bad", effectType: "lose_resource", resource: "knowledge", amountMode: "current", ratio: 0.06, min: 5, max: 24, requiresUnlocked: ["knowledge"], requiresCurrentPositive: "knowledge", text: "Important notes were damaged beyond use: -{amount} Knowledge." },
  { id: "ore_pocket", weight: 6, type: "good", effectType: "gain_resource", resource: "ore", amountMode: "cap", ratio: 0.05, min: 8, max: 70, requiresUnlocked: ["ore"], text: "Miners struck a rich ore pocket: +{amount} Ore." },
  { id: "shaft_collapse", weight: 6, type: "bad", effectType: "lose_resource", resource: "ore", amountMode: "current", ratio: 0.08, min: 6, max: 60, requiresUnlocked: ["ore"], requiresCurrentPositive: "ore", text: "A collapse buried part of the ore haul: -{amount} Ore." },
  { id: "clean_smelting", weight: 6, type: "good", effectType: "gain_resource", resource: "metal", amountMode: "cap", ratio: 0.04, min: 6, max: 40, requiresUnlocked: ["metal"], text: "A clean smelting run yielded extra metal: +{amount} Metal." },
  { id: "slag_batch", weight: 6, type: "bad", effectType: "lose_resource", resource: "metal", amountMode: "current", ratio: 0.07, min: 5, max: 34, requiresUnlocked: ["metal"], requiresCurrentPositive: "metal", text: "Impurities ruined part of the refined metal: -{amount} Metal." },
  { id: "fine_pressing", weight: 6, type: "good", effectType: "gain_resource", resource: "wine", amountMode: "cap", ratio: 0.05, min: 6, max: 34, requiresUnlocked: ["wine"], text: "A fine pressing day filled extra casks: +{amount} Wine." },
  { id: "sour_barrel", weight: 6, type: "bad", effectType: "lose_resource", resource: "wine", amountMode: "current", ratio: 0.09, min: 5, max: 30, requiresUnlocked: ["wine"], requiresCurrentPositive: "wine", text: "One of the barrels turned sour: -{amount} Wine." },
  { id: "village_fair", weight: 6, type: "good", effectType: "happiness", delta: 5, requiresHappiness: true, text: "A lively evening lifted village spirits: +{amount}% Happiness." },
  { id: "public_dispute", weight: 6, type: "bad", effectType: "happiness", delta: -6, requiresHappiness: true, text: "A bitter quarrel spread through the settlement: -{amount}% Happiness." },
  { id: "new_arrival", weight: 3, type: "good", effectType: "population", delta: 1, requiresPopulationRoom: true, text: "A traveler chose to settle in the village: +1 Villager." },
  { id: "illness_wave", weight: 3, type: "bad", effectType: "growth", amountMode: "percent_current", ratio: 0.12, min: 6, max: 18, requiresGrowthPositive: true, text: "Illness slowed the village's growth: -{amount}% growth progress." }
];

if (typeof module !== "undefined") {
  module.exports = { randomEvents: window.CoinvaleReference.randomEvents };
}
