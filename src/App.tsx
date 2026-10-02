import { useState, type FormEvent } from 'react';

type View = 'home' | 'pricing' | 'dashboard';

const stats = [
  ['Automation velocity', '84.6%', '+12.8%', 'violet'],
  ['Hours returned', '1,284', '+18.4%', 'cyan'],
  ['Active workflows', '42', '+6.2%', 'blue'],
  ['Value created', '£218k', '+24.1%', 'pink'],
] as const;

const activity = [
  ['Invoice intelligence pipeline', 'Document AI', 'Running', '2m ago', 'violet'],
  ['Customer onboarding orchestration', 'Maestro', 'Completed', '18m ago', 'cyan'],
  ['Revenue reconciliation', 'RPA workflow', 'Running', '31m ago', 'blue'],
  ['Policy exception review', 'Human-in-the-loop', 'Needs review', '48m ago', 'pink'],
] as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand">
      <span className="brand-mark"><b>U</b><i>K</i></span>
      {!compact && <span className="brand-name">UK <strong>UNLIMITED</strong></span>}
    </span>
  );
}

function Button({
  children,
  onClick,
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
}) {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [view, setView] = useState<View>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const navigate = (next: View) => {
    setView(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDemo = () => setAuthOpen(true);

  return (
    <div className="app-shell">
      <div className="noise" />

      <header className="site-header">
        <button className="logo-button" onClick={() => navigate('home')} aria-label="UK Unlimited home">
          <Logo />
        </button>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <button className={view === 'home' ? 'active' : ''} onClick={() => navigate('home')}>
            Platform
          </button>
          <button className={view === 'pricing' ? 'active' : ''} onClick={() => navigate('pricing')}>
            Pricing
          </button>
          <button onClick={() => setNotice('Resources are coming soon.')}>
            Resources
          </button>
        </nav>

        <div className="header-actions">
          <button className="login-link" onClick={openDemo}>Sign in</button>
          <Button onClick={openDemo}>Book a demo <span>↗</span></Button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {notice && (
        <button className="notice" onClick={() => setNotice('')}>
          <span>✦</span>{notice}<b>×</b>
        </button>
      )}

      {view === 'home' && <Home onPricing={() => navigate('pricing')} onStart={openDemo} />}
      {view === 'pricing' && <Pricing onStart={openDemo} />}
      {view === 'dashboard' && <Dashboard onBack={() => navigate('home')} />}

      <footer className="site-footer">
        <div>
          <Logo compact />
          <span className="footer-copy">The operating system for unlimited potential.</span>
        </div>
        <div className="footer-links">
          <button onClick={() => navigate('pricing')}>Pricing</button>
          <button onClick={() => setNotice('Privacy centre coming soon.')}>Privacy</button>
          <button onClick={() => setNotice('Contact: hello@ukunlimited.com')}>Contact</button>
        </div>
        <span className="copyright">© 2026 UK Unlimited</span>
      </footer>

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onContinue={() => {
            setAuthOpen(false);
            setView('dashboard');
            setNotice('Demo access enabled — UiPath OAuth is not connected yet.');
          }}
        />
      )}
    </div>
  );
}

function Home({ onPricing, onStart }: { onPricing: () => void; onStart: () => void }) {
  return (
    <main>
      <section className="hero page-width">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse-dot" /> BUILD WITHOUT LIMITS</div>
          <h1>Turn complexity<br /><em>into momentum.</em></h1>
          <p className="hero-lead">
            UK Unlimited gives ambitious teams the intelligence, orchestration,
            and automation to move at the speed of possibility.
          </p>

          <div className="hero-actions">
            <Button onClick={onStart}>Start building <span>↗</span></Button>
            <button className="text-button" onClick={onPricing}>
              Explore plans <span>→</span>
            </button>
          </div>

          <div className="hero-proof">
            <span className="proof-avatars">
              <b>AH</b><b>LM</b><b>SP</b><b>+</b>
            </span>
            <span>Trusted by teams<br /><strong>building what’s next.</strong></span>
          </div>
        </div>

        <div className="hero-visual">
          <span className="orb orb--one" />
          <span className="orb orb--two" />
          <span className="orb orb--three" />

          <div className="network-card">
            <div className="network-top">
              <span className="mini-logo">UK</span>
              <span className="live-tag"><i /> LIVE SYSTEM</span>
            </div>
            <div className="network-core">
              <span className="core-ring" />
              <span className="core-label">UNLIMITED<br /><b>INTELLIGENCE</b></span>
            </div>
            <div className="network-bottom">
              <span>42 active flows</span>
              <span>99.98% uptime</span>
            </div>
          </div>

          <div className="float-card float-card--top">
            <span className="float-icon">✦</span>
            <span><small>Automation score</small><strong>+84.6%</strong></span>
            <b className="sparkline">╱╲╱╱╲</b>
          </div>

          <div className="float-card float-card--bottom">
            <span className="status-check">✓</span>
            <span><small>Value created</small><strong>£218,420</strong></span>
            <b className="up-label">↑ 24.1%</b>
          </div>
        </div>
      </section>

      <section className="marquee">
        <div className="marquee-track">
          <span>ORCHESTRATE</span><i>✦</i>
          <span>INTELLIGENT AUTOMATION</span><i>✦</i>
          <span>CREATE MOMENTUM</span><i>✦</i>
          <span>ORCHESTRATE</span><i>✦</i>
        </div>
      </section>

      <section className="value-section page-width">
        <div className="section-intro">
          <div className="eyebrow">WHY UK UNLIMITED</div>
          <h2>More than automation.<br /><em>A new operating advantage.</em></h2>
        </div>

        <div className="value-grid">
          <ValueCard icon="◌" title="See the signal" text="Surface the moments that matter across your operation before they become bottlenecks." />
          <ValueCard icon="✦" title="Move with intent" text="Turn insight into action with intelligent workflows that adapt as fast as your business." />
          <ValueCard icon="↗" title="Compound the gain" text="Every automation creates capacity for the next ambitious idea. Keep building." />
        </div>
      </section>

      <section className="cta-section page-width">
        <div className="cta-panel">
          <div className="cta-glow" />
          <div className="eyebrow">READY WHEN YOU ARE</div>
          <h2>Your next chapter<br /><em>starts here.</em></h2>
          <p>Bring us the hard problem. We’ll help you turn it into your unfair advantage.</p>
          <Button onClick={onStart}>Let’s build <span>↗</span></Button>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <article className="value-card">
      <div className="value-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="card-arrow">↗</span>
    </article>
  );
}

function Pricing({ onStart }: { onStart: () => void }) {
  return (
    <main className="page-width page-wrap">
      <section className="page-heading">
        <div className="eyebrow">PRICING THAT SCALES WITH POSSIBILITY</div>
        <h1>Choose your<br /><em>unfair advantage.</em></h1>
        <p>Start with clarity. Scale into momentum. Every plan is designed for teams who are serious about what comes next.</p>
      </section>

      <div className="pricing-grid">
        <PriceCard
          name="Signal"
          price="0"
          description="A sharper view of what’s possible."
          items={['Automation opportunity map', 'Unlimited collaborators', 'Community playbooks']}
          action="Explore free"
          onClick={onStart}
        />
        <PriceCard
          featured
          name="Momentum"
          price="1,250"
          description="For teams ready to move with intent."
          items={['Everything in Signal', 'Intelligent workflow orchestration', 'Dedicated implementation partner', 'Value reporting dashboard']}
          action="Start a conversation"
          onClick={onStart}
        />
        <PriceCard
          name="Unlimited"
          price="Custom"
          description="Your operating advantage, amplified."
          items={['Everything in Momentum', 'Enterprise governance & controls', 'Bespoke AI capabilities', 'Strategic growth partnership']}
          action="Talk to an expert"
          onClick={onStart}
        />
      </div>
    </main>
  );
}

function PriceCard({
  name,
  price,
  description,
  items,
  action,
  featured = false,
  onClick,
}: {
  name: string;
  price: string;
  description: string;
  items: string[];
  action: string;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <article className={`price-card ${featured ? 'price-card--featured' : ''}`}>
      {featured && <div className="popular-tag">MOST POPULAR</div>}
      <div className="price-top"><span className="plan-dot" />{name}</div>
      <div className="price"><small>{price !== 'Custom' && '£'}</small>{price}<span>{price !== 'Custom' && '/ month'}</span></div>
      <p>{description}</p>
      <div className="price-rule" />
      <ul>{items.map(item => <li key={item}><span>✓</span>{item}</li>)}</ul>
      <Button variant={featured ? 'primary' : 'outline'} onClick={onClick}>{action} <span>↗</span></Button>
    </article>
  );
}

function Dashboard({ onBack }: { onBack: () => void }) {
  const chart = [44, 51, 47, 62, 58, 71, 66, 78, 73, 88, 83, 96];

  return (
    <main className="page-width dashboard-wrap">
      <div className="dashboard-top">
        <div>
          <button className="back-link" onClick={onBack}>← Back to home</button>
          <div className="eyebrow">GOOD MORNING, STEVIE</div>
          <h1>Your <em>momentum</em>, in view.</h1>
        </div>
        <div className="dash-controls">
          <span className="live-tag"><i /> ALL SYSTEMS OPERATIONAL</span>
          <button className="avatar" aria-label="Profile">SP</button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(([label, value, delta, tone]) => (
          <div className={`stat-card stat-card--${tone}`} key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>↑ {delta} <b>vs last month</b></small>
          </div>
        ))}
      </div>

      <section className="dashboard-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div><span className="panel-kicker">SYSTEM PERFORMANCE</span><h2>Automation velocity</h2></div>
            <button className="period-select">Last 30 days⌄</button>
          </div>
          <div className="bar-chart">
            {chart.map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
          </div>
          <div className="chart-labels"><span>May 04</span><span>May 11</span><span>May 18</span><span>May 25</span><span>Jun 01</span></div>
        </div>

        <div className="panel health-panel">
          <div className="panel-heading">
            <div><span className="panel-kicker">PLATFORM HEALTH</span><h2>Everything is moving</h2></div>
            <span className="health-score">99.98%</span>
          </div>
          <div className="health-ring"><div><strong>100%</strong><span>operational</span></div></div>
          <div className="health-meta"><span><i className="dot dot--cyan" /> Workflows <b>42</b></span><span><i className="dot dot--violet" /> Integrations <b>18</b></span></div>
        </div>
      </section>

      <section className="panel activity-panel">
        <div className="panel-heading">
          <div><span className="panel-kicker">LIVE ACTIVITY</span><h2>What’s happening now</h2></div>
          <button className="text-button">View all →</button>
        </div>
        <div className="activity-list">
          {activity.map(([name, type, status, time, color]) => (
            <div className="activity-row" key={name}>
              <span className={`activity-icon activity-icon--${color}`}>✦</span>
              <div className="activity-name"><strong>{name}</strong><small>{type}</small></div>
              <span className={`activity-status activity-status--${status === 'Needs review' ? 'review' : status === 'Running' ? 'running' : 'complete'}`}><i />{status}</span>
              <span className="activity-time">{time}</span>
              <button className="row-more" aria-label={`More options for ${name}`}>•••</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function AuthModal({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  const [email, setEmail] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={event => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close sign-in">×</button>
        <Logo />
        <div className="eyebrow">WELCOME TO THE UNLIMITED</div>
        <h2 id="auth-title">Let’s build what’s<br /><em>next.</em></h2>
        <p>Enter your email to access your workspace preview.</p>
        <form onSubmit={submit}>
          <label htmlFor="email">Work email</label>
          <input id="email" type="email" required placeholder="you@company.com" value={email} onChange={event => setEmail(event.target.value)} />
          <Button>Continue <span>↗</span></Button>
        </form>
        <small className="auth-note">Demo mode is active. Connect UiPath OAuth before using this as production authentication.</small>
      </div>
    </div>
  );
}

export default App;
