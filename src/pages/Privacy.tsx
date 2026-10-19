import { motion } from 'motion/react';
import { useEffect, ReactNode, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../components/LenisContext';

const SECTIONS = [
  { id: 'scope', title: 'Scope' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-information', title: 'How We Use Information' },
  { id: 'how-we-share-information', title: 'How We Share Information' },
  { id: 'client-data', title: 'When We Act on Behalf of Our Clients' },
  { id: 'ai-phone-and-messaging', title: 'Our Standards for AI Phone and Messaging Systems' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'cookies-and-analytics', title: 'Cookies and Analytics' },
  { id: 'security', title: 'Security' },
  { id: 'your-choices-and-rights', title: 'Your Choices and Rights' },
  { id: 'children', title: 'Children' },
  { id: 'location-of-processing', title: 'Location of Processing' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact', title: 'Contact Us' },
];

const PAGE_TITLE = 'Privacy Policy | Inflection Partners';

export default function Privacy() {
  const lenis = useLenis();
  const { hash } = useLocation();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  // On direct loads (e.g. /privacy#client-data) the hash is set before this lazy page mounts,
  // so the global ScrollToTop can't find the target. Jump to it once the page and Lenis are ready.
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      if (lenis) {
        // Lenis caches the scroll limit, which can predate this page's content
        lenis.resize();
        lenis.scrollTo(target, { immediate: true, force: true });
      } else {
        target.scrollIntoView();
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, lenis]);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target);
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Update the URL without a router navigation, which would trigger a competing scroll
    window.history.replaceState(window.history.state, '', `#${id}`);
  };

  const SectionLink = ({ n }: { n: number }) => {
    const { id } = SECTIONS[n - 1];
    return (
      <a
        href={`#${id}`}
        onClick={(e) => scrollToSection(e, id)}
        className="text-brand-accent underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent transition-colors"
      >
        Section {n}
      </a>
    );
  };

  return (
    <div className="bg-brand-paper min-h-screen pt-20 relative">
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pb-12 mb-12 border-b border-brand-border"
          >
            <span className="font-mono text-brand-accent text-[10px] font-extrabold tracking-[0.2em] uppercase mb-6 block underline underline-offset-8">Legal</span>
            <h1 className="text-5xl md:text-7xl font-sans font-extrabold tracking-tighter mb-6 leading-[1.05] text-white">
              Privacy Policy
            </h1>
            <p className="text-xl text-white font-medium mb-4">Inflection Partners Series LLC</p>
            <div className="font-mono text-xs uppercase tracking-widest text-brand-text/60 space-y-1">
              <p>Effective date: July 1, 2026</p>
              <p>Last updated: October 19, 2026</p>
            </div>
          </motion.header>

          <div className="grid lg:grid-cols-[16rem_minmax(0,1fr)] gap-12 lg:gap-20">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <nav aria-label="Contents" className="p-6 rounded-2xl bg-white/5 border border-brand-border">
                <p className="font-mono text-brand-accent text-[10px] font-extrabold uppercase tracking-widest mb-4">Contents</p>
                <ol className="space-y-2.5 text-sm">
                  {SECTIONS.map((section, i) => (
                    <li key={section.id} className="flex gap-3">
                      <span className="font-mono text-brand-text/40 w-5 shrink-0 text-right">{i + 1}.</span>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => scrollToSection(e, section.id)}
                        className="text-brand-text/70 hover:text-brand-accent transition-colors leading-snug"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="max-w-[68ch] text-brand-text/90 text-[17px] leading-[1.75] font-light space-y-6">
              <p>
                Inflection Partners Series LLC ("Inflection Partners," "we," "us," or "our") is a consulting firm that works with businesses to design, build, and operate AI systems. This Privacy Policy explains what personal information we collect, how we use and share it, and the choices you have. It also explains how we handle information when we build and run systems on behalf of our clients.
              </p>

              <Section n={1}>
                <p>This policy applies to:</p>
                <List>
                  <li>our websites, including inflectionpartners.io and its subdomains (the "Sites");</li>
                  <li>our communications with prospective and current clients, partners, and other business contacts; and</li>
                  <li>information we process on behalf of our clients when delivering consulting and technology services (see <SectionLink n={5} />).</li>
                </List>
                <p>
                  When we process information on behalf of a client, that client's own privacy policy governs how the information is used. This policy describes our role and our commitments as the client's service provider.
                </p>
              </Section>

              <Section n={2}>
                <SubHeading>Information you give us</SubHeading>
                <List>
                  <li><Strong>Contact and business information</Strong>, such as your name, job title, company, email address, and phone number, when you contact us, request a meeting, or engage us for services.</li>
                  <li><Strong>Communications</Strong>, such as the content of emails, messages, and meeting notes.</li>
                  <li><Strong>Business and billing information</Strong> needed to contract with and invoice clients and vendors.</li>
                </List>
                <SubHeading>Information collected automatically</SubHeading>
                <p>
                  When you visit the Sites, our hosting and analytics providers may automatically collect technical information, such as IP address, browser type, device information, pages viewed, referring URLs, and dates and times of visits. See <SectionLink n={8} /> for cookies and analytics.
                </p>
                <SubHeading>Information from other sources</SubHeading>
                <p>
                  We may collect business contact information from publicly available sources, such as company websites and professional networking sites, and from referrals by people who know you.
                </p>
              </Section>

              <Section n={3}>
                <p>We use the information described in <SectionLink n={2} /> to:</p>
                <List>
                  <li>respond to inquiries and schedule meetings;</li>
                  <li>provide, manage, and improve our services and the Sites;</li>
                  <li>send business communications you would reasonably expect, such as follow-ups and engagement updates;</li>
                  <li>contract with, invoice, and pay clients and vendors;</li>
                  <li>maintain the security and integrity of our systems; and</li>
                  <li>comply with legal obligations and enforce our agreements.</li>
                </List>
                <p>We do not sell personal information, and we do not share it for cross-context behavioral advertising.</p>
              </Section>

              <Section n={4}>
                <p>We share personal information only as follows:</p>
                <List>
                  <li><Strong>Service providers</Strong> that help us run our business, such as cloud hosting, email and productivity, website hosting and analytics, and accounting providers. They may use the information only to perform services for us.</li>
                  <li><Strong>Clients</Strong>, when the information was collected for, or on behalf of, that client.</li>
                  <li><Strong>Legal and safety</Strong>: when required by law, legal process, or a government request, or to protect the rights, property, or safety of Inflection Partners, our clients, or others.</li>
                  <li><Strong>Business transfers</Strong>, in connection with a merger, acquisition, financing, or sale of assets, subject to this policy.</li>
                  <li><Strong>With your consent</Strong> or at your direction.</li>
                </List>
              </Section>

              <Section n={5}>
                <p>
                  Much of our work involves building and operating systems for our clients, such as automated phone assistants, data pipelines, and workflow tools. In that work, our client decides why and how personal information is processed, and we act as the client's service provider (also called a "processor"). For example, when we operate an automated phone assistant for a client, the people calling that client's phone line are the client's contacts, not ours.
                </p>
                <p>When we act as a service provider:</p>
                <List>
                  <li><Strong>We follow client instructions.</Strong> We process client data only to provide the services the client engaged us for, as described in our agreement with that client.</li>
                  <li><Strong>We do not use client data for our own purposes.</Strong> We do not sell it, use it for our own marketing, or combine it with other clients' data. We also do not use it to train or improve AI models or systems for ourselves or for other clients.</li>
                  <li><Strong>We restrict our vendors the same way.</Strong> We use technology vendors such as communications platforms, cloud hosting and database providers, AI model providers, and data verification services. We configure them, where available, so they do not use client data to train their own models, and we limit their use of the data to providing services to us.</li>
                  <li><Strong>We limit access.</Strong> Access to client data, including call recordings and transcripts, is limited to the client's authorized personnel and the Inflection Partners team members who build and maintain the system.</li>
                  <li><Strong>We follow the client's retention schedule.</Strong> We keep client data only as long as the client instructs or our agreement requires, and then delete it or return it to the client.</li>
                  <li><Strong>Requests go to the client.</Strong> If you contacted one of our clients, such as by calling their phone line, please send privacy questions and requests to that client. If you contact us instead, we will forward your request to the client and help them respond.</li>
                </List>
              </Section>

              <Section n={6}>
                <p>When we build automated voice or messaging systems for clients, our standard practice is to design them so that:</p>
                <List>
                  <li>they tell callers at the start of each call that they are speaking with an automated assistant;</li>
                  <li>they tell callers whether the call is recorded before collecting any information;</li>
                  <li>a caller can reach a person, or ask not to be contacted again, and the client honors that request; and</li>
                  <li>they are not used to place unsolicited marketing calls or texts, or any calls or texts that require prior consent unless that consent has been obtained as the law requires.</li>
                </List>
                <p>Our clients remain responsible for how they use these systems and for meeting their own legal obligations.</p>
              </Section>

              <Section n={7}>
                <p>
                  We keep personal information we control only as long as needed for the purposes described in this policy, including to meet legal, accounting, and reporting requirements. Business contact and engagement records are generally kept for the duration of the relationship and a reasonable period afterward. Client data is retained as described in <SectionLink n={5} />.
                </p>
              </Section>

              <Section n={8}>
                <p>
                  The Sites may use cookies and similar technologies that are necessary for the Sites to work, and privacy-focused analytics to understand how the Sites are used. We currently use Vercel Web Analytics, which collects aggregated, anonymized usage data. We do not use advertising or cross-site tracking cookies. You can control cookies through your browser settings.
                </p>
              </Section>

              <Section n={9}>
                <p>
                  We use reasonable administrative, technical, and physical safeguards to protect personal information. These include access controls, encryption in transit, and reputable cloud infrastructure providers. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </Section>

              <Section n={10}>
                <p>
                  You may opt out of non-essential business emails from us at any time by replying to let us know or by using the unsubscribe link, if one is provided.
                </p>
                <p>
                  Depending on where you live, you may have the right to request access to, correction of, or deletion of your personal information, to obtain a copy of it, or to opt out of certain processing. To make a request, contact us using the details in <SectionLink n={14} />. We will verify your request and respond within the time required by applicable law (generally within 45 days). If we deny your request, you may appeal by replying to our decision, and we will respond to your appeal as the law requires. We will not discriminate against you for exercising your rights.
                </p>
                <p>
                  If your request concerns information we process for a client, we will refer it to that client as described in <SectionLink n={5} />.
                </p>
              </Section>

              <Section n={11}>
                <p>
                  Our Sites and services are intended for businesses and are not directed to children under 13. We do not knowingly collect personal information from children.
                </p>
              </Section>

              <Section n={12}>
                <p>We are based in the United States, and we store and process information in the United States.</p>
              </Section>

              <Section n={13}>
                <p>
                  We may update this policy from time to time. When we do, we will update the "Last updated" date above. If the changes are material, we will provide additional notice as appropriate.
                </p>
              </Section>

              <Section n={14}>
                <p>
                  Inflection Partners Series LLC
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:hello@inflectionpartners.io"
                    className="text-brand-accent underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent transition-colors"
                  >
                    hello@inflectionpartners.io
                  </a>
                </p>
              </Section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({ n, children }: { n: number; children: ReactNode }) {
  const { id, title } = SECTIONS[n - 1];
  return (
    <section className="pt-8 space-y-5">
      <h2 id={id} className="scroll-mt-32 text-2xl md:text-3xl font-sans font-extrabold tracking-tight text-white leading-tight">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-lg font-bold text-white tracking-tight">{children}</h3>;
}

function List({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-3 marker:text-brand-accent">
      {children}
    </ul>
  );
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}
