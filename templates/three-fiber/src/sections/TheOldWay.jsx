const PAIN_POINTS = [
  'Slow, manual processes that don\'t scale',
  'Generic solutions that ignore your context',
  'Results that disappoint every time',
]

export default function TheOldWay({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-2xl px-8 text-center">
        <p className="text-danger text-sm font-semibold tracking-widest uppercase mb-4">
          The old way
        </p>
        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-8">
          The status quo<br />is broken.
        </h2>
        <div className="flex flex-col gap-4 text-left max-w-sm mx-auto">
          {PAIN_POINTS.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-danger text-xl font-bold flex-shrink-0">✕</span>
              <span className="text-gray-400 text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
