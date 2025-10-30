/**
 * Utilities to convert arbitrary JSON into React Flow nodes and edges,
 * plus a simple hierarchical layout calculation.
 */

const NODE_WIDTH = 240
const NODE_HEIGHT = 60
const H_GAP = 280
const V_GAP = 40

function isObject(value) { return Object.prototype.toString.call(value) === '[object Object]' }
function isArray(value) { return Array.isArray(value) }

function toLabel(key, value) {
  if (isObject(value)) return key ? `${key} {}` : '{}'
  if (isArray(value)) return key ? `${key} []` : '[]'
  if (key === null) return String(value)
  return `${key}: ${JSON.stringify(value)}`
}

function toType(value) {
  if (isObject(value)) return 'object'
  if (isArray(value)) return 'array'
  return 'primitive'
}

function childKeyToPathSegment(key) { return typeof key === 'number' ? `[${key}]` : key }

function joinPath(parentPath, segment) {
  if (parentPath === '$' && segment.startsWith('[')) return `$${segment}`
  if (parentPath === '$') return `$.${segment}`
  if (segment.startsWith('[')) return `${parentPath}${segment}`
  return `${parentPath}.${segment}`
}

/** Build nodes/edges for a JSON subtree. */
function traverse(value, parentPath = '$', key = null, accum = { nodes: [], edges: [] }) {
  const path = key === null ? parentPath : joinPath(parentPath, childKeyToPathSegment(key))
  const label = toLabel(key, value)
  const type = toType(value)
  const name = key === null ? '$' : (typeof key === 'number' ? `[${key}]` : key)
  const meta = isObject(value) ? `${Object.keys(value).length} keys` : isArray(value) ? `${value.length} items` : typeof value
  const valueText = type === 'primitive' ? JSON.stringify(value) : ''

  const node = {
    id: path,
    type: 'default',
    position: { x: 0, y: 0 },
    data: { label, path, tooltip: type === 'primitive' ? String(value) : type, kind: type, name, meta, valueText },
    style: {},
  }
  accum.nodes.push(node)

  if (isObject(value)) {
    Object.entries(value).forEach(([k, v]) => {
      const childPath = joinPath(path, k)
      accum.edges.push({
        id: `${path}->${childPath}`,
        source: path,
        target: childPath,
        type: 'smoothstep',
        label: k,
        labelBgPadding: [6, 4],
        labelBgBorderRadius: 6,
        labelBgStyle: { fill: 'rgba(30,41,59,0.8)', stroke: '#475569', color: '#e2e8f0' },
        labelStyle: { fill: '#cbd5e1', fontSize: 11 },
      })
      traverse(v, path, k, accum)
    })
  } else if (isArray(value)) {
    value.forEach((v, idx) => {
      const childPath = joinPath(path, `[${idx}]`)
      accum.edges.push({
        id: `${path}->${childPath}`,
        source: path,
        target: childPath,
        type: 'smoothstep',
        label: String(idx),
        labelBgPadding: [6, 4],
        labelBgBorderRadius: 6,
        labelBgStyle: { fill: 'rgba(30,41,59,0.8)', stroke: '#475569', color: '#e2e8f0' },
        labelStyle: { fill: '#cbd5e1', fontSize: 11 },
      })
      traverse(v, path, idx, accum)
    })
  }

  return accum
}

/** Compute x/y positions for nodes using depth and subtree sizes. */
function computeLayout(nodes, edges) {
  const childrenMap = new Map()
  nodes.forEach(n => childrenMap.set(n.id, []))
  edges.forEach(e => { const arr = childrenMap.get(e.source); arr.push(e.target) })

  const depthMap = new Map()
  function depthOf(nodeId) {
    if (nodeId === '$') return 0
    if (depthMap.has(nodeId)) return depthMap.get(nodeId)
    const parent = findParent(nodeId)
    const d = parent ? depthOf(parent) + 1 : 0
    depthMap.set(nodeId, d)
    return d
  }

  function findParent(nodeId) {
    for (const e of edges) { if (e.target === nodeId) return e.source }
    return null
  }

  const subtreeMemo = new Map()
  function subtreeSize(nodeId) {
    if (subtreeMemo.has(nodeId)) return subtreeMemo.get(nodeId)
    const children = childrenMap.get(nodeId) || []
    if (children.length === 0) { subtreeMemo.set(nodeId, 1); return 1 }
    const size = children.map(subtreeSize).reduce((a, b) => a + b, 0)
    subtreeMemo.set(nodeId, size)
    return size
  }

  // DFS order for stable vertical placement
  const rootId = '$'
  let yCursor = 0
  function place(nodeId) {
    const depth = depthOf(nodeId)
    const size = subtreeSize(nodeId)
    const node = nodes.find(n => n.id === nodeId)
    node.position.x = depth * H_GAP
    const yCenter = yCursor + (size * (NODE_HEIGHT + V_GAP) - V_GAP) / 2 - NODE_HEIGHT / 2
    node.position.y = yCenter
    const children = childrenMap.get(nodeId) || []
    let start = yCursor
    for (const child of children) {
      yCursor = start
      place(child)
      const csize = subtreeSize(child)
      start += csize * (NODE_HEIGHT + V_GAP)
      yCursor = start
    }
  }

  place(rootId)

  // Preserve potential style hooks by kind (no-op stylistically here)
  nodes.forEach(n => {
    const kind = n.data.kind
    if (kind === 'object') n.style = { ...n.style }
    if (kind === 'array') n.style = { ...n.style }
    if (kind === 'primitive') n.style = { ...n.style }
  })
}

/** Public API: build flow model for a given JSON value. */
export function buildFlowFromJson(json) {
  const { nodes, edges } = traverse(json, '$', null, { nodes: [], edges: [] })
  if (!nodes.find(n => n.id === '$')) {
    nodes.unshift({ id: '$', type: 'default', position: { x: 0, y: 0 }, data: { label: '$', path: '$', tooltip: '', kind: toType(json) }, style: {} })
  } else {
    const root = nodes.find(n => n.id === '$')
    root.data.label = '$'
  }
  computeLayout(nodes, edges)
  nodes.forEach(n => { const k = n.data.kind; if (k === 'object') n.className = 'node-object'; if (k === 'array') n.className = 'node-array'; if (k === 'primitive') n.className = 'node-primitive' })
  return { nodes, edges }
}


