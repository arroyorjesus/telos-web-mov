import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div style={{ animation: 'telosSpinPulse 1.4s ease-in-out infinite' }}>
          <Image
            src="/logo-azul.png"
            alt="TELOS"
            width={72}
            height={72}
            className="object-contain"
            style={{ width: 72, height: 72 }}
          />
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#0d5c91',
                animation: 'telosDot 1.2s ease-in-out infinite',
                animationDelay: `${i * 0.18}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes telosSpinPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.88); opacity: 0.7; }
        }
        @keyframes telosDot {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  )
}
