import { type ReactNode, type CSSProperties } from 'react'

interface SlideLayoutProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function SlideLayout({ children, className = '', style }: SlideLayoutProps) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
      <div
        className={className}
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '48px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  )
}

interface SlideTitleProps {
  children: ReactNode
  className?: string
  sub?: string
}

export function SlideTitle({ children, className = '', sub }: SlideTitleProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h1
        className="text-5xl font-bold leading-tight tracking-tight"
        style={{
          background: 'var(--gradient-heading)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </h1>
      {sub && (
        <p className="text-xl mt-3" style={{ color: 'var(--text-muted)' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

interface HighlightProps {
  children: ReactNode
}

export function Highlight({ children }: HighlightProps) {
  return (
    <span
      style={{
        background: 'var(--gradient-highlight)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}

interface AzureHighlightProps {
  children: ReactNode
}

export function AzureHighlight({ children }: AzureHighlightProps) {
  return (
    <span
      style={{
        background: 'var(--gradient-azure)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Card({ children, className = '', style }: CardProps) {
  return (
    <div
      className={className}
      style={{
        borderRadius: '12px',
        padding: '24px 32px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface TableProps {
  headers: string[]
  rows: string[][]
  highlightCol?: number
}

export function ComparisonTable({ headers, rows, highlightCol }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl" style={{ border: '1px solid var(--border-subtle)' }}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr style={{ background: 'var(--bg-card)' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: '12px 24px',
                  fontWeight: 600,
                  color: i === highlightCol ? 'var(--accent-blue-light)' : 'var(--text-heading)',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background: ri % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-deep)',
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '10px 24px',
                    color: ci === highlightCol ? 'var(--accent-cyan)' : 'var(--text-body)',
                    fontWeight: ci === 0 ? 500 : 400,
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
