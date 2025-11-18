import { useEffect, useRef } from 'react'

function BubbleArt() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const DPR = window.devicePixelRatio || 1
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    canvas.width = width * DPR
    canvas.height = height * DPR
    ctx.scale(DPR, DPR)

    // Background: clean white sink + soft vignette for depth
    const renderBackground = () => {
      const grd = ctx.createLinearGradient(0, 0, 0, height)
      grd.addColorStop(0, '#ffffff')
      grd.addColorStop(1, '#f6f8fb')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, width, height)

      // subtle shadow edges to simulate sink walls
      const vignette = ctx.createRadialGradient(width/2, height/2, Math.min(width, height)/3, width/2, height/2, Math.max(width, height)/1.1)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.06)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)
    }

    // Draw a shiny soap bubble at x,y with given r
    const drawBubble = (x, y, r) => {
      // base translucent circle
      const gradient = ctx.createRadialGradient(x - r*0.3, y - r*0.3, r*0.2, x, y, r)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)')
      gradient.addColorStop(0.4, 'rgba(173, 216, 230, 0.35)')
      gradient.addColorStop(0.7, 'rgba(135, 206, 235, 0.25)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()

      // rim highlight
      ctx.strokeStyle = 'rgba(180, 210, 255, 0.65)'
      ctx.lineWidth = Math.max(1, r * 0.07)
      ctx.beginPath()
      ctx.arc(x, y, r - ctx.lineWidth * 0.4, 0, Math.PI * 2)
      ctx.stroke()

      // specular glints
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.beginPath()
      ctx.ellipse(x - r*0.35, y - r*0.35, r*0.18, r*0.1, -0.4, 0, Math.PI*2)
      ctx.fill()

      ctx.fillStyle = 'rgba(255,255,255,0.65)'
      ctx.beginPath()
      ctx.ellipse(x + r*0.25, y + r*0.15, r*0.08, r*0.05, 0.8, 0, Math.PI*2)
      ctx.fill()
    }

    // Path points to shape the characters "2026"
    // Each character is built from discrete bubble centers to read clearly
    const buildLayout = () => {
      const cx = width / 2
      const cy = height / 2 + 10
      const scale = Math.min(width, height) / 6

      const digit2 = []
      const digit0 = []
      const digit6 = []

      // helper to create ring points
      const ring = (x, y, r, count) => {
        const pts = []
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2
          pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r])
        }
        return pts
      }

      // 2: top arc and diagonal to base
      const two = () => {
        const pts = []
        pts.push(...ring(cx - scale*1.6, cy - scale*0.4, scale*0.55, 14).slice(1, 10))
        for (let i = 0; i <= 10; i++) {
          const t = i / 10
          const x = cx - scale*1.1 + t * (scale*0.4)
          const y = cy + scale*0.2 + t * (scale*0.6)
          pts.push([x, y])
        }
        for (let i = 0; i <= 8; i++) {
          const t = i / 8
          const x = cx - scale*0.7 + t * (scale*0.7)
          const y = cy + scale*0.8
          pts.push([x, y])
        }
        return pts
      }

      // 0: ring
      const zero = () => ring(cx, cy + 0, scale*0.7, 24)

      // 6: ring with opening and tail
      const six = () => {
        const pts = ring(cx + scale*1.7, cy + 0.1*scale, scale*0.7, 22)
        // Add inner tail to suggest the 6 shape
        for (let i = 0; i <= 10; i++) {
          const t = i / 10
          const x = cx + scale*1.2 + t * (scale*0.5)
          const y = cy + scale*0.6 - t * (scale*0.8)
          pts.push([x, y])
        }
        return pts
      }

      digit2.push(...two())
      digit0.push(...zero())
      digit6.push(...six())

      return [...digit2, ...digit0, ...digit2.map(([x,y])=>[x+scale*2.2,y]), ...digit6]
    }

    const points = buildLayout()

    renderBackground()

    // bubble sizes with slight variation for organic look
    const baseR = Math.min(width, height) * 0.022
    points.forEach(([x, y], i) => {
      const r = baseR * (0.86 + 0.28 * Math.sin(i * 1.7))
      drawBubble(x, y, r)
    })

    // dish rim subtle ellipse
    ctx.strokeStyle = 'rgba(0,0,0,0.07)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.ellipse(width/2, height*0.62, width*0.65, height*0.18, 0, 0, Math.PI*2)
    ctx.stroke()

    // gentle shadow at bottom
    const shadowGrad = ctx.createLinearGradient(0, height*0.75, 0, height)
    shadowGrad.addColorStop(0, 'rgba(0,0,0,0)')
    shadowGrad.addColorStop(1, 'rgba(0,0,0,0.08)')
    ctx.fillStyle = shadowGrad
    ctx.fillRect(0, height*0.75, width, height*0.25)
  }, [])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pt-10 pb-14">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">“2026” in Soap Bubbles</h2>
          <p className="text-slate-600/80 mt-2">White ceramic dish in a sunlit modern kitchen — clean, minimal, and glossy</p>
        </div>
        <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden bg-white">
          <div className="bg-white/70 p-3 text-xs text-slate-500">Art render</div>
          <div className="relative">
            <canvas ref={canvasRef} className="w-full h-[56vh] min-h-[420px] block" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BubbleArt
