import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle } from '../components/ui/SlideComponents'

export function RollerCoasterSlide({ active }: { active: boolean }) {
  const timeline = [
    { period: '2024 Q4', trend: 'RAG 全民热、LangChain 必学', status: '🔥', fate: '渐渐沉寂' },
    { period: '2025 Q1', trend: 'Agent 概念爆发、Manus', status: '🔥', fate: '热度回落' },
    { period: '2025 Q2', trend: 'MCP 协议发布、生态爆发', status: '🔥', fate: '正在被质疑' },
    { period: '2025 Q3', trend: 'Coding Agent 大战', status: '🔥', fate: '持续进化' },
    { period: '2025 Q4', trend: 'Vibe Coding、本地模型', status: '🔥', fate: '仍有声音' },
    { period: '2026 Q1', trend: 'CLI Agent 崛起', status: '🔥', fate: '← 我们在这里' },
  ]

  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="AI 圈的热点，半年一换">🎢 过山车</SlideTitle>
      </FadeIn>

      <div className="space-y-6 mt-6">
        {timeline.map((item, i) => (
          <FadeIn key={i} active={active} delay={0.2 + i * 0.1}>
            <div
              className="flex items-center gap-4 px-5 py-4 rounded-lg"
              style={{
                background: i === timeline.length - 1 ? 'rgba(234, 88, 12, 0.08)' : 'var(--bg-card)',
                border: i === timeline.length - 1 ? '1px solid rgba(234, 88, 12, 0.25)' : '1px solid var(--border-subtle)',
              }}
            >
              <span className="font-mono text-xs w-20 shrink-0" style={{ color: 'var(--accent-indigo)' }}>
                {item.period}
              </span>
              <span className="flex-1" style={{ color: 'var(--text-heading)' }}>
                {item.trend}
              </span>
              <span className="text-xs font-mono" style={{ color: i === timeline.length - 1 ? 'var(--accent-orange)' : 'var(--text-muted)' }}>
                {item.fate}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn active={active} delay={1.0}>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          那么 MCP 真的要被 CLI 取代了吗？🤔 让我们看看到底怎么回事
        </p>
      </FadeIn>
    </SlideLayout>
  )
}
