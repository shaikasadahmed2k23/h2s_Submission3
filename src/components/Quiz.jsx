import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { QUESTIONS } from '../utils/calculator'

/**
 * Interactive quiz component for carbon footprint assessment.
 * Guides users through 10 questions about daily habits with animated progress.
 * Manages answer selection and validates responses before advancing.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onComplete - Callback with final answers when quiz is finished
 * @returns {React.ReactElement} Multi-step quiz UI with progress bar and navigation
 */
export default function Quiz({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  const question = QUESTIONS[currentIndex]
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100
  const isLast = currentIndex === QUESTIONS.length - 1

  /**
   * Handles answer option selection and updates local state.
   * Does not advance to next question until user clicks Next button.
   *
   * @param {string} value - The selected option value
   */
  const handleSelect = useCallback((value) => {
    setSelected(value)
  }, [])

  /**
   * Handles Next button click.
   * Saves the current answer and advances to next question or completes quiz.
   */
  const handleNext = useCallback(() => {
    if (!selected) return

    const updated = { ...answers, [question.id]: selected }
    setAnswers(updated)

    if (isLast) {
      onComplete(updated)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(updated[QUESTIONS[currentIndex + 1].id] ?? null)
    }
  }, [selected, answers, question.id, isLast, currentIndex, onComplete])

  /**
   * Handles Back button click.
   * Returns to previous question and restores previously selected answer.
   */
  const handleBack = useCallback(() => {
    if (currentIndex === 0) return
    const prevIndex = currentIndex - 1
    setCurrentIndex(prevIndex)
    setSelected(answers[QUESTIONS[prevIndex].id] ?? null)
  }, [currentIndex, answers])

  return (
    <div className="animate-fade-slide-up mx-auto w-full max-w-2xl">
      {/* Progress header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
          <span>
            Question {currentIndex + 1} of {QUESTIONS.length}
          </span>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-emerald-400">
            {question.category}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-6 flex items-start gap-4">
          <span className="text-4xl" role="img" aria-hidden="true">
            {question.icon}
          </span>
          <h2 className="text-xl font-semibold leading-snug text-white md:text-2xl">
            {question.question}
          </h2>
        </div>

        {/* Answer options */}
        <div className="space-y-3" role="radiogroup" aria-label={question.question}>
          {question.options.map((option) => {
            const isActive = selected === option.value
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => handleSelect(option.value)}
                className={`w-full rounded-xl border px-5 py-4 text-left transition-all duration-200 ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/10'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isActive ? 'border-emerald-400 bg-emerald-400' : 'border-slate-500'
                    }`}
                  >
                    {isActive && <span className="h-2 w-2 rounded-full bg-slate-900" />}
                  </span>
                  {option.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selected}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-400 hover:to-teal-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? 'See My Village →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * PropTypes validation for Quiz component props.
 */
Quiz.propTypes = {
  /** Callback function called with answers object when user completes quiz */
  onComplete: PropTypes.func.isRequired,
}
