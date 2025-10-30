import React, { useCallback, useEffect } from 'react'
import ReactFlow, { Background, Controls, MiniMap, useReactFlow, ReactFlowProvider, MarkerType, Handle, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import clsx from 'clsx'

/**
 * Default node renderer with compact, theme-aware styling.
 */
function DefaultNode({ data }) {
  const nodeClass = clsx(
    'rounded-md px-3 py-2 shadow-sm border text-xs cursor-pointer app-node border-theme',
    data.kind === 'object' && 'node-object',
    data.kind === 'array' && 'node-array',
    data.kind === 'primitive' && 'node-primitive',
    data.isHighlighted && 'node-highlight'
  )
  const title = `${data.path}\n${data.tooltip || ''}`
  return (
    <div className={nodeClass} title={title} onClick={() => data.onCopy?.(data.path)}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div className="flex items-center justify-between gap-3">
        <div className="label font-mono">
          {data.kind === 'primitive' ? (
            <span>
              <span className="text-sky-300">{String(data.name)}</span>
              <span className="text-slate-400">: </span>
              <span className="text-amber-300">{data.valueText}</span>
            </span>
          ) : (
            <span>
              <span className="text-sky-300">{String(data.name)}</span>
              <span className="text-slate-400"> {data.kind === 'object' ? '{ }' : '[ ]'}</span>
            </span>
          )}
        </div>
        <span className="rounded bg-slate-700 px-2 py-0.5 text-[10px] text-slate-200">{data.meta}</span>
      </div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes = { default: DefaultNode }

/**
 * Inner visualizer that reads React Flow instance via hook and wires props.
 */
function TreeVisualizerInner({ nodes, edges, highlightId, onCopyPath, reactFlowRef }) {
  const rf = useReactFlow()

  // Expose flow instance to parent for programmatic centering
  useEffect(() => {
    if (!reactFlowRef.current && rf) {
      reactFlowRef.current = rf
    }
  }, [rf, reactFlowRef])

  // Attach highlighting and callbacks to node data
  const nodeWithStyles = nodes.map((n) => ({
    ...n,
    data: { ...n.data, isHighlighted: n.id === highlightId, onCopy: onCopyPath },
    style: { ...n.style },
  }))

  const proOptions = { hideAttribution: true }

  const defaultEdgeOptions = {
    type: 'smoothstep',
    animated: false,
    style: { stroke: '#94a3b8', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' },
  }

  const onInit = useCallback((instance) => {
    reactFlowRef.current = instance
  }, [reactFlowRef])

  return (
    <ReactFlow
      nodes={nodeWithStyles}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      proOptions={proOptions}
      defaultEdgeOptions={defaultEdgeOptions}
      onInit={onInit}
    >
      <MiniMap pannable zoomable />
      <Controls showInteractive={true} />
      <Background gap={16} size={1} />
    </ReactFlow>
  )
}

/**
 * Provider wrapper required by React Flow around the inner visualizer.
 */
export default function TreeVisualizer(props) {
  return (
    <ReactFlowProvider>
      <TreeVisualizerInner {...props} />
    </ReactFlowProvider>
  )
}


