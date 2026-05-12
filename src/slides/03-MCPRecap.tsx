import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle, Card } from '../components/ui/SlideComponents'

export function MCPRecapSlide({ active }: { active: boolean }) {
  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="Model Context Protocol — 给 AI 装的「USB 接口」">MCP 做了什么？</SlideTitle>
      </FadeIn>

      <div className="grid grid-cols-3 gap-4 mt-2">
        <FadeIn active={active} delay={0.2}>
          <Card className="text-center">
            <div className="text-3xl mb-3">🔌</div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>标准化接口</h3>
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              统一的 JSON Schema 定义工具输入输出，AI 知道怎么调用
            </p>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.35}>
          <Card className="text-center">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>安全可控</h3>
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              沙箱环境，权限管理，不会让 AI 直接操作系统
            </p>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.5}>
          <Card className="text-center">
            <div className="text-3xl mb-3">🧩</div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>生态互通</h3>
            <p className="text-sm" style={{ color: 'var(--text-body)' }}>
              Kusto MCP、ADO MCP、IcM MCP… 一次定义，处处可用
            </p>
          </Card>
        </FadeIn>
      </div>

      <FadeIn active={active} delay={0.7}>
        <div
          className="mt-6 px-5 py-3 rounded-lg text-center"
          style={{
            background: 'rgba(99, 102, 241, 0.06)',
            border: '1px solid rgba(99, 102, 241, 0.15)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--text-body)' }}>
            前几个月的共识：<span style={{ color: 'var(--accent-indigo)', fontWeight: 600 }}>"MCP 是 Agent 世界的 USB 接口"</span>
          </p>
        </div>
      </FadeIn>

      <FadeIn active={active} delay={0.9}>
        <p className="text-center text-sm mt-4" style={{ color: 'var(--text-muted)' }}>
          但最近画风变了…… 🤔
        </p>
      </FadeIn>
    </SlideLayout>
  )
}
