/**
 * Top navigation bar with branding and step indicator.
 * @param {{ step: 'welcome' | 'quiz' | 'results' }} props
 */
export default function Navbar({ step }) {
  const steps = [
    { id: 'welcome', label: 'Start' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'results', label: 'Village' },
  ]

  const stepOrder = { welcome: 0, quiz: 1, results: 2 }
  const current = stepOrder[step]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl shadow-lg shadow-emerald-500/20">
            🌍
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight text-white md:text-base">
              EcoVillage
            </h1>
            <p className="text-xs text-slate-500">Carbon Footprint Quest</p>
          </div>
        </div>

        {/* Step pills */}
        <nav className="hidden items-center gap-2 sm:flex" aria-label="Progress">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  i <= current
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-600'
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <span className="text-slate-700">›</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}
