import React, { useState } from 'react';
import { MessageSquare, Calendar, FileText, Zap, Globe, Rocket, PlayCircle } from 'lucide-react';
import ChatDemo from './ChatDemo.jsx';

const solutionsData = [
    {
        icon: <MessageSquare size={32} style={{ color: 'var(--accent-blue)' }} />,
        title: "Atención y Ventas 24/7",
        description: "Imagina que un cliente potencial te escribe a las 3 AM. Sin que tú interactúes, un asistente inteligente responde a sus dudas, evalúa si es un buen prospecto y le agenda una reunión directamente en tu calendario. Nunca vuelves a perder una venta o una oportunidad.",
        highlight: "Ideal para redes sociales y WhatsApp.",
        actionText: "DEMO INTERACTIVA",
        actionType: "demo"
    },
    {
        icon: <Zap size={32} style={{ color: 'var(--accent-blue)' }} />,
        title: "Finanzas sin Esfuerzo",
        description: "En lugar de pasar horas copiando datos de facturas o estados de cuenta de forma manual, un sistema lee tus documentos automáticamente, extrae lo importante y lo organiza en una pantalla clara. Evitas errores humanos y recuperas decenas de horas al mes para enfocarte en crecer.",
        highlight: "Cero intervención manual.",
        actionText: "VER DASHBOARDS",
        actionType: "scroll",
        targetId: "orquestacion"
    },
    {
        icon: <Globe size={32} style={{ color: 'var(--accent-blue)' }} />,
        title: "Presencia Premium",
        description: "Tu negocio necesita más que una simple página en internet. Creo plataformas interactivas donde tus clientes perciben una marca premium, pueden comprar o gestionar servicios de forma fluida, y que están diseñadas específicamente para atraer y retener más clientes.",
        highlight: "Diseño interactivo de nueva generación.",
        actionText: "VER PLATAFORMAS",
        actionType: "scroll",
        targetId: "desarrollo-web"
    }
];

const Solutions = () => {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <section id="soluciones" className="section-padding">
            <div className="text-center mb-16" style={{ marginBottom: '4rem' }}>
                <h2 className="font-heading font-bold tracking-tight mb-4 text-gradient" style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 3.5rem)', lineHeight: 1.1 }}>
                    <span className="text-gradient-accent">Impacto Real</span> en tu Negocio.
                </h2>
                <p className="text-secondary mx-auto" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                    Si la tecnología suena complicada, hablemos de resultados. Así es como mi trabajo se traduce en beneficios directos para ti y tus clientes.
                </p>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '2rem',
                marginTop: '1rem'
            }}>
                {solutionsData.map((solution, index) => {
                    return (
                    <div key={index} className="glass-panel" style={{ 
                        padding: '2.5rem 2rem', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '1.25rem',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onClick={() => {
                        if (solution.actionType === 'demo') {
                            setShowDemo(true);
                        } else if (solution.actionType === 'scroll') {
                            const el = document.getElementById(solution.targetId);
                            if(el) {
                                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                                window.scrollTo({top: y, behavior: 'smooth'});
                            }
                        }
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(0, 240, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                        <div style={{ 
                            background: 'rgba(0, 240, 255, 0.05)', 
                            width: '64px', 
                            height: '64px', 
                            borderRadius: '16px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            border: '1px solid rgba(0, 240, 255, 0.1)'
                        }}>
                            {solution.icon}
                        </div>
                        
                        <div style={{ position: 'absolute', top: '2.5rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-blue)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                            <PlayCircle size={14} /> {solution.actionText}
                        </div>
                        
                        <h3 className="font-heading font-bold" style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>
                            {solution.title}
                        </h3>
                        
                        <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', flexGrow: 1 }}>
                            {solution.description}
                        </p>
                        
                        <div style={{ 
                            marginTop: '0.5rem', 
                            paddingTop: '1.25rem', 
                            borderTop: '1px solid rgba(255,255,255,0.05)',
                            fontSize: '0.85rem',
                            color: 'var(--accent-blue)',
                            fontWeight: '500'
                        }}>
                            ✓ {solution.highlight}
                        </div>
                    </div>
                )})}
            </div>
            {showDemo && <ChatDemo onClose={() => setShowDemo(false)} />}
        </section>
    );
};

export default Solutions;
