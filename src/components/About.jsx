import React from 'react';
import { User, Code2, Rocket, Workflow, Layout, MessageSquare, LineChart, Target } from 'lucide-react';

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

const About = () => {
    return (
        <section id="about" className="section-padding" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }}></div>

            <div className="container">
                <div className="glass-panel" style={{ padding: '4rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>

                    {/* Título Vertical / Dekorativo */}
                    <div style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: '5rem', fontWeight: 900, color: 'rgba(255,255,255,0.02)', letterSpacing: '0.2em', textTransform: 'uppercase', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                        ENGINEER
                    </div>

                    <div style={{ flex: '1 1 300px', zIndex: 10 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-blue)', marginBottom: '1.5rem' }}>
                            <User size={14} /> IDENTIDAD
                        </div>

                        <h2 className="font-heading font-bold text-3xl mb-2">Andrés</h2>
                        <h3 className="font-heading text-xl text-secondary mb-6" style={{ fontWeight: 400 }}>Arquitecto de Sistemas & Growth Specialist</h3>

                        <div style={{ width: '40px', height: '2px', background: 'var(--accent-blue)', marginBottom: '2rem' }}></div>

                        <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                            Mi historia en la tecnología no viene de la academia tradicional, sino de la pura resolución de problemas del mundo real. <strong>Mi conocimiento es 100% empírico</strong>, forjado al ver negocios estancarse por fricción operativa y decidir construir la salida.
                        </p>
                        <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                            Me dedico a diseñar ecosistemas digitales, <em>vibe coding</em> y automatizaciones avanzadas porque entiendo que en la era de la IA, lo importante no es escribir líneas de código repetitivas, sino tener la claridad arquitectónica para integrar las herramientas exactas y <strong>orquestar sistemas que piensen por sí mismos y hagan escalar los ingresos.</strong>
                        </p>

                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Code2 size={18} color="var(--accent-blue)" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Aprendizaje</strong>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Empírico & IA</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Rocket size={18} color="var(--accent-blue)" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Enfoque</strong>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Escalabilidad</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Services Section attached to About */}
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {services.map((service, index) => (
                    <div key={index} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '2px solid transparent', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.borderTopColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {service.icon}
                        </div>
                        <h4 className="font-heading font-bold" style={{ fontSize: '1.1rem' }}>{service.title}</h4>
                        <p className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{service.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default About;
