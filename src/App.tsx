import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Calendar,
  Layers,
  Database,
  ExternalLink,
  MapPin,
  Cpu,
  Clock,
  Briefcase
} from 'lucide-react';
import { i18nData, techIndex } from './data';

export default function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
    exp1: false,
    exp2: false,
    exp3: false,
    exp4: false,
  });
  
  // CTA 3-state tracker
  const [ctaState, setCtaState] = useState<'default' | 'clicked'>('default');

  const text = i18nData[lang];

  // IntersectionObserver for elements reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-safe');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    
    els.forEach((el) => observer.observe(el));
    return () => {
      els.forEach((el) => observer.unobserve(el));
    };
  }, [lang]);

  // Metric counter animation script (Section 4.2)
  useEffect(() => {
    function animateCounter(el: HTMLElement, targetStr: string, duration = 800) {
      const isNeg = targetStr.startsWith('−');
      const suffix = targetStr.replace(/[−\d.]/g, '');
      const num = parseFloat(targetStr.replace(/[^\d.]/g, ''));
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = targetStr;
        return;
      }
      
      const start = performance.now();
      function step(now: number) {
        const elapsed = Math.min((now - start) / duration, 1);
        const ease = elapsed === 1 ? 1 : 1 - Math.pow(2, -10 * elapsed);
        const current = Math.round(num * ease);
        el.textContent = (isNeg ? '−' : '') + current + suffix;
        if (elapsed < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = el.dataset.countTarget;
        if (target) {
          animateCounter(el, target, 900);
        }
        metricObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count-target]').forEach((el) => {
      metricObserver.observe(el);
    });

    return () => {
      metricObserver.disconnect();
    };
  }, [lang]);

  // Support collapsible toggle action on click or Enter
  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleCard(id);
    }
  };

  // CTA Click State trigger
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCtaState('clicked');
    
    setTimeout(() => {
      // Smooth scroll to contact form or booking schedule
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
      }
      setCtaState('default');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#10192e] text-[#e8eaf0] selection:bg-[#fca311] selection:text-[#10192e] font-sans antialiased">
      {/* 5.1 WCAG Skip Link */}
      <a href="#main-content" className="skip-link fixed top-[-100%] left-4 z-[9999] bg-[#fca311] text-[#10192e] px-4 py-2 text-xs font-semibold rounded-b transition-[top] focus:top-0">
        {text.skip}
      </a>

      {/* SECCIÓN 3.3 Glassmorphism 2.0 Topbar */}
      <header className="topbar-glass sticky top-0 left-0 right-0 z-[200] max-w-7xl mx-auto h-[56px] px-4 md:px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[13px] font-bold tracking-wider text-[#e8eaf0]">
            Jair Villalobos
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#fca311] animate-pulse"></span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium" aria-label="Desktop navigation">
          <a href="#case-studies" className="text-[#8a94a8] hover:text-[#fca311] transition-colors">{text.nav.cases}</a>
          <a href="#key-decisions" className="text-[#8a94a8] hover:text-[#fca311] transition-colors">{text.nav.decisions}</a>
          <a href="#stack" className="text-[#8a94a8] hover:text-[#fca311] transition-colors">{text.nav.stack}</a>
          <a href="#experience" className="text-[#8a94a8] hover:text-[#fca311] transition-colors">{text.nav.experience}</a>
          <a href="#contact" className="text-[#8a94a8] hover:text-[#fca311] transition-colors">{text.nav.contact}</a>
        </nav>

        {/* Global Language Toggle + Burger menu */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 border-l border-[#263350] pl-4">
            <button 
              onClick={() => setLang('en')} 
              className={`font-mono text-[10px] px-2 py-1 rounded transition-colors ${lang === 'en' ? 'text-[#fca311] font-bold bg-[rgba(252,163,17,0.1)] border border-[rgba(252,163,17,0.2)]' : 'text-[#8a94a8] hover:text-[#e8eaf0]'}`}
              aria-label="Set language to English"
            >
              EN
            </button>
            <button 
              onClick={() => setLang('es')} 
              className={`font-mono text-[10px] px-2 py-1 rounded transition-colors ${lang === 'es' ? 'text-[#fca311] font-bold bg-[rgba(252,163,17,0.1)] border border-[rgba(252,163,17,0.2)]' : 'text-[#8a94a8] hover:text-[#e8eaf0]'}`}
              aria-label="Establecer idioma a español"
            >
              ES
            </button>
          </div>

          {/* Social icons */}
          <div className="hidden sm:flex items-center gap-2">
            <a href="https://github.com/jjvnz" target="_blank" rel="noopener noreferrer" className="text-[#8a94a8] hover:text-[#fca311] transition-colors" aria-label="GitHub Profile">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/jjvnz" target="_blank" rel="noopener noreferrer" className="text-[#8a94a8] hover:text-[#fca311] transition-colors" aria-label="LinkedIn Profile">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center border border-[#263350] hover:bg-[#162035] rounded-md p-1.5 text-[#e8eaf0]"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[56px] left-0 right-0 z-[190] bg-[#10192e] border-b border-[#263350] py-6 px-6 flex flex-col gap-4 shadow-2xl"
            aria-label="Mobile navigation"
          >
            <a href="#case-studies" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[#e8eaf0] py-2 border-b border-[#1e2d45]">{text.nav.cases}</a>
            <a href="#key-decisions" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[#e8eaf0] py-2 border-b border-[#1e2d45]">{text.nav.decisions}</a>
            <a href="#stack" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[#e8eaf0] py-2 border-b border-[#1e2d45]">{text.nav.stack}</a>
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[#e8eaf0] py-2 border-b border-[#1e2d45]">{text.nav.experience}</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-[#e8eaf0] py-2 border-b border-[#1e2d45]">{text.nav.contact}</a>
            
            <div className="flex items-center gap-3 pt-4">
              <button onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }} className={`font-mono text-xs px-3 py-1.5 rounded ${lang === 'en' ? 'text-[#fca311] bg-[rgba(252,163,17,0.1)]' : 'text-[#8a94a8]'}`}>EN</button>
              <button onClick={() => { setLang('es'); setIsMobileMenuOpen(false); }} className={`font-mono text-xs px-3 py-1.5 rounded ${lang === 'es' ? 'text-[#fca311] bg-[rgba(252,163,17,0.1)]' : 'text-[#8a94a8]'}`}>ES</button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 overflow-hidden">
        
        {/* SECCIÓN 1 — Hero: Copy y Estructura (Estrategia & Humanización) */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center relative py-12 border-b border-[#263350]">
          
          {/* Subtle background graphics */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_40%,rgba(252,163,17,0.06),transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
            <div className="md:col-span-8 flex flex-col gap-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-[#8a94a8] text-[11px] uppercase tracking-[0.1em] font-mono">
                <span className="w-6 h-[1px] bg-[#fca311]"></span>
                {text.hero.eyebrow}
              </div>

              {/* H1 with clip reveal styling */}
              <h1 className="h1-reveal-anim text-3xl sm:text-5xl md:text-[52px] font-bold leading-[1.1] tracking-tight text-[#e8eaf0] uppercase whitespace-pre-line">
                {text.hero.h1}
              </h1>

              {/* Acto 2: Promesa con datos */}
              <p className="text-base sm:text-lg text-[#fca311] font-medium leading-relaxed max-w-2xl font-mono">
                {text.hero.promise}
              </p>

              {/* Acto 3: Bio Humano */}
              <p className="text-sm sm:text-base text-[#8a94a8] leading-relaxed max-w-xl">
                {text.hero.bio}
              </p>

              {/* CTA Bottleneck */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a 
                  href="#contact" 
                  onClick={handleCtaClick}
                  className="relative group inline-flex items-center gap-3 bg-[#fca311] text-[#10192e] font-bold px-6 py-3.5 rounded text-xs tracking-wider transition-all duration-300 hover:bg-[#e8940a] hover:-translate-y-0.5"
                >
                  {/* Pulse ring animation triggered only on hover/focus matching Section 4 */}
                  <span className="pulse-ring scale-100 opacity-100 group-hover:scale-135 group-hover:opacity-0 transition-all duration-[600ms]" />
                  {ctaState === 'clicked' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-[#10192e]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {lang === 'es' ? "Abriendo..." : "Opening..."}
                    </>
                  ) : (
                    <>
                      {text.hero.cta_bottleneck}
                    </>
                  )}
                </a>
              </div>
            </div>

            {/* Glassmorphism Metric Dashboard (Section 1.2 & 3.3) */}
            <div className="md:col-span-4 lg:pl-4" aria-live="polite" aria-atomic="true">
              <div className="metric-card-glass p-6 flex flex-col gap-5 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Cpu className="w-16 h-16 text-[#fca311]" />
                </div>
                
                {/* Metric 1 */}
                <div className="flex flex-col gap-1 border-b border-[#263350] pb-4">
                  <div className="text-[9px] uppercase tracking-wider font-mono text-[#8a94a8]">
                    {text.metrics.throughput}
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#fca311]" data-count-target={text.metrics.throughput_val}>
                    10M+
                  </div>
                  <div className="text-[10px] text-[#8a94a8] font-mono leading-tight">
                    {text.metrics.throughput_desc}
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col gap-1 border-b border-[#263350] pb-4">
                  <div className="text-[9px] uppercase tracking-wider font-mono text-[#8a94a8]">
                    {text.metrics.cicd}
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#fca311]" data-count-target={text.metrics.cicd_val}>
                    -94%
                  </div>
                  <div className="text-[10px] text-[#8a94a8] font-mono leading-tight">
                    {text.metrics.cicd_desc}
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col gap-1 border-b border-[#263350] pb-4">
                  <div className="text-[9px] uppercase tracking-wider font-mono text-[#8a94a8]">
                    {text.metrics.cloud_cost}
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#e8eaf0]" data-count-target={text.metrics.cloud_cost_val}>
                    -25%
                  </div>
                  <div className="text-[10px] text-[#8a94a8] font-mono leading-tight">
                    {text.metrics.cloud_cost_desc}
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="flex flex-col gap-1">
                  <div className="text-[9px] uppercase tracking-wider font-mono text-[#8a94a8]">
                    {text.metrics.uptime}
                  </div>
                  <div className="text-3xl font-bold font-mono text-[#e8eaf0]" data-count-target={text.metrics.uptime_val}>
                    99.5%
                  </div>
                  <div className="text-[10px] text-[#8a94a8] font-mono leading-tight">
                    {text.metrics.uptime_desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2 — Case Studies: Layout Anti-Grid (Breaking the Grid) */}
        <section id="case-studies" className="reveal-safe py-16 border-b border-[#263350]">
          <h2 className="text-[#8a94a8] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-3">
            <span>{text.cases.title}</span>
            <span className="flex-grow h-[1px] bg-[#263350]"></span>
          </h2>
          <p className="text-[#8a94a8] max-w-2xl mb-10 text-sm md:text-base">
            {text.cases.intro}
          </p>

          <div className="cases-antigrid">
            
            {/* Card Destacado (IPCOM) */}
            <article className="case-featured border border-[rgba(252,163,17,0.2)] bg-[#162035] p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
              <span className="metric-bg-float" aria-hidden="true">10M+</span>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#fca311] font-mono font-bold tracking-wider">{text.cases.featured.role}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#e8eaf0] tracking-tight">{text.cases.featured.company}</h3>
                  <span className="text-[10px] text-[#8a94a8] font-mono">{text.cases.featured.period}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#8a94a8] leading-relaxed">
                  {text.cases.featured.desc}
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-6">
                {["Go", "NATS", "Redis", "OpenTelemetry", "OPA/RBAC", "SIP→PJSIP"].map((tag) => (
                  <span key={tag} className="text-[10.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{tag}</span>
                ))}
              </div>
            </article>

            {/* Card Secundario 1 (Tigo Money) */}
            <article className="case-secondary border border-[#263350] bg-[#162035] p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
              <span className="metric-bg-float" aria-hidden="true">−30%</span>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#fca311] font-mono font-bold tracking-wider">{text.cases.secondary1.role}</span>
                  <h3 className="text-lg font-bold text-[#e8eaf0] tracking-tight">{text.cases.secondary1.company}</h3>
                  <span className="text-[10px] text-[#8a94a8] font-mono">{text.cases.secondary1.period}</span>
                </div>
                <p className="text-xs text-[#8a94a8] leading-relaxed">
                  {text.cases.secondary1.desc}
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-6">
                {["Soap Bridge", "KrakenD", "AWS", "OIDC", "Cognito"].map((tag) => (
                  <span key={tag} className="text-[10.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{tag}</span>
                ))}
              </div>
            </article>

            {/* Card Secundario 2 (Upwork CI/CD) */}
            <article className="case-secondary border border-[#263350] bg-[#162035] p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
              <span className="metric-bg-float" aria-hidden="true">20m</span>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#fca311] font-mono font-bold tracking-wider">{text.cases.secondary2.role}</span>
                  <h3 className="text-lg font-bold text-[#e8eaf0] tracking-tight">{text.cases.secondary2.company}</h3>
                  <span className="text-[10px] text-[#8a94a8] font-mono">{text.cases.secondary2.period}</span>
                </div>
                <p className="text-xs text-[#8a94a8] leading-relaxed">
                  {text.cases.secondary2.desc}
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-6">
                {["CI/CD Caching", "GHA Graphs", "Terraform", "EKS"].map((tag) => (
                  <span key={tag} className="text-[10.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{tag}</span>
                ))}
              </div>
            </article>

            {/* Card Ancho 2-3 (BYONDIT Wide detail) */}
            <article className="case-wide border border-[#263350] bg-[#162035] p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
              <span className="metric-bg-float" aria-hidden="true">−25%</span>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#fca311] font-mono font-bold tracking-wider">{text.cases.wide.role}</span>
                  <h3 className="text-xl font-bold text-[#e8eaf0] tracking-tight">{text.cases.wide.company}</h3>
                </div>
                <p className="text-xs text-[#8a94a8] leading-relaxed max-w-2xl">
                  {text.cases.wide.desc}
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-1.5 mt-6">
                {["KrakenD Custom", "Terraform Optimizations", "Serverless Sagas", "PCI Compliance", "Affected Builds"].map((tag) => (
                  <span key={tag} className="text-[10.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{tag}</span>
                ))}
              </div>
            </article>

          </div>
        </section>

        {/* SECCIÓN 1.5 & 3.3 — Glassmorphism Cards en Key Decisions */}
        <section id="key-decisions" className="reveal-safe py-16 border-b border-[#263350]">
          <h2 className="text-[#8a94a8] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-3">
            <span>{text.nav.decisions}</span>
            <span className="flex-grow h-[1px] bg-[#263350]"></span>
          </h2>
          <p className="text-lg font-bold text-[#e8eaf0] mb-8 font-mono">
            {text.decisions.heading}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Visual Rail Line decoration (Section 4.1 Scroll Narrative) */}
            <div className="absolute top-0 bottom-0 left-0 md:left-4 w-[1px] bg-gradient-to-b from-[#fca311] to-transparent pointer-events-none hidden md:block" />

            {/* Decision 1 */}
            <div className="metric-card-glass p-6 text-left flex flex-col gap-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] shadow-lg hover:border-[#fca311] transition-all relative">
              <div className="text-[10px] font-mono font-semibold text-[#fca311] tracking-wider uppercase">
                {text.decisions.d1.project}
              </div>
              <h3 className="text-base font-bold font-mono text-[#e8eaf0]">
                {text.decisions.d1.title}
              </h3>
              <p className="text-xs text-[#8a94a8] leading-relaxed">
                {text.decisions.d1.text}
              </p>
            </div>

            {/* Decision 2 */}
            <div className="metric-card-glass p-6 text-left flex flex-col gap-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] shadow-lg hover:border-[#fca311] transition-all relative">
              <div className="text-[10px] font-mono font-semibold text-[#fca311] tracking-wider uppercase">
                {text.decisions.d2.project}
              </div>
              <h3 className="text-base font-bold font-mono text-[#e8eaf0]">
                {text.decisions.d2.title}
              </h3>
              <p className="text-xs text-[#8a94a8] leading-relaxed">
                {text.decisions.d2.text}
              </p>
            </div>

            {/* Decision 3 */}
            <div className="metric-card-glass p-6 text-left flex flex-col gap-4 border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] shadow-lg hover:border-[#fca311] transition-all relative">
              <div className="text-[10px] font-mono font-semibold text-[#fca311] tracking-wider uppercase">
                {text.decisions.d3.project}
              </div>
              <h3 className="text-base font-bold font-mono text-[#e8eaf0]">
                {text.decisions.d3.title}
              </h3>
              <p className="text-xs text-[#8a94a8] leading-relaxed">
                {text.decisions.d3.text}
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 — Stack: Archival Index (No glassmorphism applied on layout here as per Seccion 3.3) */}
        <section id="stack" className="reveal-safe py-16 border-b border-[#263350]">
          <h2 className="text-[#8a94a8] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-3">
            <span>{text.nav.stack}</span>
            <span className="flex-grow h-[1px] bg-[#263350]"></span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div className="lg:col-span-4 flex flex-col gap-4">
              <p className="text-sm text-[#8a94a8] leading-relaxed">
                {text.stack.bio}
              </p>
              <div className="mt-2 text-xs font-mono text-[#fca311]">
                {techIndex.length} {lang === "es" ? "tecnologías validadas en producción" : "production-validated technologies"}
              </div>
            </div>

            {/* The Tabulated Archival Index (Section 3.1 & 3.2) */}
            <div className="lg:col-span-8">
              <div className="border border-[#263350] bg-[#162035] rounded-md overflow-hidden stack-archival text-left">
                
                {/* Header Row */}
                <div className="archival-header-row font-mono text-[9px] font-semibold text-[#8a94a8] select-none">
                  <span>{text.stack.idLabel}</span>
                  <span>{text.stack.nameLabel}</span>
                  <span>{text.stack.useLabel}</span>
                  <span>{text.stack.catLabel}</span>
                </div>

                {/* Grid Rows */}
                <div className="divide-y divide-[rgba(255,255,255,0.04)]">
                  {techIndex.map((tech) => (
                    <div 
                      key={tech.id} 
                      className="archival-entry hover:bg-[rgba(255,255,255,0.025)]" 
                      tabIndex={0} 
                      role="row"
                      aria-label={`${tech.name} - ${tech.id}`}
                    >
                      <span className="entry-idx font-mono text-[10px] text-[#5a6478]">
                        {tech.id}
                      </span>
                      <strong className="entry-name font-mono text-[12px] text-[#e8eaf0]">
                        {tech.name}
                      </strong>
                      <span className="entry-use font-sans text-xs text-[#8a94a8]">
                        {lang === 'es' ? tech.descEs : tech.descEn}
                      </span>
                      <span className="entry-badge font-mono text-[9px] bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#fca311] text-center font-medium select-none truncate">
                        {lang === 'es' ? tech.catEs : tech.category}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
              <div className="mt-3 text-right text-[10px] font-mono text-[#5a6478]">
                {text.stack.subtitle}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE — Collapsible accessible Drawers (Section 4.3 & 5.1) */}
        <section id="experience" className="reveal-safe py-16 border-b border-[#263350]">
          <h2 className="text-[#8a94a8] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-3">
            <span>{text.nav.experience}</span>
            <span className="flex-grow h-[1px] bg-[#263350]"></span>
          </h2>
          <p className="text-sm text-[#8a94a8] max-w-2xl mb-8">
            {text.experience.intro}
          </p>

          <div className="flex flex-col divide-y divide-[#263350] border border-[#263350] rounded-lg overflow-hidden bg-[#162035]">
            
            {/* Exp Card 1 */}
            <div 
              className="p-5 hover:bg-[#1e2d45] transition-colors cursor-pointer select-none"
              onClick={() => toggleCard('exp1')}
              onKeyDown={(e) => handleCardKeyDown(e, 'exp1')}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCards.exp1}
              aria-controls="exp-drawer-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-[#10192e] flex items-center justify-center border border-[#263350] flex-shrink-0 text-[#fca311]">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8a94a8]">{text.experience.exp1.period}</span>
                    <h3 className="text-base font-bold text-[#e8eaf0]">{text.experience.exp1.title}</h3>
                    <div className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.experience.exp1.company}</div>
                    
                    {/* Persistent Metric badge shown by default */}
                    <span className="inline-flex mt-2 text-[10px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#fca311]">
                      {text.experience.exp1.metric}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#8a94a8] transition-transform duration-300 ${expandedCards.exp1 ? 'rotate-180' : ''}`} />
              </div>

              {/* Collapsible Drawer wrap (Sec 4.3) */}
              <div 
                id="exp-drawer-1" 
                className={`exp-drawer ${expandedCards.exp1 ? 'open' : ''}`}
                aria-hidden={!expandedCards.exp1}
              >
                <div className="pt-4 pl-0 md:pl-16 text-xs sm:text-sm text-[#8a94a8] leading-relaxed flex flex-col gap-3">
                  <p>{text.experience.exp1.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Go", "Kubernetes", "Terraform", "GCP", "AWS", "gRPC"].map((t) => (
                      <span key={t} className="text-[9.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Exp Card 2 */}
            <div 
              className="p-5 hover:bg-[#1e2d45] transition-colors cursor-pointer select-none"
              onClick={() => toggleCard('exp2')}
              onKeyDown={(e) => handleCardKeyDown(e, 'exp2')}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCards.exp2}
              aria-controls="exp-drawer-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-[#10192e] flex items-center justify-center border border-[#263350] flex-shrink-0 text-[#fca311]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8a94a8]">{text.experience.exp2.period}</span>
                    <h3 className="text-base font-bold text-[#e8eaf0]">{text.experience.exp2.title}</h3>
                    <div className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.experience.exp2.company}</div>
                    
                    <span className="inline-flex mt-2 text-[10px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#fca311]">
                      {text.experience.exp2.metric}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#8a94a8] transition-transform duration-300 ${expandedCards.exp2 ? 'rotate-180' : ''}`} />
              </div>

              <div 
                id="exp-drawer-2" 
                className={`exp-drawer ${expandedCards.exp2 ? 'open' : ''}`}
                aria-hidden={!expandedCards.exp2}
              >
                <div className="pt-4 pl-0 md:pl-16 text-xs sm:text-sm text-[#8a94a8] leading-relaxed flex flex-col gap-3">
                  <p>{text.experience.exp2.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Go", "NATS", "Redis", "GCP", "Kubernetes", "Grafana"].map((t) => (
                      <span key={t} className="text-[9.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Exp Card 3 */}
            <div 
              className="p-5 hover:bg-[#1e2d45] transition-colors cursor-pointer select-none"
              onClick={() => toggleCard('exp3')}
              onKeyDown={(e) => handleCardKeyDown(e, 'exp3')}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCards.exp3}
              aria-controls="exp-drawer-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-[#10192e] flex items-center justify-center border border-[#263350] flex-shrink-0 text-[#fca311]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8a94a8]">{text.experience.exp3.period}</span>
                    <h3 className="text-base font-bold text-[#e8eaf0]">{text.experience.exp3.title}</h3>
                    <div className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.experience.exp3.company}</div>
                    
                    <span className="inline-flex mt-2 text-[10px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#fca311]">
                      {text.experience.exp3.metric}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#8a94a8] transition-transform duration-300 ${expandedCards.exp3 ? 'rotate-180' : ''}`} />
              </div>

              <div 
                id="exp-drawer-3" 
                className={`exp-drawer ${expandedCards.exp3 ? 'open' : ''}`}
                aria-hidden={!expandedCards.exp3}
              >
                <div className="pt-4 pl-0 md:pl-16 text-xs sm:text-sm text-[#8a94a8] leading-relaxed flex flex-col gap-3">
                  <p>{text.experience.exp3.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Go", "KrakenD", "AWS Lambda", "Cognito", "OpenTelemetry"].map((t) => (
                      <span key={t} className="text-[9.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Exp Card 4 */}
            <div 
              className="p-5 hover:bg-[#1e2d45] transition-colors cursor-pointer select-none"
              onClick={() => toggleCard('exp4')}
              onKeyDown={(e) => handleCardKeyDown(e, 'exp4')}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCards.exp4}
              aria-controls="exp-drawer-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded bg-[#10192e] flex items-center justify-center border border-[#263350] flex-shrink-0 text-[#fca311]">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#8a94a8]">{text.experience.exp4.period}</span>
                    <h3 className="text-base font-bold text-[#e8eaf0]">{text.experience.exp4.title}</h3>
                    <div className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.experience.exp4.company}</div>
                    
                    <span className="inline-flex mt-2 text-[10px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#fca311]">
                      {text.experience.exp4.metric}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#8a94a8] transition-transform duration-300 ${expandedCards.exp4 ? 'rotate-180' : ''}`} />
              </div>

              <div 
                id="exp-drawer-4" 
                className={`exp-drawer ${expandedCards.exp4 ? 'open' : ''}`}
                aria-hidden={!expandedCards.exp4}
              >
                <div className="pt-4 pl-0 md:pl-16 text-xs sm:text-sm text-[#8a94a8] leading-relaxed flex flex-col gap-3">
                  <p>{text.experience.exp4.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {["Cypress", "Cucumber", "Postman", "CI/CD"].map((t) => (
                      <span key={t} className="text-[9.5px] font-mono bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded text-[#8a94a8]">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Education Details & Certs */}
          <div className="mt-12 pt-8 border-t border-[#263350]">
            <h3 className="text-base font-bold font-mono text-[#fca311] mb-6 tracking-wide">
              {text.certs.education}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 rounded border border-[#263350] bg-[#162035] flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-[#e8eaf0]">{text.certs.edu1.title}</h4>
                  <p className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.certs.edu1.school}</p>
                </div>
                <span className="text-[10px] font-mono text-[#e8eaf0] bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded whitespace-nowrap">{text.certs.edu1.date}</span>
              </div>

              <div className="p-4 rounded border border-[#263350] bg-[#162035] flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-[#e8eaf0]">{text.certs.edu2.title}</h4>
                  <p className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.certs.edu2.school}</p>
                </div>
                <span className="text-[10px] font-mono text-[#e8eaf0] bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded whitespace-nowrap">{text.certs.edu2.date}</span>
              </div>

              <div className="p-4 rounded border border-[#263350] bg-[#162035] flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-[#e8eaf0]">{text.certs.edu3.title}</h4>
                  <p className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.certs.edu3.school}</p>
                </div>
                <span className="text-[10px] font-mono text-[#e8eaf0] bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded whitespace-nowrap">{text.certs.edu3.date}</span>
              </div>

              <div className="p-4 rounded border border-[#263350] bg-[#162035] flex justify-between items-center text-left">
                <div>
                  <h4 className="text-sm font-semibold text-[#e8eaf0]">{text.certs.edu4.title}</h4>
                  <p className="text-xs text-[#8a94a8] font-mono mt-0.5">{text.certs.edu4.school}</p>
                </div>
                <span className="text-[10px] font-mono text-[#e8eaf0] bg-[#10192e] border border-[#263350] px-2 py-0.5 rounded whitespace-nowrap">{text.certs.edu4.date}</span>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT — SEC 3.3 Glassmorphism applied to contact card box */}
        <section id="contact" className="reveal-safe py-16 border-b-0">
          <h2 className="text-[#8a94a8] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 flex items-center gap-3">
            <span>{text.nav.contact}</span>
            <span className="flex-grow h-[1px] bg-[#263350]"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-6 text-left">
              <p className="text-sm sm:text-base text-[#8a94a8] leading-relaxed">
                {text.contact.intro}
              </p>

              <div className="flex flex-col gap-5">
                
                <div className="flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] bg-[rgba(252,163,17,0.1)] border border-[rgba(252,163,17,0.3)] flex items-center justify-center font-mono text-[10px] text-[#fca311] rounded mt-0.5">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#e8eaf0]">{text.contact.step1}</h4>
                    <p className="text-xs text-[#8a94a8] mt-1 leading-relaxed">{text.contact.desc1}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] bg-[rgba(252,163,17,0.1)] border border-[rgba(252,163,17,0.3)] flex items-center justify-center font-mono text-[10px] text-[#fca311] rounded mt-0.5">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#e8eaf0]">{lang === 'es' ? "Auditoría de arquitectura" : "Architecture audit"}</h4>
                    <p className="text-xs text-[#8a94a8] mt-1 leading-relaxed">{text.contact.desc2}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-[30px] h-[30px] bg-[rgba(252,163,17,0.1)] border border-[rgba(252,163,17,0.3)] flex items-center justify-center font-mono text-[10px] text-[#fca311] rounded mt-0.5">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#e8eaf0]">{lang === 'es' ? "Propuesta" : "Proposal"}</h4>
                    <p className="text-xs text-[#8a94a8] mt-1 leading-relaxed">{text.contact.desc3}</p>
                  </div>
                </div>

              </div>

              <div className="mt-4 p-4 border border-[#263350] bg-[#162035] rounded-md">
                <span className="text-[10px] font-mono text-[#5a6478] uppercase">{text.contact.async}</span>
                <a href="mailto:jjvnzdev@gmail.com" className="block text-sm font-mono text-[#fca311] hover:underline mt-1">
                  jjvnzdev@gmail.com
                </a>
              </div>
            </div>

            {/* Glassmorphism booking schedule card */}
            <div className="metric-card-glass p-6 text-left border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold text-[#8a94a8]">{text.contact.book}</span>
                <span className="h-2 w-2 rounded-full bg-[#fca311] shadow-[0_0_8px_#fca311]" />
              </div>

              <p className="text-xs sm:text-sm text-[#8a94a8] leading-relaxed mb-6">
                {text.contact.caltext}
              </p>

              <a 
                href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3-4hLRaodla42xII9UxMGOnnl_i8HzC--lo9DcZbIFG2q63qduG5KMaDvh9WPmEsEx5K4q-9aw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 p-3 font-mono text-xs font-bold bg-[rgba(252,163,17,0.1)] text-[#fca311] border border-[rgba(252,163,17,0.3)] hover:border-[#fca311] hover:bg-[#1e2d45] transition-all duration-200 rounded"
              >
                <Calendar className="w-4 h-4" />
                {text.contact.callink}
              </a>

              <div className="my-4 text-center font-mono text-[10px] text-[#5a6478] select-none">
                {lang === 'es' ? "O vete de forma directa" : "OR REACH DIRECTLY"}
              </div>

              <a 
                href="mailto:jjvnzdev@gmail.com" 
                className="w-full flex items-center justify-center gap-2 text-xs text-[#8a94a8] hover:text-[#fca311] transition-colors py-2"
              >
                <Mail className="w-4 h-4" />
                {text.contact.fallback}
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full max-w-7xl mx-auto border-t border-[#263350] py-8 px-4 md:px-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] font-mono text-[#5a6478]">
          © 2026 Jair Villalobos. Build with Google AI Studio.
        </span>

        <div className="flex flex-wrap items-center gap-6 justify-center text-[10px] font-mono">
          <a href="https://github.com/jjvnz" target="_blank" rel="noopener noreferrer" className="text-[#5a6478] hover:text-[#fca311] transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/jjvnz" target="_blank" rel="noopener noreferrer" className="text-[#5a6478] hover:text-[#fca311] transition-colors">LinkedIn</a>
          
          <div className="flex items-center gap-1 bg-[#162035] p-0.5 rounded border border-[#263350]">
            <button onClick={() => setLang('en')} className={`px-2 py-0.5 rounded ${lang === 'en' ? 'text-[#fca311] bg-[#10192e] font-bold' : 'text-[#8a94a8]'}`}>EN</button>
            <button onClick={() => setLang('es')} className={`px-2 py-0.5 rounded ${lang === 'es' ? 'text-[#fca311] bg-[#10192e] font-bold' : 'text-[#8a94a8]'}`}>ES</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
