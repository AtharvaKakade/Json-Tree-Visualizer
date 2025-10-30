import React from 'react'

/**
 * Textarea for raw JSON input.
 * Controlled by parent via value/onChange.
 */
export default function JsonInput({ value, onChange }) {
  return (
    <textarea
      className="input h-[380px] font-mono text-xs leading-5"
      spellCheck={false}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`{\n  "user": { "name": "Atharva" }\n}`}
    />
  )
}


