/**
 * Carbon footprint calculator & eco-rank utilities.
 * Score range: 0 (cleanest) → 1000 (highest carbon impact).
 */

import { ECO_RANK_CONFIG, TIP_CATEGORIES, SCORE_CONFIG } from '../constants/config'

/**
 * Array of quiz questions with weighted point values per answer.
 * Each question maps to a category with multiple choice options and point values.
 * @type {Array<{id: string, category: string, icon: string, question: string, options: Array}>}
 */
export const QUESTIONS = [
  {
    id: 'transport',
    category: 'Transport',
    icon: '🚗',
    question: 'How do you usually get around on a typical day?',
    options: [
      { label: 'Walk or cycle everywhere', value: 'active', points: 40 },
      { label: 'Public transit or carpool', value: 'transit', points: 120 },
      { label: 'Drive alone most days', value: 'car', points: 220 },
      { label: 'Fly frequently for work/leisure', value: 'fly', points: 280 },
    ],
  },
  {
    id: 'food',
    category: 'Food',
    icon: '🍽️',
    question: 'What best describes your daily diet?',
    options: [
      { label: 'Mostly plant-based / vegan', value: 'vegan', points: 40 },
      { label: 'Vegetarian with occasional meat', value: 'vegetarian', points: 100 },
      { label: 'Balanced omnivore diet', value: 'omnivore', points: 180 },
      { label: 'Meat-heavy at most meals', value: 'meat', points: 260 },
    ],
  },
  {
    id: 'electricity',
    category: 'Electricity',
    icon: '⚡',
    question: 'How do you manage home energy use?',
    options: [
      { label: 'Solar panels + mindful usage', value: 'solar', points: 30 },
      { label: 'LED bulbs, unplug devices', value: 'efficient', points: 90 },
      { label: 'Average household usage', value: 'average', points: 170 },
      { label: 'AC/heating on all day', value: 'heavy', points: 250 },
    ],
  },
  {
    id: 'shopping',
    category: 'Shopping',
    icon: '🛍️',
    question: 'How often do you buy new clothes or gadgets?',
    options: [
      { label: 'Rarely — repair & secondhand', value: 'minimal', points: 35 },
      { label: 'A few times per year', value: 'moderate', points: 110 },
      { label: 'Monthly shopping trips', value: 'monthly', points: 190 },
      { label: 'Weekly fast-fashion hauls', value: 'frequent', points: 270 },
    ],
  },
  {
    id: 'waste',
    category: 'Waste',
    icon: '♻️',
    question: 'How do you handle household waste?',
    options: [
      { label: 'Compost, recycle & reduce', value: 'zero', points: 25 },
      { label: 'Recycle when convenient', value: 'recycle', points: 100 },
      { label: 'Mostly landfill trash', value: 'landfill', points: 190 },
      { label: 'No sorting — all in one bin', value: 'none', points: 260 },
    ],
  },
  {
    id: 'water',
    category: 'Water Usage',
    icon: '💧',
    question: 'How conscious are you about household water use?',
    options: [
      { label: 'Short showers, fix leaks, reuse water', value: 'conservative', points: 30 },
      { label: 'Mostly mindful with occasional waste', value: 'balanced', points: 90 },
      { label: 'Standard daily usage', value: 'average', points: 160 },
      { label: 'Long showers and running taps', value: 'wasteful', points: 240 },
    ],
  },
  {
    id: 'diet',
    category: 'Diet Type',
    icon: '🥗',
    question: 'What best describes your broader eating habits?',
    options: [
      { label: 'Local, seasonal plant-forward meals', value: 'seasonal', points: 35 },
      { label: 'Vegetarian most days', value: 'vegetarian', points: 95 },
      { label: 'Balanced omnivore', value: 'omnivore', points: 175 },
      { label: 'Highly processed or meat-heavy', value: 'processed', points: 250 },
    ],
  },
  {
    id: 'renewable',
    category: 'Renewable Energy',
    icon: '☀️',
    question: 'How much renewable energy powers your home?',
    options: [
      { label: '100% renewable sources', value: 'full', points: 20 },
      { label: 'Mostly green power', value: 'majority', points: 80 },
      { label: 'Some renewable mix', value: 'mixed', points: 160 },
      { label: 'No renewable energy', value: 'none', points: 260 },
    ],
  },
  {
    id: 'airTravel',
    category: 'Air Travel',
    icon: '✈️',
    question: 'How often do you travel by airplane?',
    options: [
      { label: 'Rarely or never', value: 'none', points: 20 },
      { label: '1-2 short trips per year', value: 'light', points: 100 },
      { label: 'Several flights per year', value: 'moderate', points: 220 },
      { label: 'Frequent flyer lifestyle', value: 'frequent', points: 300 },
    ],
  },
  {
    id: 'recycling',
    category: 'Recycling',
    icon: '🌱',
    question: 'How consistently do you recycle and compost?',
    options: [
      { label: 'Always recycle and compost', value: 'always', points: 25 },
      { label: 'Mostly recycle', value: 'mostly', points: 90 },
      { label: 'Rarely recycle', value: 'rarely', points: 180 },
      { label: 'Never sort waste', value: 'never', points: 250 },
    ],
  },
]

/**
 * Converts quiz answers into a carbon score (0–1000).
 * Sums the point values for each selected answer option across all questions.
 * Clamps the result between MIN and MAX score boundaries.
 *
 * @param {Record<string, string>} answers - Map of question id → selected option value
 * @returns {number} Carbon score between 0 and 1000
 */
export function calculateCarbonScore(answers) {
  let total = 0

  for (const question of QUESTIONS) {
    const selected = answers[question.id]
    const option = question.options.find((o) => o.value === selected)
    if (option) total += option.points
  }

  return Math.min(SCORE_CONFIG.MAX, Math.max(SCORE_CONFIG.MIN, total))
}

/**
 * Returns eco-rank metadata for a given carbon score.
 * Determines the rank tier, label, description, and visual styling based on score range.
 * Lower carbon score = better rank (Eco Legend is best, Pollution Overlord is worst).
 *
 * @param {number} score - Carbon score (0-1000)
 * @returns {Object} Rank metadata with rank name, tier, description, and Tailwind color classes
 */
export function getEcoRank(score) {
  if (score <= ECO_RANK_CONFIG.LEGEND.maxScore) {
    return ECO_RANK_CONFIG.LEGEND
  }
  if (score <= ECO_RANK_CONFIG.GUARDIAN.maxScore) {
    return ECO_RANK_CONFIG.GUARDIAN
  }
  if (score <= ECO_RANK_CONFIG.APPRENTICE.maxScore) {
    return ECO_RANK_CONFIG.APPRENTICE
  }
  if (score <= ECO_RANK_CONFIG.DRIFTER.maxScore) {
    return ECO_RANK_CONFIG.DRIFTER
  }
  return ECO_RANK_CONFIG.OVERLORD
}

/**
 * Extracts the point value for a single answer option.
 * Helper function used to rank categories by impact in generateTips().
 *
 * @private
 * @param {string} questionId - Question identifier (e.g., 'transport', 'food')
 * @param {string} answerValue - Selected option value
 * @returns {number} Point value for the selected option, or 0 if not found
 */
function getCategoryPoints(questionId, answerValue) {
  const question = QUESTIONS.find((q) => q.id === questionId)
  const option = question?.options.find((o) => o.value === answerValue)
  return option?.points ?? 0
}

/** Tip templates keyed by category — picks the worst habit area */
const TIP_LIBRARY = {
  transport: [
    'Swap one solo car trip per week for walking, cycling, or public transit to cut transport emissions fast.',
    'Try carpooling or combining errands into a single trip — fewer cold starts means less CO₂.',
    'For short trips under 2 km, choose active transport. It\'s the single biggest win for urban commuters.',
  ],
  food: [
    'Try a "Meatless Monday" — replacing one beef meal saves more carbon than you might expect.',
    'Plan meals around local, seasonal produce to reduce food miles and packaging waste.',
    'Reduce food waste by meal-prepping; rotting food in landfills produces methane, a potent greenhouse gas.',
  ],
  electricity: [
    'Switch to LED bulbs and unplug "phantom load" devices — chargers and TVs draw power even when off.',
    'Set your thermostat 1–2°C lower in winter (or higher in summer) — small change, noticeable bill & footprint drop.',
    'Run dishwashers and laundry only with full loads, preferably during off-peak hours if your grid allows.',
  ],
  shopping: [
    'Before buying new, ask: "Can I borrow, repair, or buy secondhand?" — extends product life and cuts manufacturing emissions.',
    'Choose quality over quantity: one durable item beats three disposable ones over time.',
    'Unsubscribe from promotional emails to reduce impulse buys that often end up unused.',
  ],
  waste: [
    'Set up a simple home compost bin — food scraps become soil instead of landfill methane.',
    'Learn your local recycling rules; "wish-cycling" contaminates batches and wastes energy.',
    'Carry a reusable bottle and bag — eliminating single-use plastics is an easy daily win.',
  ],
  water: [
    'Collect rainwater for gardening and cleaning tasks to lower your household water footprint.',
    'Fix leaks promptly and install low-flow fixtures to save water without sacrificing comfort.',
    'Reuse cooking water or shower runoff where possible — every liter saved helps your village.',
  ],
  diet: [
    'Support local farmers and choose seasonal produce to reduce food miles significantly.',
    'Swap one processed meal per week for a whole-food alternative to cut embedded emissions.',
    'Build meals around vegetables, grains, and legumes for a lower-carbon plate.',
  ],
  renewable: [
    'If you can, switch to a green energy tariff or community solar program for cleaner power.',
    'Consider rooftop solar or community renewable credits to shrink your household footprint.',
    'Track your energy mix: cleaner electricity today equals greener village visuals tomorrow.',
  ],
  airTravel: [
    'Choose a train or bus for short and medium-distance trips to avoid high flight emissions.',
    'Offset a flight by supporting verified tree planting or carbon removal programs.',
    'Reduce long-haul travel by combining trips and staying longer to make each flight count.',
  ],
  recycling: [
    'Create a simple sorting station at home so recycling becomes effortless every day.',
    'Buy products with less packaging and choose reusable containers whenever possible.',
    'Make composting a habit for food waste — it closes the loop and enriches soil.',
  ],
}

/**
 * Generates 3 personalized eco-tips based on the user's weakest categories.
 * Ranks categories by impact (highest points = worst habit) and selects one tip
 * from each of the top 3 worst categories. Falls back to general tips if needed.
 * Simulates AI-style recommendations using answer analysis.
 *
 * @param {Record<string, string>} answers - Map of question id → selected option value
 * @param {number} score - Carbon score (used for context, not for tip generation)
 * @returns {string[]} Array of exactly 3 personalized eco-tips
 */
export function generateTips(answers, score) {
  // Rank categories by impact (highest points = worst habit)
  const ranked = QUESTIONS.map((q) => ({
    id: q.id,
    category: q.category,
    points: getCategoryPoints(q.id, answers[q.id]),
  })).sort((a, b) => b.points - a.points)

  const tips = []

  // Pull one tip from each of the top 3 worst categories
  for (const { id } of ranked) {
    if (tips.length >= 3) break
    const pool = TIP_LIBRARY[id]
    const tip = pool[tips.length % pool.length]
    if (!tips.includes(tip)) tips.push(tip)
  }

  // Fallback general tips if something is missing
  const general = [
    'Track your footprint monthly — awareness alone can reduce emissions by 5–15%.',
    'Share your eco-goals with friends; social accountability makes habits stick.',
    'Plant a native tree or support a reforestation project to offset what you can\'t reduce yet.',
  ]

  while (tips.length < 3) {
    tips.push(general[tips.length % general.length])
  }

  return tips.slice(0, 3)
}

/**
 * Normalized pollution factor for 3D world visualization.
 * Maps a carbon score (0-1000) to a pollution factor (0-1) for color/effect interpolation.
 * 0 = clean, green village; 1 = heavily polluted, industrial zone.
 *
 * @param {number} score - Carbon score (0-1000)
 * @returns {number} Pollution factor between 0 (clean) and 1 (polluted)
 */
export function getPollutionFactor(score) {
  return Math.min(1, Math.max(0, score / SCORE_CONFIG.MAX))
}
