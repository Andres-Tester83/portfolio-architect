import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { eventId, email, name, fbp, fbc } = req.body;
  
  const PIXEL_ID = process.env.VITE_META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN || ACCESS_TOKEN === "AQUI_TU_TOKEN") {
    // Retornamos un log y dejamos que n8n fluya sin interrumpir
    console.warn("Tokens de autenticación de Meta ausentes. Ignorando evento CAPI en Servidor.");
    return res.status(200).json({ status: "skipped" });
  }

  // CAPI requiere que los datos PII (Identificación Personal) estén hasheados en SHA256 (en minúsculas)
  const hash = (str) => str ? crypto.createHash('sha256').update(str.trim().toLowerCase()).digest('hex') : undefined;

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_id: eventId,
        user_data: {
          em: [hash(email)],
          // Facebook usa campos como client_user_agent e ip recolectados en el request de Vercel (Edge)
          client_user_agent: req.headers['user-agent'],
          client_ip_address: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '0.0.0.0',
          fbp,
          fbc
        },
        custom_data: {
          content_name: 'Formulario de Contacto'
        }
      }
    ]
  };

  try {
    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const fbData = await fbRes.json();
    
    if (!fbRes.ok) {
      console.error('Meta API Error:', fbData);
      return res.status(400).json({ error: 'Meta API Error', details: fbData });
    }

    return res.status(200).json({ success: true, eventId });
  } catch (error) {
    console.error('Server error posting to Meta:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
