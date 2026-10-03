export type MarketingDesign =
  | 'signal'
  | 'lumen'
  | 'bloom'
  | 'prism'
  | 'pulse';

export interface MediaSlot {
  label: string;
  alt: string;
  recommendedFormat: string;
  placeholder: string;
}

export interface CaseStudy {
  id: string;
  sector: string;
  title: string;
  summary: string;
  result: string;
  metric: string;
  tags: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const mediaSlots: Record<MarketingDesign, MediaSlot[]> = {
  signal: [
    {
      label: 'Signal Lab hero artwork',
      alt: 'Abstract orbital intelligence system',
      recommendedFormat: 'SVG or WebP, 1600 × 1000',
      placeholder: 'ORBITAL SIGNAL / HERO',
    },
    {
      label: 'Signal Lab case-study image',
      alt: 'Automation operations dashboard',
      recommendedFormat: 'WebP, 1200 × 900',
      placeholder: 'OPERATIONS / CASE STUDY',
    },
  ],
  lumen: [
    {
      label: 'Lumen Field hero artwork',
      alt: 'Luminous spatial intelligence field',
      recommendedFormat: 'WebP or AVIF, 1600 × 1000',
      placeholder: 'LUMINOUS FIELD / HERO',
    },
    {
      label: 'Lumen Field proof image',
      alt: 'Executive team reviewing operational signals',
      recommendedFormat: 'WebP, 1200 × 900',
      placeholder: 'CLARITY / PROOF',
    },
  ],
  bloom: [
    {
      label: 'Neural Bloom hero artwork',
      alt: 'Organic neural network bloom',
      recommendedFormat: 'SVG or WebP, 1600 × 1000',
      placeholder: 'NEURAL BLOOM / HERO',
    },
    {
      label: 'Neural Bloom case-study image',
      alt: 'People collaborating around an intelligent workflow',
      recommendedFormat: 'WebP, 1200 × 900',
      placeholder: 'HUMAN LAYER / STORY',
    },
  ],
  prism: [
    {
      label: 'Prism Engine hero artwork',
      alt: 'Layered prism representing connected information',
      recommendedFormat: 'SVG or WebP, 1600 × 1000',
      placeholder: 'PRISM ENGINE / HERO',
    },
    {
      label: 'Prism Engine proof image',
      alt: 'Layered business intelligence visualisation',
      recommendedFormat: 'WebP, 1200 × 900',
      placeholder: 'DIMENSION / PROOF',
    },
  ],
  pulse: [
    {
      label: 'Pulse Editorial hero artwork',
      alt: 'Kinetic editorial waveform',
      recommendedFormat: 'SVG or WebP, 1800 × 900',
      placeholder: 'PULSE EDITORIAL / HERO',
    },
    {
      label: 'Pulse Editorial campaign image',
      alt: 'Bold campaign composition for UK Unlimited',
      recommendedFormat: 'WebP, 1200 × 900',
      placeholder: 'CAMPAIGN / STORY',
    },
  ],
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'operations',
    sector: 'OPERATIONS / INTELLIGENT AUTOMATION',
    title: 'From operational drag to compounding momentum.',
    summary: 'A complex service operation created a reusable automation layer across finance, onboarding and exception handling.',
    result: '1,284 hours returned',
    metric: '+24.1% value created',
    tags: ['Workflow orchestration', 'RPA', 'Human review'],
  },
  {
    id: 'onboarding',
    sector: 'CUSTOMER EXPERIENCE / MAESTRO',
    title: 'A calmer path from first touch to trust.',
    summary: 'Customer onboarding became visible, measurable and easier for teams to improve every week.',
    result: '42 active workflows',
    metric: '99.98% uptime',
    tags: ['Maestro', 'AI assistance', 'Process visibility'],
  },
  {
    id: 'revenue',
    sector: 'FINANCE / DATA INTELLIGENCE',
    title: 'Revenue reconciliation that keeps moving.',
    summary: 'A fragmented reconciliation process became a clear operational signal with fewer manual handoffs.',
    result: '84.6% automation score',
    metric: '18 integrations connected',
    tags: ['Data intelligence', 'Controls', 'Analytics'],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'UK Unlimited helped us see the work differently. The result was not just automation—it was room to think.',
    name: 'Alex Hart',
    role: 'Chief Operating Officer',
    company: 'Northstar Group',
  },
  {
    quote: 'The best systems are the ones people trust. That is exactly what this team helped us build.',
    name: 'Leila Morgan',
    role: 'Transformation Director',
    company: 'Morrow & Co.',
  },
  {
    quote: 'We stopped measuring activity and started measuring momentum.',
    name: 'Sam Pereira',
    role: 'Head of Operations',
    company: 'Unlimited Partners',
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'What does UK Unlimited actually build?',
    answer: 'We design intelligent operating systems that combine strategy, automation, orchestration, AI and human review into a practical business advantage.',
  },
  {
    question: 'Can pricing and campaigns change without developers?',
    answer: 'Yes. The CMS is designed to manage pricing plans, campaigns, banners, blog content, case studies, SEO and page sections without changing the React code.',
  },
  {
    question: 'How do the animated designs stay fast?',
    answer: 'Motion uses CSS, SVG and lightweight browser APIs first. Media is lazy loaded, off-screen motion can pause, and reduced-motion fallbacks are built in.',
  },
  {
    question: 'Can this connect to UiPath services?',
    answer: 'Yes. The local prototype uses adapters so CMS records can later move to Data Fabric, media and backup archives can move to Storage Buckets, and authentication can use UiPath OAuth.',
  },
  {
    question: 'Can we keep our existing brand assets?',
    answer: 'Yes. Each design has media slots for hero artwork, case studies, social images, logos and campaign assets, with alt text and recommended formats.',
  },
];
