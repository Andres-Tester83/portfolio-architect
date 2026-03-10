import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import TechStack from './components/TechStack.jsx';
import Showcase from './components/Showcase.jsx';
import Contact from './components/Contact.jsx';

function App() {
    return (
        <div className="app-wrapper">
            <header style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(5, 5, 5, 0.7)' }}>
                <div className="container" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="font-heading font-bold tracking-tight" style={{ fontSize: '1.5rem' }}>
                        Architect<span style={{ color: 'var(--accent-blue)' }}>.</span>
                    </div>
                    <nav className="desktop-nav flex gap-6" style={{ gap: '2.5rem' }}>
                        <a href="#about" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Identidad</a>
                        <a href="#stack" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Stack</a>
                        <a href="#proyectos" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Proyectos</a>
                        <a href="#contacto" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Contacto</a>
                    </nav>
                </div>
                {/* Mobile nav row */}
                <div className="mobile-nav" style={{ display: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '0.6rem 1rem', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
                    {['Identidad|#about', 'Stack|#stack', 'Proyectos|#proyectos', 'Contacto|#contacto'].map((item, i, arr) => {
                        const [label, href] = item.split('|');
                        return (
                            <span key={href} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <a href={href} className="text-secondary nav-link" style={{ fontSize: '0.82rem', fontWeight: 500, padding: '0 0.75rem', transition: 'color 0.2s' }}>{label}</a>
                                {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.2)', userSelect: 'none' }}>|</span>}
                            </span>
                        );
                    })}
                </div>
                <style dangerouslySetInnerHTML={{
                    __html: `
          .nav-link:hover { color: var(--text-primary); }
          @media (max-width: 640px) {
            .desktop-nav { display: none !important; }
            .mobile-nav  { display: flex !important; }
          }
        `}} />
            </header>

            <main className="container">
                <Hero />
                <About />
                <TechStack />
                <Showcase />
                <Contact />
            </main>

            <footer className="container py-12 text-center text-secondary mt-20" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <p>© {new Date().getFullYear()} Architect of Growth. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default App;
