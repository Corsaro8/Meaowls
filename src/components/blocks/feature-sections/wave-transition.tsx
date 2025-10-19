export const WaveTransition = () => {
  return (
    <section className="relative h-80 overflow-hidden bg-gradient-to-br from-orange-100 via-blue-100 to-green-100">
      {/* Animated Wave SVG Background */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1200 320"
          className="absolute top-0 left-0 w-full h-full opacity-30 animate-[wave_8s_ease-in-out_infinite]"
          style={{
            animation: 'wave 8s ease-in-out infinite'
          }}
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#48BB78" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4299E1" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient1)"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-[float_6s_ease-in-out_infinite]"
          />
        </svg>

        {/* Second Wave Layer */}
        <svg
          viewBox="0 0 1200 320"
          className="absolute top-8 left-0 w-full h-full opacity-20"
        >
          <defs>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4299E1" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#48BB78" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient2)"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,165.3C960,160,1056,192,1152,208C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-[float_8s_ease-in-out_infinite_reverse]"
          />
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Circle */}
        <div className="absolute top-8 left-12 w-16 h-16 bg-orange-200/40 rounded-full animate-bounce" 
             style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        
        {/* Medium Circle */}
        <div className="absolute top-20 right-20 w-12 h-12 bg-blue-200/50 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
        
        {/* Small Circle */}
        <div className="absolute bottom-16 left-1/4 w-8 h-8 bg-green-200/60 rounded-full animate-ping" 
             style={{ animationDelay: '0.5s', animationDuration: '2s' }}></div>
        
        {/* Rotating Square */}
        <div className="absolute top-1/2 right-16 w-10 h-10 bg-orange-300/30 animate-spin" 
             style={{ animationDelay: '2s', animationDuration: '4s', borderRadius: '10%' }}></div>
        
        {/* Floating Triangle */}
        <div className="absolute bottom-20 right-1/3 w-0 h-0 animate-bounce"
             style={{ 
               borderLeft: '12px solid transparent',
               borderRight: '12px solid transparent', 
               borderBottom: '20px solid rgba(72, 187, 120, 0.4)',
               animationDelay: '1.5s',
               animationDuration: '3.5s'
             }}></div>
        
        {/* More floating elements */}
        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-blue-300/40 rounded-full animate-pulse" 
             style={{ animationDelay: '2.5s', animationDuration: '2s' }}></div>
        
        <div className="absolute bottom-1/3 right-1/2 w-14 h-14 bg-green-200/30 rounded-full animate-bounce" 
             style={{ animationDelay: '3s', animationDuration: '4s' }}></div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mb-2 animate-[fadeInUp_1s_ease-out]">
          Ogni passo verso la felicità del tuo pet
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-medium animate-[fadeInUp_1s_ease-out_0.2s_both]">
          Con amore e dedizione
        </p>
        
        {/* Decorative paw prints */}
        <div className="flex space-x-4 mt-6">
          <div className="w-3 h-3 bg-orange-400/60 rounded-full animate-pulse" 
               style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-blue-400/60 rounded-full animate-pulse" 
               style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 bg-green-400/60 rounded-full animate-pulse" 
               style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,48C960,43,1056,53,1152,64C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-25px) translateY(-10px); }
          50% { transform: translateX(0) translateY(-20px); }
          75% { transform: translateX(25px) translateY(-10px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </section>
  );
};