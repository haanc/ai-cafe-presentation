import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, Highlight } from '../components/ui/SlideComponents'

export function TitleSlide({ active }: { active: boolean }) {
  return (
    <SlideLayout className="items-center text-center">
      <FadeIn active={active} delay={0.1}>
        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-8"
          style={{
            background: 'rgba(234, 88, 12, 0.1)',
            border: '1px solid rgba(234, 88, 12, 0.25)',
            color: 'var(--accent-orange)',
          }}
        >
          ☕ AI Cafe · Biweekly Sharing
        </div>
      </FadeIn>

      <FadeIn active={active} delay={0.3}>
        <h1
          className="text-7xl font-bold leading-tight tracking-tight mb-6"
          style={{
            background: 'var(--gradient-heading)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AI 圈最近在卷什么？
        </h1>
      </FadeIn>

      <FadeIn active={active} delay={0.5}>
        <p className="text-2xl mb-2" style={{ color: 'var(--text-body)' }}>
          从 <Highlight>MCP</Highlight> 到 <Highlight>CLI</Highlight> 聊起
        </p>
      </FadeIn>

      <FadeIn active={active} delay={0.7}>
        <p className="text-lg mt-8" style={{ color: 'var(--text-muted)' }}>
          <span
            style={{
              background: 'var(--gradient-warm)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            Han Cao
          </span>{' '}
          · May 2026
        </p>
      </FadeIn>

      <FadeIn active={active} delay={0.9}>
        <div className="flex gap-8 mt-12 text-sm" style={{ color: 'var(--text-muted)' }}>
          <span>⏱ 20 min</span>
          <span>💬 Open Discussion</span>
        </div>
      </FadeIn>
    </SlideLayout>
  )
}
