import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle, Card, Highlight } from '../components/ui/SlideComponents'

export function DemoSlide({ active }: { active: boolean }) {
  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="同一个任务，两种路径 — Live Demo">🎬 Demo Time</SlideTitle>
      </FadeIn>

      <div className="grid grid-cols-2 gap-5 mt-2">
        <FadeIn active={active} delay={0.2}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-indigo)' }}
              >
                MCP
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                GitHub MCP Server
              </span>
            </div>
            <div
              className="rounded-lg p-4 font-mono text-xs leading-loose"
              style={{ background: '#f5f0eb', color: 'var(--accent-purple)' }}
            >
              <p style={{ color: 'var(--text-muted)' }}>// Agent 通过 MCP 调用</p>
              <p>→ github.list_pull_requests(repo)</p>
              <p>→ github.get_pull_request(id)</p>
              <p>→ 返回结构化 JSON</p>
            </div>
            <div className="mt-4 space-y-2 text-sm" style={{ color: 'var(--text-body)' }}>
              <p>✅ Schema 约束，参数有类型检查</p>
              <p>✅ 权限可控，只暴露选定操作</p>
              <p>❌ Token 消耗大（Schema 描述）</p>
            </div>
          </Card>
        </FadeIn>

        <FadeIn active={active} delay={0.35}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-2 py-0.5 rounded text-xs font-mono"
                style={{ background: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-green)' }}
              >
                CLI
              </span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>
                GitHub CLI (gh)
              </span>
            </div>
            <div
              className="rounded-lg p-4 font-mono text-xs leading-loose"
              style={{ background: '#ecfdf5', color: 'var(--accent-green)' }}
            >
              <p style={{ color: 'var(--text-muted)' }}>// Agent 直接跑 gh 命令</p>
              <p>→ gh pr list --repo ...</p>
              <p>→ gh pr view 123</p>
              <p>→ 返回纯文本</p>
            </div>
            <div className="mt-4 space-y-2 text-sm" style={{ color: 'var(--text-body)' }}>
              <p>✅ Token 消耗小</p>
              <p>✅ 灵活，任意 gh 子命令可用</p>
              <p>❌ Agent 需要自己拼参数</p>
            </div>
          </Card>
        </FadeIn>
      </div>

      <FadeIn active={active} delay={0.6}>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          接下来 <Highlight>现场演示</Highlight> 👇
        </p>
      </FadeIn>
    </SlideLayout>
  )
}
