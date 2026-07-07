const ASSETS = {
  backgrounds: {
    mainVillage: 'assets/images/backgrounds/village-valley-main.png',
  },
  ui: {
    food: null,
    wood: null,
    stone: null,
    gold: null,
    ore: null,
    metal: null,
    wine: null,
    knowledge: null,
  },
  buildings: {
    townHall: {},
    cottage: {},
    farm: {},
    lumberMill: {},
    quarry: {},
    warehouse: {},
    workshop: {},
  },
};

const ASSET_GUIDELINES = {
  runtimeFolder: 'assets/images/',
  sourceFolder: 'assets/source/',
  notes: [
    'Keep original art in assets/source and game-ready copies in assets/images.',
    'Reference assets through this file instead of hardcoding paths in runtime markup.',
    'Use predictable names so level-based art can be mapped cleanly later.',
  ],
};

if (typeof module !== 'undefined') {
  module.exports = { ASSETS, ASSET_GUIDELINES };
}
