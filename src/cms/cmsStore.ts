export type CmsDesign = 'signal' | 'lumen' | 'bloom' | 'prism' | 'pulse';
export type CmsPalette = 'aurora' | 'cobalt' | 'ember' | 'mint' | 'saffron';
export type CmsMode = 'dark' | 'light';
export type CmsPage = 'home' | 'pricing' | 'insights' | 'about';

export interface CmsPlan {
  id: string;
  name: string;
  price: string;
  interval: string;
  description: string;
  cta: string;
  features: string[];
  featured: boolean;
  active: boolean;
}

export interface CmsPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  published: boolean;
  featured: boolean;
}

export interface CmsSeo {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  noIndex: boolean;
}

export interface CmsState {
  design: CmsDesign;
  palette: CmsPalette;
  mode: CmsMode;
  banner: string;
  stickyHeader: boolean;
  logo: string;
  analyticsEnabled: boolean;
  plans: CmsPlan[];
  posts: CmsPost[];
  seo: Record<CmsPage, CmsSeo>;
  backup: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    retention: number;
  };
}

export const defaultCms: CmsState = {
  design: 'signal',
  palette: 'aurora',
  mode: 'dark',
  banner: 'New: The 2026 Automation Outlook is now available.',
  stickyHeader: true,
  logo: 'orbit',
  analyticsEnabled: true,
  plans: [
    {
      id: 'signal',
      name: 'Signal',
      price: '£0',
      interval: 'forever',
      description: 'A sharper view of what is possible.',
      cta: 'Explore free',
      features: ['Opportunity map', 'Unlimited collaborators', 'Community playbooks'],
      featured: false,
      active: true,
    },
    {
      id: 'momentum',
      name: 'Momentum',
      price: '£1,250',
      interval: 'month',
      description: 'For teams ready to move with intent.',
      cta: 'Start a conversation',
      features: ['Intelligent orchestration', 'Implementation partner', 'Value reporting'],
      featured: true,
      active: true,
    },
    {
      id: 'unlimited',
      name: 'Unlimited',
      price: 'Custom',
      interval: '',
      description: 'Your operating advantage, amplified.',
      cta: 'Talk to an expert',
      features: ['Enterprise governance', 'Bespoke AI capabilities', 'Growth partnership'],
      featured: false,
      active: true,
    },
  ],
  posts: [
    {
      id: 'outlook',
      category: 'Perspective',
      title: 'The 2026 Automation Outlook',
      excerpt: 'Why the next advantage belongs to teams that compound intelligence across every workflow.',
      author: 'UK Unlimited Studio',
      readTime: '8 min read',
      published: true,
      featured: true,
    },
    {
      id: 'momentum',
      category: 'Field notes',
      title: 'From busywork to business momentum',
      excerpt: 'A practical guide to finding the work that quietly holds your operation back.',
      author: 'UK Unlimited Studio',
      readTime: '6 min read',
      published: true,
      featured: false,
    },
  ],
  seo: {
    home: {
      title: 'UK Unlimited — Build without limits',
      description: 'Intelligence, orchestration and automation for ambitious teams.',
      canonical: '/',
      ogImage: '',
      noIndex: false,
    },
    pricing: {
      title: 'Pricing — UK Unlimited',
      description: 'Plans that scale with possibility.',
      canonical: '/pricing',
      ogImage: '',
      noIndex: false,
    },
    insights: {
      title: 'Insights — UK Unlimited',
      description: 'Ideas for teams building what comes next.',
      canonical: '/insights',
      ogImage: '',
      noIndex: false,
    },
    about: {
      title: 'About — UK Unlimited',
      description: 'The operating advantage for modern teams.',
      canonical: '/about',
      ogImage: '',
      noIndex: false,
    },
  },
  backup: {
    enabled: true,
    frequency: 'weekly',
    retention: 12,
  },
};

export function loadCms(): CmsState {
  try {
    const raw = localStorage.getItem('uk-unlimited-cms');
    if (!raw) return defaultCms;

    const saved = JSON.parse(raw) as Partial<CmsState>;

    return {
      ...defaultCms,
      ...saved,
      plans: saved.plans ?? defaultCms.plans,
      posts: saved.posts ?? defaultCms.posts,
      seo: { ...defaultCms.seo, ...(saved.seo ?? {}) },
      backup: { ...defaultCms.backup, ...(saved.backup ?? {}) },
    };
  } catch {
    return defaultCms;
  }
}

export function saveCms(patch: Partial<CmsState>) {
  const next = { ...loadCms(), ...patch };
  localStorage.setItem('uk-unlimited-cms', JSON.stringify(next));
  return next;
}
