import React, { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import JsonInput from '../components/JsonInput.jsx'
import TreeVisualizer from '../components/TreeVisualizer.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { buildFlowFromJson } from '../utils/jsonToNodes.js'

/**
 * Editor page: JSON input, visualization, search, and export controls.
 */
const sampleJson = {
  user: {
    name: 'Atharva',
    age: 23,
    address: { city: 'Pune', zip: '411017' },
    hobbies: ['cinema', 'photography'],
  },
  items: [
    { id: 1, price: 19.99, tags: ['sale', 'new'] },
    { id: 2, price: 5.49, tags: [] },
  ],
  active: true,
}

export default function EditorPage() {
  const [jsonText, setJsonText] = useState(JSON.stringify(sampleJson, null, 2))
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [flow, setFlow] = useState({ nodes: [], edges: [] })
  const [highlightId, setHighlightId] = useState(null)

  const canvasRef = useRef(null)
  const reactFlowRef = useRef(null)

  /** Parse JSON and build nodes/edges. */
  const handleVisualize = useCallback(() => {
    setError('')
    setStatus('')
    try {
      const parsed = JSON.parse(jsonText)
      const { nodes, edges } = buildFlowFromJson(parsed)
      setFlow({ nodes, edges })
      setHighlightId(null)
      setStatus('Visualization updated')
    } catch (e) {
      setError('Invalid JSON: ' + e.message)
    }
  }, [jsonText])

  /** Apply search result highlight and status. */
  const onSearchResult = useCallback((match) => {
    if (match) {
      setStatus(`Match found: ${match}`)
      setHighlightId(match)
    } else {
      setStatus('No match found')
      setHighlightId(null)
    }
  }, [])

  /** Copy a JSON path to clipboard. */
  const onCopyPath = useCallback((path) => {
    navigator.clipboard.writeText(path).catch(() => {})
    setStatus('Path copied: ' + path)
  }, [])

  /** Export the canvas as a PNG file. */
  const onExportPng = useCallback(async () => {
    if (!canvasRef.current) return
    try {
      const dataUrl = await toPng(canvasRef.current, { cacheBust: true, quality: 1 })
      const link = document.createElement('a')
      link.download = 'json-tree.png'
      link.href = dataUrl
      link.click()
    } catch (e) {
      setStatus('Export failed: ' + e.message)
    }
  }, [])

  /** Reset input and visualization. */
  const onClear = useCallback(() => {
    setJsonText('')
    setFlow({ nodes: [], edges: [] })
    setHighlightId(null)
    setError('')
    setStatus('Cleared')
  }, [])

  return (
    <div className="app-root min-h-screen">
        <header className="border-b border-theme" style={{ backgroundColor: 'var(--header-bg)' }}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <h1 className="text-lg font-semibold">JSON Tree Visualizer</h1>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary" onClick={onExportPng}>Export PNG</button>
              <button className="btn btn-secondary" onClick={onClear}>Clear</button>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <section className="flex flex-col gap-3 rounded-lg border border-theme p-4 shadow-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="label-sm">Input JSON</div>
                <div className="text-xs" style={{ color: 'var(--muted-text)' }}>Paste or type JSON, then Visualize</div>
              </div>
              <button className="btn btn-primary" onClick={handleVisualize}>Visualize</button>
            </div>
            <JsonInput value={jsonText} onChange={setJsonText} />
            {error && <div className="rounded-md border border-rose-300 bg-rose-50 p-2 text-sm text-rose-700">{error}</div>}
            {status && !error && <div className="text-xs" style={{ color: 'var(--muted-text)' }}>{status}</div>}
          </section>

          <section className="flex min-h-[60vh] flex-col gap-3 rounded-lg border border-theme p-3 shadow-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
            <div className="flex items-center justify-between gap-2">
              <SearchBar
                nodes={flow.nodes}
                onResult={onSearchResult}
                reactFlowRef={reactFlowRef}
              />
              <div className="text-xs" style={{ color: 'var(--muted-text)' }}>Use paths like $.user.name or items[0].price</div>
            </div>
            <div ref={canvasRef} className="relative h-[70vh] w-full rounded-md border border-theme">
              <TreeVisualizer
                nodes={flow.nodes}
                edges={flow.edges}
                highlightId={highlightId}
                onCopyPath={onCopyPath}
                reactFlowRef={reactFlowRef}
              />
            </div>
          </section>
        </main>
    </div>
  )
}


