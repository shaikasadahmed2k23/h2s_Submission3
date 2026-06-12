import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getEcoRank, getPollutionFactor } from '../utils/calculator'
import { SCORE_CONFIG, UI_CONFIG } from '../constants/config'

/**
 * Dashboard component displaying user's eco-rank, carbon score, and AI tips.
 * Shows village health percentage, personalized recommendations, and offset guidance.
 * Provides a share button to copy the result to clipboard.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.score - Carbon score (0-1000)
 * @param {string[]} props.tips - Array of 3 personalized eco-tips
 * @param {Function} props.onRetake - Callback function when user clicks retake button
 * @returns {React.ReactElement} Dashboard UI with rank badge, score, tips, and action buttons
 */
export default function Dashboard({ score, tips, onRetake }) {
  const [shareStatus, setShareStatus] = useState('')

  // Memoize expensive calculations to prevent unnecessary recalculations
  const calculatedRank = useMemo(() => getEcoRank(score), [score])
  const calculatedPollution = useMemo(() => getPollutionFactor(score), [score])
  const ecoPercent = useMemo(
    () => Math.round((1 - calculatedPollution) * 100),
    [calculatedPollution],
  )
  const treesToPlant = useMemo(
    () => Math.max(1, Math.ceil(score / SCORE_CONFIG.TREE_DIVISOR)),
    [score],
  )

  const rank = calculatedRank
  const pollution = calculatedPollution
  const shareMessage = `My EcoVillage score is ${score}/1000 and my rank is ${rank.rank}. Build your own greener world!`

  /**
   * Handles share button click by copying message to clipboard.
   * Sets temporary status message to confirm copy action.
   *
   * @async
   */
  const handleShare = async () => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(shareMessage)
        setShareStatus('Copied!')
      } catch {
        setShareStatus('Unable to copy to clipboard')
      }
    } else {
      setShareStatus('Clipboard not available')
    }
    window.setTimeout(() => setShareStatus(''), UI_CONFIG.SHARE_STATUS_TIMEOUT)
  }

  return (
    <div className="animate-fade-slide-up flex h-full flex-col gap-5">
      {/* Rank badge */}
      <div
        className={`rounded-2xl border ${rank.border} ${rank.bg} p-6 text-center`}
      >
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-slate-400">
          Your Eco-Rank
        </p>
        <h2 className={`text-3xl font-bold ${rank.color}`}>{rank.rank}</h2>
        <p className="mt-2 text-sm text-slate-400">{rank.description}</p>

        {/* Tier stars */}
        <div className="mt-3 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${i < rank.tier ? 'text-yellow-400' : 'text-slate-600'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Score display */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
              Carbon Score
            </p>
            <p className="text-4xl font-bold text-white">
              {score}
              <span className="text-lg font-normal text-slate-500"> / 1000</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400">Village Health</p>
            <p className={`text-2xl font-bold ${rank.color}`}>{ecoPercent}%</p>
          </div>
        </div>

        {/* Score bar — lower is greener */}
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${rank.bar}`}
            style={{ width: `${100 - pollution * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Lower score = cleaner village. Aim for under 200!
        </p>
      </div>

      {/* AI-generated tips */}
      <div className="flex-1 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-lg">
            ✨
          </span>
          <div>
            <h3 className="font-semibold text-white">AI Eco-Tips</h3>
            <p className="text-xs text-slate-400">Personalized for your habits</p>
          </div>
        </div>

        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-xl bg-slate-800/60 p-3 text-sm leading-relaxed text-slate-300"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>

        <div className="mt-6 rounded-2xl border border-slate-700/60 bg-slate-900/80 p-4 text-sm text-slate-300">
          <p className="mb-2 text-slate-400">Carbon offset tip</p>
          <p className="text-white">Plant {treesToPlant} trees to neutralize your footprint.</p>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-colors hover:from-violet-400 hover:to-sky-400"
        >
          Share Your Village
        </button>
        {shareStatus && (
          <p className="mt-2 text-center text-sm text-emerald-300">{shareStatus}</p>
        )}
      </div>

      {/* Retake */}
      <button
        type="button"
        onClick={onRetake}
        className="w-full rounded-xl border border-slate-600 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
      >
        ↺ Retake Quiz
      </button>
    </div>
  )
}

/**
 * PropTypes validation for Dashboard component props.
 */
Dashboard.propTypes = {
  /** Carbon score between 0 and 1000 */
  score: PropTypes.number.isRequired,
  /** Array of exactly 3 personalized eco-tips */
  tips: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Callback function triggered when user wants to retake the quiz */
  onRetake: PropTypes.func.isRequired,
}
