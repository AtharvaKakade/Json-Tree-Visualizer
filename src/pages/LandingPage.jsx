import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Landing page with hero content, a local theme toggle, and a CTA to the editor.
 * This file is self-contained and does not rely on external theme context.
 */
export default function LandingPage() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light')

  /** Initialize theme from storage or system and set data-theme on <html>. */
  useEffect(() => {
    const stored = localStorage.getItem('lp-theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  /** Toggle theme and persist selection. */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('lp-theme', next)
  }

  /** Minimal inline icons to avoid extra dependencies. */
  const SunIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" />
    </svg>
  )
  const MoonIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(180deg, #0d1117 0%, #161b22 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      }}
    >
      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: 'center',
        }}
      />

      {/* Header */}
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 font-semibold" style={{ color: 'var(--text-color)' }}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-white">JV</span>
          <span>JSON Tree Visualizer</span>
        </div>
        <button
          onClick={toggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-theme"
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl"
          style={{ color: 'var(--text-color)' }}
        >
          Visualize JSON into Interactive Trees
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 max-w-2xl text-lg"
          style={{ color: 'var(--muted-text)' }}
        >
          The best way to visualize, format, and explore JSON data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/editor')}
            className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white"
            style={{ background: 'linear-gradient(135deg,#4f46e5 0%, #7c3aed 100%)' }}
          >
            <span
              className="absolute -inset-0.5 rounded-xl bg-indigo-600/30 blur-md opacity-70 group-hover:opacity-90"
              aria-hidden
            />
            <span className="relative z-10">Go to Editor</span>
            <span className="relative z-10">→</span>
          </motion.button>
        </motion.div>
      </main>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          boxShadow:
            theme === 'dark'
              ? 'inset 0 0 150px rgba(0,0,0,0.45)'
              : 'inset 0 0 150px rgba(0,0,0,0.08)',
        }}
      />
    </div>
  )
}


