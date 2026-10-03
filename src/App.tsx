import { useEffect, useState } from 'react';
import './App.css';
import { loadCms, saveCms } from './cms/cmsStore';
import { installAnalyticsCapture, trackPageView } from './cms/analytics';
import { CmsAdmin } from './cms/CmsAdmin';

type Design = 'signal' | 'lumen' | 'bloom' | 'prism' | 'pulse';
type Palette = 'aurora' | 'cobalt' | 'ember' | 'mint' | 'saffron';
type Page = 'home' | 'pricing' | 'insights' | 'about';

const designs: Record<Design, string> = {
  signal: 'Signal Lab',
  lumen: 'Lumen Field',
  bloom: 'Neural Bloom',
  prism: 'Prism Engine',
  pulse: 'Pulse Editorial',
};

const palettes: Record<Palette, string> = {
  aurora: 'Aurora',
  cobalt: 'Cobalt',
  ember: 'Ember',
  mint: 'Mint',
  saffron: 'Saffron',
};

function App() {
  const cmsAtStart = loadCms();
  const [design, setDesign] = useState<Design>(cmsAtStart.design as Design);
  const [palette, setPalette] = useState<Palette>(cmsAtStart.palette as Palette);
  const [mode, setMode] = useState<'dark' | 'light'>(cmsAtStart.mode);
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const stop = installAnalyticsCapture();
    return stop;
  }, []);

  useEffect(() => {
    saveCms({ design, palette, mode });
    trackPageView(page, design, palette);
  }, [design, palette, mode, page]);

  const navigate = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`app design-${design} palette-${palette} mode-${mode}`}>
      <header className="header">
        <button className="logo-button" onClick={() => navigate('home')} aria-label="UK Unlimited home">
          <Logo design={design} />
        </button>

        <nav className={menuOpen ? 'nav nav--open' : 'nav'}>
          <button className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}>Platform</button>
          <button className={page === 'pricing' ? 'active' : ''} onClick={() => navigate('pricing')}>Pricing</button>
          <button className={page === 'insights' ? 'active' : ''} onClick={() => navigate('insights')}>Insights</button>
          <button className={page === 'about' ? 'active' : ''} onClick={() => navigate('about')}>About</button>
        </nav>

        <div className="header-actions">
          <button className="login-button" onClick={() => setAdminOpen(true)}>Sign in</button>
          <button className="header-cta" onClick={() => setAdminOpen(true)}>Book a demo ↗</button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="announcement">
        <span>✦</span>
        {loadCms().banner}
        <button onClick={() => navigate('insights')}>Read more →</button>
      </div>

      {page === 'home' && <Home design={design} />}
      {page === 'pricing' && <Pricing />}
      {page === 'insights' && <Insights />}
      {page === 'about' && <About />}

      <Footer navigate={navigate} openAdmin={() => setAdminOpen(true)} />

      <div className="design-dock">
        <span>DESIGN</span>
        <select value={design} onChange={(event) => setDesign(event.target.value as Design)}>
          {Object.entries(designs).map(([id, name]) => (
            <option value={id} key={id}>{name}</option>
          ))}
        </select>

        <select value={palette} onChange={(event) => setPalette(event.target.value as Palette)}>
          {Object.entries(palettes).map(([id, name]) => (
            <option value={id} key={id}>{name}</option>
          ))}
        </select>

        <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          {mode === 'dark' ? '☼ Light' : '◐ Dark'}
        </button>

        <button onClick={() => setAdminOpen(true)}>CMS ↗</button>
      </div>

      {adminOpen && <AdminPreview close={() => setAdminOpen(false)} />}
    </div>
  );
}

function Logo({ design, compact = false }: { design: Design; compact?: boolean }) {
  return (
    <span className={`logo logo-${design} ${compact ? 'logo--compact' : ''}`}>
      <span className="logo-mark"><b>U</b><i>K</i></span>
      {!compact && <span className="logo-name">UK <strong>UNLIMITED</strong></span>}
    </span>
  );
}

function Home({ design }: { design: Design }) {
  if (design === 'lumen') return <LumenHome />;
  if (design === 'bloom') return <BloomHome />;
  if (design === 'prism') return <PrismHome />;
  if (design === 'pulse') return <PulseHome />;
  return <SignalHome />;
}

function SignalHome() {
  return (
    <main className="home signal-home">
      <section className="signal-hero page-width">
        <div className="signal-copy">
          <span className="eyebrow">SIGNAL LAB / 001</span>
          <h1>Turn complexity<br /><em>into momentum.</em></h1>
          <p>Intelligence, orchestration and automation for teams building what comes next.</p>
          <div className="hero-actions">
            <button className="primary-button">Start building ↗</button>
            <button className="text-button">Explore plans →</button>
          </div>
          <div className="proof-line"><span>42 active systems</span><span>99.98% operational</span><span>∞ potential</span></div>
        </div>

        <div className="signal-visual" aria-hidden="true">
          <div className="signal-orbit signal-orbit--wide" />
          <div className="signal-orbit signal-orbit--tall" />
          <div className="signal-core"><b>UK</b><small>INTELLIGENCE<br />ENGINE</small></div>
          <span className="signal-node signal-node--one">01 / SEE</span>
          <span className="signal-node signal-node--two">02 / MOVE</span>
          <span className="signal-node signal-node--three">03 / COMPOUND</span>
          <Metric label="Value created" value="£218,420" className="metric--one" />
          <Metric label="Automation score" value="84.6%" className="metric--two" />
        </div>
      </section>

      <Ticker items={['ORCHESTRATE', 'INTELLIGENT AUTOMATION', 'CREATE MOMENTUM']} />

      <section className="feature-row page-width">
        <Feature number="01" title="See the signal" text="Find the work that quietly holds your operation back." />
        <Feature number="02" title="Move with intent" text="Turn insight into intelligent, repeatable action." />
        <Feature number="03" title="Compound the gain" text="Create capacity for the ideas that come next." />
      </section>

      <CtaBand />
    </main>
  );
}

function LumenHome() {
  return (
    <main className="home lumen-home">
      <section className="lumen-hero page-width">
        <div className="lumen-copy">
          <span className="eyebrow">LUMEN FIELD / 002</span>
          <h1>Make the<br /><em>invisible visible.</em></h1>
          <p>A luminous operating layer for teams that want to see clearly, decide quickly and grow deliberately.</p>
          <button className="primary-button">Enter the field ↗</button>
        </div>

        <div className="lumen-stage" aria-hidden="true">
          <div className="light-beam light-beam--one" />
          <div className="light-beam light-beam--two" />
          <div className="lumen-panel lumen-panel--one"><small>LIVE SIGNAL</small><strong>+84.6%</strong><span>automation velocity</span></div>
          <div className="lumen-panel lumen-panel--two"><small>WORKFLOW STATE</small><strong>42</strong><span>systems in motion</span></div>
          <div className="lumen-panel lumen-panel--three"><small>VALUE CREATED</small><strong>£218k</strong><span>this quarter</span></div>
          <div className="lumen-sun"><span>UK</span></div>
        </div>
      </section>

      <section className="lumen-grid page-width">
        <div><span>01</span><h2>Clarity<br /><em>changes everything.</em></h2></div>
        <div><p>When every important signal is visible, the next decision gets lighter. UK Unlimited brings your operation into focus.</p><button className="text-button">Explore the platform →</button></div>
      </section>

      <CtaBand />
    </main>
  );
}

function BloomHome() {
  return (
    <main className="home bloom-home">
      <section className="bloom-hero page-width">
        <div className="bloom-copy">
          <span className="eyebrow">NEURAL BLOOM / 003</span>
          <h1>Grow a smarter<br /><em>way to work.</em></h1>
          <p>Organic intelligence for teams that want technology to feel more human, adaptive and alive.</p>
          <button className="primary-button">Find your next idea ↗</button>
        </div>

        <div className="bloom-garden" aria-hidden="true">
          <div className="bloom-blob bloom-blob--one" />
          <div className="bloom-blob bloom-blob--two" />
          <div className="bloom-blob bloom-blob--three" />
          <div className="bloom-branch branch--one" />
          <div className="bloom-branch branch--two" />
          <div className="bloom-node node--one">INSIGHT</div>
          <div className="bloom-node node--two">ACTION</div>
          <div className="bloom-node node--three">GROWTH</div>
          <span className="bloom-word">BLOOM</span>
        </div>
      </section>

      <section className="bloom-story page-width">
        <span className="eyebrow">THE HUMAN LAYER</span>
        <h2>Better systems create<br /><em>better space.</em></h2>
        <p>Automate the repetitive, protect the thoughtful and give your people room to do the work that only they can do.</p>
      </section>

      <CtaBand />
    </main>
  );
}

function PrismHome() {
  return (
    <main className="home prism-home">
      <section className="prism-hero page-width">
        <div className="prism-copy">
          <span className="eyebrow">PRISM ENGINE / 004</span>
          <h1>Every angle<br /><em>reveals an advantage.</em></h1>
          <p>A dimensional operating system that turns scattered information into an unmistakably clear next move.</p>
          <button className="primary-button">Turn the prism ↗</button>
        </div>

        <div className="prism-stack" aria-hidden="true">
          <div className="prism-layer prism-layer--back">INSIGHT</div>
          <div className="prism-layer prism-layer--middle">INTENT</div>
          <div className="prism-layer prism-layer--front">MOMENTUM</div>
          <div className="prism-light" />
        </div>
      </section>

      <section className="prism-columns page-width">
        <div><span>01 / CONNECT</span><h3>Bring the fragments together.</h3></div>
        <div><span>02 / CLARIFY</span><h3>See the decision inside the data.</h3></div>
        <div><span>03 / COMPOUND</span><h3>Make every improvement reusable.</h3></div>
      </section>

      <CtaBand />
    </main>
  );
}

function PulseHome() {
  return (
    <main className="home pulse-home">
      <section className="pulse-hero">
        <div className="pulse-topline"><span>UK UNLIMITED / PULSE EDITORIAL</span><span>VOL. 01 / 2026</span></div>
        <h1>Move<br /><em>with intent.</em></h1>
        <div className="pulse-wave" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className="pulse-bottom"><p>Campaign-ready systems for businesses that want to turn their next move into a visible advantage.</p><button className="primary-button">Start the conversation ↗</button></div>
      </section>

      <Ticker items={['STRATEGY', 'DESIGN', 'AUTOMATION', 'AI', 'MOMENTUM']} />

      <section className="pulse-editorial page-width">
        <div><span className="eyebrow">FIELD NOTE / 001</span><h2>The future belongs to teams that make momentum a habit.</h2></div>
        <div><p>UK Unlimited combines bold thinking with practical automation so your business can ship the next thing before the market catches up.</p><button className="text-button">Read the field notes →</button></div>
      </section>

      <CtaBand />
    </main>
  );
}

function Metric({ label, value, className }: { label: string; value: string; className: string }) {
  return <div className={`metric ${className}`}><small>{label}</small><b>{value}</b><i>↑ 24.1%</i></div>;
}

function Feature({ number, title, text }: { number: string; title: string; text: string }) {
  return <article className="feature"><span>{number}</span><h3>{title}</h3><p>{text}</p><b>↗</b></article>;
}

function Ticker({ items }: { items: string[] }) {
  return <div className="ticker">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item} <i>✦</i></span>)}</div>;
}

function CtaBand() {
  return <section className="cta-band page-width"><span className="eyebrow">READY WHEN YOU ARE</span><h2>Bring us the hard problem.<br /><em>We will find the momentum.</em></h2><button className="primary-button">Let’s build ↗</button></section>;
}

function Pricing() {
  return <main className="standard page-width"><span className="eyebrow">PRICING THAT SCALES WITH POSSIBILITY</span><h1>Choose your<br /><em>unfair advantage.</em></h1><p className="intro">Pricing is CMS-editable: plans, prices, features, currencies, CTAs and visibility can all change without code edits.</p><div className="pricing-grid">{loadCms().plans.filter((plan) => plan.active).map((plan, index) => <article className={index === 1 ? 'price-card price-card--featured' : 'price-card'} key={plan.name}>{index === 1 && <span className="popular">MOST POPULAR</span>}<span className="plan-label">{plan.name}</span><h2>{plan.price}<small>{plan.interval && ` / ${plan.interval}`}</small></h2><p>{plan.description}</p><ul>{plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><button className="primary-button">{plan.cta} ↗</button></article>)}</div></main>;
}

function Insights() {
  return (
    <main className="standard page-width">
      <span className="eyebrow">INSIGHTS / FIELD NOTES / PERSPECTIVES</span>
      <h1>Ideas for teams<br /><em>building what’s next.</em></h1>
      <div className="posts">
        {loadCms().posts.filter((post) => post.published).map((post, index) => (
          <article className={index === 0 ? 'post post--featured' : 'post'} key={post.id}>
            <div className="post-art">
              <span>{post.category}</span>
              <b>{String(index + 1).padStart(2, '0')}</b>
            </div>
            <div className="post-copy">
              <span className="eyebrow">{post.readTime} / {post.author}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <button className="text-button">Read article →</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function About() {
  return <main className="standard about page-width"><span className="eyebrow">ABOUT UK UNLIMITED</span><h1>We build systems that give good teams their <em>time back.</em></h1><p className="intro">UK Unlimited is a technology and transformation partner for businesses that want to turn complexity into a durable operating advantage.</p><button className="primary-button">Start a conversation ↗</button></main>;
}

function Footer({ navigate, openAdmin }: { navigate: (page: Page) => void; openAdmin: () => void }) {
  return <footer className="footer page-width"><div><Logo design="signal" compact /><p>The operating system for unlimited potential.</p></div><div className="footer-links"><button onClick={() => navigate('pricing')}>Pricing</button><button onClick={() => navigate('insights')}>Insights</button><button onClick={openAdmin}>Admin preview</button></div><small>© 2026 UK Unlimited</small></footer>;
}

function AdminPreview({ close }: { close: () => void }) {
  return <CmsAdmin close={close} />;
}

export default App;
