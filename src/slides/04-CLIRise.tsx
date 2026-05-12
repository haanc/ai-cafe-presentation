import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle } from '../components/ui/SlideComponents'

export function CLIRiseSlide({ active }: { active: boolean }) {
  const cliTools = [
    { name: 'Claude Code', maker: 'Anthropic', highlight: 'Agent 能力强、Skill/Memory 生态', color: '#f59e0b' },
    { name: 'Codex CLI', maker: 'OpenAI', highlight: '开源、沙箱执行、本地运行', color: '#10b981' },
    { name: 'Gemini CLI', maker: 'Google', highlight: '100万 token 上下文、免费额度', color: '#3aa0f7' },
    { name: 'Copilot CLI', maker: 'GitHub / Microsoft', highlight: '合规友好、MCP 支持、企业主力', color: '#818cf8' },
  ]

  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="让 AI 直接用人类的命令行工具">CLI Agent 崛起</SlideTitle>
      </FadeIn>

      <div className="space-y-6 mt-6">
        {cliTools.map((tool, i) => (
          <FadeIn key={i} active={active} delay={0.2 + i * 0.12}>
            <div
              className="flex items-center gap-5 px-5 py-4 rounded-xl"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: tool.color }}
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-semibold text-lg" style={{ color: 'var(--text-heading)' }}>
                    {tool.name}
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {tool.maker}
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: 'var(--text-body)' }}>
                  {tool.highlight}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn active={active} delay={0.8}>
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          共同点：<span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
            不需要 MCP Server，直接操作文件系统和命令行
          </span>
        </p>
      </FadeIn>
    </SlideLayout>
  )
}
