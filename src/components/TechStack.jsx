import React from 'react';
import { BrainCircuit, GitMerge, Filter, MessageSquare, TrendingUp } from 'lucide-react';

const layers = [
    {
        id: 'inteligencia',
        title: 'Capa de Inteligencia & Desarrollo',
        icon: <BrainCircuit size={24} color="var(--accent-blue)" />,
        tools: ['Vibe Coding', 'Next.js', 'Supabase', 'LLMs'],
        desc: 'Desarrollo ágil e integración cognitiva para sistemas que evolucionan.'
    },
    {
        id: 'orquestacion',
        title: 'Capa de Orquestación (Cerebro)',
        icon: <GitMerge size={24} color="var(--accent-blue)" />,
        tools: ['Make', 'n8n', 'Webhooks', 'REST APIs', 'Twilio'],
        desc: 'Conexión inter-sistemas para operaciones autónomas 24/7.'
    },
    {
        id: 'conversion',
        title: 'Capa de Conversión & CRM',
        icon: <Filter size={24} color="var(--accent-blue)" />,
        tools: ['Go High Level', 'Monday CRM', 'Kommo', 'Simvoly', 'WordPress'],
        desc: 'Embudos optimizados y gestión de prospectos de alto rendimiento.'
    },
    {
        id: 'interaccion',
        title: 'Capa de Interacción Social',
        icon: <MessageSquare size={24} color="var(--accent-blue)" />,
        tools: ['ManyChat', 'Flujos Automatizados'],
        desc: 'Conversaciones escalables impulsadas por inteligencia conversacional.'
    },
    {
        id: 'trafico',
        title: 'Capa de Tráfico & Growth',
        icon: <TrendingUp size={24} color="var(--accent-blue)" />,
        tools: ['Meta Ads', 'Google Ads', 'Email Marketing'],
        desc: 'Adquisición sistemática y algorítmica de clientes.'
    }
];

const TechStack = () => {
    return (
        <section id="stack" className="section-padding">
            <div className="text-center mb-16" style={{ marginBottom: '4rem' }}>
                <h2 className="font-heading font-bold text-gradient text-4xl mb-4" style={{ fontSize: '2.5rem' }}>El Stack Tecnológico</h2>
                <p className="text-secondary mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>Arquitectura de 5 capas diseñada para maximizar la conversión y reducir drásticamente la fricción operativa.</p>
            </div>

            <div className="grid gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {layers.map((layer) => (
                    <div key={layer.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                            {layer.icon}
                        </div>
                        <h3 className="font-heading font-bold text-xl">{layer.title}</h3>
                        <p className="text-secondary text-sm flex-grow" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{layer.desc}</p>
                        <div className="flex gap-2 flex-wrap" style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {layer.tools.map((tool, idx) => (
                                <span key={idx} style={{ padding: '4px 12px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStack;
