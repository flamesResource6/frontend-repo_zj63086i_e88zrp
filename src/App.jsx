import HeroCover from './components/HeroCover'
import BubbleArt from './components/BubbleArt'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <HeroCover />

      <main>
        <BubbleArt />

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-semibold">Shot Notes</h3>
            <p className="mt-3 text-slate-600">
              Clean, bright, and modern. White-on-white palette with soft shadows and
              glossy highlights. Bubbles are crisp, reflective, and well-defined, forming
              the numerals with an airy elegance. Perfectly minimal for an Instagram post.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
