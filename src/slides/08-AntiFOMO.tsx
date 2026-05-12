import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle, Card, Highlight } from '../components/ui/SlideComponents'

export function TakeawaySlide({ active }: { active: boolean }) {
  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="MCP vs CLI — 我们该怎么选？">总结</SlideTitle>
      </FadeIn>

      <div className="space-y-4 mt-2">
        <FadeIn active={active} delay={0.2}>
          <Card className="flex items-start gap-4">
            <span
              className="px-2 py-0.5 rounded text-xs font-mono mt-1 shrink-0"
              style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-indigo)' }}
            >
              MCP
            </span>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-heading)' }}>
                当你需要安全、可控、企业合规时
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>
                生产环境、客户数据、权限敏感场景 — MCP 的沙箱和 Schema 约束依然有价值
              </p>
            </div>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.35}>
          <Card className="flex items-start gap-4">
            <span
              className="px-2 py-0.5 rounded text-xs font-mono mt-1 shrink-0"
              style={{ background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-green)' }}
            >
              CLI
            </span>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-heading)' }}>
                当你需要灵活、高效、快速验证时
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>
                开发调试、探索问题、一次性任务 — CLI 省 token、速度快、工具链丰富
              </p>
            </div>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.5}>
          <Card className="flex items-start gap-4" style={{ border: '1px solid rgba(234, 88, 12, 0.2)' }}>
            <span
              className="px-2 py-0.5 rounded text-xs font-mono mt-1 shrink-0"
              style={{ background: 'rgba(234, 88, 12, 0.1)', color: 'var(--accent-orange)' }}
            >
              趋势
            </span>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--text-heading)' }}>
                未来是融合，不是替代
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>
                Agent 会同时拥有 MCP 和 CLI 两种能力，根据场景自动选择最优路径
              </p>
            </div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn active={active} delay={0.7}>
        <p className="text-center text-sm mt-8" style={{ color: 'var(--text-muted)' }}>
          底层需求没变：<Highlight>AI 需要和外部世界交互</Highlight> — 变的只是实现方式
        </p>
      </FadeIn>
    </SlideLayout>
  )
}
