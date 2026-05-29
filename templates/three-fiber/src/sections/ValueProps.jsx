const VALUE_PROPS = [
  {
    icon: '⚡',
    title: '{{valueProp0}}',
    desc: 'Deep analysis and intelligence applied to your specific context.',
  },
  {
    icon: '📬',
    title: '{{valueProp1}}',
    desc: 'Tailored precisely to your goals — never a one-size-fits-all approach.',
  },
  {
    icon: '🛡',
    title: '{{valueProp2}}',
    desc: 'Delivered reliably and safely, every single time.',
  },
]

export default function ValueProps({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-4xl px-8 w-full">
        <p className="text-success text-sm font-semibold tracking-widest uppercase mb-4 text-center">
          Why {{brand}}
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          Built to{' '}
          <span className="text-success">actually work.</span>
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
