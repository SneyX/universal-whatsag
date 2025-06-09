import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Minus, Plus } from "lucide-react";

export default function Index() {
  const [volume, setVolume] = useState(0.5); // Default volume at 50%
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Playing by default
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Only text content moves, background stays fixed
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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
    <div ref={containerRef} className="relative">
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

      {/* Fixed Background Image - No Movement */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(/background.png)',
        }}
      >
        {/* Subtle Gradient Overlay - lighter to preserve background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

            {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 md:px-12 md:py-8">
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

            {/* Storytelling Content Sections */}
      <div className="relative z-10">
        {/* Hero Section - Initial View with proper mobile positioning */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="h-screen flex items-end justify-center pb-20 md:pb-24 pt-20"
        >
          <div className="w-full px-4 md:px-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 md:mb-4 leading-tight">
                Universal WhatsAg
              </h1>
              
              {/* Professional Divider Line */}
              <div className="flex items-center justify-center md:justify-start mb-6 md:mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent w-full max-w-md"></div>
              </div>
              
              <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light leading-relaxed">
                Where Simplicity Meets Power.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Story Section 1 - Connection */}
        <section className="h-screen flex items-center">
          <div className="w-full px-4 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="bg-black/10 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-white/10 shadow-2xl">
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-lg sm:text-xl md:text-3xl text-white/90 font-light leading-relaxed mb-6 md:mb-8"
                >
                  Real transformation doesn't start with complexity – it starts with connection.
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base md:text-xl text-white/80 leading-relaxed"
                >
                  One chat that grows with you. Personalized, private, and always available.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Story Section 2 - Vision */}
        <section className="h-screen flex items-center">
          <div className="w-full px-4 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.1 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl"
                >
                  <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-4 md:mb-6">
                    We're building the foundation for a fully reliable and personalized Universal Assistant on WhatsApp.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                    AI designed for everyday life – helping you navigate the world with ease, through the app you already use.
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-black/5 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl"
                >
                  <div className="space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} viewport={{ once: true }}>From reading your emails to planning your next trip.</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} viewport={{ once: true }}>From managing routines and nutrition to paying bills and sending invoices.</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} viewport={{ once: true }}>Never miss a reminder again.</motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} viewport={{ once: true }} className="text-white/90 font-medium">It's all possible in a single, smart conversation.</motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Section - CTA with integrated footer */}
        <section className="h-screen flex flex-col justify-center">
          <div className="flex-1 flex items-center justify-center px-4 md:px-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-white/20 shadow-2xl">
                <motion.blockquote 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg md:text-2xl text-white/90 italic leading-relaxed mb-6 md:mb-8"
                >
                  "Universal WhatsAg is your companion for seamless living.
                  A calm interface to simplify tasks, automate your day, and understand your needs with every message."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base md:text-lg text-white/70 mb-8 md:mb-12"
                >
                  Less friction. More freedom.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-500 px-6 py-3 md:px-12 md:py-6 rounded-full shadow-2xl hover:shadow-white/20 text-base md:text-xl font-medium"
                  >
                    Start Exploring
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Integrated Footer */}
          <footer className="relative z-10 py-8 px-4 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <motion.p 
                className="text-white/90 text-xs sm:text-sm md:text-base font-light text-center md:text-left"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Clarity begins with a great assistant.
              </motion.p>

              <motion.p 
                className="text-white/60 text-xs md:text-sm text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Universal WhatsAg ©2025
              </motion.p>
            </div>
          </footer>
        </section>
      </div>

      {/* Fixed floating particles with shiny effects */}
      <div className="fixed inset-0 pointer-events-none z-5">
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