import { FadeIn } from '../components/animations/FadeIn'
import { SlideLayout, SlideTitle, ComparisonTable } from '../components/ui/SlideComponents'

export function ComparisonSlide({ active }: { active: boolean }) {
  return (
    <SlideLayout>
      <FadeIn active={active} delay={0.1}>
        <SlideTitle sub="不是取代，是各有战场">MCP vs CLI 正面 PK</SlideTitle>
      </FadeIn>

      <FadeIn active={active} delay={0.3}>
        <ComparisonTable
          headers={['维度', 'MCP', 'CLI']}
          rows={[
            ['本质', '给 AI 装标准接口 (USB)', '让 AI 直接用人类工具'],
            ['Token 消耗', '❌ 大 — Schema + 结构化数据', '✅ 小 — 纯文本返回'],
            ['执行速度', '❌ 慢 — Server 中转', '✅ 快 — 直接系统调用'],
            ['安全性', '✅ 沙箱，权限可控', '❌ 直接操作系统'],
            ['可控性', '✅ 输入输出有约束', '❌ Agent 可执行任意命令'],
            ['灵活性', '❌ 受限于已定义的 Tool', '✅ 任何 CLI 都能用'],
            ['合规', '✅ 企业友好', '⚠️ 需额外管控'],
          ]}
          highlightCol={2}
        />
      </FadeIn>

      <FadeIn active={active} delay={0.6}>
        <div className="flex gap-4 mt-6">
          <div
            className="flex-1 px-4 py-3 rounded-lg text-center text-sm"
            style={{
              background: 'rgba(129, 140, 248, 0.08)',
              border: '1px solid rgba(129, 140, 248, 0.2)',
              color: 'var(--accent-indigo)',
            }}
          >
            MCP → 生产环境 · 合规场景
          </div>
          <div
            className="flex-1 px-4 py-3 rounded-lg text-center text-sm"
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: 'var(--accent-green)',
            }}
          >
            CLI → 开发探索 · 快速验证
          </div>
        </div>
      </FadeIn>
    </SlideLayout>
  )
}
