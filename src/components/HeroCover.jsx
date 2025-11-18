import Spline from '@splinetool/react-spline'

function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] min-h-[420px] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vK0TK9mHEhvY3bf1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient veil to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/60" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-[0_2px_0_rgba(255,255,255,0.8)]">
          Soap-Bubble Typography
        </h1>
        <p className="mt-4 max-w-2xl text-slate-700/80 text-base sm:text-lg">
          Minimal, bright, and pristine — crafted for a perfect Instagram shot
        </p>
      </div>
    </section>
  )
}

export default HeroCover
