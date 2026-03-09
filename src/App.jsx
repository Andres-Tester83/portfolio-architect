import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import TechStack from './components/TechStack.jsx';
import Showcase from './components/Showcase.jsx';
import Contact from './components/Contact.jsx';

function App() {
    return (
        <div className="app-wrapper">
            <header className="py-8 flex justify-between items-center" style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(5, 5, 5, 0.7)', padding: '1rem 2rem' }}>
                <div className="font-heading text-xl font-bold tracking-tight" style={{ fontSize: '1.5rem' }}>
                    Architect<span style={{ color: 'var(--accent-blue)' }}>.</span>
                </div>
                <nav className="flex gap-6" style={{ display: 'flex', gap: '2.5rem' }}>
                    <a href="#about" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Identidad</a>
                    <a href="#stack" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Stack</a>
                    <a href="#proyectos" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Proyectos</a>
                    <a href="#contacto" className="text-secondary nav-link" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>Contacto</a>
                </nav>
                <style dangerouslySetInnerHTML={{
                    __html: `
          .nav-link:hover { color: var(--text-primary); }
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
