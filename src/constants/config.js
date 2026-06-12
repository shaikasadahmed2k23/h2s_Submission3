/**
 * Centralized configuration for EcoVillage app constants and thresholds.
 */

/**
 * Eco-rank score thresholds and metadata.
 * Defines the boundaries and styling for each rank tier.
 */
export const ECO_RANK_CONFIG = {
  LEGEND: {
    maxScore: 200,
    rank: 'Eco Legend',
    tier: 5,
    description: 'Your village thrives — a beacon of sustainability!',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/40',
    bar: 'bg-emerald-500',
  },
  GUARDIAN: {
    maxScore: 400,
    rank: 'Green Guardian',
    tier: 4,
    description: 'Great habits — keep nurturing your eco-village!',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    bar: 'bg-green-500',
  },
  APPRENTICE: {
    maxScore: 600,
    rank: 'Eco Apprentice',
    tier: 3,
    description: 'Room to grow — small changes make a big difference.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    bar: 'bg-yellow-500',
  },
  DRIFTER: {
    maxScore: 800,
    rank: 'Carbon Drifter',
    tier: 2,
    description: 'Your village is struggling — time to take action.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/40',
    bar: 'bg-orange-500',
  },
  OVERLORD: {
    maxScore: 1000,
    rank: 'Pollution Overlord',
    tier: 1,
    description: 'Critical levels — your world needs urgent care!',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/40',
    bar: 'bg-red-500',
  },
}

/**
 * Carbon score range constants.
 */
export const SCORE_CONFIG = {
  MIN: 0,
  MAX: 1000,
  TREE_DIVISOR: 50, // trees_to_plant = Math.ceil(score / 50)
}

/**
 * 3D world pollution thresholds and behavior.
 */
export const WORLD_CONFIG = {
  CLEAN_THRESHOLD: 0.3,
  SHOW_RENEWABLE_THRESHOLD: 400,
  FACTORY_APPEARANCE_THRESHOLD: 0.35,
  FACTORY_OPACITY_CALCULATION_THRESHOLD: 0.35,
  FACTORY_OPACITY_RANGE: 0.4,
  COTTAGE_FADE_THRESHOLD: 0.85,
  TREE_SHRINK_THRESHOLD: 0.75,
  TREE_SHRINK_FACTOR: 0.6,
  TREE_MIN_SCALE: 0.3,
  POLLUTION_LERP_SPEED: 0.1,
  SMOG_THRESHOLD: 0.4,
  CLOUD_CLEAN_THRESHOLD: 0.6,
}

/**
 * UI animation and timeout constants.
 */
export const UI_CONFIG = {
  SHARE_STATUS_TIMEOUT: 1800,
  FADE_ANIMATION_DURATION: 500,
}

/**
 * Tip category keys used in generateTips().
 */
export const TIP_CATEGORIES = {
  TRANSPORT: 'transport',
  FOOD: 'food',
  ELECTRICITY: 'electricity',
  SHOPPING: 'shopping',
  WASTE: 'waste',
  WATER: 'water',
  DIET: 'diet',
  RENEWABLE: 'renewable',
  AIR_TRAVEL: 'airTravel',
  RECYCLING: 'recycling',
}

/**
 * World view status labels and emojis.
 */
export const WORLD_STATUS = {
  THRIVING: {
    label: '🌿 Thriving Village',
    threshold: 0.4,
  },
  STRUGGLING: {
    label: '⚠️ Struggling Ecosystem',
    threshold: 0.7,
  },
  POLLUTED: {
    label: '🏭 Heavily Polluted',
  },
}

/**
 * Navigation step configuration.
 */
export const NAV_STEPS = [
  { id: 'welcome', label: 'Start' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'results', label: 'Village' },
]

/**
 * Quiz progress display format.
 */
export const QUIZ_CONFIG = {
  TOTAL_QUESTIONS: 10,
}
