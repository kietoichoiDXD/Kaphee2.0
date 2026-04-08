import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'motion/react';
import CategoryFlipCard from '../components/sections/CategoryFlipCard';
import ThreeCupViewer from '../components/ui/ThreeCupViewer';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Moon,
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const cupSizeOptions = [
  { value: 'small', label: 'Small', note: 'Focused and compact' },
  { value: 'medium', label: 'Medium', note: 'Balanced and classic' },
  { value: 'large', label: 'Large', note: 'Tall and expressive' },
];

function createCupArt({ background, cup, foam, steam, accent }) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${background[0]}"/>
          <stop offset="100%" stop-color="${background[1]}"/>
        </linearGradient>
        <linearGradient id="cup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${cup[0]}"/>
          <stop offset="100%" stop-color="${cup[1]}"/>
        </linearGradient>
      </defs>
      <rect width="640" height="800" rx="40" fill="url(#bg)"/>
      <circle cx="150" cy="140" r="74" fill="${accent}" opacity="0.18"/>
      <circle cx="510" cy="160" r="84" fill="${accent}" opacity="0.12"/>
      <circle cx="520" cy="600" r="130" fill="${foam}" opacity="0.14"/>
      <g transform="translate(140 120)">
        <path d="M140 36c20 28 28 48 28 72" fill="none" stroke="${steam}" stroke-width="8" stroke-linecap="round" opacity="0.55"/>
        <path d="M184 28c22 32 30 56 30 84" fill="none" stroke="${steam}" stroke-width="8" stroke-linecap="round" opacity="0.38"/>
        <path d="M228 44c18 22 24 48 24 72" fill="none" stroke="${steam}" stroke-width="8" stroke-linecap="round" opacity="0.28"/>
        <ellipse cx="188" cy="270" rx="166" ry="70" fill="#3b2618" opacity="0.2"/>
        <path d="M110 160h176c42 0 76 34 76 76v88c0 54-44 98-98 98H150c-54 0-98-44-98-98v-88c0-42 34-76 58-76z" fill="url(#cup)"/>
        <path d="M360 192c40 0 72 32 72 72s-32 72-72 72" fill="none" stroke="${cup[1]}" stroke-width="34" stroke-linecap="round" opacity="0.96"/>
        <path d="M128 150h120c22 0 42 18 42 40H84c0-22 18-40 44-40z" fill="${foam}" opacity="0.8"/>
        <path d="M94 246h186c6 0 12 5 12 11v40c0 66-54 120-120 120h-26c-58 0-104-46-104-104v-56c0-6 4-11 12-11z" fill="${cup[0]}" opacity="0.55"/>
        <path d="M88 426h208c18 0 34 16 34 34 0 18-16 34-34 34H88c-18 0-34-16-34-34 0-18 16-34 34-34z" fill="${accent}" opacity="0.28"/>
        <path d="M94 470h238v18c0 46-38 84-84 84h-70c-46 0-84-38-84-84v-18z" fill="#3d271a" opacity="0.88"/>
        <ellipse cx="208" cy="504" rx="92" ry="24" fill="${steam}" opacity="0.08"/>
      </g>
    </svg>
  `)}`;
}

const productGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const productVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
};

const productImageVariants = {
  hidden: { scale: 1.05, filter: 'blur(5px)' },
  visible: {
    scale: [1, 1.05, 1],
    filter: ['blur(5px)', 'blur(0px)'],
    transition: { duration: 0.7, ease: 'easeInOut', delay: 0.3 },
  },
};

export default function Menu() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [viewMode, setViewMode] = useState('cards');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeProducts, setActiveProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categoryRevealKey, setCategoryRevealKey] = useState(0);
  const [flipPageIndex, setFlipPageIndex] = useState(0);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCupSize, setSelectedCupSize] = useState('medium');
  const audioRef = useRef(null);
  const loadingTimerRef = useRef(null);
  const draggingFlipCardRef = useRef(false);
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-220, 0, 220], [16, 0, -16]);

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
      icon: '☕',
      description: 'Traditional espresso at its purest, built to wake the senses with a bold and warm finish.',
      items: [
        {
          name: 'Artisan Shot',
          price: '$4.25',
          desc: 'Single origin, small batch roast.',
          art: createCupArt({ background: ['#f6efe5', '#d9c2a5'], cup: ['#6d4325', '#342015'], foam: '#fff4e4', steam: '#ffffff', accent: '#8b5a2b' }),
        },
        {
          name: 'Heirloom Latte',
          price: '$6.50',
          desc: 'Madagascar vanilla, hand-thrown ceramic.',
          art: createCupArt({ background: ['#f7f2e9', '#e4d2bc'], cup: ['#926a42', '#4b3021'], foam: '#fff7eb', steam: '#ffffff', accent: '#c89a62' }),
        },
        {
          name: 'Jazz Cortado',
          price: '$5.25',
          desc: 'Equal parts melody and rhythm.',
          art: createCupArt({ background: ['#f4f0e5', '#dfcfb7'], cup: ['#7a5032', '#3f281b'], foam: '#fff5ea', steam: '#ffffff', accent: '#8c6b48' }),
        },
        {
          name: 'Midnight Flat White',
          price: '$5.75',
          desc: 'Velvety textures for late nights.',
          art: createCupArt({ background: ['#ece6dc', '#d8c7b5'], cup: ['#553320', '#24140f'], foam: '#f3e6d4', steam: '#fefefe', accent: '#5f432d' }),
        },
      ]
    },
    {
      id: '02',
      title: 'Manual Brews',
      icon: '🍃',
      description: 'Slow-pour methods that create a quiet rhythm, like opening a fresh editorial spread.',
      items: [
        {
          name: 'Lo-Fi Chemex',
          price: '$8.50',
          desc: 'Clean, filtered perfection.',
          art: createCupArt({ background: ['#f4efe4', '#ddd1bf'], cup: ['#71553b', '#37281d'], foam: '#f8f0e2', steam: '#ffffff', accent: '#a57f54' }),
        },
        {
          name: 'Vinyl V60',
          price: '$7.25',
          desc: 'Precision pour-over, high notes.',
          art: createCupArt({ background: ['#f3efe7', '#d9cfbf'], cup: ['#6f4a31', '#342218'], foam: '#fff6eb', steam: '#ffffff', accent: '#9a7650' }),
        },
        {
          name: '8-Track Cold Brew',
          price: '$6.50',
          desc: 'Steeped for 18 hours, bold soul.',
          art: createCupArt({ background: ['#ece7dc', '#d9ccb9'], cup: ['#5a3622', '#281711'], foam: '#f3e6d5', steam: '#fefefe', accent: '#6d533b' }),
        },
        {
          name: 'Analog Aeropress',
          price: '$5.50',
          desc: 'Pressure-brewed intensity.',
          art: createCupArt({ background: ['#f1ebe1', '#dbcab6'], cup: ['#633f28', '#2e1d14'], foam: '#f8eedf', steam: '#ffffff', accent: '#b48b62' }),
        },
      ]
    }
  ];

  const flipPages = useMemo(
    () =>
      menuCategories.flatMap((category) =>
        category.items.map((item, itemIndex) => ({
          ...item,
          categoryId: category.id,
          categoryTitle: category.title,
          pageCode: `${category.id}.${String(itemIndex + 1).padStart(2, '0')}`,
        })),
      ),
    [menuCategories],
  );

  const currentFlipPage = flipPages[flipPageIndex] ?? flipPages[0];

  const moodReels = [
    {
      id: 'foam-loop',
      title: 'Foam Motion',
      type: 'GIF',
      src: 'https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif',
    },
    {
      id: 'brew-loop',
      title: 'Slow Brew',
      type: 'GIF',
      src: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
    },
    {
      id: 'atelier-shot',
      title: 'Coffee Atelier',
      type: 'IMAGE',
      src: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b24f8?auto=format&fit=crop&q=80&w=900',
    },
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

  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (viewMode !== 'flipbook') {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextFlipPage();
      }

      if (event.key === 'ArrowLeft') {
        prevFlipPage();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [viewMode, flipPages.length]);

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

  const nextFlipPage = () => {
    setFlipPageIndex((prev) => (prev + 1) % flipPages.length);
  };

  const prevFlipPage = () => {
    setFlipPageIndex((prev) => (prev - 1 + flipPages.length) % flipPages.length);
  };

  const handleSelectItem = (item) => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }

    setIsProductLoading(true);
    setSelectedItem(null);
    setSelectedCupSize('medium');
    loadingTimerRef.current = setTimeout(() => {
      setIsProductLoading(false);
      setSelectedItem(item);
    }, 1400);
  };

  const handleCategoryClick = (categoryId) => {
    const nextCategory = menuCategories.find((category) => category.id === categoryId) ?? null;

    setActiveCategoryId(categoryId);
    setActiveCategory(nextCategory);
    setActiveProducts(nextCategory?.items ?? []);
    setCategoryRevealKey((prev) => prev + 1);
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <main className={`menu-page relative min-h-screen overflow-hidden pt-24 pb-32 ${isDarkTheme ? 'menu-theme-dark bg-[#12100d] text-[#efe8dc]' : 'bg-[#f4f1ea] text-[#2c2a25]'}`}>
      <div className="grain-overlay absolute inset-0 z-0"></div>
      
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={nextTrack}
        preload="auto"
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="fixed right-6 top-28 z-40 flex items-center gap-2 md:right-10">
          <button
            type="button"
            onClick={() => setIsDarkTheme((prev) => !prev)}
            className="linear-theme-toggle group relative h-11 w-24 overflow-hidden rounded-full border border-[#8b7355]/35 bg-[#f4f1ea]/85 p-1 backdrop-blur-sm"
            aria-label="Toggle light and dark theme"
          >
            <motion.span
              animate={{ x: isDarkTheme ? 46 : 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="linear-theme-thumb flex h-9 w-9 items-center justify-center rounded-full bg-[#2f2418] text-[#f6efe2]"
            >
              {isDarkTheme ? <Moon size={14} /> : <Sun size={14} />}
            </motion.span>
            <span className="linear-theme-line linear-theme-line-a" />
            <span className="linear-theme-line linear-theme-line-b" />
            <span className="linear-theme-line linear-theme-line-c" />
          </button>

          <div className="menu-view-switcher overflow-hidden rounded-full border border-[#8b7355]/35 bg-[#f4f1ea]/90 p-1 shadow-[0_16px_35px_rgba(0,0,0,0.12)] backdrop-blur-sm">
            <div className="flex items-center gap-1 text-xs uppercase tracking-[0.25em]">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`rounded-full px-4 py-2 font-semibold transition-all ${
                  viewMode === 'cards' ? 'bg-[#3a2e24] text-[#f6efe2]' : 'text-[#8b7355] hover:bg-[#ebe3d1]'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode('flipbook')}
                className={`rounded-full px-4 py-2 font-semibold transition-all ${
                  viewMode === 'flipbook' ? 'bg-[#3a2e24] text-[#f6efe2]' : 'text-[#8b7355] hover:bg-[#ebe3d1]'
                }`}
              >
                Flipbook
              </button>
            </div>
          </div>
        </div>
        
        {/* Header & Vinyl Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2">
            <span className="menu-hero-kicker mb-4 block font-mono text-sm uppercase tracking-[0.3em] text-[#8b7355]">Volume 01: The Menu</span>
            <h1 className="menu-hero-title retro-text-shadow mb-6 font-headline text-6xl font-bold leading-none tracking-tighter text-[#3a2e24] md:text-8xl">
              Vintage <br /> <span className="menu-hero-accent italic font-normal text-[#8b7355]">Vibes</span>
            </h1>
            <p className="menu-hero-copy mb-8 max-w-md font-body text-lg leading-relaxed text-[#5c5446]">
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
              <div className={`absolute -right-4 top-10 w-8 h-48 bg-linear-to-b from-gray-300 to-gray-400 rounded-full origin-top transition-transform duration-1000 ${isPlaying ? 'rotate-25' : 'rotate-0'}`}>
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
            <AnimatePresence mode="wait">
              {viewMode === 'cards' ? (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-10"
                >
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#8b7355]">Choose a category</p>
                      <h2 className="mt-3 text-4xl font-bold uppercase tracking-tighter text-[#3a2e24]">3D Category Cards</h2>
                    </div>
                    <p className="max-w-sm text-xs uppercase tracking-[0.3em] text-[#8b7355]">
                      Hover to flip. Click to reveal products in a staggered grid.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {menuCategories.map((category) => (
                      <CategoryFlipCard
                        key={category.id}
                        category={category}
                        isActive={activeCategoryId === category.id}
                        onCategoryClick={handleCategoryClick}
                      />
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {activeCategory ? (
                      <motion.section
                        key={categoryRevealKey}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.35 }}
                        className="rounded-[28px] border border-[#d2b48c]/35 bg-[#f8f1e4] p-5 shadow-[0_22px_55px_rgba(0,0,0,0.08)]"
                      >
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#8b7355]/25 pb-4">
                          <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b7355]">Product reveal</p>
                            <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-[#3a2e24]">{activeCategory.title}</h3>
                          </div>
                          <p className="max-w-md text-sm leading-6 text-[#5c5446]">{activeCategory.description}</p>
                        </div>

                        <motion.div
                          variants={productGridVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2"
                        >
                          {activeProducts.map((product) => (
                            <motion.div
                              key={product.name}
                              variants={productVariants}
                              className="group overflow-hidden rounded-3xl border border-[#d2b48c]/30 bg-[#fffaf1] shadow-[0_18px_42px_rgba(0,0,0,0.08)]"
                            >
                              <button
                                type="button"
                                onClick={() => handleSelectItem({ ...product, categoryTitle: activeCategory.title, categoryId: activeCategory.id })}
                                className="block w-full text-left"
                              >
                                <div className="relative overflow-hidden border-b border-[#d2b48c]/20 bg-[#f7f0e2] p-3">
                                  <motion.img
                                    src={product.art}
                                    alt={product.name}
                                    className="h-56 w-full rounded-[18px] object-cover"
                                    variants={productImageVariants}
                                    initial="hidden"
                                    animate="visible"
                                  />
                                  <div className="absolute left-5 top-5 rounded-full bg-black/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                                    {activeCategory.id}.{String(activeProducts.indexOf(product) + 1).padStart(2, '0')}
                                  </div>
                                </div>

                                <div className="space-y-3 p-5">
                                  <div className="flex items-start justify-between gap-3">
                                    <div>
                                      <h4 className="text-xl font-bold uppercase tracking-tight text-[#3a2e24]">{product.name}</h4>
                                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#8b7355]">{product.desc}</p>
                                    </div>
                                    <span className="font-mono text-lg font-bold text-[#8b7355]">{product.price}</span>
                                  </div>

                                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[#d2b48c]/25 pt-3 text-[10px] uppercase tracking-[0.16em] text-[#8b7355]">
                                    <span className="leading-relaxed">Try this cup</span>
                                    <span className="leading-relaxed">Tap to reveal</span>
                                  </div>
                                </div>
                              </button>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.section>
                    ) : (
                      <motion.div
                        key="empty-reveal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-[28px] border border-dashed border-[#d2b48c]/35 bg-[#f8f1e4] p-8 text-center"
                      >
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#8b7355]">Product reveal</p>
                        <h3 className="mt-3 text-3xl font-bold uppercase tracking-tight text-[#3a2e24]">Select a category card</h3>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5c5446]">
                          Hover over a vintage card to flip it, then click to bring the matching cups into view with a slow staggered reveal.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="flipbook"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                  className="menu-flipbook-shell rounded-[30px] border border-[#ad9b7f]/35 bg-[#efe4d1] p-4 sm:p-6"
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#8b7355]/30 pb-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#8b7355]">Flip Menu</p>
                      <h2 className="text-3xl font-bold uppercase tracking-tight text-[#3a2e24]">Nura-style Pages</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={prevFlipPage}
                        className="rounded-full border border-[#8b7355]/35 bg-[#f7f0e2] p-2 text-[#5d4a34] transition-colors hover:bg-white"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={nextFlipPage}
                        className="rounded-full border border-[#8b7355]/35 bg-[#f7f0e2] p-2 text-[#5d4a34] transition-colors hover:bg-white"
                        aria-label="Next page"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flipbook-perspective relative min-h-128 overflow-hidden rounded-[26px] border border-[#8b7355]/30 bg-[#f8f2e8] p-5">
                    <div className="absolute right-5 top-5 rounded-full border border-[#8b7355]/35 bg-[#f3ebdc] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#8b7355]">
                      Page {flipPageIndex + 1} / {flipPages.length}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.button
                        type="button"
                        key={currentFlipPage.pageCode}
                        onClick={() => {
                          if (draggingFlipCardRef.current) {
                            return;
                          }

                          handleSelectItem(currentFlipPage);
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.1}
                        onDragStart={() => {
                          draggingFlipCardRef.current = true;
                        }}
                        onDrag={(event, info) => {
                          dragX.set(info.offset.x);
                        }}
                        onDragEnd={(event, info) => {
                          if (info.offset.x <= -90) {
                            nextFlipPage();
                          } else if (info.offset.x >= 90) {
                            prevFlipPage();
                          }

                          dragX.set(0);
                          requestAnimationFrame(() => {
                            draggingFlipCardRef.current = false;
                          });
                        }}
                        initial={{ opacity: 0, rotateY: -85, x: 50 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0 }}
                        exit={{ opacity: 0, rotateY: 88, x: -40 }}
                        transition={{ duration: 0.42, ease: 'easeOut' }}
                        style={{ rotateY: dragRotate }}
                        className="menu-flip-page group relative mt-4 block h-full min-h-108 w-full cursor-grab overflow-hidden rounded-[22px] border border-[#8b7355]/25 bg-[#fffaf0] p-6 text-left shadow-[0_25px_60px_rgba(61,44,21,0.15)] active:cursor-grabbing"
                      >
                        <div className="absolute inset-0 paper-noise opacity-35" />
                        <div className="absolute inset-y-0 right-0 w-10 bg-linear-to-l from-[#e9dbc4]/90 to-transparent" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div>
                            <div className="mb-5 flex items-center justify-between">
                              <span className="rounded-full bg-[#3a2e24] px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-[#f6efe2]">
                                {currentFlipPage.categoryTitle}
                              </span>
                              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8b7355]">{currentFlipPage.pageCode}</span>
                            </div>
                            <h3 className="text-4xl font-bold uppercase tracking-tight text-[#2f2418]">{currentFlipPage.name}</h3>
                            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5e533f]">{currentFlipPage.desc}</p>
                          </div>

                          <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-[#8b7355]/20 bg-[#f4ead9] p-4">
                              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b7355]">Brew Mood</p>
                              <p className="mt-2 text-sm text-[#5e533f]">Paper texture, editorial type, and tactile card rhythm.</p>
                            </div>
                            <div className="rounded-2xl border border-[#8b7355]/20 bg-[#f4ead9] p-4">
                              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8b7355]">Price</p>
                              <p className="mt-2 font-mono text-2xl font-bold text-[#3a2e24]">{currentFlipPage.price}</p>
                            </div>
                          </div>

                          <div className="mt-8 flex items-center justify-between border-t border-[#8b7355]/20 pt-4">
                            <span className="text-xs uppercase tracking-[0.35em] text-[#8b7355]">Tap to preview</span>
                            <BookOpen size={18} className="text-[#8b7355] transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.button>
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#8b7355]/25 bg-[#f6eddf] p-4 text-xs uppercase tracking-[0.27em] text-[#7b6852]">
                    <p className="mb-3 font-semibold">Reference parity (flipbook)</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <p>[x] Button navigation</p>
                      <p>[x] Cursor drag flip</p>
                      <p>[x] Keyboard arrows</p>
                      <p>[x] Thumbnail quick jump</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {flipPages.slice(0, 4).map((page) => (
                      <button
                        type="button"
                        key={page.pageCode}
                        onClick={() => setFlipPageIndex(flipPages.findIndex((entry) => entry.pageCode === page.pageCode))}
                        className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                          currentFlipPage.pageCode === page.pageCode
                            ? 'border-[#3a2e24] bg-[#3a2e24] text-[#f9f3e7]'
                            : 'border-[#8b7355]/25 bg-[#f8f1e4] text-[#6d5e49] hover:bg-[#f1e7d4]'
                        }`}
                      >
                        <p className="font-mono uppercase tracking-[0.25em]">{page.pageCode}</p>
                        <p className="mt-1 truncate font-semibold uppercase tracking-wide">{page.name}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="menu-mood-strip mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {moodReels.map((media) => (
                <div key={media.id} className="overflow-hidden rounded-[18px] border border-[#8b7355]/25 bg-[#efe4d0]">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={media.src}
                      alt={media.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                    <p className="absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white">
                      {media.type}
                    </p>
                  </div>
                  <p className="px-3 py-2 text-xs uppercase tracking-[0.3em] text-[#695841]">{media.title}</p>
                </div>
              ))}
            </div>
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
              <div className={`w-full h-48 bg-[#2a2a2a] rounded-lg p-3 relative mb-8 shadow-inner border-b-4 border-r-4 border-primary-container ${currentTrack.color} transition-colors duration-500 bg-opacity-20`}>
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
                  <div className="h-12 bg-primary-container rounded-full mx-8 flex justify-between items-center px-4 relative overflow-hidden border-2 border-gray-300">
                    {/* Left Reel */}
                    <div className={`w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center cassette-spin ${!isPlaying ? 'cassette-spin-paused' : ''}`}>
                      <div className="w-full h-1 bg-gray-600 absolute"></div>
                      <div className="w-1 h-full bg-gray-600 absolute"></div>
                      <div className="w-2 h-2 bg-white rounded-full z-10"></div>
                    </div>
                    {/* Tape line */}
                    <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-[#333] -translate-y-1/2"></div>
                    {/* Right Reel */}
                    <div className={`w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center cassette-spin ${!isPlaying ? 'cassette-spin-paused' : ''}`}>
                      <div className="w-full h-1 bg-gray-600 absolute"></div>
                      <div className="w-1 h-full bg-gray-600 absolute"></div>
                      <div className="w-2 h-2 bg-white rounded-full z-10"></div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Cassette Details */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-primary-container rounded-t-lg flex justify-between items-end px-4 pb-1">
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
                  <SkipBack size={20} className="-ml-0.5" />
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
                  <SkipForward size={20} className="ml-0.5" />
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

      <AnimatePresence>
        {isProductLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-90 flex items-center justify-center bg-[#1d160f]/85 px-6 backdrop-blur-sm"
          >
            <div className="coffee-loading-card relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#f3d6ad]/25 bg-[#2a2018] p-8 text-[#f7e8d2] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 paper-noise opacity-30" />
              <div className="relative text-center">
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#f3d6ad]/75">Preparing tasting card</p>
                <h3 className="mt-3 text-3xl font-bold uppercase tracking-tight">Coffee Split Loading</h3>
                <div className="mx-auto mt-7 flex w-52 justify-between">
                  <div className="coffee-stream" />
                  <div className="coffee-stream" />
                </div>
                <div className="coffee-cup mx-auto mt-1">
                  <div className="coffee-wave" />
                </div>
                <div className="mt-6 flex items-center justify-center gap-3 text-[#f3d6ad]/80">
                  <LoaderCircle className="coffee-rotating h-5 w-5" />
                  <span className="text-xs uppercase tracking-[0.32em]">Brewing visual experience</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-85 flex items-center justify-center bg-black/60 px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-[26px] border border-[#d3b588]/35 bg-[#f6ecdc] p-7 shadow-[0_35px_90px_rgba(0,0,0,0.32)]"
            >
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 rounded-full border border-[#8b7355]/35 p-2 text-[#6d5f4a] hover:bg-[#eadcc6]"
                aria-label="Close product preview"
              >
                <X size={16} />
              </button>

              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-5">
                  <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#8b7355]">{selectedItem.categoryTitle}</p>
                  <h3 className="text-3xl font-bold uppercase leading-tight tracking-tight text-[#2f2519] md:text-4xl">{selectedItem.name}</h3>
                  <p className="max-w-md text-base leading-7 text-[#5f543f]">{selectedItem.desc}</p>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#8b7355]">Cup size</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {cupSizeOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedCupSize(option.value)}
                          className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                            selectedCupSize === option.value
                              ? 'border-[#3a2e24] bg-[#3a2e24] text-[#f9f3e7] shadow-[0_10px_24px_rgba(58,46,36,0.2)]'
                              : 'border-[#8b7355]/25 bg-[#f6ecdc] text-[#5f543f] hover:border-[#8b7355]/45 hover:bg-[#efe1ca]'
                          }`}
                        >
                          <span className="block text-sm font-semibold uppercase tracking-[0.2em]">{option.label}</span>
                          <span className="mt-1 block text-[10px] uppercase tracking-[0.22em] opacity-80">{option.note}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#8b7355]/20 bg-[#efe1ca] p-4">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#8b7355]">Signature Price</p>
                    <p className="mt-2 font-mono text-3xl font-bold text-[#3a2e24]">{selectedItem.price}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <ThreeCupViewer
                    size={selectedCupSize}
                    title="Interactive Cup"
                    subtitle="Drag to inspect"
                  />
                  <div className="rounded-2xl border border-[#8b7355]/20 bg-[#efe8da] p-4 text-xs uppercase tracking-[0.28em] text-[#7b6852]">
                    Rotate the cup, then switch sizes to see the form and fill update in real time.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
