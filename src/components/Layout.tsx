import { ReactNode, useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Linkedin } from 'lucide-react';
import Logo from './Logo';
import Lenis from 'lenis';
import { LenisContext } from './LenisContext';

const NAV_LINKS = [
  { name: "Perspective", href: "/" },
  { name: "Execution", href: "/approach" },
  { name: "Economics", href: "/economics" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  exit: { opacity: 0, x: 20 }
} as const;

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = 'unset';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Check if scrolled past a threshold to shrink
        setIsScrolled(currentScrollY > 20);

        // Always show at the top
        if (currentScrollY < 100) {
          setIsVisible(true);
        } else {
          // Hide if scrolling down, show if scrolling up
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <LenisContext.Provider value={lenis}>
    <div className="min-h-screen font-sans bg-brand-paper text-brand-text">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -250 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 w-full z-50 px-6 transition-all duration-500 ${isScrolled ? 'py-1' : 'py-2'}`}
      >
        <div className={`max-w-7xl mx-auto flex justify-between items-center glass rounded-xl px-8 shadow-sm relative z-50 transition-all duration-500 ${isScrolled ? 'py-1.5 shadow-2xl bg-brand-primary/90' : 'py-2.5'}`}>
          <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <Logo className={`transition-all duration-500 ${isScrolled ? 'h-14 md:h-16' : 'h-32 md:h-36'}`} />
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.href} 
                className={({ isActive }) => 
                  `text-[12px] font-bold uppercase tracking-widest transition-colors ${
                    isActive ? 'text-brand-accent underline underline-offset-8' : 'text-brand-text/70 hover:text-brand-accent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/contact">
              <button className={`bg-brand-accent text-white px-6 rounded-md text-[12px] font-bold uppercase tracking-[0.15em] hover:brightness-110 transition-all shadow-lg shadow-brand-accent/20 ${isScrolled ? 'py-2.5' : 'py-3'}`}>
                Get Started
              </button>
            </Link>
          </div>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-primary/95 backdrop-blur-xl md:hidden"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col h-full pt-32 pb-12 px-10"
            >
              <div className="space-y-8">
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <NavLink 
                      to={link.href} 
                      className={({ isActive }) => 
                        `group flex items-center justify-between text-4xl font-sans font-extrabold tracking-tighter ${isActive ? 'text-brand-accent' : 'text-white'}`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-accent" />
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-8">
                <motion.div variants={itemVariants}>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-brand-accent text-white py-5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-accent/20">
                      Get Started
                    </button>
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-end border-t border-white/10 pt-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Social</p>
                    <a 
                      href="https://www.linkedin.com/company/inflection-partners-ai/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-white/60 hover:text-brand-accent transition-colors font-bold text-sm"
                    >
                      <Linkedin size={16} />
                      LinkedIn
                    </a>
                  </div>
                  
                  <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase text-right max-w-[150px]">
                    © 2026 INFLECTION PARTNERS.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-28 md:pt-32">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-brand-primary">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <Link to="/" className="flex items-center">
            <Logo className="h-32 md:h-40" />
          </Link>
          
          <div className="flex gap-8 text-sm font-medium text-white/40">
            <a href="https://www.linkedin.com/company/inflection-partners-ai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>

          <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">
            © 2026 INFLECTION PARTNERS. VALUE CREATION AT LIGHTSPEED.
          </p>
        </div>
      </footer>
    </div>
    </LenisContext.Provider>
  );
}
