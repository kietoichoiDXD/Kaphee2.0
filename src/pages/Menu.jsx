import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Disc, Music, SkipBack, PlayCircle, PauseCircle, SkipForward, Volume2, VolumeX } from 'lucide-react';

export default function Menu() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const tracks = [
    {
      id: 1,
      title: 'A-Side: Morning Lofi',
      artist: 'Kaphee Records',
      url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
      color: 'bg-[#e6a87c]'
    },
    {
      id: 2,
      title: 'B-Side: Chill Abstract',
      artist: 'Kaphee Records',
      url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b817b967.mp3?filename=chill-abstract-intention-110855.mp3',
      color: 'bg-[#7c98e6]'
    },
    {
      id: 3,
      title: 'C-Side: Vintage Jazz',
      artist: 'Kaphee Records',
      url: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b3cb0042.mp3?filename=jazz-lounge-114707.mp3',
      color: 'bg-[#b87ce6]'
    }
  ];

  const menuCategories = [
    {
      id: '01',
      title: 'Espresso Bar',
      items: [
        { name: 'Artisan Shot', price: '$4.25', desc: 'Single origin, small batch roast.' },
        { name: 'Heirloom Latte', price: '$6.50', desc: 'Madagascar vanilla, hand-thrown ceramic.' },
        { name: 'Jazz Cortado', price: '$5.25', desc: 'Equal parts melody and rhythm.' },
        { name: 'Midnight Flat White', price: '$5.75', desc: 'Velvety textures for late nights.' }
      ]
    },
    {
      id: '02',
      title: 'Manual Brews',
      items: [
        { name: 'Lo-Fi Chemex', price: '$8.50', desc: 'Clean, filtered perfection.' },
        { name: 'Vinyl V60', price: '$7.25', desc: 'Precision pour-over, high notes.' },
        { name: '8-Track Cold Brew', price: '$6.50', desc: 'Steeped for 18 hours, bold soul.' },
        { name: 'Analog Aeropress', price: '$5.50', desc: 'Pressure-brewed intensity.' }
      ]
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <main className="relative min-h-screen pt-24 pb-32 bg-[#f4f1ea] text-[#2c2a25] overflow-hidden">
      <div className="grain-overlay absolute inset-0 z-0"></div>
      
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={nextTrack}
        preload="auto"
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* Header & Vinyl Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2">
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-[#8b7355] mb-4 block">Volume 01: The Menu</span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6 retro-text-shadow text-[#3a2e24]">
              Vintage <br /> <span className="italic font-normal text-[#8b7355]">Vibes</span>
            </h1>
            <p className="font-body text-lg text-[#5c5446] max-w-md leading-relaxed mb-8">
              Step back into the 80s and 90s. Put on a cassette, drop the needle on the vinyl, and enjoy our handcrafted menu.
            </p>
          </div>

          {/* Vinyl Record Player Visual */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 group">
              <div className={`absolute inset-0 rounded-full bg-[#111] shadow-2xl flex items-center justify-center vinyl-spin ${!isPlaying ? 'vinyl-spin-paused' : ''}`}>
                {/* Record Grooves */}
                <div className="absolute inset-2 border border-white/10 rounded-full"></div>
                <div className="absolute inset-6 border border-white/10 rounded-full"></div>
                <div className="absolute inset-10 border border-white/10 rounded-full"></div>
                <div className="absolute inset-14 border border-white/10 rounded-full"></div>
                <div className="absolute inset-20 border border-white/10 rounded-full"></div>
                
                {/* Center Label */}
                <div className={`w-32 h-32 rounded-full border-4 border-[#2c2a25] flex items-center justify-center ${currentTrack.color} transition-colors duration-500`}>
                  <div className="w-4 h-4 bg-[#111] rounded-full border-2 border-white/50"></div>
                  <span className="absolute bottom-8 text-[8px] font-bold tracking-widest text-white/80 uppercase">Kaphee Records</span>
                  <span className="absolute top-8 text-[10px] font-bold tracking-widest text-white/90 uppercase">{currentTrackIndex + 1} / 3</span>
                </div>
              </div>
              {/* Tonearm */}
              <div className={`absolute -right-4 top-10 w-8 h-48 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full origin-top transition-transform duration-1000 ${isPlaying ? 'rotate-[25deg]' : 'rotate-0'}`}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-gray-800 rounded-sm"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900 rounded-full border-4 border-gray-700"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu & Cassette Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Menu Items */}
          <div className="lg:col-span-7 space-y-20">
            {menuCategories.map((category) => (
              <motion.section 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-baseline gap-4 mb-8 border-b-2 border-[#8b7355]/30 pb-4">
                  <span className="text-3xl font-headline italic text-[#8b7355]">{category.id}</span>
                  <h2 className="text-4xl font-bold uppercase tracking-tighter text-[#3a2e24]">{category.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {category.items.map((item) => (
                    <div key={item.name} className="group">
                      <div className="flex justify-between items-baseline border-b border-dashed border-[#8b7355]/20 pb-2 mb-2 group-hover:border-[#8b7355] transition-colors">
                        <h3 className="text-lg font-bold uppercase tracking-tight text-[#3a2e24]">{item.name}</h3>
                        <span className="font-mono text-[#8b7355] font-bold">{item.price}</span>
                      </div>
                      <p className="text-[#5c5446] text-xs uppercase tracking-widest">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          {/* Interactive Cassette Player Widget */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="bg-[#e8e4d9] p-8 rounded-xl paper-shadow border-2 border-[#d1cbb8]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-2xl font-bold text-[#3a2e24]">Mixtape Player</h3>
                <button onClick={toggleMute} className="text-[#8b7355] hover:text-[#3a2e24] transition-colors">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>

              {/* Cassette Tape Visual */}
              <div className={`w-full h-48 bg-[#2a2a2a] rounded-lg p-3 relative mb-8 shadow-inner border-b-4 border-r-4 border-[#1a1a1a] ${currentTrack.color} transition-colors duration-500 bg-opacity-20`}>
                {/* Cassette Label */}
                <div className="absolute inset-x-4 top-4 bottom-12 bg-white rounded-md p-2 flex flex-col justify-between shadow-sm">
                  <div className="flex justify-between items-start border-b-2 border-red-500/30 pb-1">
                    <span className="font-mono text-[10px] font-bold text-gray-800">A-SIDE</span>
                    <span className="font-mono text-[10px] font-bold text-gray-800">90 MIN</span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-headline text-lg font-bold text-gray-900 truncate px-2">{currentTrack.title}</h4>
                    <p className="font-mono text-[10px] text-gray-500 uppercase">{currentTrack.artist}</p>
                  </div>
                  
                  {/* Reels Window */}
                  <div className="h-12 bg-[#1a1a1a] rounded-full mx-8 flex justify-between items-center px-4 relative overflow-hidden border-2 border-gray-300">
                    {/* Left Reel */}
                    <div className={`w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center cassette-spin ${!isPlaying ? 'cassette-spin-paused' : ''}`}>
                      <div className="w-full h-1 bg-gray-600 absolute"></div>
                      <div className="w-1 h-full bg-gray-600 absolute"></div>
                      <div className="w-2 h-2 bg-white rounded-full z-10"></div>
                    </div>
                    {/* Tape line */}
                    <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-[#333] -translate-y-1/2"></div>
                    {/* Right Reel */}
                    <div className={`w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center cassette-spin ${!isPlaying ? 'cassette-spin-paused' : ''}`}>
                      <div className="w-full h-1 bg-gray-600 absolute"></div>
                      <div className="w-1 h-full bg-gray-600 absolute"></div>
                      <div className="w-2 h-2 bg-white rounded-full z-10"></div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Cassette Details */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#1a1a1a] rounded-t-lg flex justify-between items-end px-4 pb-1">
                  <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-600"></div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-[#d1cbb8] p-4 rounded-lg flex justify-center items-center gap-8 shadow-inner">
                <button 
                  onClick={prevTrack}
                  className="w-12 h-12 bg-[#f4f1ea] rounded-full flex items-center justify-center text-[#3a2e24] shadow-md hover:bg-white hover:scale-105 transition-all active:scale-95"
                >
                  <SkipBack size={20} className="ml-[-2px]" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 bg-[#8b7355] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#725a39] hover:scale-105 transition-all active:scale-95"
                >
                  {isPlaying ? <PauseCircle size={36} /> : <PlayCircle size={36} className="ml-1" />}
                </button>
                <button 
                  onClick={nextTrack}
                  className="w-12 h-12 bg-[#f4f1ea] rounded-full flex items-center justify-center text-[#3a2e24] shadow-md hover:bg-white hover:scale-105 transition-all active:scale-95"
                >
                  <SkipForward size={20} className="ml-[2px]" />
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="font-mono text-xs text-[#8b7355] uppercase tracking-widest">
                  {isPlaying ? 'Now Playing' : 'Paused'}
                </p>
                <div className="mt-2 flex justify-center gap-1 h-4 items-end">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-1 bg-[#8b7355] rounded-t-sm"
                      animate={{ 
                        height: isPlaying ? ['20%', '100%', '40%', '80%', '30%'][Math.floor(Math.random() * 5)] : '20%' 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.5 + Math.random() * 0.5,
                        repeatType: 'mirror'
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
