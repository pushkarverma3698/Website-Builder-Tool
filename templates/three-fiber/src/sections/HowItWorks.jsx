const STEPS = [
  {
    n: '01',
    title: '{{protocolStep0Title}}',
    desc: '{{protocolStep0Desc}}',
  },
  {
    n: '02',
    title: '{{protocolStep1Title}}',
    desc: '{{protocolStep1Desc}}',
  },
  {
    n: '03',
    title: '{{protocolStep2Title}}',
    desc: '{{protocolStep2Desc}}',
  },
]

export default function HowItWorks({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-3xl px-8 w-full">
        <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          How it works
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          Three steps. Real results.
        </h2>
        <div className="flex flex-col gap-5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-6"
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
                background: 'rgba(10,10,20,0.65)',
                border: '1px solid rgba(34,211,238,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="text-cyan font-mono font-bold text-2xl opacity-60 flex-shrink-0">
                {s.n}
              </span>
              <div>
                <h3 className="text-white font-bold text-xl mb-1">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
