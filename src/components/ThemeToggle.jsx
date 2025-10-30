import React, { useEffect, useState } from 'react'

/**
 * Standalone theme toggle for the editor route. Persists selection and
 * applies `data-theme` on <html>.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  /** Initialize from storage or system preference. */
  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = stored || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  /** Toggle and persist the theme. */
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button className="btn btn-secondary" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}


