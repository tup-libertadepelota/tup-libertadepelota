export function initAnalytics() {
  if (typeof window === "undefined") {
    return;
  }

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return;
  }

  if (!window.gtag) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.dataLayer = window.dataLayer || [];
    window.gtag("js", new Date());
  }

  window.gtag("config", measurementId, { send_page_view: false });
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}
