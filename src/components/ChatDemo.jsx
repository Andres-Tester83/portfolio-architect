import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Video, Info, ArrowUp } from 'lucide-react';

const ChatDemo = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [botTyping, setBotTyping] = useState(false);
    
    const userText = "Si me gustaria saber si puedes automatizar las reservas de habitacion de mi hotel";
    const botText = "Por supuesto, permíteme tu nombre y correo para agendar una cita con Andrés, ¿o prefieres un chat de Telegram directo?";
    
    const messagesEndRef = useRef(null);
    const chatBodyRef = useRef(null);

    const scrollToBottom = () => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, inputValue, botTyping]);

    useEffect(() => {
        // Bloquear scroll de la página al abrir
        document.body.style.overflow = 'hidden';
        
        let i = 0;
        let isCancelled = false;
        
        // 1. Pausa antes de escribir
        const startTimer = setTimeout(() => {
            if(isCancelled) return;
            // 2. Escribir texto de usuario
            const typeInterval = setInterval(() => {
                if(isCancelled) {
                    clearInterval(typeInterval);
                    return;
                }
                setInputValue(prev => prev + userText.charAt(i));
                i++;
                if (i >= userText.length) {
                    clearInterval(typeInterval);
                    // 3. Pausa antes de enviar
                    setTimeout(() => {
                        if(isCancelled) return;
                        setInputValue('');
                        setMessages([{ id: 1, sender: 'user', text: userText }]);
                        // 4. Mostrar "bot escribiendo"
                        setTimeout(() => {
                            if(isCancelled) return;
                            setBotTyping(true);
                            // 5. Bot responde
                            setTimeout(() => {
                                if(isCancelled) return;
                                setBotTyping(false);
                                setMessages(prev => [...prev, { id: 2, sender: 'bot', text: botText }]);
                            }, 2500);
                        }, 600);
                    }, 800);
                }
            }, 35); // 35ms tipeo veloz para demo fluida
        }, 1200);

        return () => {
            isCancelled = true;
            clearTimeout(startTimer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div 
            style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} 
            onClick={onClose}
        >
            {/* Contenedor iPhone */}
            <div 
                style={{ 
                    width: '320px', 
                    height: '650px', 
                    background: '#000', 
                    borderRadius: '45px', 
                    border: '8px solid #222', 
                    position: 'relative', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0,240,255,0.2), 0 0 0 1px rgba(255,255,255,0.1)'
                }}
                onClick={(e) => e.stopPropagation()} // prevenir cierre al hacer clic adentro
            >
                {/* Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '28px', background: '#222', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 10 }}></div>
                
                {/* Header */}
                <div style={{ padding: '40px 16px 12px', background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', color: '#0B84FF', cursor: 'pointer', fontSize: '15px' }} onClick={onClose}>
                        <ChevronLeft size={24} style={{ marginLeft: '-6px' }} />
                        <span>Atrás</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff 0%, #0080ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', color: '#000', marginBottom: '2px' }}>Ax</div>
                        <span style={{ fontSize: '10px', color: '#fff', fontWeight: '600' }}>Axios IA</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', color: '#0B84FF' }}>
                        <Video size={20} />
                    </div>
                </div>

                {/* Body del chat */}
                <div ref={chatBodyRef} style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', scrollBehavior: 'smooth' }} className="hide-scroll">
                    <div style={{ textAlign: 'center', fontSize: '11px', color: '#8e8e93', marginTop: '10px', marginBottom: '10px' }}>
                        iMessage<br/>Hoy 19:40
                    </div>

                    <div style={{ alignSelf: 'flex-start', background: '#262628', color: '#fff', padding: '8px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', fontSize: '15px', maxWidth: '80%', lineHeight: '1.4' }}>
                        Hola, soy Axios el agente de IA de Andrés. Acabo de ver tu visita. ¿En qué te puedo ayudar hoy?
                    </div>

                    {messages.map((m) => (
                        <div key={m.id} style={{
                            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                            background: m.sender === 'user' ? '#0B84FF' : '#262628',
                            color: '#fff',
                            padding: '8px 14px',
                            borderRadius: '18px',
                            borderBottomRightRadius: m.sender === 'user' ? '4px' : '18px',
                            borderBottomLeftRadius: m.sender === 'bot' ? '4px' : '18px',
                            fontSize: '15px',
                            maxWidth: '85%',
                            lineHeight: '1.4',
                            animation: 'bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            {m.text}
                        </div>
                    ))}

                    {botTyping && (
                        <div style={{ alignSelf: 'flex-start', background: '#262628', padding: '10px 14px', borderRadius: '18px', borderBottomLeftRadius: '4px', width: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="ios-dot"></div><div className="ios-dot" style={{ animationDelay: '0.2s'}}></div><div className="ios-dot" style={{ animationDelay: '0.4s'}}></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} style={{ height: '10px' }} />
                </div>

                {/* Input Area */}
                <div style={{ padding: '10px 16px 24px', background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #444', borderRadius: '20px', padding: '4px 6px 4px 14px', background: '#000' }}>
                        <div style={{ flex: 1, fontSize: '15px', color: inputValue ? '#fff' : '#666', minHeight: '26px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'clip', display: 'flex', alignItems: 'center' }}>
                            {inputValue || 'iMessage'}
                            {inputValue && <span className="typing-cursor-ios" style={{ width: '2px', height: '18px', background: '#0B84FF', marginLeft: '2px', animation: 'blink 1s infinite' }}></span>}
                        </div>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: inputValue ? '#0B84FF' : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.3s', flexShrink: 0, marginLeft: '8px' }}>
                            <ArrowUp size={16} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes bounceIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                    @keyframes blink { 50% { opacity: 0; } }
                    .ios-dot { width: 6px; height: 6px; background: #8e8e93; border-radius: 50%; animation: iosTyping 1.2s infinite ease-in-out; }
                    @keyframes iosTyping { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
                    .hide-scroll::-webkit-scrollbar { display: none; }
                `}} />
            </div>
            
            <div style={{ position: 'absolute', top: '20px', right: '20px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                Cerrar Demo ✕
            </div>
        </div>
    );
};

export default ChatDemo;
