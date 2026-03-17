import React from 'react';
import { Workflow, Layout, Target, MessageSquare, Mail, Globe, Printer, ExternalLink } from 'lucide-react';

const PORTFOLIO_URL = 'https://architect.axisdesignarts.com';

// ── QR Code via Google Charts API (no library needed)
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(PORTFOLIO_URL)}&bgcolor=050505&color=00f0ff&margin=6`;

const services = [
    { icon: <Workflow size={16} />, title: 'Orquestación & IA', desc: 'Sistemas n8n y Make interconectados con LLMs para escalar operaciones.' },
    { icon: <Layout size={16} />, title: 'Webs & Vibe Coding', desc: 'Desarrollo y diseño web acelerado por IA, garantizando MVP técnicos listos para producción.' },
    { icon: <Target size={16} />, title: 'Arquitectura de CRM', desc: 'Implementación de Kommo, GHL y Monday para mapear trayectos de ventas sin fricción.' },
    { icon: <MessageSquare size={16} />, title: 'Embudos & Chatbots', desc: 'Automatización en ManyChat y WhatsApp atada a funnels comprobados.' },
];

const stackLayers = [
    { label: 'IA & Dev', tools: ['Vibe Coding', 'React', 'Next.js', 'Supabase', 'LLMs'] },
    { label: 'Orquestación', tools: ['n8n', 'Make', 'Webhooks', 'REST APIs', 'Twilio'] },
    { label: 'CRM & Funnels', tools: ['GoHighLevel', 'Kommo', 'Simvoly', 'WordPress', 'Monday CRM'] },
    { label: 'Social & Tráfico', tools: ['ManyChat', 'Meta Ads', 'Google Ads', 'Email Marketing'] },
];

const CV = () => {
    const handlePrint = () => window.print();

    return (
        <>
            {/* Print-only CSS */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;600;800;900&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                :root {
                    --accent: #00f0ff;
                    --bg: #050505;
                    --surface: #111111;
                    --border: rgba(255,255,255,0.08);
                    --text: #ffffff;
                    --muted: #a1a1aa;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background: var(--bg);
                    color: var(--text);
                    -webkit-font-smoothing: antialiased;
                }

                .cv-wrapper {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 2rem 1.5rem 4rem;
                    background: var(--bg);
                }

                .cv-sheet {
                    width: 100%;
                    max-width: 800px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    overflow: visible;
                    box-shadow: 0 0 60px rgba(0, 240, 255, 0.06);
                }

                /* ── Header Band ── */
                .cv-header {
                    background: linear-gradient(135deg, #0d0d0d 0%, #111419 100%);
                    border-bottom: 1px solid var(--border);
                    padding: 1.5rem 2rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1.5rem;
                    position: relative;
                    overflow: visible;
                }
                .cv-header::after {
                    content:'';
                    position: absolute;
                    top: -40px; right: -40px;
                    width: 180px; height: 180px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }
                .cv-header-left { display: flex; flex-direction: column; gap: 0.4rem; }
                .cv-name {
                    font-family: 'Outfit', sans-serif;
                    font-size: 2rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .cv-role {
                    font-size: 0.9rem;
                    color: var(--muted);
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .cv-contacts {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem 1.2rem;
                    margin-top: 0.8rem;
                }
                .cv-contact-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.82rem;
                    color: var(--muted);
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .cv-contact-item:hover { color: var(--accent); }
                .cv-contact-item svg { color: var(--accent); flex-shrink: 0; }

                /* QR Block */
                .cv-qr-block {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.35rem;
                    flex-shrink: 0;
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
                .cv-qr-block img {
                    width: 100px; height: 100px;
                    border: 2px solid rgba(0,240,255,0.25);
                    border-radius: 8px;
                    background: #050505;
                    display: block;
                }
                .cv-qr-label {
                    font-size: 0.65rem;
                    color: var(--muted);
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                }

                /* ── Body ── */
                .cv-body { padding: 2rem 2.5rem; display: flex; flex-direction: column; gap: 1.8rem; }

                /* Section label */
                .cv-section-label {
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: var(--accent);
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .cv-section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                }

                /* Perfil */
                .cv-perfil {
                    font-size: 0.9rem;
                    line-height: 1.8;
                    color: var(--muted);
                }
                .cv-perfil strong { color: var(--text); }

                /* Services Grid */
                .cv-services {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.75rem;
                }
                .cv-service-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid var(--border);
                    border-radius: 10px;
                    padding: 0.9rem 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.4rem;
                }
                .cv-service-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: var(--text);
                }
                .cv-service-title svg { color: var(--accent); }
                .cv-service-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.5; }

                /* Stack layers */
                .cv-stack-layers { display: flex; flex-direction: column; gap: 0.7rem; }
                .cv-stack-row { display: flex; align-items: flex-start; gap: 1rem; }
                .cv-stack-layer-label {
                    font-size: 0.72rem;
                    font-weight: 600;
                    color: var(--muted);
                    width: 100px;
                    flex-shrink: 0;
                    padding-top: 4px;
                }
                .cv-badges { display: flex; flex-wrap: wrap; gap: 0.35rem; }
                .cv-badge {
                    padding: 3px 10px;
                    border-radius: 20px;
                    background: rgba(0,240,255,0.05);
                    border: 1px solid rgba(0,240,255,0.18);
                    font-size: 0.72rem;
                    color: rgba(0,240,255,0.85);
                    font-weight: 500;
                }

                /* Footer of CV */
                .cv-footer {
                    border-top: 1px solid var(--border);
                    padding: 1rem 2.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(0,0,0,0.3);
                }
                .cv-footer-brand {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                }
                .cv-footer-brand span { color: var(--accent); }
                .cv-footer-tagline {
                    font-size: 0.72rem;
                    color: var(--muted);
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                /* ── Print Button (visible on screen only) ── */
                .cv-print-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 1.5rem auto 0;
                    padding: 12px 28px;
                    background: var(--text);
                    color: var(--bg);
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    font-weight: 600;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.25s;
                }
                .cv-print-btn:hover { background: #d4d4d8; transform: translateY(-2px); }

                /* Back link */
                .cv-back-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    margin: 0 auto 1.2rem;
                    font-size: 0.82rem;
                    color: var(--muted);
                    cursor: pointer;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                .cv-back-link:hover { color: var(--accent); }

                /* ── Print Media Overrides ── */
                @media print {
                    body { background: #050505 !important; }
                    .cv-wrapper { padding: 8mm !important; background: #050505 !important; }
                    .cv-sheet { border-radius: 4px !important; border: none !important; box-shadow: none !important; max-width: 100% !important; overflow: visible !important; }
                    .cv-header { overflow: visible !important; }
                    .cv-qr-block { page-break-inside: avoid !important; break-inside: avoid !important; }
                    .cv-service-card { page-break-inside: avoid !important; break-inside: avoid !important; }
                    .cv-print-btn { display: none !important; }
                    .cv-back-link { display: none !important; }
                    @page { size: A4; margin: 8mm 10mm; }
                }
            `}</style>

            <div className="cv-wrapper">
                <a href="/" className="cv-back-link">
                    ← Volver al Portfolio
                </a>

                <div className="cv-sheet">
                    {/* ── Header ── */}
                    <div className="cv-header">
                        <div className="cv-header-left">
                            <div className="cv-name">Andrés Martínez</div>
                            <div className="cv-role">Arquitecto de Sistemas · Growth Specialist</div>
                            <div className="cv-contacts">
                                <a className="cv-contact-item" href={`mailto:master@axisdesignarts.com`}>
                                    <Mail size={13} /> master@axisdesignarts.com
                                </a>
                                <a className="cv-contact-item" href={PORTFOLIO_URL} target="_blank" rel="noreferrer">
                                    <Globe size={13} /> architect.axisdesignarts.com
                                </a>
                            </div>
                        </div>
                        <div className="cv-qr-block">
                            <img src={QR_URL} alt="QR Portfolio" />
                            <span className="cv-qr-label">Portfolio Live</span>
                        </div>
                    </div>

                    {/* ── Body ── */}
                    <div className="cv-body">

                        {/* Perfil */}
                        <div>
                            <div className="cv-section-label">Perfil Profesional</div>
                            <p className="cv-perfil">
                                Profesional enfocado en la lógica y la resolución de problemas a través de la tecnología. Mi objetivo es transformar procesos manuales en ecosistemas eficientes y rentables. Con dominio técnico en <strong>n8n, Make y Kommo</strong>, diseño integraciones complejas que conectan el marketing con la operación real. Desde la arquitectura de funnels en <strong>GoHighLevel y Simvoly</strong> hasta el desarrollo con <strong>Vibe Coding</strong> y React — si el proyecto requiere una herramienta nueva, la aprendo y la ejecuto.
                            </p>
                        </div>

                        {/* Servicios */}
                        <div>
                            <div className="cv-section-label">Servicios & Especialidades</div>
                            <div className="cv-services">
                                {services.map((s, i) => (
                                    <div className="cv-service-card" key={i}>
                                        <div className="cv-service-title">{s.icon} {s.title}</div>
                                        <div className="cv-service-desc">{s.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stack */}
                        <div>
                            <div className="cv-section-label">Stack Tecnológico</div>
                            <div className="cv-stack-layers">
                                {stackLayers.map((layer, i) => (
                                    <div className="cv-stack-row" key={i}>
                                        <div className="cv-stack-layer-label">{layer.label}</div>
                                        <div className="cv-badges">
                                            {layer.tools.map(t => (
                                                <span className="cv-badge" key={t}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Footer ── */}
                    <div className="cv-footer">
                        <div>
                            <div className="cv-footer-brand">Architect<span>.</span></div>
                            <div className="cv-footer-tagline">Sistemas que Piensan. Negocios que Escalan.</div>
                        </div>
                        <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'0.78rem', color:'var(--accent)', textDecoration:'none' }}>
                            <ExternalLink size={14} /> Ver Portfolio Interactivo
                        </a>
                    </div>
                </div>

                {/* Print Button */}
                <button className="cv-print-btn" onClick={handlePrint}>
                    <Printer size={17} /> Guardar como PDF
                </button>
            </div>
        </>
    );
};

export default CV;
