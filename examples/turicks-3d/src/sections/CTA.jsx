export default function CTA({ style }) {
  return (
    <div className="scene-section" style={style}>
      <div className="max-w-2xl px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Ready to automate<br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #7B61FF 0%, #22D3EE 100%)' }}
          >
            your outreach?
          </span>
        </h2>
        <p className="text-gray-400 text-xl mb-10">
          Join 500+ founders and sales leaders already using Turicks.
        </p>
        <a
          href="/signup"
          className="inline-block text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-200"
          style={{
            background: '#7B61FF',
            boxShadow: '0 0 60px rgba(123,97,255,0.5)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = '0 0 80px rgba(123,97,255,0.7)'
            e.currentTarget.style.background = '#A78BFA'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 0 60px rgba(123,97,255,0.5)'
            e.currentTarget.style.background = '#7B61FF'
          }}
        >
          Start your free trial →
        </a>
        <p className="text-gray-600 text-sm mt-5">No credit card required · 14-day free trial</p>
      </div>
    </div>
  )
}
