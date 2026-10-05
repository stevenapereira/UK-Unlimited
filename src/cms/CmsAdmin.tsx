import { useMemo, useState } from 'react';
import {
  downloadAnalytics,
  downloadJson,
  analyticsSummary,
} from './analytics';
import {
  loadCms,
  saveCms,
  type CmsPage,
  type CmsPlan,
  type CmsPost,
  type CmsState,
} from './cmsStore';
import './CmsAdmin.css';
import { MarketingAdmin } from './MarketingAdmin';

type Tab =
  | 'overview'
  | 'pricing'
  | 'blog'
  | 'seo'
  | 'stats'
  | 'backups'
  | 'chrome'
  | 'marketing';

export function CmsAdmin({ close }: { close: () => void }) {
  const [cms, setCms] = useState<CmsState>(loadCms);
  const [tab, setTab] = useState<Tab>('overview');

  const update = (patch: Partial<CmsState>) => {
    const next = saveCms(patch);
    setCms(next);
  };

  const closeAndRefresh = () => {
    close();
    window.location.reload();
  };

  const tabs: [Tab, string][] = [
    ['overview', 'Overview'],
    ['pricing', 'Pricing editor'],
    ['blog', 'Blog & marketing'],
    ['marketing', 'Marketing library'],
    ['seo', 'SEO editor'],
    ['stats', 'Stats tracking'],
    ['backups', 'Backups'],
    ['chrome', 'Banner & logo'],
  ];

  return (
    <div className="cms-backdrop">
      <div className="cms-shell">
        <aside className="cms-sidebar">
          <div className="cms-brand">UK <strong>UNLIMITED</strong></div>
          <span className="cms-kicker">CONTENT OPERATING SYSTEM</span>

          <nav>
            {tabs.map(([id, label]) => (
              <button
                className={tab === id ? 'active' : ''}
                key={id}
                onClick={() => setTab(id)}
              >
                {label}<span>→</span>
              </button>
            ))}
          </nav>

          <button className="cms-exit" onClick={closeAndRefresh}>
            ← Public site
          </button>
        </aside>

        <main className="cms-main">
          <header className="cms-header">
            <div>
              <span className="cms-kicker">UK UNLIMITED / ADMIN</span>
              <h1>{tabs.find(([id]) => id === tab)?.[1]}</h1>
            </div>
            <span className="cms-status">{cms.analyticsEnabled ? 'Tracking active' : 'Tracking paused'}</span>
          </header>

          {tab === 'overview' && <Overview cms={cms} setTab={setTab} />}
          {tab === 'pricing' && <PricingEditor cms={cms} update={update} />}
          {tab === 'blog' && <BlogEditor cms={cms} update={update} />}
      {tab === 'marketing' && <MarketingAdmin />}
          {tab === 'seo' && <SeoEditor cms={cms} update={update} />}
          {tab === 'stats' && <StatsEditor cms={cms} update={update} />}
          {tab === 'backups' && <BackupEditor cms={cms} update={update} />}
          {tab === 'chrome' && <ChromeEditor cms={cms} update={update} />}
        </main>
      </div>
    </div>
  );
}

function Overview({ cms, setTab }: { cms: CmsState; setTab: (tab: Tab) => void }) {
  const summary = analyticsSummary();

  return (
    <div className="cms-grid">
      <Metric label="Active design" value={cms.design} detail={`${cms.palette} / ${cms.mode}`} />
      <Metric label="Pricing plans" value={String(cms.plans.length)} detail="CMS controlled" />
      <Metric label="Marketing posts" value={String(cms.posts.length)} detail="Drafts and published" />
      <Metric label="Page views" value={String(summary.pageViews)} detail={`${summary.sessions} sessions`} />

      <section className="cms-card cms-wide">
        <span className="cms-kicker">CONTROL CENTRE</span>
        <h2>Manage the whole experience</h2>
        <div className="cms-action-list">
          <button onClick={() => setTab('pricing')}>Change pricing structure <span>→</span></button>
          <button onClick={() => setTab('blog')}>Create blogs and campaign content <span>→</span></button>
          <button onClick={() => setTab('seo')}>Review page-level SEO <span>→</span></button>
          <button onClick={() => setTab('stats')}>Inspect visitor and conversion stats <span>→</span></button>
          <button onClick={() => setTab('backups')}>Configure encrypted backups <span>→</span></button>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="cms-card cms-metric">
      <span className="cms-kicker">{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function PricingEditor({ cms, update }: { cms: CmsState; update: (patch: Partial<CmsState>) => void }) {
  const edit = (id: string, patch: Partial<CmsPlan>) =>
    update({ plans: cms.plans.map((plan) => plan.id === id ? { ...plan, ...patch } : plan) });

  const add = () =>
    update({
      plans: [
        ...cms.plans,
        {
          id: crypto.randomUUID(),
          name: 'New plan',
          price: 'Custom',
          interval: '',
          description: 'Describe this offer.',
          cta: 'Talk to us',
          features: ['Add a feature'],
          featured: false,
          active: true,
        },
      ],
    });

  const move = (index: number, direction: -1 | 1) => {
    const next = [...cms.plans];
    const target = index + direction;

    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];
    update({ plans: next });
  };

  return (
    <section className="cms-section">
      <div className="cms-intro">
        <p>Add, reorder, feature, archive and edit plans without changing React code.</p>
        <button className="cms-primary" onClick={add}>Add plan +</button>
      </div>

      <div className="cms-list">
        {cms.plans.map((plan, index) => (
          <article className="cms-card cms-plan" key={plan.id}>
            <div className="cms-plan-top">
              <span className="cms-kicker">PLAN {index + 1}</span>
              <div>
                <button onClick={() => move(index, -1)}>↑</button>
                <button onClick={() => move(index, 1)}>↓</button>
              </div>
            </div>

            <label>Name<input value={plan.name} onChange={(event) => edit(plan.id, { name: event.target.value })} /></label>
            <label>Price<input value={plan.price} onChange={(event) => edit(plan.id, { price: event.target.value })} /></label>
            <label>Interval<input value={plan.interval} onChange={(event) => edit(plan.id, { interval: event.target.value })} /></label>
            <label>Description<textarea value={plan.description} onChange={(event) => edit(plan.id, { description: event.target.value })} /></label>
            <label>CTA label<input value={plan.cta} onChange={(event) => edit(plan.id, { cta: event.target.value })} /></label>
            <label className="cms-check"><input type="checkbox" checked={plan.featured} onChange={(event) => edit(plan.id, { featured: event.target.checked })} /> Featured</label>
            <label className="cms-check"><input type="checkbox" checked={plan.active} onChange={(event) => edit(plan.id, { active: event.target.checked })} /> Active</label>
          </article>
        ))}
      </div>
    </section>
  );
}

function BlogEditor({ cms, update }: { cms: CmsState; update: (patch: Partial<CmsState>) => void }) {
  const edit = (id: string, patch: Partial<CmsPost>) =>
    update({ posts: cms.posts.map((post) => post.id === id ? { ...post, ...patch } : post) });

  const add = () =>
    update({
      posts: [
        ...cms.posts,
        {
          id: crypto.randomUUID(),
          category: 'New category',
          title: 'New marketing story',
          excerpt: 'Add a blog, campaign, case study or resource summary.',
          author: 'UK Unlimited',
          readTime: '5 min read',
          published: false,
          featured: false,
        },
      ],
    });

  return (
    <section className="cms-section">
      <div className="cms-intro">
        <p>Manage blogs, insights, case studies, campaigns, resources and marketing stories.</p>
        <button className="cms-primary" onClick={add}>Add article +</button>
      </div>

      <div className="cms-list">
        {cms.posts.map((post) => (
          <article className="cms-card cms-post" key={post.id}>
            <label>Category<input value={post.category} onChange={(event) => edit(post.id, { category: event.target.value })} /></label>
            <label>Title<input value={post.title} onChange={(event) => edit(post.id, { title: event.target.value })} /></label>
            <label>Excerpt<textarea value={post.excerpt} onChange={(event) => edit(post.id, { excerpt: event.target.value })} /></label>
            <label>Author<input value={post.author} onChange={(event) => edit(post.id, { author: event.target.value })} /></label>
            <label>Read time<input value={post.readTime} onChange={(event) => edit(post.id, { readTime: event.target.value })} /></label>
            <label className="cms-check"><input type="checkbox" checked={post.featured} onChange={(event) => edit(post.id, { featured: event.target.checked })} /> Featured</label>
            <label className="cms-check"><input type="checkbox" checked={post.published} onChange={(event) => edit(post.id, { published: event.target.checked })} /> Published</label>
          </article>
        ))}
      </div>
    </section>
  );
}

function SeoEditor({ cms, update }: { cms: CmsState; update: (patch: Partial<CmsState>) => void }) {
  const [page, setPage] = useState<CmsPage>('home');
  const current = cms.seo[page];

  const edit = (patch: Partial<typeof current>) =>
    update({ seo: { ...cms.seo, [page]: { ...current, ...patch } } });

  return (
    <section className="cms-section">
      <div className="cms-card cms-form">
        <label>Page<select value={page} onChange={(event) => setPage(event.target.value as CmsPage)}>
          {Object.keys(cms.seo).map((key) => <option value={key} key={key}>{key}</option>)}
        </select></label>

        <label>SEO title<input value={current.title} onChange={(event) => edit({ title: event.target.value })} /></label>
        <p className="cms-counter">{current.title.length}/60 recommended characters</p>

        <label>Meta description<textarea value={current.description} onChange={(event) => edit({ description: event.target.value })} /></label>
        <p className="cms-counter">{current.description.length}/160 recommended characters</p>

        <label>Canonical URL<input value={current.canonical} onChange={(event) => edit({ canonical: event.target.value })} /></label>
        <label>Open Graph image URL<input value={current.ogImage} onChange={(event) => edit({ ogImage: event.target.value })} /></label>
        <label className="cms-check"><input type="checkbox" checked={current.noIndex} onChange={(event) => edit({ noIndex: event.target.checked })} /> No index</label>
      </div>
    </section>
  );
}

function StatsEditor({ cms, update }: { cms: CmsState; update: (patch: Partial<CmsState>) => void }) {
  const summary = useMemo(() => analyticsSummary(), []);

  return (
    <section className="cms-section">
      <div className="cms-intro">
        <p>Local first-party tracking prototype. Production tracking should use a consent-aware UiPath or approved analytics adapter.</p>
        <button className="cms-primary" onClick={downloadAnalytics}>Export analytics</button>
      </div>

      <div className="cms-stats-grid">
        <Metric label="Page views" value={String(summary.pageViews)} detail="Tracked visits" />
        <Metric label="Sessions" value={String(summary.sessions)} detail="Unique browser sessions" />
        <Metric label="CTA clicks" value={String(summary.ctaClicks)} detail="Button and link clicks" />
        <Metric label="Conversions" value={String(summary.conversions)} detail="Conversion-labelled clicks" />
      </div>

      <div className="cms-two-column">
        <section className="cms-card">
          <span className="cms-kicker">TOP PAGES</span>
          {Object.entries(summary.topPages).map(([page, count]) => <div className="cms-stat-row" key={page}><span>{page}</span><strong>{count}</strong></div>)}
        </section>

        <section className="cms-card">
          <span className="cms-kicker">TOP DESIGNS</span>
          {Object.entries(summary.topDesigns).map(([design, count]) => <div className="cms-stat-row" key={design}><span>{design}</span><strong>{count}</strong></div>)}
        </section>

        <section className="cms-card">
          <span className="cms-kicker">TRAFFIC SOURCES</span>
          {Object.entries(summary.sources).map(([source, count]) => <div className="cms-stat-row" key={source}><span>{source}</span><strong>{count}</strong></div>)}
        </section>

        <section className="cms-card">
          <span className="cms-kicker">PRIVACY CONTROL</span>
          <label className="cms-check">
            <input type="checkbox" checked={cms.analyticsEnabled} onChange={(event) => update({ analyticsEnabled: event.target.checked })} />
            Enable first-party analytics
          </label>
          <p className="cms-help">No analytics data leaves the browser in this prototype.</p>
        </section>
      </div>

      <section className="cms-card">
        <span className="cms-kicker">RECENT EVENTS</span>
        <div className="cms-events">
          {summary.recent.map((event) => <div className="cms-event" key={event.id}><span>{event.type}</span><small>{event.page}</small><time>{new Date(event.timestamp).toLocaleString()}</time></div>)}
        </div>
      </section>
    </section>
  );
}

function BackupEditor({ cms, update }: { cms: CmsState; update: (patch: Partial<CmsState>) => void }) {
  const [password, setPassword] = useState('');

  const snapshot = () => {
    downloadJson(`uk-unlimited-cms-${new Date().toISOString().slice(0, 10)}.json`, {
      exportedAt: new Date().toISOString(),
      cms,
      note: 'Secrets are intentionally excluded.',
    });
  };

  const encryptedSnapshot = async () => {
    if (!password) {
      window.alert('Enter a backup password first.');
      return;
    }

    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' },
      material,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt'],
    );

    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(JSON.stringify({ exportedAt: new Date().toISOString(), cms })),
    );

    downloadJson(`uk-unlimited-encrypted-backup-${new Date().toISOString().slice(0, 10)}.json`, {
      format: 'UKU-AES-GCM-BACKUP-1',
      salt: Array.from(salt),
      iv: Array.from(iv),
      ciphertext: Array.from(new Uint8Array(encrypted)),
      note: 'Keep the password separate from this backup. Secrets are not included.',
    });
  };

  return (
    <section className="cms-section">
      <div className="cms-two-column">
        <section className="cms-card cms-form">
          <span className="cms-kicker">BACKUP POLICY</span>
          <label className="cms-check"><input type="checkbox" checked={cms.backup.enabled} onChange={(event) => update({ backup: { ...cms.backup, enabled: event.target.checked } })} /> Scheduled backups enabled</label>
          <label>Frequency<select value={cms.backup.frequency} onChange={(event) => update({ backup: { ...cms.backup, frequency: event.target.value as 'daily' | 'weekly' | 'monthly' } })}><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></select></label>
          <label>Retention count<input type="number" min="1" max="100" value={cms.backup.retention} onChange={(event) => update({ backup: { ...cms.backup, retention: Number(event.target.value) } })} /></label>
        </section>

        <section className="cms-card cms-form">
          <span className="cms-kicker">ENCRYPTED EXPORT</span>
          <p className="cms-help">The password is used once and is never stored. Keep it separately from the downloaded backup.</p>
          <label>Backup password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <button className="cms-primary" onClick={encryptedSnapshot}>Export encrypted backup</button>
          <button className="cms-secondary" onClick={snapshot}>Export readable snapshot</button>
        </section>
      </div>

      <section className="cms-card">
        <span className="cms-kicker">PRODUCTION ADAPTER</span>
        <h2>UiPath Storage Bucket backup</h2>
        <p className="cms-help">The local editor is ready. Phase 2 will connect scheduled jobs, Storage Buckets, retention enforcement, restore approvals and audit history. Encryption keys must remain outside GitHub and outside the backup archive.</p>
      </section>
    </section>
  );
}

function ChromeEditor({ cms, update }: { cms: CmsState; update: (patch: Partial<CmsState>) => void }) {
  return (
    <section className="cms-card cms-form">
      <label>Top banner<input value={cms.banner} onChange={(event) => update({ banner: event.target.value })} /></label>
      <label className="cms-check"><input type="checkbox" checked={cms.stickyHeader} onChange={(event) => update({ stickyHeader: event.target.checked })} /> Sticky header</label>
      <label>Logo variant<select value={cms.logo} onChange={(event) => update({ logo: event.target.value })}><option value="monogram">Monogram</option><option value="wordmark">Wordmark</option><option value="orbit">Animated orbit</option><option value="pulse">Animated pulse</option></select></label>
    </section>
  );
}
