import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, Card, Highlight } from '../components/ui/SlideComponents'

export function DiscussionSlide({ active }: { active: boolean }) {
  const questions = [
    { emoji: '👀', q: '你最近看到什么 AI 新鲜事？' },
    { emoji: '😰', q: '你有 FOMO 的感觉吗？怎么应对的？' },
    { emoji: '📦', q: '有哪些"曾经很火、现在消失"的技术？' },
    { emoji: '🛠️', q: '你在工作中最常用的 AI 工具是什么？为什么？' },
  ]

  return (
    <SlideLayout className="items-center text-center">
      <FadeIn active={active} delay={0.1}>
        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          style={{
            background: 'rgba(234, 88, 12, 0.1)',
            border: '1px solid rgba(234, 88, 12, 0.25)',
            color: 'var(--accent-orange)',
          }}
        >
          ☕ Open Discussion
        </div>
      </FadeIn>

      <FadeIn active={active} delay={0.2}>
        <h1
          className="text-5xl font-bold leading-tight tracking-tight mb-8"
          style={{
            background: 'var(--gradient-heading)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          聊聊你的想法
        </h1>
      </FadeIn>

      <div className="grid grid-cols-2 gap-3 w-full max-w-3xl">
        {questions.map((item, i) => (
          <FadeIn key={i} active={active} delay={0.3 + i * 0.1}>
            <Card className="!py-4 text-left">
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm" style={{ color: 'var(--text-heading)' }}>
                  {item.q}
                </span>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>

      <FadeIn active={active} delay={0.8}>
        <div className="mt-8">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            想分享下一期 AI Cafe？<Highlight>欢迎认领！</Highlight> 🙋
          </p>
        </div>
      </FadeIn>
    </SlideLayout>
  )
}
