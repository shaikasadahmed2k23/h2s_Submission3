/**
 * Carbon footprint calculator & eco-rank utilities.
 * Score range: 0 (cleanest) → 1000 (highest carbon impact).
 */

/** Quiz questions with weighted point values per answer */
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
]

/**
 * Converts quiz answers into a carbon score (0–1000).
 * @param {Record<string, string>} answers - Map of question id → selected option value
 * @returns {number}
 */
export function calculateCarbonScore(answers) {
  let total = 0

  for (const question of QUESTIONS) {
    const selected = answers[question.id]
    const option = question.options.find((o) => o.value === selected)
    if (option) total += option.points
  }

  return Math.min(1000, Math.max(0, total))
}

/**
 * Returns eco-rank metadata. Lower carbon score = better rank.
 * @param {number} score
 */
export function getEcoRank(score) {
  if (score <= 200) {
    return {
      rank: 'Eco Legend',
      tier: 5,
      description: 'Your village thrives — a beacon of sustainability!',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/40',
      bar: 'bg-emerald-500',
    }
  }
  if (score <= 400) {
    return {
      rank: 'Green Guardian',
      tier: 4,
      description: 'Great habits — keep nurturing your eco-village!',
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      border: 'border-green-500/40',
      bar: 'bg-green-500',
    }
  }
  if (score <= 600) {
    return {
      rank: 'Eco Apprentice',
      tier: 3,
      description: 'Room to grow — small changes make a big difference.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/40',
      bar: 'bg-yellow-500',
    }
  }
  if (score <= 800) {
    return {
      rank: 'Carbon Drifter',
      tier: 2,
      description: 'Your village is struggling — time to take action.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/40',
      bar: 'bg-orange-500',
    }
  }
  return {
    rank: 'Pollution Overlord',
    tier: 1,
    description: 'Critical levels — your world needs urgent care!',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/40',
    bar: 'bg-red-500',
  }
}

/** Points contributed by a single answer (for tip prioritization) */
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
}

/**
 * Generates 3 personalized eco-tips based on the user's weakest categories.
 * Simulates AI-style recommendations using answer analysis.
 * @param {Record<string, string>} answers
 * @param {number} score
 * @returns {string[]}
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
 * Normalized pollution factor for 3D world (0 = clean, 1 = polluted).
 * @param {number} score
 */
export function getPollutionFactor(score) {
  return Math.min(1, Math.max(0, score / 1000))
}
