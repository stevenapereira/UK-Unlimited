export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'conversion'
  | 'theme_change'
  | 'form_start'
  | 'form_submit';

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  timestamp: string;
  sessionId: string;
  page: string;
  label?: string;
  design?: string;
  palette?: string;
  source?: string;
}

const KEY = 'uk-unlimited-analytics';

function sessionId() {
  const key = 'uk-unlimited-session-id';
  const current = sessionStorage.getItem(key);

  if (current) return current;

  const created = crypto.randomUUID();
  sessionStorage.setItem(key, created);
  return created;
}

function analyticsEnabled() {
  try {
    const cms = JSON.parse(localStorage.getItem('uk-unlimited-cms') ?? '{}');
    return cms.analyticsEnabled !== false;
  } catch {
    return true;
  }
}

function sourceFromUrl() {
  return new URLSearchParams(window.location.search).get('utm_source') ?? 'direct';
}

export function readAnalytics(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]') as AnalyticsEvent[];
  } catch {
    return [];
  }
}

export function track(
  type: AnalyticsEventType,
  data: Partial<AnalyticsEvent> = {},
) {
  if (!analyticsEnabled()) return;

  const event: AnalyticsEvent = {
    id: crypto.randomUUID(),
    type,
    timestamp: new Date().toISOString(),
    sessionId: sessionId(),
    page: window.location.pathname,
    source: sourceFromUrl(),
    ...data,
  };

  localStorage.setItem(KEY, JSON.stringify([...readAnalytics(), event].slice(-5000)));
}

export function trackPageView(page: string, design: string, palette: string) {
  track('page_view', { page, design, palette });
}

export function installAnalyticsCapture() {
  const handler = (event: Event) => {
    const target = event.target as HTMLElement | null;
    const control = target?.closest('button, a');

    if (!control) return;

    const label = (control.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 100);

    if (!label) return;

    const conversionWords = /demo|start|build|conversation|subscribe|contact|continue/i.test(label);

    track(conversionWords ? 'conversion' : 'cta_click', { label });
  };

  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}

export function analyticsSummary() {
  const events = readAnalytics();

  const unique = (values: string[]) => new Set(values).size;

  const countBy = (key: keyof AnalyticsEvent) =>
    events.reduce<Record<string, number>>((result, event) => {
      const value = String(event[key] ?? 'unknown');
      result[value] = (result[value] ?? 0) + 1;
      return result;
    }, {});

  return {
    totalEvents: events.length,
    pageViews: events.filter((event) => event.type === 'page_view').length,
    sessions: unique(events.map((event) => event.sessionId)),
    ctaClicks: events.filter((event) => event.type === 'cta_click').length,
    conversions: events.filter((event) => event.type === 'conversion').length,
    topPages: countBy('page'),
    topDesigns: countBy('design'),
    sources: countBy('source'),
    recent: events.slice(-20).reverse(),
  };
}

export function downloadAnalytics() {
  const payload = {
    exportedAt: new Date().toISOString(),
    events: readAnalytics(),
    summary: analyticsSummary(),
  };

  downloadJson(`uk-unlimited-analytics-${new Date().toISOString().slice(0, 10)}.json`, payload);
}

export function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}
