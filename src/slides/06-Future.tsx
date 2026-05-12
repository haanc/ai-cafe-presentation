import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle, Card, Highlight } from '../components/ui/SlideComponents'

export function FutureSlide({ active }: { active: boolean }) {
  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="不是二选一，而是融合">未来属于谁？</SlideTitle>
      </FadeIn>

      <div className="grid grid-cols-3 gap-4 mt-2">
        <FadeIn active={active} delay={0.2}>
          <Card className="text-center relative overflow-hidden">
            <div className="text-2xl mb-2">🔌</div>
            <h3 className="font-mono text-xs mb-2" style={{ color: 'var(--text-muted)' }}>PAST</h3>
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--accent-indigo)' }}>MCP 时代</h3>
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              "给 AI 装接口"
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              标准化、可控、但笨重
            </p>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.35}>
          <Card className="text-center relative overflow-hidden" style={{ border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div className="text-2xl mb-2">⌨️</div>
            <h3 className="font-mono text-xs mb-2" style={{ color: 'var(--accent-green)' }}>NOW</h3>
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--accent-green)' }}>CLI 时代</h3>
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              "让 AI 用人类工具"
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              灵活、高效、但风险更高
            </p>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.5}>
          <Card className="text-center relative overflow-hidden" style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-mono text-xs mb-2" style={{ color: 'var(--accent-orange)' }}>NEXT</h3>
            <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--accent-orange)' }}>Toolset 抽象层</h3>
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              "AI 自己选择接口"
            </p>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
              MCP + CLI 都是底层实现
            </p>
          </Card>
        </FadeIn>
      </div>

      <FadeIn active={active} delay={0.7}>
        <div
          className="mt-8 px-6 py-4 rounded-xl text-center"
          style={{
            background: 'rgba(234, 88, 12, 0.05)',
            border: '1px solid rgba(234, 88, 12, 0.15)',
          }}
        >
          <p style={{ color: 'var(--text-heading)' }}>
            底层需求没变：<Highlight>AI 需要和外部世界交互</Highlight>
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
            变的只是实现方式
          </p>
        </div>
      </FadeIn>
    </SlideLayout>
  )
}
