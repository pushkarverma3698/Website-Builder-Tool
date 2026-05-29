export default function CTA({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-2xl px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Ready to experience<br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, {{palette.accent}} 0%, #22D3EE 100%)' }}
          >
            {{brand}}?
          </span>
        </h2>
        <p className="text-gray-400 text-xl mb-10">
          {{purpose}}
        </p>
        <a
          href="#"
          className="inline-block text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-200"
          style={{
            background: '{{palette.accent}}',
            boxShadow: '0 0 60px {{palette.accent}}80',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = '0 0 80px {{palette.accent}}b3'
            e.currentTarget.style.opacity = '0.85'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 0 60px {{palette.accent}}80'
            e.currentTarget.style.opacity = '1'
          }}
        >
          {{cta}} →
        </a>
        <p className="text-gray-600 text-sm mt-5">No commitment required · Get started today</p>
      </div>
    </div>
  )
}
