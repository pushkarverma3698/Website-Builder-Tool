const VALUE_PROPS = [
  {
    icon: '⚡',
    title: 'Personalized at scale',
    desc: "Every message tailored to the prospect's recent posts and profile activity.",
  },
  {
    icon: '📬',
    title: '8.4% reply rate',
    desc: '4× industry average. It reads like a human wrote it — because the AI did.',
  },
  {
    icon: '🛡',
    title: 'Never get flagged',
    desc: 'Smart pacing and send limits keep your LinkedIn account safe automatically.',
  },
]

export default function TuricksEffect({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-4xl px-8 w-full">
        <p className="text-success text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          The Turicks effect
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          Outreach that{' '}
          <span className="text-success">actually works.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PROPS.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(10,10,20,0.7)',
                border: '1px solid rgba(16,185,129,0.2)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
