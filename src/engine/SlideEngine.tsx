import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react'

interface SlideEngineContextType {
  currentSlide: number
  totalSlides: number
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  progress: number
}

const SlideEngineContext = createContext<SlideEngineContextType>({
  currentSlide: 0,
  totalSlides: 0,
  goTo: () => {},
  next: () => {},
  prev: () => {},
  progress: 0,
})

export const useSlideEngine = () => useContext(SlideEngineContext)

interface SlideEngineProps {
  children: ReactNode[]
}

export function SlideEngine({ children }: SlideEngineProps) {
  const totalSlides = children.length
  const [currentSlide, setCurrentSlide] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    const n = parseInt(hash, 10)
    return isNaN(n) ? 0 : Math.max(0, Math.min(n, totalSlides - 1))
  })

  const goTo = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)))
  }, [totalSlides])

  const next = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const prev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          next()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          prev()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(totalSlides - 1)
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [next, prev, goTo, totalSlides])

  // Update URL hash
  useEffect(() => {
    window.location.hash = String(currentSlide)
  }, [currentSlide])

  const progress = totalSlides > 1 ? currentSlide / (totalSlides - 1) : 0

  return (
    <SlideEngineContext.Provider value={{ currentSlide, totalSlides, goTo, next, prev, progress }}>
      <div className="relative w-full h-full">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 w-full h-[3px] z-50" style={{ background: 'rgba(0,0,0,0.06)' }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #ea580c, #d97706, #059669)',
            }}
          />
        </div>

        {/* Slide content */}
        <div className="w-full h-full">
          {children.map((child, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                opacity: i === currentSlide ? 1 : 0,
                transform: i === currentSlide ? 'none' : i < currentSlide ? 'translateX(-60px)' : 'translateX(60px)',
                pointerEvents: i === currentSlide ? 'auto' : 'none',
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Slide counter */}
        <div
          className="fixed bottom-6 right-8 text-sm z-50 font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          {currentSlide + 1} / {totalSlides}
        </div>

        {/* Navigation dots */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer border-0"
              style={{
                background: i === currentSlide ? '#ea580c' : 'rgba(0,0,0,0.12)',
                transform: i === currentSlide ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </SlideEngineContext.Provider>
  )
}
