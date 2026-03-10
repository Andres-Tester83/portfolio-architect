import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Maximize2, X, ExternalLink, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const ImageSlider = ({ images, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Expose automatic rotation
    useEffect(() => {
        if (!images || images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4500); // slightly longer so user can intervene manually
        return () => clearInterval(interval);
    }, [images]);

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    if (!images || images.length === 0) return null;

    return (
        <div className="slider-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
            {images.map((img, index) => (
                <div
                    key={`${img}-${index}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 0.6s ease-in-out',
                        backgroundImage: `url('${img}')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#0a0a0a',
                    }}
                />
            ))}

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="slider-nav-btn left"
                        style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', padding: '8px', color: 'white', cursor: 'pointer', display: 'flex', transition: 'background 0.3s', backdropFilter: 'blur(4px)' }}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="slider-nav-btn right"
                        style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', padding: '8px', color: 'white', cursor: 'pointer', display: 'flex', transition: 'background 0.3s', backdropFilter: 'blur(4px)' }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </>
            )}

            {/* Expand Icon Overlay on Click Area (Center) */}
            <div
                className="slider-overlay-click"
                onClick={() => onImageClick(images[currentIndex])}
                style={{ position: 'absolute', inset: '0 60px 0 60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
            >
                <div className="expand-indicator" style={{ opacity: 0, transition: 'opacity 0.3s', background: 'rgba(0,0,0,0.7)', padding: '12px', borderRadius: '50%', display: 'flex', backdropFilter: 'blur(4px)' }}>
                    <Maximize2 color="white" size={24} />
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 15, background: 'rgba(0,0,0,0.6)', padding: '6px 12px', borderRadius: '12px' }}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? 'var(--accent-blue)' : 'rgba(255,255,255,0.3)',
                            transition: 'background-color 0.3s ease',
                        }}
                    />
                ))}
            </div>
            <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(5,5,5,0.6)', pointerEvents: 'none', zIndex: 5 }}></div>
        </div>
    );
};

const Lightbox = ({ image, onClose }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; }
    }, []);

    const handleWheel = (e) => {
        e.preventDefault();
        setScale(prev => {
            const newScale = prev - (e.deltaY * 0.005);
            return Math.min(Math.max(0.5, newScale), 5); // constraints 0.5x to 5x zoom
        });
    };

    const handleMouseDown = (e) => {
        if (scale > 1) {
            setIsDragging(true);
            dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && scale > 1) {
            setPosition({
                x: e.clientX - dragStart.current.x,
                y: e.clientY - dragStart.current.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const zoomIn = (e) => {
        e.stopPropagation();
        setScale(prev => Math.min(prev + 0.5, 5));
    };

    const zoomOut = (e) => {
        e.stopPropagation();
        setScale(prev => Math.max(prev - 0.5, 0.5));
    };

    const resetZoom = (e) => {
        e.stopPropagation();
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
            onWheel={handleWheel}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '12px', zIndex: 10000 }}>
                <button className="lightbox-btn" onClick={zoomIn} title="Zoom In"><ZoomIn size={20} /></button>
                <button className="lightbox-btn" onClick={zoomOut} title="Zoom Out"><ZoomOut size={20} /></button>
                <button className="lightbox-btn" onClick={resetZoom} title="Reset"><RotateCcw size={20} /></button>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 4px' }}></div>
                <button className="lightbox-btn" onClick={onClose} title="Close"><X size={24} /></button>
            </div>

            <div
                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} // strict background click to close
            >
                <img
                    src={image}
                    alt="Expanded view"
                    draggable="false"
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                    }}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        .lightbox-btn {
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; padding: 10px; cursor: pointer; color: white; display: flex; transition: all 0.2s;
        }
        .lightbox-btn:hover { background: rgba(0, 240, 255, 0.2); border-color: var(--accent-blue); color: var(--accent-blue); }
      `}} />
        </div>
    );
};

const projects = [
    {
        id: 'embudos',
        title: 'Embudos de Alta Conversión y CRM',
        challenge: 'Costos de adquisición elevados y retención compleja.',
        solution: 'Implementación de CRM y funnels para maximizar la conversión en cada etapa.',
        tools: ['Go High Level', 'Simvoly', 'Meta Ads', 'Monday CRM'],
        images: ['/images/funnel-1.png', '/images/ADS-1.png', '/images/11.png', '/images/5.png', '/images/6.png']
    },
    {
        id: 'orquestacion',
        title: 'Orquestación de Procesos 24/7',
        challenge: 'Operaciones manuales lentas y propensas a errores.',
        solution: 'Conexión inter-sistemas para detonar automatizaciones complejas y eficientes.',
        tools: ['Make', 'n8n', 'Twilio'],
        images: ['/images/make-1.png', '/images/make-2.png', '/images/N8N-1.png', '/images/N8N-2.png', '/images/N8N-3.png']
    },
    {
        id: 'desarrollo-web',
        title: 'Desarrollo Web & Vibe Coding',
        challenge: 'Necesidad de presencia digital robusta y despliegue ágil.',
        solution: 'Creación de portales y aplicaciones de nueva generación desarrolladas con IA.',
        tools: ['WordPress', 'React', 'Vibe Coding', 'Next.js'],
        images: ['/images/webd-1.png', '/images/webd-2.png', '/images/webd-3.png', '/images/skool-1.png'],
        links: [
            { text: 'Dashboard Analítico (Demo)', url: 'https://dashboard-iota-rust.vercel.app/' },
            { text: 'Presentación Interactiva', url: 'https://presentacion.axisdesignarts.com/' },
            { text: 'Sorelle Vita Couture', url: 'https://sorellevitacouture.com/' },
            { text: 'New Version by YSA', url: 'https://www.newversionbyysa.com/' },
            { text: 'Hispana de Servicios', url: 'https://hispanadeservicios.com/' }
        ]
    },
    {
        id: 'interaccion',
        title: 'Interacción Social (Omnicanal)',
        challenge: 'Falta de seguimiento automático a prospectos y chats.',
        solution: 'Flujos conversacionales y gestión de leads centralizada.',
        tools: ['ManyChat', 'Kommo CRM', 'Social Automation'],
        images: ['/images/kommo-1.png', '/images/Manny-1.png', '/images/Manny-2.png', '/images/Manny-3.png']
    }
];

const Showcase = () => {
    const [lightboxImg, setLightboxImg] = useState(null);

    return (
        <>
            <section id="proyectos" className="section-padding">
                <div className="text-center mb-16" style={{ marginBottom: '4rem' }}>
                    <h2 className="font-heading font-bold text-gradient text-4xl mb-4" style={{ fontSize: '2.5rem' }}>Casos de Estudio & Especialidades</h2>
                    <p className="text-secondary mx-auto" style={{ maxWidth: '600px', margin: '0 auto' }}>Visualización interactiva de arquitecturas, funnels, despliegues web y orquestación implementada.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {projects.map((project, index) => (
                        <div key={project.id} className={`glass-panel project-card ${index % 2 !== 0 ? 'reverse' : ''}`}>
                            {/* Visual/Slider Side */}
                            <div className="project-visual" style={{ background: 'var(--bg-surface-elevated)', borderRight: index % 2 === 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', borderLeft: index % 2 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '340px', position: 'relative' }}>
                                <ImageSlider images={project.images} onImageClick={setLightboxImg} />
                            </div>

                            {/* Content Side */}
                            <div className="project-content" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
                                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-blue)' }}>
                                    ESTUDIO DE CASO
                                </div>

                                <h3 className="font-heading font-bold text-2xl" style={{ fontSize: '1.75rem' }}>{project.title}</h3>

                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' }}>Enfoque y Solución:</strong>
                                        <p className="text-secondary" style={{ fontSize: '0.95rem' }}>{project.solution}</p>
                                    </div>

                                    {project.links && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem', display: 'block' }}>Proyectos en vivo:</strong>
                                            {project.links.map(link => (
                                                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-blue)', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-blue-hover)'} onMouseLeave={(e) => e.target.style.color = 'var(--accent-blue)'}>
                                                    <ExternalLink size={16} /> {link.text}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {project.tools.map(tool => (
                                        <span key={tool} style={{ padding: '4px 10px', background: 'var(--bg-dark)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{tool}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox Component with Zoom */}
            {lightboxImg && <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />}

            <style dangerouslySetInnerHTML={{
                __html: `
        .slider-nav-btn:hover { background: rgba(0, 240, 255, 0.2) !important; border-color: var(--accent-blue) !important; color: var(--accent-blue) !important; }
        .slider-overlay-click:hover .expand-indicator { opacity: 1 !important; transform: scale(1.1); }
      `}} />
        </>
    );
};

export default Showcase;
