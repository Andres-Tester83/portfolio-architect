export const initMetaPixel = () => {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID;
    if (!pixelId || pixelId === "AQUI_TU_ID_DE_PIXEL") {
        console.warn('Meta Pixel ID no configurado en .env');
        return;
    }
  
    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
  
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
};
  
export const trackMetaEvent = (eventName, data = {}, eventData = {}) => {
    if (window.fbq) {
        window.fbq('track', eventName, data, eventData);
    } else {
        console.warn('Pixel no sincronizado, ignorando evento:', eventName);
    }
};
  
export const getMetaCookies = () => {
    if (typeof document === 'undefined') return { fbp: null, fbc: null };

    const cookies = document.cookie.split(';');
    let fbp = null;
    let fbc = null;
  
    cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === '_fbp') fbp = value;
        if (name === '_fbc') fbc = value;
    });
  
    return { fbp, fbc };
};
