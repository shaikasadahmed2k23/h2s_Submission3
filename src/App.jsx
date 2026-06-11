import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Quiz from './components/Quiz'
import World from './components/World'
import Dashboard from './components/Dashboard'
import {
  calculateCarbonScore,
  generateTips,
} from './utils/calculator'

/** App flow: welcome → quiz → results (3D world + dashboard) */
export default function App() {
  const [step, setStep] = useState('welcome')
  const [score, setScore] = useState(0)
  const [tips, setTips] = useState([])

  const handleQuizComplete = useCallback((answers) => {
    const carbonScore = calculateCarbonScore(answers)
    const ecoTips = generateTips(answers, carbonScore)
    setScore(carbonScore)
    setTips(ecoTips)
    setStep('results')
  }, [])

  const handleRetake = useCallback(() => {
    setScore(0)
    setTips([])
    setStep('quiz')
  }, [])

  const handleStart = useCallback(() => {
    setStep('quiz')
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar step={step} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 md:px-8">
        {/* ── Welcome screen ── */}
        {step === 'welcome' && (
          <section className="animate-fade-slide-up flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-6 text-6xl">🌍</div>
            <h2 className="mb-4 max-w-xl text-4xl font-bold text-white md:text-5xl">
              Build Your{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Eco-Village
              </span>
            </h2>
            <p className="mb-10 max-w-lg text-lg text-slate-400">
              Answer 10 quick questions about your daily habits. Watch your
              village transform — from a smoky factory town to a lush green
              paradise — based on your carbon footprint.
            </p>

            <div className="mb-10 grid max-w-md grid-cols-2 gap-4 text-left text-sm">
              {[
                { icon: '📝', label: '10 habit questions' },
                { icon: '🏘️', label: 'Live 3D village' },
                { icon: '🏆', label: 'Eco-rank & score' },
                { icon: '✨', label: 'AI-powered tips' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-800/40 px-4 py-3"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleStart}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-10 py-4 text-lg font-bold text-white shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 hover:from-emerald-400 hover:to-teal-400"
            >
              Start Your Quest →
            </button>
          </section>
        )}

        {/* ── Quiz screen ── */}
        {step === 'quiz' && (
          <section className="flex flex-1 flex-col justify-center py-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Carbon Habit Quiz
              </h2>
              <p className="mt-2 text-slate-400">
                Be honest — your village depends on it!
              </p>
            </div>
            <Quiz onComplete={handleQuizComplete} />
          </section>
        )}

        {/* ── Results: 3D world + dashboard ── */}
        {step === 'results' && (
          <section className="flex flex-1 flex-col gap-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Your Eco-Village
              </h2>
              <p className="mt-1 text-slate-400">
                Scroll and drag to explore — greener choices = greener world
              </p>
            </div>

            <div className="grid flex-1 gap-6 lg:grid-cols-5 lg:gap-8">
              {/* 3D world takes more space */}
              <div className="lg:col-span-3">
                <div className="h-[400px] lg:h-[calc(100vh-220px)] lg:min-h-[480px]">
                  <World score={score} />
                </div>
              </div>

              {/* Dashboard sidebar */}
              <div className="lg:col-span-2">
                <Dashboard score={score} tips={tips} onRetake={handleRetake} />
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-600">
        EcoVillage — Carbon Footprint Awareness Platform
      </footer>
    </div>
  )
}
