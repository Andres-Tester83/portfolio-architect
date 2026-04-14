import React, { useState, useEffect, useRef } from 'react';
import BrandLogo from '../../Brand/Logo-Architect.svg';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente virtual de Architect. ¿Te ayudo con información de nuestros servicios o te gustaría agendar una consultoría para tu proyecto?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const lastCallRef = useRef(0); // Para debouncing / anti-spam
  const sessionIdRef = useRef('session-' + Math.random().toString(36).substr(2, 9)); // Memoria persistente de la sesión

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || inputText.length > 500) return; // Validación de longitud

    // Protección anti-spam (Rate Limiting en Frontend)
    const now = Date.now();
    if (now - lastCallRef.current < 2000) {
      console.warn('Protección anti-spam activada. Espera 2 segundos.');
      return;
    }
    lastCallRef.current = now;

    const userMessage = { role: 'user', content: inputText.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Usamos el Webhook configurado, o uno temporal si no está en el .env
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://tu-n8n.ejemplo.com/webhook/chat-portfolio';
      const secretToken = import.meta.env.VITE_CHATWIDGET_SECRET_TOKEN || 'secure_token_default';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${secretToken}` // Cabecera de seguridad
        },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          message: userMessage.content,
          history: messages, // Pasamos historial para contexto (útil si n8n no tiene nodo de memoria interno)
        }),
      });

      if (!response.ok) {
        console.error(`Error de red o HTTP: ${response.status} ${response.statusText}`);
      }
      
      // Leemos como texto primero para evitar crashes si n8n no devuelve un JSON válido
      const responseText = await response.text();
      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.warn('La respuesta de n8n no es un JSON válido:', responseText);
        data = { response: responseText }; // Fallback text
      }
      
      // Flexibilidad: n8n podría retornar la respuesta en 'output', 'text', 'message' o 'response'
      const finalReply = data.response || data.output || data.text || data.message || 
                         (response.ok ? 'Mensaje recibido, pero no se encontró la respuesta esperada en el JSON.' : 'Hubo un error al procesar tu solicitud.');

      const botResponse = {
        role: 'assistant',
        content: finalReply,
      };
      setMessages((prev) => [...prev, botResponse]);
      
    } catch (error) {
      console.error("Error en la solicitud Fetch (posible bloqueo CORS o timeout):", error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, hubo un problema de conexión (¿quizás bloqueado por CORS?). Por favor, intenta de nuevo más tarde o envíame un mensaje por el formulario de contacto.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para renderizar enlaces si n8n envía links a Google Calendar (ej. urls que empiezan con http)
  const renderMessageContent = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}>
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="chat-widget-container">
      {/* Ventana de Chat */}
      <div className={`chat-window glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="flex items-center gap-4">
            <div className="chat-logo-bg">
              <img src={BrandLogo} alt="AI Assistant" className="chat-logo" />
            </div>
            <div>
              <h4 className="font-heading font-bold m-0" style={{ fontSize: '1.1rem' }}>Architect AI</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="online-dot"></span> Online
              </span>
            </div>
          </div>
          <button className="close-btn" onClick={toggleChat} aria-label="Cerrar chat">
            ×
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble-wrapper ${msg.role}`}>
              <div className={`chat-bubble ${msg.role}`}>
                {renderMessageContent(msg.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble-wrapper assistant">
              <div className="chat-bubble assistant typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Pregúntame sobre los servicios..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            maxLength={500}
          />
          <button type="submit" disabled={isLoading || !inputText.trim()} className="send-btn" aria-label="Enviar mensaje">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>

      {/* Botón Flotante */}
      <button 
        className={`chat-toggle-btn ${isOpen ? 'hidden' : ''}`} 
        onClick={toggleChat}
        aria-label="Abrir asistente inteligente"
      >
        <div className="btn-glow-effect"></div>
        <img src={BrandLogo} alt="AI Chat" className="toggle-icon-svg" />
      </button>
    </div>
  );
};

export default ChatWidget;
