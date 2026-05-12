import { SlideEngine, useSlideEngine } from './engine/SlideEngine'
import { AmbientBlob } from './components/background/AmbientBlob'
import { TitleSlide } from './slides/01-Title'
import { RollerCoasterSlide } from './slides/02-RollerCoaster'
import { MCPRecapSlide } from './slides/03-MCPRecap'
import { CLIRiseSlide } from './slides/04-CLIRise'
import { ComparisonSlide } from './slides/05-Comparison'
import { FutureSlide } from './slides/06-Future'
import { DemoSlide } from './slides/07-TeamExample'
import { TakeawaySlide } from './slides/08-AntiFOMO'
import { DiscussionSlide } from './slides/09-Discussion'

function SlideWrapper({ index, children }: { index: number; children: (active: boolean) => React.ReactNode }) {
  const { currentSlide } = useSlideEngine()
  return <>{children(currentSlide === index)}</>
}

function App() {
  return (
    <div className="w-full h-full relative">
      {/* Background blobs - warm sunlit cafe vibe */}
      <AmbientBlob color="rgba(251, 191, 36, 0.12)" size={800} top="10%" left="-10%" duration={30} />
      <AmbientBlob color="rgba(234, 88, 12, 0.08)" size={700} bottom="0%" right="-5%" duration={25} />
      <AmbientBlob color="rgba(5, 150, 105, 0.06)" size={600} top="50%" left="50%" duration={35} />

      <SlideEngine>
        <SlideWrapper index={0}>{(active) => <TitleSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={1}>{(active) => <RollerCoasterSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={2}>{(active) => <MCPRecapSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={3}>{(active) => <CLIRiseSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={4}>{(active) => <ComparisonSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={5}>{(active) => <DemoSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={6}>{(active) => <FutureSlide active={active} />}</SlideWrapper>
        <SlideWrapper index={7}>{(active) => <TakeawaySlide active={active} />}</SlideWrapper>
        <SlideWrapper index={8}>{(active) => <DiscussionSlide active={active} />}</SlideWrapper>
      </SlideEngine>
    </div>
  )
}

export default App
