import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const Hero = () => {
    return (
        <section className="section-padding flex flex-col items-center justify-center text-center mt-20" style={{ minHeight: '60vh' }}>
            <div className="glass-panel" style={{ padding: '8px 16px', borderRadius: '24px', marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0,240,255,0.3)', background: 'rgba(0,240,255,0.05)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-blue)', boxShadow: '0 0 8px var(--accent-blue)' }}></span>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500, letterSpacing: '0.05em' }}>AVAILABLE FOR NEW PROJECTS</span>
            </div>

            <h1 className="font-heading font-bold tracking-tight mb-6 text-gradient" style={{ fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)', lineHeight: 1.1, maxWidth: '900px' }}>
                Sistemas que Piensan.<br />
                <span className="text-gradient-accent">Negocios que Escalan.</span>
            </h1>

            <p className="text-secondary mb-10" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                Arquitectura de ecosistemas digitales mediante IA, Automatización Avanzada y Funnels de Alta Conversión.
            </p>

            <div className="flex gap-4 justify-center" style={{ flexWrap: 'wrap' }}>
                <a href="#proyectos" className="btn btn-primary" style={{ gap: '8px' }}>
                    Ver Proyectos <ArrowRight size={18} />
                </a>
                <a href="#contacto" className="btn btn-outline" style={{ gap: '8px' }}>
                    <Calendar size={18} /> Agendar Consultoría
                </a>
            </div>
        </section>
    );
};

export default Hero;
