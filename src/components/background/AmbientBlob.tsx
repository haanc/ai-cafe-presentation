import { type CSSProperties } from 'react'

interface AmbientBlobProps {
  color: string
  size?: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  duration?: number
}

let blobCounter = 0

export function AmbientBlob({
  color,
  size = 900,
  duration = 25,
  ...position
}: AmbientBlobProps) {
  const id = `blob${++blobCounter}`

  const style: CSSProperties = {
    position: 'fixed',
    width: size * 2,
    height: size * 2,
    background: `radial-gradient(circle, ${color} 0%, transparent 50%)`,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
    animation: `${id} ${duration}s ease-in-out infinite alternate`,
    marginTop: -size / 2,
    marginLeft: -size / 2,
    ...position,
  }

  return (
    <>
      <style>{`
        @keyframes ${id} {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }
      `}</style>
      <div style={style} />
    </>
  )
}
