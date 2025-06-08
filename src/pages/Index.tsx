import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Minus, Plus } from "lucide-react";

export default function Index() {
  const [volume, setVolume] = useState(0.3); // Default volume at 30%
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Playing by default
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const adjustVolume = (increment: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + increment));
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/background-sound.mp3" type="audio/mpeg" />
        {/* Fallback for browsers that don't support the audio element */}
        Your browser does not support the audio element.
      </audio>

      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.png)',
        }}
      >
        {/* Subtle Gradient Overlay - lighter to preserve background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
      </div>

            {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-4 py-4 md:px-12 md:py-8">
        {/* Desktop Audio Controls - Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="group relative hidden md:block"
        >
          {/* Invisible hover bridge to prevent menu closing */}
          <div className="absolute inset-0 w-[280px] h-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto" />
          
          {/* Main Audio Icon */}
          <motion.div
            className="relative z-10 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-white" />
            ) : (
              <VolumeX className="w-5 h-5 text-white" />
            )}
          </motion.div>

          {/* Expanded Controls on Hover */}
          <div className="absolute left-10 ml-1 top-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 shadow-2xl opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 scale-90 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto z-20">
            <div className="flex items-center space-x-2">
              {/* Play/Pause */}
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-1.5 text-white transition-all duration-200"
              >
                {isPlaying ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </motion.button>

              {/* Volume Down */}
              <motion.button
                onClick={() => adjustVolume(-0.1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-1.5 text-white transition-all duration-200"
              >
                <Minus className="w-2.5 h-2.5" />
              </motion.button>

              {/* Mute Toggle */}
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-1.5 text-white transition-all duration-200"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3 h-3" />
                ) : (
                  <Volume2 className="w-3 h-3" />
                )}
              </motion.button>

              {/* Volume Up */}
              <motion.button
                onClick={() => adjustVolume(0.1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-1.5 text-white transition-all duration-200"
              >
                <Plus className="w-2.5 h-2.5" />
              </motion.button>

              {/* Volume Indicator */}
              <div className="flex items-center space-x-1 ml-2">
                <div className="text-white/70 text-xs font-light min-w-[24px]">
                  {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
                </div>
                <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isMuted ? 0 : `${volume * 100}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Audio Controls - Simplified */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:hidden"
        >
          <motion.button
            onClick={togglePlay}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg"
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-white" />
            ) : (
              <VolumeX className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-md">
            How It Works
          </a>
          <a href="#use-cases" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-md">
            Use Cases
          </a>
          <a href="#pricing" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-md">
            Pricing
          </a>
          <a href="#research" className="text-white/90 hover:text-white transition-colors backdrop-blur-sm px-3 py-1 rounded-md">
            Research Feed
          </a>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={toggleMobileMenu}
          className="md:hidden relative z-30 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 text-white"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      </nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="md:hidden fixed top-20 left-4 right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl"
      >
        <div className="p-6 space-y-4">
          <a 
            href="#how-it-works" 
            className="block text-white/90 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </a>
          <a 
            href="#use-cases" 
            className="block text-white/90 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Use Cases
          </a>
          <a 
            href="#pricing" 
            className="block text-white/90 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <a 
            href="#research" 
            className="block text-white/90 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Research Feed
          </a>
          
          {/* Mobile Audio Controls */}
          <div className="border-t border-white/20 pt-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/70 text-sm">Audio Controls</span>
              <div className="text-white/70 text-xs">
                {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={togglePlay}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-2 text-white transition-all duration-200"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </motion.button>

              <motion.button
                onClick={() => adjustVolume(-0.1)}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-2 text-white transition-all duration-200"
              >
                <Minus className="w-3 h-3" />
              </motion.button>

              <motion.button
                onClick={toggleMute}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-2 text-white transition-all duration-200"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </motion.button>

              <motion.button
                onClick={() => adjustVolume(0.1)}
                whileTap={{ scale: 0.9 }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-2 text-white transition-all duration-200"
              >
                <Plus className="w-3 h-3" />
              </motion.button>

              <div className="flex-1 ml-3">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isMuted ? 0 : `${volume * 100}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

            {/* Main Content - Positioned to avoid center */}
      <div className="relative z-10 min-h-[calc(100vh-120px)] flex flex-col justify-between md:block">
        {/* Top Content - Mobile Stacked, Desktop Positioned */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 mx-4 md:absolute md:top-20 md:left-12 md:right-auto md:mt-0 md:mx-0 max-w-full md:max-w-md lg:max-w-lg"
        >
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 md:p-6 lg:p-8 border border-white/10 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 md:mb-4 leading-tight">
              Universal WhatsAg
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 md:mb-6 font-light leading-relaxed">
              Where Simplicity Meets Power.
            </p>

            <p className="text-xs sm:text-sm md:text-base text-white/80 mb-6 md:mb-8 leading-relaxed">
              Real transformation doesn't start with complexity – it starts with connection. 
              One chat that grows with you. Personalized, private, and always available.
            </p>

            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:shadow-xl text-sm md:text-base w-full md:w-auto"
            >
              Start Exploring
            </Button>
          </div>
        </motion.div>

        {/* Bottom Content - Mobile Stacked, Desktop Positioned */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 mb-20 mx-4 md:absolute md:bottom-16 md:right-12 md:left-auto md:mt-0 md:mb-0 md:mx-0 max-w-full md:max-w-sm lg:max-w-md"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
            <p className="text-white/90 text-xs sm:text-sm md:text-base italic leading-relaxed mb-3 md:mb-4">
              "Universal WhatsAg is your companion for seamless living. 
              A calm interface to simplify tasks, automate your day, and understand your needs."
            </p>
            <p className="text-white/70 text-xs md:text-sm">
              Less friction. More freedom.
            </p>
          </div>
        </motion.div>
      </div>

            {/* Bottom Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-2 md:bottom-4 left-0 right-0 px-4 md:px-12 z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <motion.p 
            className="text-white/90 text-xs sm:text-sm md:text-base font-light text-center md:text-left"
            whileHover={{ scale: 1.02 }}
          >
            Clarity begins with a great assistant.
          </motion.p>

          <p className="text-white/60 text-xs md:text-sm text-center">
            Universal WhatsAg ©2025
          </p>
        </div>
      </motion.div>

      {/* Enhanced floating particles with shiny effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Regular floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`regular-${i}`}
            className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Medium particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`medium-${i}`}
            className="absolute w-1 h-1 bg-white/25 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Shiny glowing particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`shiny-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 2 + 'px',
              height: Math.random() * 3 + 2 + 'px',
              background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
              boxShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              scale: [0.5, 1.2, 0.5],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Super bright accent particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bright-${i}`}
            className="absolute rounded-full"
            style={{
              width: '4px',
              height: '4px',
              background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, rgba(135,206,250,0.4) 70%, transparent 100%)`,
              boxShadow: '0 0 15px rgba(255,255,255,0.8), 0 0 30px rgba(135,206,250,0.4), 0 0 45px rgba(135,206,250,0.2)',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              scale: [0.3, 1.5, 0.3],
              opacity: [0.6, 1, 0.6],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Twinkling star-like particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              width: '2px',
              height: '2px',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            <div 
              className="w-full h-full bg-white rounded-full"
              style={{
                boxShadow: '0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4)',
              }}
            />
            {/* Cross-shaped twinkle effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-white/60 rounded-full blur-sm" />
              <div className="absolute w-0.5 h-4 bg-white/60 rounded-full blur-sm" />
            </div>
          </motion.div>
        ))}
      </div>

      
    </div>
  );
}