import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', company: '', needs: '' });
    const [submitted, setSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // REEMPLAZAR CON TU URL REAL DE N8N
        const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://scale.axiscorp.work/webhook/architect';

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'portfolio_digital',
                    timestamp: new Date().toISOString(),
                    contact: { name: formData.name, email: formData.email },
                    details: { needs: formData.needs }
                }),
            });

            // Consideramos éxito si el status es 200 o si es opaque (CORS sin respuesta preflight configurada)
            if (response.ok || response.status === 200 || response.type === 'opaque') {
                setSubmitted(true);
            } else {
                throw new Error('Error en la comunicación con n8n');
            }
        } catch (err) {
            console.error("Error webhook:", err);
            setError("Hubo un problema contactando al Hub. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contacto" className="section-padding" style={{ marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}>

                {/* Info Column */}
                <div style={{ flex: '1 1 300px', background: 'rgba(0, 240, 255, 0.03)', padding: '3rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 className="font-heading font-bold text-gradient text-3xl mb-4">Construyamos tu Ecosistema</h2>
                    <p className="text-secondary mb-8" style={{ fontSize: '0.95rem' }}>
                        Déjame tus datos y experimenta en tiempo real cómo un Lead Magnet inteligente procesa la información y detona automatizaciones.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircle size={20} color="var(--accent-blue)" />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>Flujos Calificados</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircle size={20} color="var(--accent-blue)" />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>Fricción Cero</span>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <div style={{ flex: '1 1 400px', padding: '3rem' }}>
                    {submitted ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0,240,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <CheckCircle size={32} color="var(--accent-blue)" />
                            </div>
                            <h3 className="font-heading font-bold text-xl mb-2">¡Sistemas Activados!</h3>
                            <p className="text-secondary" style={{ fontSize: '0.95rem' }}>Tu solicitud está siendo orquestada por el Hub. Te contactaré a la brevedad.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Nombre Completo</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Profesional</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>¿Qué cuellos de botella tiene tu negocio?</label>
                                <textarea required name="needs" value={formData.needs} onChange={handleChange} rows={3} style={{ width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }}></textarea>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', gap: '8px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                                {isSubmitting ? 'Orquestando...' : 'Enviar a la Matriz'} {!isSubmitting && <Send size={16} />}
                            </button>
                            {error && <p style={{ color: '#ff4444', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem' }}>{error}</p>}
                        </form>
                    )}
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
        input:focus, textarea:focus { border-color: var(--accent-blue) !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
        </section>
    );
};

export default Contact;
