import { describe, it, expect } from 'vitest'
import {
  QUESTIONS,
  calculateCarbonScore,
  getEcoRank,
  generateTips,
  getPollutionFactor,
} from './calculator'

const minimalAnswers = {
  transport: 'active',
  food: 'vegan',
  electricity: 'solar',
  shopping: 'minimal',
  waste: 'zero',
  water: 'conservative',
  diet: 'seasonal',
  renewable: 'full',
  airTravel: 'none',
  recycling: 'always',
}

const worstAnswers = {
  transport: 'fly',
  food: 'meat',
  electricity: 'heavy',
  shopping: 'frequent',
  waste: 'none',
  water: 'wasteful',
  diet: 'processed',
  renewable: 'none',
  airTravel: 'frequent',
  recycling: 'never',
}

describe('Carbon calculator utilities', () => {
  it('calculates a minimal carbon score from the cleanest answers', () => {
    expect(calculateCarbonScore(minimalAnswers)).toBe(300)
  })

  it('caps an extremely high raw score at 1000', () => {
    expect(calculateCarbonScore(worstAnswers)).toBe(1000)
  })

  it('returns zero when no answers are supplied', () => {
    expect(calculateCarbonScore({})).toBe(0)
  })

  it('returns zero for invalid answer values', () => {
    expect(
      calculateCarbonScore({
        transport: 'invalid',
        food: 'invalid',
        electricity: 'invalid',
        shopping: 'invalid',
        waste: 'invalid',
      }),
    ).toBe(0)
  })

  it.each([
    ['transport', 'fly', 540],
    ['food', 'meat', 520],
    ['electricity', 'heavy', 520],
    ['shopping', 'frequent', 535],
    ['waste', 'none', 535],
    ['water', 'wasteful', 510],
    ['diet', 'processed', 515],
    ['renewable', 'none', 540],
    ['airTravel', 'frequent', 580],
    ['recycling', 'never', 525],
  ])('applies points correctly for the %s category', (questionId, answerValue, expectedScore) => {
    const answers = { ...minimalAnswers, [questionId]: answerValue }
    expect(calculateCarbonScore(answers)).toBe(expectedScore)
  })

  it.each([
    [170, 'Eco Legend'],
    [300, 'Green Guardian'],
    [500, 'Eco Apprentice'],
    [700, 'Carbon Drifter'],
    [900, 'Pollution Overlord'],
  ])('returns the correct eco rank label for score %i', (score, expectedRank) => {
    expect(getEcoRank(score).rank).toBe(expectedRank)
  })

  it.each([
    [200, 'Eco Legend'],
    [201, 'Green Guardian'],
    [400, 'Green Guardian'],
    [401, 'Eco Apprentice'],
    [600, 'Eco Apprentice'],
    [601, 'Carbon Drifter'],
    [800, 'Carbon Drifter'],
    [801, 'Pollution Overlord'],
    [1000, 'Pollution Overlord'],
  ])('uses the correct eco rank label at boundary score %i', (score, expectedRank) => {
    expect(getEcoRank(score).rank).toBe(expectedRank)
  })

  it('always returns exactly three eco tips for a complete answer set', () => {
    const tips = generateTips(worstAnswers, 1000)
    expect(tips).toHaveLength(3)
    expect(new Set(tips).size).toBe(3)
  })

  it('still returns three eco tips even when answers are missing', () => {
    const tips = generateTips({ transport: 'car' }, 300)
    expect(tips).toHaveLength(3)
  })

  it('returns zero pollution factor for a zero carbon score', () => {
    expect(getPollutionFactor(0)).toBe(0)
  })

  it('returns a half pollution factor for a 500 score', () => {
    expect(getPollutionFactor(500)).toBe(0.5)
  })

  it('returns full pollution factor for a 1000 score', () => {
    expect(getPollutionFactor(1000)).toBe(1)
  })

  it('calculates village health percentage correctly for a clean score', () => {
    const pollution = getPollutionFactor(0)
    expect(Math.round((1 - pollution) * 100)).toBe(100)
  })

  it('calculates village health percentage correctly for a mid-range score', () => {
    const pollution = getPollutionFactor(500)
    expect(Math.round((1 - pollution) * 100)).toBe(50)
  })

  it('calculates village health percentage correctly for a worst-case score', () => {
    const pollution = getPollutionFactor(1000)
    expect(Math.round((1 - pollution) * 100)).toBe(0)
  })

  it('contains ten quiz questions in the source question set', () => {
    expect(QUESTIONS).toHaveLength(10)
  })

  it('includes the expected categories in the question definitions', () => {
    const categories = QUESTIONS.map((q) => q.id).sort()
    expect(categories).toEqual([
      'airTravel',
      'diet',
      'electricity',
      'food',
      'recycling',
      'renewable',
      'shopping',
      'transport',
      'waste',
      'water',
    ])
  })

  it('includes at least four answer options for each quiz question', () => {
    QUESTIONS.forEach((question) => {
      expect(question.options).toHaveLength(4)
    })
  })

  it('returns the same score for values outside the lower bound and clamps it to zero', () => {
    expect(calculateCarbonScore({ transport: 'active', food: 'vegan', electricity: 'solar', shopping: 'minimal', waste: 'zero', invalid: 'ignored' })).toBe(170)
  })

  it('returns a predicted eco rank tier number consistent with the label', () => {
    expect(getEcoRank(170).tier).toBe(5)
    expect(getEcoRank(300).tier).toBe(4)
    expect(getEcoRank(500).tier).toBe(3)
    expect(getEcoRank(700).tier).toBe(2)
    expect(getEcoRank(900).tier).toBe(1)
  })

  it('uses points only from matching question ids when computing a score', () => {
    const answers = { transport: 'car', food: 'vegan' }
    const expected = 220 + 40
    expect(calculateCarbonScore(answers)).toBe(expected)
  })
})
