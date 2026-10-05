export type MarketingDesign =
  | 'signal'
  | 'lumen'
  | 'bloom'
  | 'prism'
  | 'pulse'
  | 'shared';

export type MediaKind =
  | 'hero'
  | 'case-study'
  | 'testimonial'
  | 'og-image'
  | 'logo'
  | 'icon'
  | 'video';

export interface CaseStudy {
  id: string;
  sector: string;
  title: string;
  summary: string;
  result: string;
  metric: string;
  tags: string[];
  mediaSlotId: string;
  ctaLabel: string;
  ctaUrl: string;
  featured: boolean;
  published: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarSlotId: string;
  featured: boolean;
  published: boolean;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
}

export interface MediaSlot {
  id: string;
  design: MarketingDesign;
  kind: MediaKind;
  label: string;
  url: string;
  mobileUrl: string;
  alt: string;
  focalPoint: string;
  formatHint: string;
  loading: 'eager' | 'lazy';
  active: boolean;
}

export interface MarketingState {
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  faqItems: FaqItem[];
  mediaSlots: MediaSlot[];
}

export const defaultMarketing: MarketingState = {
  caseStudies: [
    {
      id: 'operations',
      sector: 'OPERATIONS / INTELLIGENT AUTOMATION',
      title: 'From operational drag to compounding momentum.',
      summary: 'A reusable automation layer across finance, onboarding and exception handling.',
      result: '1,284 hours returned',
      metric: '+24.1% value created',
      tags: ['Orchestration', 'RPA', 'Human review'],
      mediaSlotId: 'signal-case-study',
      ctaLabel: 'Read case study',
      ctaUrl: '/case-studies/operations',
      featured: true,
      published: true,
    },
    {
      id: 'onboarding',
      sector: 'CUSTOMER EXPERIENCE / MAESTRO',
      title: 'A calmer path from first touch to trust.',
      summary: 'Customer onboarding became visible, measurable and easier to improve.',
      result: '42 active workflows',
      metric: '99.98% uptime',
      tags: ['Maestro', 'AI assistance', 'Visibility'],
      mediaSlotId: 'lumen-case-study',
      ctaLabel: 'View the story',
      ctaUrl: '/case-studies/onboarding',
      featured: false,
      published: true,
    },
  ],
  testimonials: [
    {
      id: 'alex-hart',
      quote: 'UK Unlimited helped us see the work differently. The result was room to think.',
      name: 'Alex Hart',
      role: 'Chief Operating Officer',
      company: 'Northstar Group',
      avatarSlotId: '',
      featured: true,
      published: true,
    },
    {
      id: 'leila-morgan',
      quote: 'The best systems are the ones people trust. That is exactly what we built.',
      name: 'Leila Morgan',
      role: 'Transformation Director',
      company: 'Morrow & Co.',
      avatarSlotId: '',
      featured: false,
      published: true,
    },
  ],
  faqItems: [
    {
      id: 'what-we-build',
      category: 'General',
      question: 'What does UK Unlimited build?',
      answer: 'We design intelligent operating systems that combine strategy, automation, orchestration, AI and human review.',
      order: 1,
      published: true,
    },
    {
      id: 'pricing',
      category: 'Commercial',
      question: 'Can pricing and campaigns change without developers?',
      answer: 'Yes. Pricing, campaigns, banners, blogs, case studies and SEO are designed to be CMS controlled.',
      order: 2,
      published: true,
    },
    {
      id: 'performance',
      category: 'Technology',
      question: 'How do the animated designs stay fast?',
      answer: 'Motion uses CSS, SVG and lightweight browser APIs first, with reduced-motion fallbacks and lazy-loaded media.',
      order: 3,
      published: true,
    },
  ],
  mediaSlots: [
    {
      id: 'signal-hero',
      design: 'signal',
      kind: 'hero',
      label: 'Signal Lab hero artwork',
      url: '',
      mobileUrl: '',
      alt: 'Abstract orbital intelligence system',
      focalPoint: 'center',
      formatHint: 'SVG or WebP, 1600 × 1000',
      loading: 'eager',
      active: true,
    },
    {
      id: 'signal-case-study',
      design: 'signal',
      kind: 'case-study',
      label: 'Signal Lab case study image',
      url: '',
      mobileUrl: '',
      alt: 'Automation operations dashboard',
      focalPoint: 'center',
      formatHint: 'WebP, 1200 × 900',
      loading: 'lazy',
      active: true,
    },
    {
      id: 'lumen-case-study',
      design: 'lumen',
      kind: 'case-study',
      label: 'Lumen Field case study image',
      url: '',
      mobileUrl: '',
      alt: 'Executive team reviewing operational signals',
      focalPoint: 'center',
      formatHint: 'WebP, 1200 × 900',
      loading: 'lazy',
      active: true,
    },
  ],
};

export function loadMarketing(): MarketingState {
  try {
    const saved = localStorage.getItem('uk-unlimited-marketing');
    if (!saved) return defaultMarketing;

    const parsed = JSON.parse(saved) as Partial<MarketingState>;

    return {
      ...defaultMarketing,
      ...parsed,
      caseStudies: parsed.caseStudies ?? defaultMarketing.caseStudies,
      testimonials: parsed.testimonials ?? defaultMarketing.testimonials,
      faqItems: parsed.faqItems ?? defaultMarketing.faqItems,
      mediaSlots: parsed.mediaSlots ?? defaultMarketing.mediaSlots,
    };
  } catch {
    return defaultMarketing;
  }
}

export function saveMarketing(patch: Partial<MarketingState>): MarketingState {
  const next = { ...loadMarketing(), ...patch };
  localStorage.setItem('uk-unlimited-marketing', JSON.stringify(next));
  return next;
}
