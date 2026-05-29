const METRICS = [
  { value: '500+', label: 'Active users' },
  { value: '4×',   label: 'Better results' },
  { value: '98%',  label: 'Satisfaction rate' },
  { value: '10×',  label: 'Industry average' },
]

export default function SocialProof({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-4xl px-8 w-full">
        <p className="text-glow text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          Social proof
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-10">
          Numbers don't lie.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {METRICS.map((m, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl"
              style={{
                background: 'rgba(10,10,20,0.7)',
                border: '1px solid {{palette.accent}}33',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="text-4xl font-extrabold mb-1"
                style={{
                  background: 'linear-gradient(135deg, {{palette.accent}}, #22D3EE)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {m.value}
              </div>
              <div className="text-gray-400 text-sm">{m.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-center text-xs tracking-widest uppercase">
          ↑ Testimonials floating in the network above
        </p>
      </div>
    </div>
  )
}
