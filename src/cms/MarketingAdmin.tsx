import { useState } from 'react';
import {
  loadMarketing,
  saveMarketing,
  type CaseStudy,
  type FaqItem,
  type MarketingDesign,
  type MarketingState,
  type MediaKind,
  type MediaSlot,
  type Testimonial,
} from './marketingStore';
import './MarketingAdmin.css';

type MarketingTab = 'case-studies' | 'testimonials' | 'faq' | 'media';

const designs: MarketingDesign[] = [
  'signal',
  'lumen',
  'bloom',
  'prism',
  'pulse',
  'shared',
];

const mediaKinds: MediaKind[] = [
  'hero',
  'case-study',
  'testimonial',
  'og-image',
  'logo',
  'icon',
  'video',
];

export function MarketingAdmin() {
  const [data, setData] = useState<MarketingState>(loadMarketing);
  const [tab, setTab] = useState<MarketingTab>('case-studies');

  const update = (patch: Partial<MarketingState>) => {
    setData(saveMarketing(patch));
  };

  return (
    <section className="marketing-admin">
      <div className="marketing-admin-tabs">
        <button className={tab === 'case-studies' ? 'active' : ''} onClick={() => setTab('case-studies')}>
          Case studies
        </button>
        <button className={tab === 'testimonials' ? 'active' : ''} onClick={() => setTab('testimonials')}>
          Testimonials
        </button>
        <button className={tab === 'faq' ? 'active' : ''} onClick={() => setTab('faq')}>
          FAQ
        </button>
        <button className={tab === 'media' ? 'active' : ''} onClick={() => setTab('media')}>
          Media slots
        </button>
      </div>

      {tab === 'case-studies' && <CaseStudyEditor data={data} update={update} />}
      {tab === 'testimonials' && <TestimonialEditor data={data} update={update} />}
      {tab === 'faq' && <FaqEditor data={data} update={update} />}
      {tab === 'media' && <MediaEditor data={data} update={update} />}
    </section>
  );
}

function CaseStudyEditor({
  data,
  update,
}: {
  data: MarketingState;
  update: (patch: Partial<MarketingState>) => void;
}) {
  const edit = (id: string, patch: Partial<CaseStudy>) => {
    update({
      caseStudies: data.caseStudies.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const add = () => {
    update({
      caseStudies: [
        ...data.caseStudies,
        {
          id: crypto.randomUUID(),
          sector: 'NEW SECTOR',
          title: 'New case study',
          summary: 'Add the customer story summary.',
          result: 'Add the primary result',
          metric: 'Add the supporting metric',
          tags: ['New tag'],
          mediaSlotId: '',
          ctaLabel: 'Read case study',
          ctaUrl: '#',
          featured: false,
          published: false,
        },
      ],
    });
  };

  return (
    <div className="marketing-editor">
      <div className="marketing-editor-heading">
        <p>Manage customer stories, results, metrics, tags, CTAs and publishing status.</p>
        <button className="marketing-primary" onClick={add}>Add case study +</button>
      </div>

      {data.caseStudies.map((item) => (
        <article className="marketing-card marketing-form-grid" key={item.id}>
          <label>Sector<input value={item.sector} onChange={(event) => edit(item.id, { sector: event.target.value })} /></label>
          <label>Title<input value={item.title} onChange={(event) => edit(item.id, { title: event.target.value })} /></label>
          <label className="marketing-wide">Summary<textarea value={item.summary} onChange={(event) => edit(item.id, { summary: event.target.value })} /></label>
          <label>Primary result<input value={item.result} onChange={(event) => edit(item.id, { result: event.target.value })} /></label>
          <label>Supporting metric<input value={item.metric} onChange={(event) => edit(item.id, { metric: event.target.value })} /></label>
          <label>Tags<input value={item.tags.join(', ')} onChange={(event) => edit(item.id, { tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} /></label>
          <label>Media slot<select value={item.mediaSlotId} onChange={(event) => edit(item.id, { mediaSlotId: event.target.value })}><option value="">No media slot</option>{data.mediaSlots.map((slot) => <option value={slot.id} key={slot.id}>{slot.label}</option>)}</select></label>
          <label>CTA label<input value={item.ctaLabel} onChange={(event) => edit(item.id, { ctaLabel: event.target.value })} /></label>
          <label>CTA URL<input value={item.ctaUrl} onChange={(event) => edit(item.id, { ctaUrl: event.target.value })} /></label>
          <label className="marketing-check"><input type="checkbox" checked={item.featured} onChange={(event) => edit(item.id, { featured: event.target.checked })} /> Featured</label>
          <label className="marketing-check"><input type="checkbox" checked={item.published} onChange={(event) => edit(item.id, { published: event.target.checked })} /> Published</label>
        </article>
      ))}
    </div>
  );
}

function TestimonialEditor({
  data,
  update,
}: {
  data: MarketingState;
  update: (patch: Partial<MarketingState>) => void;
}) {
  const edit = (id: string, patch: Partial<Testimonial>) => {
    update({
      testimonials: data.testimonials.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const add = () => {
    update({
      testimonials: [
        ...data.testimonials,
        {
          id: crypto.randomUUID(),
          quote: 'Add a customer quote.',
          name: 'Customer name',
          role: 'Customer role',
          company: 'Company',
          avatarSlotId: '',
          featured: false,
          published: false,
        },
      ],
    });
  };

  return (
    <div className="marketing-editor">
      <div className="marketing-editor-heading">
        <p>Manage social proof, customer attribution, avatar slots and featured testimonials.</p>
        <button className="marketing-primary" onClick={add}>Add testimonial +</button>
      </div>

      {data.testimonials.map((item) => (
        <article className="marketing-card marketing-form-grid" key={item.id}>
          <label className="marketing-wide">Quote<textarea value={item.quote} onChange={(event) => edit(item.id, { quote: event.target.value })} /></label>
          <label>Name<input value={item.name} onChange={(event) => edit(item.id, { name: event.target.value })} /></label>
          <label>Role<input value={item.role} onChange={(event) => edit(item.id, { role: event.target.value })} /></label>
          <label>Company<input value={item.company} onChange={(event) => edit(item.id, { company: event.target.value })} /></label>
          <label>Avatar slot<select value={item.avatarSlotId} onChange={(event) => edit(item.id, { avatarSlotId: event.target.value })}><option value="">No avatar</option>{data.mediaSlots.filter((slot) => slot.kind === 'testimonial' || slot.kind === 'logo').map((slot) => <option value={slot.id} key={slot.id}>{slot.label}</option>)}</select></label>
          <label className="marketing-check"><input type="checkbox" checked={item.featured} onChange={(event) => edit(item.id, { featured: event.target.checked })} /> Featured</label>
          <label className="marketing-check"><input type="checkbox" checked={item.published} onChange={(event) => edit(item.id, { published: event.target.checked })} /> Published</label>
        </article>
      ))}
    </div>
  );
}

function FaqEditor({
  data,
  update,
}: {
  data: MarketingState;
  update: (patch: Partial<MarketingState>) => void;
}) {
  const edit = (id: string, patch: Partial<FaqItem>) => {
    update({
      faqItems: data.faqItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const add = () => {
    update({
      faqItems: [
        ...data.faqItems,
        {
          id: crypto.randomUUID(),
          category: 'General',
          question: 'New question',
          answer: 'Add the answer.',
          order: data.faqItems.length + 1,
          published: false,
        },
      ],
    });
  };

  return (
    <div className="marketing-editor">
      <div className="marketing-editor-heading">
        <p>Manage FAQ categories, ordering, answers and visibility.</p>
        <button className="marketing-primary" onClick={add}>Add FAQ item +</button>
      </div>

      {data.faqItems
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((item) => (
          <article className="marketing-card marketing-form-grid" key={item.id}>
            <label>Category<input value={item.category} onChange={(event) => edit(item.id, { category: event.target.value })} /></label>
            <label>Order<input type="number" min="1" value={item.order} onChange={(event) => edit(item.id, { order: Number(event.target.value) })} /></label>
            <label className="marketing-wide">Question<input value={item.question} onChange={(event) => edit(item.id, { question: event.target.value })} /></label>
            <label className="marketing-wide">Answer<textarea value={item.answer} onChange={(event) => edit(item.id, { answer: event.target.value })} /></label>
            <label className="marketing-check"><input type="checkbox" checked={item.published} onChange={(event) => edit(item.id, { published: event.target.checked })} /> Published</label>
          </article>
        ))}
    </div>
  );
}

function MediaEditor({
  data,
  update,
}: {
  data: MarketingState;
  update: (patch: Partial<MarketingState>) => void;
}) {
  const edit = (id: string, patch: Partial<MediaSlot>) => {
    update({
      mediaSlots: data.mediaSlots.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    });
  };

  const add = () => {
    update({
      mediaSlots: [
        ...data.mediaSlots,
        {
          id: crypto.randomUUID(),
          design: 'shared',
          kind: 'hero',
          label: 'New media slot',
          url: '',
          mobileUrl: '',
          alt: '',
          focalPoint: 'center',
          formatHint: 'WebP or SVG',
          loading: 'lazy',
          active: true,
        },
      ],
    });
  };

  return (
    <div className="marketing-editor">
      <div className="marketing-editor-heading">
        <p>Configure media without hardcoding assets. Production upload will connect to Storage Buckets.</p>
        <button className="marketing-primary" onClick={add}>Add media slot +</button>
      </div>

      {data.mediaSlots.map((slot) => (
        <article className="marketing-card marketing-form-grid" key={slot.id}>
          <label>Label<input value={slot.label} onChange={(event) => edit(slot.id, { label: event.target.value })} /></label>
          <label>Design<select value={slot.design} onChange={(event) => edit(slot.id, { design: event.target.value as MarketingDesign })}>{designs.map((design) => <option value={design} key={design}>{design}</option>)}</select></label>
          <label>Media kind<select value={slot.kind} onChange={(event) => edit(slot.id, { kind: event.target.value as MediaKind })}>{mediaKinds.map((kind) => <option value={kind} key={kind}>{kind}</option>)}</select></label>
          <label>Desktop URL<input value={slot.url} onChange={(event) => edit(slot.id, { url: event.target.value })} placeholder="https://..." /></label>
          <label>Mobile URL<input value={slot.mobileUrl} onChange={(event) => edit(slot.id, { mobileUrl: event.target.value })} placeholder="Optional mobile asset" /></label>
          <label className="marketing-wide">Alt text<input value={slot.alt} onChange={(event) => edit(slot.id, { alt: event.target.value })} /></label>
          <label>Focal point<input value={slot.focalPoint} onChange={(event) => edit(slot.id, { focalPoint: event.target.value })} placeholder="center" /></label>
          <label>Format guidance<input value={slot.formatHint} onChange={(event) => edit(slot.id, { formatHint: event.target.value })} /></label>
          <label>Loading<select value={slot.loading} onChange={(event) => edit(slot.id, { loading: event.target.value as 'eager' | 'lazy' })}><option value="lazy">Lazy</option><option value="eager">Eager</option></select></label>
          <label className="marketing-check"><input type="checkbox" checked={slot.active} onChange={(event) => edit(slot.id, { active: event.target.checked })} /> Active</label>
        </article>
      ))}
    </div>
  );
}
