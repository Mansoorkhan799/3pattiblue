'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

export default function WebVitalsTracker() {
  useEffect(() => {
    // Defer to idle to reduce main-thread work and avoid forced reflow during initial load
    const init = () => {
      onCLS(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
      onINP(sendToAnalytics);
    };
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(init, { timeout: 3000 });
    } else {
      setTimeout(init, 100);
    }
  }, []);

  return null;
}
