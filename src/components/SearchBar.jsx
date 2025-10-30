import React, { useMemo, useState, useCallback } from 'react'

/**
 * Search input for node paths. Highlights and centers the first match.
 */
export default function SearchBar({ nodes, onResult, reactFlowRef }) {
  const [query, setQuery] = useState('')

  // Fast membership checks for node ids
  const nodeIdSet = useMemo(() => new Set(nodes.map(n => n.id)), [nodes])

  // Center the viewport on a specific node id
  const centerOnNode = useCallback((nodeId) => {
    if (!reactFlowRef.current) return
    const instance = reactFlowRef.current
    const node = instance.getNodes().find(n => n.id === nodeId)
    if (!node) return
    const x = node.position.x + (node.width || 200) / 2
    const y = node.position.y + (node.height || 60) / 2
    instance.setCenter(x, y, { zoom: 1.2, duration: 800 })
  }, [])

  // Normalize user query and resolve to a matching node id, if any
  const handleSearch = useCallback((e) => {
    e.preventDefault()
    let q = query.trim()
    if (!q) {
      onResult(null)
      return
    }

    if (!q.startsWith('$')) q = '$.' + q

    let normalized = q.replace(/\.+/g, '.').replace(/\.$/, '')
    normalized = normalized.replace(/\.(\d+)/g, '[$1]')

    let match = nodeIdSet.has(normalized) ? normalized : null

    if (!match) {
      const partialMatches = Array.from(nodeIdSet).filter(nodeId => nodeId.includes(normalized))
      match = partialMatches.length > 0 ? partialMatches[0] : null
    }

    if (!match) {
      const reverseMatches = Array.from(nodeIdSet).filter(nodeId => normalized.includes(nodeId))
      match = reverseMatches.length > 0 ? reverseMatches[0] : null
    }

    if (!match) {
      const caseInsensitiveMatches = Array.from(nodeIdSet).filter(nodeId => nodeId.toLowerCase().includes(normalized.toLowerCase()))
      match = caseInsensitiveMatches.length > 0 ? caseInsensitiveMatches[0] : null
    }

    onResult(match)
    if (match) centerOnNode(match)
  }, [query, nodeIdSet, onResult, centerOnNode])

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center gap-2">
      <input
        className="input"
        placeholder="Search path e.g. $.user.name or items[0].price"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-secondary">Search</button>
    </form>
  )
}


