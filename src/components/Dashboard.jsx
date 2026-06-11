import { getEcoRank, getPollutionFactor } from '../utils/calculator'

/**
 * Dashboard showing eco-rank, carbon score, and personalized tips.
 * @param {{ score: number, tips: string[], onRetake: () => void }} props
 */
export default function Dashboard({ score, tips, onRetake }) {
  const rank = getEcoRank(score)
  const pollution = getPollutionFactor(score)
  const ecoPercent = Math.round((1 - pollution) * 100)

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
