import React from 'react';
import { User, Code2, Rocket, Workflow, Layout, MessageSquare, Target } from 'lucide-react';

const services = [
    {
        icon: <Workflow size={24} color="var(--accent-blue)" />,
        title: "Orquestación & IA",
        desc: "Sistemas n8n y Make interconectados con LLMs para escalar operaciones."
    },
    {
        icon: <Layout size={24} color="var(--accent-blue)" />,
        title: "Webs & Vibe Coding",
        desc: "Desarrollo y diseño web acelerado por IA, garantizando MVP técnicos listos para producción."
    },
    {
        icon: <Target size={24} color="var(--accent-blue)" />,
        title: "Arquitectura de CRM",
        desc: "Implementación de Kommo, GHL y Monday para mapear trayectos de ventas sin fricción."
    },
    {
        icon: <MessageSquare size={24} color="var(--accent-blue)" />,
        title: "Embudos & Chatbots",
        desc: "Automatización en ManyChat y WhatsApp atada a funnels comprobados."
    }
];

const partners = [
    { name: 'n8n',  src: '/images/n8n-logo.png' },
    { name: 'Make', src: '/images/make-logo.png' },
    { name: 'Kommo', src: '/images/kommo-logo.png' },
    { name: 'GoHighLevel', src: '/images/GHL-logo.png' },
    { name: 'Antigravity', src: '/images/antigv-logo.png' },
];

// Duplicate so the marquee looks seamless
const marqueeItems = [...partners, ...partners];

const About = () => {
    return (
        <section id="about" className="section-padding" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>

            <div className="container">
                <div className="glass-panel about-card" style={{ padding: '4rem', position: 'relative', overflow: 'hidden' }}>

                    {/* Decorative watermark */}
                    <div className="about-watermark" style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '0.2em', textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                        ENGINEER
                    </div>

                    {/* Identity text block */}
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
                            <User size={14} /> IDENTIDAD
                        </div>

                        <h2 className="font-heading font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', marginBottom: '0.4rem' }}>Andrés</h2>
                        <h3 className="font-heading text-secondary" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', fontWeight: 400, marginBottom: '1.75rem' }}>Arquitecto de Sistemas &amp; Growth Specialist</h3>

                        <div style={{ width: '40px', height: '2px', background: 'var(--accent-blue)', marginBottom: '2rem' }}></div>

                        <p className="text-secondary" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                            Me defino como un profesional enfocado en la lógica y la resolución de problemas a través de la tecnología. Mi objetivo es transformar procesos manuales en ecosistemas eficientes y rentables. Con un dominio técnico en herramientas como <strong>n8n, Make y Kommo</strong>, diseño integraciones complejas que conectan tu marketing con tu operación real.
                        </p>
                        <p className="text-secondary" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: 1.85 }}>
                            Desde la arquitectura de funnels de venta en <strong>GoHighLevel y Simvoly</strong>, hasta la implementación de <em>Vibe Coding</em> y desarrollo en WordPress, mi enfoque es siempre dinámico: si el proyecto requiere una herramienta nueva, la aprendo y la ejecuto. Mi compromiso es la responsabilidad y la entrega de soluciones que no solo funcionen, sino que <strong>escalen tu negocio.</strong>
                        </p>

                        {/* Stat badges */}
                        <div className="about-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Code2 size={18} color="var(--accent-blue)" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Aprendizaje</strong>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Empírico &amp; IA</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Rocket size={18} color="var(--accent-blue)" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Enfoque</strong>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Escalabilidad</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Partner Logo Marquee ── */}
                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                            Stack de herramientas
                        </p>
                        <div className="marquee-wrapper" style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)', maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' }}>
                            <div className="marquee-track">
                                {marqueeItems.map((p, i) => (
                                    <div key={i} className="marquee-item">
                                        <img
                                            src={p.src}
                                            alt={p.name}
                                            style={{ height: '52px', maxWidth: '140px', objectFit: 'contain', filter: 'grayscale(100%) brightness(0.6)', transition: 'filter 0.3s' }}
                                            onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%) brightness(1)'}
                                            onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%) brightness(0.6)'}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services grid */}
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="glass-panel"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '2px solid transparent', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderTopColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {service.icon}
                            </div>
                            <h4 className="font-heading font-bold" style={{ fontSize: '1.1rem' }}>{service.title}</h4>
                            <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
