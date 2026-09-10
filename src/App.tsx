import { useEffect, useState } from 'react'
import './App.css'

const media = {
  hero: 'https://www.bonita.luxury/optimized/hero/beach-2-desktop.webp',
  beach: 'https://www.bonita.luxury/optimized/beach-3.webp',
  golf: 'https://www.bonita.luxury/optimized/golf-1.webp',
  alveareLogo: '/alveare-logo.png',
  alveareIcon: '/alveare-icon.png',
  howardLuna: '/howard-luna.jpg',
  ambraSolesin: '/ambra-solesin.jpg',
  heroVideo: '/hero-background-new.mp4',
  crystalLagoonColor: 'https://www.bonita.luxury/crystal-lagoon/Logo-Color.png',
  crystalLagoonWhite: 'https://www.bonita.luxury/crystal-lagoon/logo-white-simple.png',
}

const builderPartners = [
  {
    id: 'gva',
    name: 'GVA',
    logo: 'https://www.bonita.luxury/partners/gva.png',
    descEs: 'GVA aporta formas icónicas y diseño a destinos residenciales y hoteleros de lujo.',
    descEn: 'GVA brings iconic forms and design to luxury residential and hospitality destinations.',
    taglineEs: 'Arquitectura que se convierte en destino.',
    taglineEn: 'Architecture that becomes a destination.',
    projects: [
      {
        name: 'World Trade Center, Santo Domingo',
        descEs: 'Desarrollo comercial icónico en la capital.',
        descEn: 'Iconic commercial development in the capital.',
        img: 'https://www.bonita.luxury/world-trade.webp',
      },
      {
        name: 'Park Towers, Santo Domingo',
        descEs: 'Ícono residencial de torres gemelas.',
        descEn: 'Twin-tower residential icon.',
        img: 'https://www.bonita.luxury/park-towers.jpg',
      },
      {
        name: 'Dreams, Cap Cana',
        descEs: 'Arquitectura de resort de lujo en Cap Cana.',
        descEn: 'Luxury resort architecture in Cap Cana.',
        img: 'https://www.bonita.luxury/dreams.jpg',
      },
    ],
  },
  {
    id: 'sinercon',
    name: 'Sinercon',
    logo: 'https://www.bonita.luxury/partners/sinercon.png',
    descEs: 'Sinercon ejecuta construcciones complejas e infraestructura crítica que desbloquean habitabilidad y crecimiento.',
    descEn: 'Sinercon executes complex builds and critical infrastructure unlocking livability and growth.',
    taglineEs: 'Desde núcleos de resorts hasta infraestructura esencial.',
    taglineEn: 'From resort cores to essential infrastructure.',
    projects: [
      {
        name: 'Hyatt Zilara & Ziva, Cap Cana',
        descEs: 'Construcción de resort a gran escala e infraestructura.',
        descEn: 'Large-scale resort construction & infrastructure.',
        img: 'https://www.bonita.luxury/hyatts.webp',
      },
      {
        name: 'Aeropuerto Las Américas, Santo Domingo',
        descEs: 'Importante infraestructura y construcción de aeropuerto.',
        descEn: 'Major airport infrastructure and construction.',
        img: 'https://www.bonita.luxury/las-americas.png',
      },
      {
        name: 'Dreams, Cap Cana',
        descEs: 'Construcción de resort y desarrollo de infraestructura.',
        descEn: 'Resort construction and infrastructure development.',
        img: 'https://www.bonita.luxury/dreams.jpg',
      },
    ],
  },
  {
    id: 'tldi',
    name: 'TLDI',
    logo: 'https://www.bonita.luxury/partners/tldi.png',
    descEs: 'TLDI entrega proyectos hoteleros a gran escala con calidad y ejecución sin compromisos.',
    descEn: 'TLDI delivers large-scale hospitality projects with uncompromising quality and execution.',
    taglineEs: 'Confiado por marcas hoteleras globales en todo el Caribe.',
    taglineEn: 'Trusted by global hospitality brands across the Caribbean.',
    projects: [
      {
        name: 'Hyatt Zilara & Ziva, Cap Cana',
        descEs: 'Frente al mar insignia, todo incluido elevado.',
        descEn: 'Flagship oceanfront, elevated all-inclusive.',
        img: 'https://www.bonita.luxury/hyatts.webp',
      },
      {
        name: 'St Regis, Cap Cana',
        descEs: 'Desarrollo de resort ultra-lujo en Cap Cana.',
        descEn: 'Ultra-luxury resort development in Cap Cana.',
        img: 'https://www.bonita.luxury/stregis.jpg',
      },
      {
        name: 'Dreams, Cap Cana',
        descEs: 'Desarrollo y gestión de resort premium.',
        descEn: 'Premium resort development and management.',
        img: 'https://www.bonita.luxury/dreams.jpg',
      },
    ],
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string>('')
  const [selectedProject, setSelectedProject] = useState<string>('both')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [microFx, setMicroFx] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('bonita_micro_fx')
      return saved !== null ? saved === 'true' : true
    } catch {
      return true
    }
  })
  const [cursorText, setCursorText] = useState('')
  const [cursorActive, setCursorActive] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [activeSection, setActiveSection] = useState('top')
  const en = language === 'en'

  const toggleMicroFx = () => {
    const next = !microFx
    setMicroFx(next)
    try {
      localStorage.setItem('bonita_micro_fx', String(next))
    } catch (e) {
      console.error(e)
    }
  }

  const openModal = (title?: string) => {
    setModalTitle(title || (en ? 'Book a Private Tour' : 'Agenda tu Tour Privado'))
    setSubmitted(false)
    setContactOpen(true)
    setMenuOpen(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        proyecto_interes:
          selectedProject === 'golf'
            ? 'Bonita Golf (Desde $440,000)'
            : selectedProject === 'beach'
            ? 'Bonita Beach (Desde $340,000)'
            : 'Ambos Proyectos (Golf & Beach)',
        tipo_solicitud: modalTitle || 'Tour Privado / Dossier',
        origen: 'Bonita Luxury Living Landing Page',
        _subject: `Nuevo Lead Bonita Luxury Living: ${formData.name}`,
        _replyto: formData.email,
        _template: 'table',
        _captcha: 'false',
      }

      await fetch('https://formsubmit.co/ajax/howard@alveare.do', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '' })
    } catch (err) {
      console.error('Error enviando formulario:', err)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Smooth lerp magnetic cursor
  useEffect(() => {
    if (!microFx) return

    let mouseX = -100
    let mouseY = -100
    let currentX = -100
    let currentY = -100
    let animationId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setCursorPos({ x: mouseX, y: mouseY })

      // Detect hover target
      const target = (e.target as HTMLElement)?.closest('[data-cursor], button, a, .project-card, .pillar-card, .builder-card')
      if (target) {
        setCursorActive(true)
        const customText = target.getAttribute('data-cursor') || ''
        setCursorText(customText)
      } else {
        setCursorActive(false)
        setCursorText('')
      }
    }

    const onMouseLeave = () => {
      setCursorActive(false)
      setCursorText('')
    }

    const render = () => {
      currentX += (mouseX - currentX) * 0.18
      currentY += (mouseY - currentY) * 0.18
      setRingPos({ x: currentX, y: currentY })
      animationId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [microFx])

  // 3D Tilt and Magnetic Pull Effect
  useEffect(() => {
    if (!microFx) return

    // Magnetic buttons
    const magneticElements = document.querySelectorAll<HTMLElement>('.solid-gold-btn, .glass-btn, .card-cta-btn, .logo-box, .fx-switch-pill')
    const cleanups: (() => void)[] = []

    magneticElements.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
      }
      const onLeave = () => {
        el.style.transform = 'translate(0px, 0px)'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        el.style.transform = ''
      })
    })

    // 3D Card Tilt
    const tiltElements = document.querySelectorAll<HTMLElement>('.project-card, .pillar-card, .builder-card, .adv-card')
    tiltElements.forEach((card) => {
      const onCardMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const cardX = e.clientX - rect.left
        const cardY = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((cardY - centerY) / centerY) * -5
        const rotateY = ((cardX - centerX) / centerX) * 5
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`
      }
      const onCardLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      }
      card.addEventListener('mousemove', onCardMove)
      card.addEventListener('mouseleave', onCardLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', onCardMove)
        card.removeEventListener('mouseleave', onCardLeave)
        card.style.transform = ''
      })
    })

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [microFx, language, scrolled])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Active section spy
      const sections = ['top', 'story', 'projects', 'builders', 'advantage', 'advisors', 'contact-footer']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(sectionId)
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('js-ready')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.01, rootMargin: '200px 0px 50px 0px' }
    )

    const revealEls = document.querySelectorAll('[data-reveal]')
    revealEls.forEach((element) => {
      observer.observe(element)
      // Immediate check for elements in/near viewport
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight + 150) {
        element.classList.add('in-view')
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className={microFx ? 'micro-fx-active' : 'micro-fx-disabled'}>
      {/* Custom Magnetic Luxury Cursor */}
      {microFx && (
        <div className="custom-cursor-container" aria-hidden="true">
          <div
            className={`custom-cursor-dot ${cursorActive ? 'active' : ''}`}
            style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}
          />
          <div
            className={`custom-cursor-ring ${cursorActive ? 'active' : ''}`}
            style={{ transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)` }}
          >
            {cursorText && <span className="cursor-label">{cursorText}</span>}
          </div>
        </div>
      )}

      {/* Right Scroll Progress Timeline */}
      {microFx && (
        <div className="scroll-timeline-rail">
          <a
            href="#top"
            className={`rail-dot ${activeSection === 'top' ? 'active' : ''}`}
            data-label={en ? 'Home' : 'Inicio'}
          >
            <span className="dot-pip" />
          </a>
          <a
            href="#story"
            className={`rail-dot ${activeSection === 'story' ? 'active' : ''}`}
            data-label={en ? 'Vision' : 'Visión'}
          >
            <span className="dot-pip" />
          </a>
          <a
            href="#projects"
            className={`rail-dot ${activeSection === 'projects' ? 'active' : ''}`}
            data-label={en ? 'Projects' : 'Proyectos'}
          >
            <span className="dot-pip" />
          </a>
          <a
            href="#builders"
            className={`rail-dot ${activeSection === 'builders' ? 'active' : ''}`}
            data-label={en ? 'Partners' : 'Socios'}
          >
            <span className="dot-pip" />
          </a>
          <a
            href="#advantage"
            className={`rail-dot ${activeSection === 'advantage' ? 'active' : ''}`}
            data-label={en ? 'Cap Cana' : 'Destino'}
          >
            <span className="dot-pip" />
          </a>
          <a
            href="#advisors"
            className={`rail-dot ${activeSection === 'advisors' ? 'active' : ''}`}
            data-label={en ? 'Advisors' : 'Asesores'}
          >
            <span className="dot-pip" />
          </a>
          <a
            href="#contact-footer"
            className={`rail-dot ${activeSection === 'contact-footer' ? 'active' : ''}`}
            data-label={en ? 'Contact' : 'Contacto'}
          >
            <span className="dot-pip" />
          </a>
        </div>
      )}

      {/* Floating Micro-Interactions Toggle Widget */}
      <aside className="fx-switcher-widget">
        <button
          className={`fx-switch-pill ${microFx ? 'fx-on' : 'fx-off'}`}
          onClick={toggleMicroFx}
          title={en ? 'Click to toggle micro-interactions on/off' : 'Clic para activar/desactivar micro-interacciones'}
          aria-label="Toggle Micro-Interactions"
        >
          <span className="fx-icon">{microFx ? '✦' : '◇'}</span>
          <span className="fx-text">
            {en ? 'MICRO-INTERACTIONS:' : 'MICRO-INTERACCIONES:'}{' '}
            <strong className="fx-status">{microFx ? 'ON' : 'OFF'}</strong>
          </span>
          <span className="fx-indicator"></span>
        </button>
      </aside>

      {/* Header */}
      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <a className="wordmark" href="#top" aria-label="Bonita Luxury Living" data-cursor="ALVEARE">
          <div className="logo-box">
            <img src={media.alveareIcon} alt="Bonita Luxury Living" />
          </div>
          <div className="logo-text">
            <span className="brand-name">Bonita</span>
            <span className="brand-sub">LUXURY LIVING</span>
          </div>
        </a>

        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          <a href="#top" onClick={() => setMenuOpen(false)}>
            {en ? 'HOME' : 'INICIO'}
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            <img className="nav-icon" src={media.alveareIcon} alt="" />
            GOLF
          </a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>
            <img className="nav-icon" src={media.alveareIcon} alt="" />
            BEACH
          </a>
          <a href="#builders" onClick={() => setMenuOpen(false)}>
            {en ? 'BUILDERS' : 'SOCIOS'}
          </a>
          <a href="#advantage" onClick={() => setMenuOpen(false)}>
            {en ? 'CAP CANA' : 'DESTINO'}
          </a>
          <a href="#advisors" onClick={() => setMenuOpen(false)}>
            {en ? 'ADVISORS' : 'ASESORES'}
          </a>
          <a href="#contact-footer" onClick={() => setMenuOpen(false)}>
            {en ? 'CONTACT' : 'CONTACTO'}
          </a>

          <a className="phone-btn" href="tel:+18495051324">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+1 (849) 505-1324</span>
          </a>

          <button className="nav-cta" onClick={() => openModal(en ? 'Book a Private Tour' : 'Agendar Tour Privado')}>
            {en ? 'BOOK A TOUR' : 'AGENDAR TOUR'}
          </button>

          <button
            className="language-pill"
            onClick={() => setLanguage(en ? 'es' : 'en')}
            aria-label={en ? 'Cambiar a español' : 'Switch to English'}
          >
            <span>{en ? '🇺🇸 EN' : '🇪🇸 ES'}</span>
          </button>
        </nav>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline poster={media.hero}>
          <source src={media.heroVideo} type="video/mp4" />
        </video>
        <div className="hero-shade" />

        <div className="hero-copy">
          <div className="hero-badge">
            <img src={media.alveareIcon} alt="Alveare" className="hero-badge-icon" />
            <span>BONITA LUXURY LIVING · BY ALVEARE</span>
          </div>
          <h1>
            {en ? (
              <>
                Designing a New<br />
                <span className="gold-text">Standard of Luxury</span><br />
                in the Caribbean.
              </>
            ) : (
              <>
                Diseñando un Nuevo<br />
                <span className="gold-text">Estándar de Lujo</span><br />
                en el Caribe.
              </>
            )}
          </h1>
          <div className="hero-divider"></div>
          <p className="hero-text">
            {en
              ? 'Oceanfront living beside the championship golf course in the most prestigious enclave of Cap Cana. Designed for those who seek more than a home: a timeless legacy.'
              : 'Vida de lujo frente al mar y junto al campo de golf en los desarrollos más prestigiosos de Cap Cana. Diseñadas para quienes buscan más que un hogar: un legado.'}
          </p>
          <div className="hero-actions">
            <a className="solid-gold-btn" href="#projects" data-cursor={en ? 'EXPLORE' : 'EXPLORAR'}>
              {en ? 'EXPLORE PROJECTS' : 'EXPLORAR PROYECTOS'} <span>↗</span>
            </a>
          </div>
        </div>

        <div className="scroll-indicator" data-cursor="SCROLL">
          <span>{en ? 'DISCOVER MORE' : 'DESCUBRIR MÁS'}</span>
          <div className="mouse-pill">
            <div className="mouse-wheel"></div>
          </div>
        </div>

        <div className="hero-meta">
          <span>CAP CANA · REPÚBLICA DOMINICANA</span>
          <span>PUNTA ESPADA & CRYSTAL LAGOONS®</span>
        </div>
      </section>

      {/* Vision / Promise Section */}
      <section className="intro section-grid" id="story" data-reveal>
        <div className="section-label">
          01 <span>{en ? 'THE VISION' : 'LA VISIÓN'}</span>
        </div>
        <div className="intro-content">
          <div className="intro-badge">
            <span>{en ? 'OUR PROMISE' : 'NUESTRA PROMESA'}</span>
          </div>
          <h2>
            {en ? (
              <>
                A vision of <span className="gold-text">timeless luxury</span> in Cap Cana
              </>
            ) : (
              <>
                Una visión de <span className="gold-text">lujo atemporal</span> en Cap Cana
              </>
            )}
          </h2>
          <div className="gold-accent-line"></div>
          <p className="large-copy">
            {en
              ? 'Bonita Luxury Living redefines Caribbean luxury living with world-class design, privileged location, and lasting value for discerning global investors.'
              : 'Bonita Luxury Living redefine la vida de lujo caribeña con diseño de clase mundial, ubicación privilegiada y valor duradero para inversionistas exigentes.'}
          </p>

          <div className="value-pillars">
            <div className="pillar-card" data-cursor="LOCATION">
              <div className="pillar-icon">🏝️</div>
              <div>
                <h3>{en ? 'Privileged Location' : 'Ubicación Privilegiada'}</h3>
                <p>{en ? 'Oceanfront and beside the golf course in the heart of Cap Cana.' : 'Frente al mar y junto al campo de golf en el corazón de Cap Cana.'}</p>
              </div>
            </div>

            <div className="pillar-card" data-cursor="DESIGN">
              <div className="pillar-icon">🏗️</div>
              <div>
                <h3>{en ? 'World-Class Design' : 'Diseño de Clase Mundial'}</h3>
                <p>{en ? 'Modern architectural perfection, premium imported finishes.' : 'Arquitectura moderna de vanguardia y acabados de lujo.'}</p>
              </div>
            </div>

            <div className="pillar-card" data-cursor="VALUE">
              <div className="pillar-icon">📈</div>
              <div>
                <h3>{en ? 'Lasting Value' : 'Valor Duradero'}</h3>
                <p>{en ? 'Investment-grade luxury properties with high capital appreciation.' : 'Propiedades de lujo con alta plusvalía y retorno de inversión.'}</p>
              </div>
            </div>
          </div>

          <div className="stats">
            <div>
              <b>15+</b>
              <span>{en ? <>Years of<br />Excellence</> : <>Años de<br />Excelencia</>}</span>
            </div>
            <div>
              <b>02</b>
              <span>{en ? <>Signature<br />Developments</> : <>Desarrollos<br />Emblemáticos</>}</span>
            </div>
            <div>
              <b>∞</b>
              <span>{en ? <>Limitless<br />Lifestyle</> : <>Estilo de<br />Vida Exclusivo</>}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Panoramic Visual */}
      <section className="story-image" style={{ backgroundImage: `url(${media.beach})` }} data-cursor="CAP CANA">
        <div className="story-overlay"></div>
        <div className="floating-years-badge">
          <b>15+</b>
          <span>{en ? 'Years of Excellence' : 'Años de Excelencia'}</span>
        </div>
        <div className="image-caption">
          <span>THE ART OF LIVING WELL</span>
          <span>CAP CANA · REPÚBLICA DOMINICANA</span>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects section-grid" id="projects" data-reveal>
        <div className="section-label">
          02 <span>{en ? 'THE DEVELOPMENTS' : 'LOS PROYECTOS'}</span>
        </div>
        <div className="projects-content">
          <div className="intro-badge">
            <span>{en ? 'INVESTMENT OPPORTUNITIES' : 'OPORTUNIDADES DE INVERSIÓN'}</span>
          </div>
          <h2>
            {en ? (
              <>
                Our <span className="gold-text">Signature Projects</span>
              </>
            ) : (
              <>
                Nuestros <span className="gold-text">Proyectos</span>
              </>
            )}
          </h2>
          <div className="gold-accent-line"></div>
          <p className="large-copy">
            {en
              ? 'Two ultra-premium developments offering luxury living and privileged locations in Cap Cana’s most coveted settings.'
              : 'Dos desarrollos premium que ofrecen vida de lujo y ubicaciones privilegiadas en las áreas más codiciadas de Cap Cana.'}
          </p>
        </div>

        <div className="project-cards">
          {/* Bonita Golf */}
          <div className="project-card" data-cursor="GOLF">
            <div className="card-image" style={{ backgroundImage: `url(${media.golf})` }}>
              {microFx && (
                <div className="interactive-hotspots">
                  <span className="hotspot-chip">⛳ Punta Espada Hole 14</span>
                  <span className="hotspot-chip">🏊 Private Pool</span>
                </div>
              )}
            </div>
            <div className="project-badges">
              <span className="status construction">
                <span className="status-dot orange"></span> {en ? 'Under Construction' : 'En Construcción'}
              </span>
              <span className="location-badge">{en ? 'GOLF COURSE VIEW' : 'VISTA AL CAMPO DE GOLF'}</span>
              <div className="project-facts">
                <span>{en ? 'LAUNCH' : 'LANZAMIENTO'} <b>2024</b></span>
                <span>{en ? 'UNITS' : 'UNIDADES'} <b>160</b></span>
                <span>{en ? 'DELIVERY' : 'ENTREGA'} <b>2027</b></span>
              </div>
            </div>
            <div className="card-info glass">
              <div className="location-pin">
                <span>⌖</span> {en ? 'Cap Cana Golf Course' : 'Campo de Golf Cap Cana'}
              </div>
              <h3>Bonita Golf</h3>
              <p>
                {en ? 'From' : 'Desde'} <b>$440,000 USD</b>
              </p>
              <div className="card-actions">
                <button className="card-cta-btn" onClick={() => openModal('Bonita Golf - Tour & Information')} data-cursor="DOSSIER">
                  {en ? 'REQUEST DOSSIER' : 'SOLICITAR DOSSIER'} ↗
                </button>
              </div>
            </div>
          </div>

          {/* Bonita Beach */}
          <div className="project-card" data-cursor="BEACH">
            <div className="card-image" style={{ backgroundImage: `url(${media.beach})` }}>
              {microFx && (
                <div className="interactive-hotspots">
                  <span className="hotspot-chip">🌊 Crystal Lagoons® 10k m²</span>
                  <span className="hotspot-chip">🏖️ Private Beach</span>
                </div>
              )}
            </div>
            <div className="project-badges">
              <span className="status new">
                <span className="status-dot blue"></span> {en ? 'New Project' : 'Nuevo Proyecto'}
              </span>
              <span className="location-badge beach-badge">{en ? 'PRIVATE BEACH & LAGOON' : 'PLAYA PRIVADA & LAGUNA'}</span>
              <div className="project-facts">
                <span>{en ? 'LAUNCH' : 'LANZAMIENTO'} <b>2027</b></span>
                <span>{en ? 'UNITS' : 'UNIDADES'} <b>282</b></span>
                <span>{en ? 'DELIVERY' : 'ENTREGA'} <b>2029</b></span>
              </div>
            </div>
            <div className="card-info glass">
              <div className="location-pin">
                <span>⌖</span> {en ? 'Cap Cana Oceanfront' : 'Frente al Mar Cap Cana'}
              </div>
              <h3>Bonita Beach</h3>
              <p>
                {en ? 'From' : 'Desde'} <b>$340,000 USD</b>
              </p>
              <div className="card-actions">
                <button className="card-cta-btn" onClick={() => openModal('Bonita Beach - Tour & Information')} data-cursor="DOSSIER">
                  {en ? 'REQUEST DOSSIER' : 'SOLICITAR DOSSIER'} ↗
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Callout Banner ("Asegura Tu Unidad Hoy") */}
        <div className="secure-unit-banner">
          <div className="secure-content">
            <h3>{en ? 'Secure Your Unit Today' : 'Asegura Tu Unidad Hoy'}</h3>
            <p>
              {en
                ? 'Limited availability. Premium units sell quickly to discerning international investors. Schedule your private consultation and secure your legacy in the Caribbean.'
                : 'Disponibilidad limitada. Las unidades premium se reservan rápidamente por inversionistas que reconocen el valor excepcional. Agenda tu tour privado y asegura tu inversión en el Caribe.'}
            </p>
            <div className="secure-actions">
              <button className="solid-gold-btn" onClick={() => openModal(en ? 'More Information' : 'Más Información')}>
                {en ? 'MORE INFORMATION' : 'MÁS INFORMACIÓN'} ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Builders Showcase Section */}
      <section className="builders-section" id="builders" data-reveal>
        <div className="max-container">
          <div className="builders-header">
            <div className="intro-badge light">
              <span>{en ? 'PROVEN TRACK RECORD' : 'TRAYECTORIA COMPROBADA'}</span>
            </div>
            <h2>
              {en ? (
                <>
                  Built by the Visionaries Behind the Caribbean’s <span className="gold-text">Most Iconic Resorts</span>
                </>
              ) : (
                <>
                  Construido por los Visionarios Detrás de los Resorts más <span className="gold-text">Icónicos del Caribe</span>
                </>
              )}
            </h2>
            <div className="gold-accent-line center"></div>
            <p className="builders-sub">
              {en
                ? 'Bonita is crafted with the same standard of architectural mastery, engineering, and execution as world-renowned landmarks.'
                : 'Bonita está diseñado con la misma excelencia por nuestros socios líderes en arquitectura, desarrollo y construcción.'}
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="builders-grid">
            {builderPartners.map((builder) => (
              <div className="builder-card" key={builder.id}>
                <div className="builder-logo-wrap">
                  <img src={builder.logo} alt={`${builder.name} logo`} />
                </div>
                <p className="builder-desc">{en ? builder.descEn : builder.descEs}</p>

                <div className="related-projects-heading">
                  <span>{en ? 'RELATED PROJECTS' : 'PROYECTOS RELACIONADOS'}</span>
                </div>

                <div className="builder-projects-list">
                  {builder.projects.map((proj, pIdx) => (
                    <div className="project-mini-row" key={pIdx}>
                      <img src={proj.img} alt={proj.name} />
                      <div className="project-mini-info">
                        <h4>{proj.name}</h4>
                        <p>{en ? proj.descEn : proj.descEs}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="builder-tagline">
                  <p>"{en ? builder.taglineEn : builder.taglineEs}"</p>
                </div>
              </div>
            ))}
          </div>

          {/* Builder CTAs */}
          <div className="builders-footer-cta">
            <p>
              {en
                ? 'The same trusted teams now bring their visionary execution to'
                : 'Los mismos equipos de confianza ahora traen su visión a'}{' '}
              <strong>Bonita Luxury Living</strong>
            </p>
            <div className="builder-cta-buttons">
              <a className="solid-gold-btn" href="#projects">
                {en ? 'EXPLORE BONITA GOLF' : 'EXPLORAR BONITA GOLF'} ↗
              </a>
              <a className="outline-btn-ocean" href="#projects">
                {en ? 'EXPLORE BONITA BEACH' : 'EXPLORAR BONITA BEACH'} ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cap Cana Advantage Section */}
      <section className="advantage-section" id="advantage" data-reveal>
        <div className="max-container advantage-grid">
          <div className="advantage-copy">
            <div className="intro-badge light">
              <span>03 · {en ? 'THE DESTINATION' : 'EL DESTINO'}</span>
            </div>
            <h2>
              {en ? (
                <>
                  The Advantage of <span className="gold-text">Cap Cana</span>
                </>
              ) : (
                <>
                  La Ventaja de <span className="gold-text">Cap Cana</span>
                </>
              )}
            </h2>
            <div className="gold-accent-line"></div>
            <p className="large-copy light">
              {en
                ? 'Cap Cana stands out as the Caribbean’s premier luxury destination, combining natural beauty, world-class amenities, and sophisticated lifestyle opportunities.'
                : 'Cap Cana se destaca como el destino de lujo premier del Caribe, ofreciendo una combinación inigualable de belleza natural, amenidades de clase mundial y oportunidades de estilo de vida sofisticado.'}
            </p>

            <div className="advantage-cards">
              <div className="adv-card">
                <div className="adv-icon green">⛳</div>
                <div>
                  <h3>{en ? 'Championship Golf' : 'Golf de Campeonato'}</h3>
                  <p>
                    {en
                      ? 'Play at Punta Espada Golf Club, designed by Jack Nicklaus and consistently ranked #1 in the Caribbean and Mexico.'
                      : 'Juega en el campo de golf Punta Espada diseñado por Jack Nicklaus, consistentemente clasificado #1 en el Caribe y México.'}
                  </p>
                </div>
              </div>

              <div className="adv-card">
                <div className="adv-icon coral">🏖️</div>
                <div>
                  <h3>{en ? 'Pristine Beaches & Marina' : 'Playas Prístinas & Marina'}</h3>
                  <p>
                    {en
                      ? 'Miles of white powder sand, crystal waters, private beach clubs, and an elite state-of-the-art marina.'
                      : 'Kilómetros de arena blanca con aguas cristalinas, clubes de playa privados y una marina de clase mundial.'}
                  </p>
                </div>
              </div>

              <div className="adv-card">
                <div className="adv-icon gold">✈️</div>
                <div>
                  <h3>{en ? 'Global Accessibility' : 'Accesibilidad Global'}</h3>
                  <p>
                    {en
                      ? 'Private airport, luxury resort spas, Michelin-standard dining, and seamless international flight connections.'
                      : 'Aeropuerto privado, resorts de ultra-lujo, alta gastronomía y conectividad aérea fluida con los principales destinos.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="advantage-visual">
            <div className="visual-frame">
              <img src={media.beach} alt="Cap Cana aerial luxury view" />
              <div className="visual-badge">
                <b>15+</b>
                <span>{en ? 'Years of Luxury Leadership' : 'Años Liderando el Lujo'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate Advisors Section */}
      <section className="advisors-section" id="advisors" data-reveal>
        <div className="max-container">
          <div className="advisors-header">
            <div className="intro-badge">
              <img src={media.alveareIcon} alt="Alveare" className="hero-badge-icon" />
              <span>04 · {en ? 'PRIVATE ADVISORY' : 'ASESORÍA EXCLUSIVA'}</span>
            </div>
            <h2>
              {en ? (
                <>
                  Your Dedicated <span className="gold-text">Real Estate Advisors</span>
                </>
              ) : (
                <>
                  Nuestros <span className="gold-text">Asesores Inmobiliarios</span>
                </>
              )}
            </h2>
            <div className="gold-accent-line center"></div>
            <p className="advisors-sub">
              {en
                ? 'Certified luxury specialists from Alveare providing personalized guidance, master plans, and confidential access to Cap Cana’s finest developments.'
                : 'Especialistas certificados de Alveare brindando asesoría personalizada, planos maestros y acceso confidencial a los mejores desarrollos de Cap Cana.'}
            </p>
          </div>

          <div className="advisors-grid">
            {/* Howard Luna */}
            <div className="advisor-card" data-cursor="HOWARD">
              <div className="advisor-image-wrap">
                <img src={media.howardLuna} alt="Howard Luna - Asesor Inmobiliario" />
                <div className="advisor-badge">
                  <span className="dot-active"></span>
                  <span>{en ? 'Real Estate Advisor' : 'Asesor Inmobiliario'}</span>
                </div>
              </div>
              <div className="advisor-info">
                <h3>Howard Luna</h3>
                <span className="advisor-role">{en ? 'Real Estate Advisor' : 'Asesor Inmobiliario'}</span>
                <p className="advisor-bio">
                  {en
                    ? 'Expert in high-yield luxury investments, golf enclaves, and prime residential acquisitions across Cap Cana.'
                    : 'Especialista en inversiones inmobiliarias de alto rendimiento, enclaves de golf y residencias exclusivas en Cap Cana.'}
                </p>
              </div>
            </div>

            {/* Ambra Solesin */}
            <div className="advisor-card" data-cursor="AMBRA">
              <div className="advisor-image-wrap">
                <img src={media.ambraSolesin} alt="Ambra Solesin - Asesora Inmobiliaria" />
                <div className="advisor-badge">
                  <span className="dot-active"></span>
                  <span>{en ? 'Real Estate Advisor' : 'Asesora Inmobiliaria'}</span>
                </div>
              </div>
              <div className="advisor-info">
                <h3>Ambra Solesin</h3>
                <span className="advisor-role">{en ? 'Real Estate Advisor' : 'Asesora Inmobiliaria'}</span>
                <p className="advisor-bio">
                  {en
                    ? 'Dedicated to beachfront property selection and premier personalized service for international clients.'
                    : 'Dedicada a la selección de propiedades de playa y atención personalizada de primer nivel para clientes internacionales.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Call to Action */}
      <section className="cta" style={{ backgroundImage: `url(${media.beach})` }} data-reveal>
        <div className="cta-overlay" />
        <div className="cta-content">
          <div className="intro-badge light">
            <span>{en ? 'YOUR SANCTUARY AWAITS' : 'TU SANTUARIO TE ESPERA'}</span>
          </div>
          <h2>
            {en ? (
              <>
                Your Dream Home<br />
                <span className="gold-text">Awaits.</span>
              </>
            ) : (
              <>
                Tu Hogar de Ensueño<br />
                <span className="gold-text">Te Espera.</span>
              </>
            )}
          </h2>
          <div className="gold-accent-line center"></div>
          <p>
            {en
              ? 'Join the exclusive community of discerning owners who have chosen Bonita Luxury Living as their Caribbean sanctuary.'
              : 'Únete a la comunidad exclusiva de propietarios exigentes que han elegido Bonita Luxury Living como su santuario caribeño. Experimenta el pináculo de la vida de lujo en el paraíso.'}
          </p>

          <div className="cta-actions">
            <button className="solid-gold-btn large" onClick={() => openModal(en ? 'More Information' : 'Más Información')}>
              {en ? 'MORE INFORMATION' : 'MÁS INFORMACIÓN'} ↗
            </button>
          </div>

          <div className="trust-row">
            <span>✓ Licensed Real Estate</span>
            <span>✓ 15+ Years Experience</span>
            <span>✓ Luxury Specialists</span>
          </div>
        </div>
      </section>

      {/* Footer & Endorsement */}
      <footer id="contact-footer">
        <div className="max-container">
          <div className="footer-top-grid">
            <div className="footer-col-main">
              <a className="wordmark footer-logo" href="#top" aria-label="Bonita Luxury Living">
                <div className="logo-box">
                  <img src={media.alveareIcon} alt="Bonita Luxury Living" />
                </div>
                <div className="logo-text">
                  <span className="brand-name">Bonita</span>
                  <span className="brand-sub">LUXURY LIVING</span>
                </div>
              </a>
              <p className="footer-bio">
                {en
                  ? 'Exclusive luxury real estate development and marketing in Cap Cana, Dominican Republic. Creating timeless living experiences and generational wealth.'
                  : 'Desarrollo y comercialización exclusiva de bienes raíces de ultra-lujo en Cap Cana, República Dominicana. Creando experiencias de vida extraordinarias y valor patrimonial.'}
              </p>

              <div className="footer-socials">
                <a href="https://instagram.com/alveare.do" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://facebook.com/alveare.do" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/alveare" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">{en ? 'QUICK LINKS' : 'ENLACES RÁPIDOS'}</h4>
              <ul>
                <li><a href="#projects">Bonita Golf</a></li>
                <li><a href="#projects">Bonita Beach</a></li>
                <li><a href="#builders">{en ? 'Partners & Builders' : 'Socios & Constructores'}</a></li>
                <li><a href="#advantage">{en ? 'Why Cap Cana' : 'Por qué Cap Cana'}</a></li>
                <li><button onClick={() => openModal()}>{en ? 'Book a Tour' : 'Agendar Tour'}</button></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">{en ? 'CONTACT' : 'CONTACTO'}</h4>
              <div className="contact-item">
                <span className="c-label">{en ? 'Location' : 'Ubicación'}</span>
                <p>Blvd. 1ro. de Noviembre Esq Cubik Tower A<br />Oficina 301, Punta Cana 23000</p>
              </div>
              <div className="contact-item">
                <span className="c-label">{en ? 'Phone / WhatsApp' : 'Teléfono / WhatsApp'}</span>
                <a href="tel:+18495051324">+1 (849) 505-1324</a>
              </div>
              <div className="contact-item">
                <span className="c-label">{en ? 'Email' : 'Correo'}</span>
                <a href="mailto:howard@alveare.do">howard@alveare.do</a>
              </div>
            </div>
          </div>

          {/* Crystal Lagoons Legal Disclaimer Bar */}
          <div className="crystal-disclaimer-bar">
            <img src={media.crystalLagoonWhite} alt="Crystal Lagoons logo" />
            <p>
              {en
                ? 'Bonita Beach features a crystal-clear artificial lagoon powered by Crystal Lagoons® technology. Crystal Lagoons® is a registered trademark of Crystal Lagoons group of companies.'
                : 'Bonita Beach incluye una laguna artificial de aguas cristalinas impulsada por la tecnología Crystal Lagoons®. Crystal Lagoons® es una marca registrada del grupo de empresas Crystal Lagoons.'}
            </p>
          </div>

          <div className="copyright-bar">
            <span>© 2026 Bonita Luxury Living by Alveare. {en ? 'All rights reserved.' : 'Todos los derechos reservados.'}</span>
            <div className="legal-links">
              <span>{en ? 'Privacy Policy' : 'Política de Privacidad'}</span>
              <span>•</span>
              <span>{en ? 'Terms & Conditions' : 'Términos y Condiciones'}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Lead Capture */}
      {contactOpen && (
        <div className="modal-backdrop" onClick={() => setContactOpen(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setContactOpen(false)}>
              ×
            </button>

            {submitted ? (
              <div className="modal-success">
                <div className="success-icon">✓</div>
                <h3>{en ? 'Request Received!' : '¡Solicitud Recibida!'}</h3>
                <p>
                  {en
                    ? 'Thank you. A luxury specialist from Alveare will contact you shortly at your email and phone with all details.'
                    : 'Gracias. Un especialista de Alveare se pondrá en contacto contigo a la brevedad con la lista de precios y detalles exclusivos.'}
                </p>
                <button className="solid-gold-btn" onClick={() => setContactOpen(false)}>
                  {en ? 'CLOSE' : 'CERRAR'}
                </button>
              </div>
            ) : (
              <>
                <div className="intro-badge">
                  <span>{en ? 'EXCLUSIVE ACCESS' : 'ACCESO EXCLUSIVO'}</span>
                </div>
                <h2>{modalTitle || (en ? 'Book Your Private Tour' : 'Agenda tu Tour Privado')}</h2>
                <p className="modal-subtitle">
                  {en
                    ? 'Leave your details to receive private access, full pricing sheets, and master plans directly from Alveare.'
                    : 'Déjanos tus datos para recibir acceso privado, lista de precios detallada y planos maestros directamente de Alveare.'}
                </p>

                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label>{en ? 'Full Name' : 'Nombre Completo'}</label>
                    <input
                      placeholder={en ? 'e.g. John Doe' : 'ej. Carlos Mendoza'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{en ? 'Email Address' : 'Correo Electrónico'}</label>
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{en ? 'Phone Number / WhatsApp' : 'Teléfono / WhatsApp'}</label>
                    <input
                      placeholder="+1 (849) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>{en ? 'Project of Interest' : 'Proyecto de Interés'}</label>
                    <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                      <option value="both">{en ? 'Both Projects (Golf & Beach)' : 'Ambos Proyectos (Golf & Beach)'}</option>
                      <option value="golf">Bonita Golf (From $440,000)</option>
                      <option value="beach">Bonita Beach (From $340,000)</option>
                    </select>
                  </div>

                  <button className="solid-gold-btn full-width" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (en ? 'SENDING...' : 'ENVIANDO...') : (en ? 'REQUEST EXCLUSIVE ACCESS' : 'SOLICITAR ACCESO EXCLUSIVO')}{' '}
                    ↗
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default App


