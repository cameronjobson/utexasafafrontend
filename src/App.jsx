import { useEffect, useState } from 'react'
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logoImage from './assets/AFA_logo.png'
import presidentHeadshot from './assets/president.jpg'
import coPresidentHeadshot from './assets/co_president.jpg'
import vicePresidentHeadshot from './assets/vice_president.jpg'
import secretaryHeadshot from './assets/secretary.jpg'
import outreachDirectorHeadshot from './assets/outreach_director.jpg'
import webCommsDirectorHeadshot from './assets/web_comms_director.jpg'
import socialMediaDirectorHeadshot from './assets/social_media_director.jpg'
import recruitmentOfficerHeadshot from './assets/recruitment_officer.jpg'
import eventsOfficerHeadshot from './assets/events_officer.jpg'
import inclusionOfficerHeadshot from './assets/inclusion_officer.jpg'
import committeeLeaderHeadshot from './assets/committee_leader.jpg'
import committeeLeader2Headshot from './assets/committee_leader2.jpg'
import committeeLeader3Headshot from './assets/committee_leader3.jpg'
import './App.css'

const club = {
  name: 'University of Texas Arts for Aid',
  shortName: 'UTAFA',
  email: 'texasartsforaid@gmail.com',
  about:
    'Texas Arts for Aid (AFA) is a student organization that engages UT students of all skill levels in creative service projects that benefit a broader community.',
  mission:
    'Our mission is to unite students and the Austin community in meaningful creative projects that bring joy, foster connection, and support underprivileged communities. By partnering with local small businesses and service organizations, we aim to inspire social change, promote mutual aid, and build a vibrant, inclusive community where creativity and service go hand in hand.',
  joinLink: '#/join',
  donationLink: '#/support',
  groupMeLink: 'https://groupme.com/join_group/110796281/itI6OiPd',
  calendarEmbed:
    'https://calendar.google.com/calendar/embed?src=e8bbaf600392584de633908feb44d0a7b7906f0c418f6259a1bf9c925e21fc6a%40group.calendar.google.com&ctz=America%2FChicago',
}

const calendarConfig = {
  calendarId:
    'e8bbaf600392584de633908feb44d0a7b7906f0c418f6259a1bf9c925e21fc6a@group.calendar.google.com',
  timeZone: 'America/Chicago',
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/join', label: 'Join' },
  { to: '/contact', label: 'Contact' },
  { to: '/support', label: 'Donate / Support Us' },
]

const stats = [
  { value: '2,450+', label: 'Volunteer hours last year' },
  { value: '34', label: 'Campus and community projects hosted' },
  { value: '180', label: 'Active members across majors' },
  { value: '5,900+', label: 'People served through club initiatives' },
]

const fallbackUpcomingEvents = [
  {
    title: 'Spring Care Kit Assembly',
    date: 'March 28, 2026',
    time: '11:00 AM to 1:00 PM',
    location: 'Student Activity Center Ballroom',
    summary:
      'Pack hygiene kits and handwritten notes for local family shelters.',
    link: '#',
    live: false,
  },
  {
    title: 'Community Garden Morning',
    date: 'April 4, 2026',
    time: '9:00 AM to 12:00 PM',
    location: 'East Austin Community Farm',
    summary:
      'Plant, weed, and prepare spring beds with our sustainability partners.',
    link: '#',
    live: false,
  },
  {
    title: 'Senior Social Hour',
    date: 'April 11, 2026',
    time: '1:30 PM to 3:30 PM',
    location: 'Rosewood Neighborhood Center',
    summary:
      'Lead games, conversation circles, and a simple craft afternoon.',
    link: '#',
    linkLabel: 'RSVP placeholder',
  },
]

const calendarApiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

const photoHighlights = [
  {
    title: 'Welcome socials that feel easy to join',
    image:
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Hands-on service all semester long',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Small teams, real neighborhood impact',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
]

const values = [
  {
    title: 'Inclusivity',
    text: 'We welcome students of all skill levels and backgrounds, fostering a space where everyone can contribute and create. Our goal is to provide accessible service opportunities in a safe and enjoyable environment.',
  },
  {
    title: 'Service',
    text: 'Our projects combine creativity with a commitment to giving back, making a meaningful impact. We believe in the power of arts and crafts to bring positive energy and change to the community.',
  },
  {
    title: 'Community',
    text: 'We build connections through working together to uplift others. We strive to create a welcoming environment where students can meet like-minded people and engage with the broader Austin community.',
  },
]

const leadership = [
  ['Mehak Gaba', 'Co-President', presidentHeadshot],
  ['Gauri Mishra', 'Co-President', coPresidentHeadshot],
  ['Susie Huh', 'Vice President', vicePresidentHeadshot],
  ['Judy Ynag', 'Secretary', secretaryHeadshot],
  ['Michelle Wainaina', 'Outreach Director', outreachDirectorHeadshot],
  ['Sophia Nguyen', 'Web and Communications Director', webCommsDirectorHeadshot],
  ['Sarah Poliuc', 'Social Media Director', socialMediaDirectorHeadshot],
  ['Breña Hernandez', 'Recruitment Officer', recruitmentOfficerHeadshot],
  ['Vani Agarwal', 'Events Officer', eventsOfficerHeadshot],
  ['Jehra Vaughn', 'Inclusion Officer', inclusionOfficerHeadshot],
  ['Lindsey Levan', 'Committee Leader', committeeLeaderHeadshot],
  ['Radhwa Habib', 'Committee Leader', committeeLeader2Headshot],
  ['Mallory Craft', 'Committee Leader', committeeLeader3Headshot],
].map(([name, role, image]) => ({
  name,
  role,
  image,
}))

const subcommittees = [
  {
    name: 'Community Outreach',
    image:
      'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80',
    description:
      'Build relationships with local nonprofits and help match members to meaningful service opportunities.',
  },
  {
    name: 'Events and Hospitality',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80',
    description:
      'Shape the warm, polished experience behind socials, volunteer days, and community appreciation events.',
  },
  {
    name: 'Fundraising and Impact',
    image:
      'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80',
    description:
      'Coordinate donation drives, sponsor outreach, and storytelling around the club’s service outcomes.',
  },
  {
    name: 'Marketing and Design',
    image:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    description:
      'Create flyers, social campaigns, and beautiful content that make the club approachable and easy to discover.',
  },
]

const pastProjects = [
  {
    title: 'Back-to-School Supply Drive',
    text: 'Members collected 1,100 school supplies and packed backpacks for elementary students across Austin ISD partner campuses.',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Winter Warmth Week',
    text: 'A weeklong donation campaign and volunteer series that supported local shelters with coats, blankets, and hot meal service.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Neighborhood Beautification Day',
    text: 'Teams painted fences, cleaned shared spaces, and planted flowers alongside residents and community leaders.',
    image:
      'https://images.unsplash.com/photo-1469571486292-b53601020f35?auto=format&fit=crop&w=900&q=80',
  },
]

const faqs = [
  {
    question: 'Do I need prior volunteering experience?',
    answer: 'No. Most members join because they want a welcoming way to start serving, and we provide clear onboarding.',
  },
  {
    question: 'How much time does membership take?',
    answer: 'Members usually attend one general meeting a month and one to two service opportunities, with flexibility around exam weeks.',
  },
  {
    question: 'Are dues required?',
    answer: 'Semester dues are currently listed as $35 and support shirts, supplies, transportation help, and service materials.',
  },
  {
    question: 'Can graduate students or transfer students join?',
    answer: 'Yes. Any interested UT student who wants to contribute positively and stay active in the club community is welcome.',
  },
]

const supportOptions = [
  {
    title: 'Make a direct gift',
    text: 'Support transportation, project supplies, member scholarships, and emergency response drives.',
  },
  {
    title: 'Sponsor an event',
    text: 'Fund a specific service day, care-package build, or community celebration with visible acknowledgement.',
  },
  {
    title: 'Collaborate as a partner',
    text: 'Invite the club into service campaigns, mentorship efforts, or neighborhood improvement projects.',
  },
]

function App() {
  return (
    <HashRouter>
      <SiteShell />
    </HashRouter>
  )
}

function SiteShell() {
  const calendarState = useCalendarEvents()

  return (
    <div className="site-shell">
      <ScrollToTop />
      <FloatingBlobs />
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage calendarState={calendarState} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage calendarState={calendarState} />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('hashchange', closeMenu)
    return () => window.removeEventListener('hashchange', closeMenu)
  }, [])

  return (
    <header className="topbar">
      <nav className="navbar container" aria-label="Main navigation">
        <NavLink className="brand" to="/">
          <span className="brand-logo-frame">
            <img
              className="brand-logo"
              src={logoImage}
              alt="University of Texas Arts for Aid logo"
            />
          </span>
          <span>
            <strong>{club.name}</strong>
            <small>UT Austin volunteering club</small>
          </span>
        </NavLink>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flip-link ${isActive ? 'is-active' : ''}`
              }
            >
              <span>{item.label}</span>
              <span aria-hidden="true">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

function HomePage({ calendarState }) {
  const featuredEvents = calendarState.events.slice(0, 3)

  return (
    <>
      <Hero />
      <Section
        eyebrow="Why volunteer with us"
        title="A service club that feels warm, organized, and easy to belong in."
        intro="We pair meaningful community work with a social culture that makes showing up feel natural. Members get structure, support, and friends who care about making Austin better."
      >
        <div className="three-up-grid">
          {values.map((value) => (
            <InfoCard key={value.title} {...value} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Upcoming events"
        title="A preview of what’s next"
        intro="These cards pull from the club Google Calendar when an API key is configured, and fall back to placeholder content until then."
      >
        <EventsStatusNotice calendarState={calendarState} compact />
        <div className="event-grid">
          {featuredEvents.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Impact stats"
        title="Small actions, visible results"
      >
        <div className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Featured photos"
        title="Moments that make the club feel like home"
      >
        <div className="photo-grid">
          {photoHighlights.map((photo, index) => (
            <article
              className={`photo-card photo-card-${index + 1}`}
              key={photo.title}
            >
              <img src={photo.image} alt={photo.title} />
              <div className="photo-card-copy">
                <h3>{photo.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}

function Hero() {
  return (
    <section className="hero-section container">
      <div className="hero-copy reveal">
        <p className="eyebrow">Community-centered volunteering at UT Austin</p>
        <h1>{club.name}</h1>
        <p className="hero-text">{club.about}</p>
        <div className="hero-actions">
          <NavLink className="button primary" to="/join">
            Get Involved
          </NavLink>
          <NavLink className="button secondary" to="/events">
            See Upcoming Events
          </NavLink>
        </div>
      </div>
      <div className="hero-art reveal reveal-delayed" aria-hidden="true">
        <div className="hero-badge">Since 2015</div>
        <div className="hero-panel">
          <div className="mini-card">
            <span>Volunteer hours</span>
            <strong>2.4k+</strong>
          </div>
          <div className="mini-card accent">
            <span>Community partners</span>
            <strong>18</strong>
          </div>
          <div className="mini-card">
            <span>Average event size</span>
            <strong>42 students</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="Service that feels personal, polished, and rooted in community."
        text="What started as a high school club called Arts for
        Assistance quickly grew into a meaningful project
        using the arts to support others. When co-founders
        Mehak and Gauri ended up together at UT-Austin,
        they knew they had to revive their passion and
        continue the mission. Thus, Arts for Assistance
        became a student organization in 2024, bringing their
        vision of art for good to the UT community."
      />

      <Section title="What is AFA?">
        <div className="split-grid">
          <InfoCard
            title="What is AFA?"
            text={club.about}
          />
          <InfoCard
            title="Our mission"
            text={club.mission}
          />
        </div>
      </Section>

      <Section title="Our values">
        <div className="three-up-grid">
          {values.map((value) => (
            <InfoCard key={value.title} {...value} />
          ))}
        </div>
      </Section>

      <Section
        title="Leadership team"
        intro="Thirteen student leaders coordinate outreach, events, membership care, and club operations."
      >
        <Carousel items={leadership} renderItem={(person) => <LeaderCard person={person} />} />
      </Section>

      <Section title="Who can join">
        <div className="three-up-grid">
          <InfoCard
            title="Open to all majors"
            text="Our members come from education, business, nursing, engineering, liberal arts, and beyond."
          />
          <InfoCard
            title="Built for busy students"
            text="Service opportunities vary in time commitment so students can stay involved through different seasons of the semester."
          />
          <InfoCard
            title="Benefits of membership"
            text="Members gain leadership experience, close friendships, service hours, project management skills, and a strong campus community."
          />
        </div>
      </Section>
    </>
  )
}

function EventsPage({ calendarState }) {
  return (
    <>
      <PageIntro
        eyebrow="Events"
        title="Volunteer days, socials, and signature service projects."
        text="Upcoming events below can sync directly from the club Google Calendar. Until the Google Calendar API key is configured, the page falls back to placeholder content."
      />

      <Section title="Upcoming events" intro="Each event card reads from Google Calendar event details including date, time, location, and the event link when available.">
        <EventsStatusNotice calendarState={calendarState} />
        <div className="event-list">
          {calendarState.events.map((event) => (
            <EventListItem key={event.title} event={event} />
          ))}
        </div>
      </Section>

      <Section title="Club calendar">
        <div className="calendar-frame">
          <iframe
            src={club.calendarEmbed}
            title="University of Texas Arts for Aid Google Calendar placeholder"
            loading="lazy"
          />
        </div>
      </Section>

      <Section title="Past projects and highlights">
        <div className="project-stack">
          {pastProjects.map((project, index) => (
            <article
              className={`project-row ${index % 2 === 1 ? 'reverse' : ''}`}
              key={project.title}
            >
              <img src={project.image} alt={project.title} />
              <div className="project-copy">
                <p className="eyebrow">Project highlight</p>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  )
}

function JoinPage() {
  return (
    <>
      <PageIntro
        eyebrow="Join"
        title="A welcoming path from curious visitor to active member."
        text="Everything here is designed to answer the practical questions quickly so students can decide to join without friction."
      />

      <Section title="Why join">
        <div className="three-up-grid">
          <InfoCard title="Find your people" text="Meet thoughtful, service-minded students in a club culture that is social, kind, and easy to enter." />
          <InfoCard title="Build leadership" text="Gain experience planning projects, coordinating teams, and communicating with campus and community partners." />
          <InfoCard title="Create local impact" text="Support Austin organizations through regular projects instead of one-off appearances only." />
        </div>
      </Section>

      <Section title="Membership details">
        <div className="split-grid">
          <InfoCard title="Requirements" text="Attend an interest meeting, complete the member form, stay in good standing, and participate in at least two service touchpoints each semester." />
          <InfoCard title="Dues" text="$35 per semester placeholder. This can be replaced later with actual dues policy, payment method, and scholarship information." />
        </div>
      </Section>

      <Section title="How to get started">
        <div className="steps-grid">
          {[
            'Follow the club on Instagram and check the next interest meeting date.',
            'Complete the interest form so leadership can send updates and reminders.',
            'Attend a welcome event or service day to meet members and ask questions.',
            'Pick a subcommittee and start showing up where your interests fit best.',
          ].map((step, index) => (
            <article className="step-card" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Subcommittees">
        <Carousel
          items={subcommittees}
          renderItem={(committee) => <SubcommitteeCard committee={committee} />}
        />
      </Section>

      <Section title="FAQ">
        <div className="faq-grid">
          {faqs.map((faq) => (
            <article className="faq-card" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Useful links">
        <div className="link-card-grid">
          <ActionCard
            title="Interest form"
            text="Placeholder link for the new member interest form."
            href="#"
            cta="Open form"
          />
          <ActionCard
            title="Collaborations form"
            text="Placeholder link for campus and nonprofit collaboration requests."
            href="#"
            cta="Collaborate"
          />
          <ActionCard
            title="Join the GroupMe"
            text="Get quick reminders, event updates, and club communication in the main member chat."
            href={club.groupMeLink}
            cta="Open GroupMe"
          />
          <ActionCard
            title="Donations"
            text="Support transportation, supplies, and club-led service initiatives."
            href={club.donationLink}
            cta="Support the club"
          />
        </div>
      </Section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Reach out for membership, partnerships, or event questions."
        text="The contact layout keeps club communication simple while leaving room for a real form backend later."
      />

      <Section title="Get in touch">
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Email</h3>
            <p>
              <a href={`mailto:${club.email}`}>{club.email}</a>
            </p>
            <h3>Socials</h3>
            <p>
              <a
                href="https://www.instagram.com/texasafa/"
                target="_blank"
                rel="noreferrer"
              >
                @texasafa on Instagram
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/company/texas-arts-for-aid/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn: Texas Arts for Aid
              </a>
            </p>
            <p>
              <a href={club.groupMeLink} target="_blank" rel="noreferrer">
                Join the club GroupMe
              </a>
            </p>
            <h3>Meeting info</h3>
            <p>General meetings every other Tuesday at 7:00 PM in the Student Activity Center.</p>
          </div>
          <form className="contact-form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@utexas.edu" />
            </label>
            <label>
              Message
              <textarea name="message" rows="6" placeholder="Tell us how you'd like to connect." />
            </label>
            <button type="submit" className="button primary">
              Send Message
            </button>
          </form>
        </div>
      </Section>
    </>
  )
}

function SupportPage() {
  return (
    <>
      <PageIntro
        eyebrow="Donate and support"
        title="Help the club serve more students and more neighbors."
        text="This page gives future donors and collaborators a clear overview of how support can work before payment links and external forms are finalized."
      />

      <Section title="Ways to support us">
        <div className="three-up-grid">
          {supportOptions.map((option) => (
            <InfoCard key={option.title} title={option.title} text={option.text} />
          ))}
        </div>
      </Section>

      <Section title="Donation options">
        <div className="split-grid">
          <InfoCard title="One-time giving" text="Ideal for alumni, parents, and community supporters who want to underwrite an immediate service need." />
          <InfoCard title="Recurring support" text="Monthly giving helps the club plan stable transportation, supplies, and emergency relief efforts across the year." />
        </div>
      </Section>

      <Section title="Partnership opportunities">
        <div className="three-up-grid">
          <InfoCard title="Corporate sponsorships" text="Sponsor a service day, care-package build, or member leadership retreat." />
          <InfoCard title="Nonprofit collaborations" text="Share volunteer needs and project goals so the club can mobilize students effectively." />
          <InfoCard title="In-kind donations" text="Contribute supplies, food, transportation help, venue support, or print materials." />
        </div>
      </Section>

      <Section title="Volunteer support information">
        <div className="link-card-grid">
          <ActionCard title="Donate now" text="Placeholder external donation button for a future giving platform." href="#" cta="Make a gift" />
          <ActionCard title="Partner with us" text="Placeholder partnership inquiry form for organizations and campus collaborators." href="#" cta="Start a partnership" />
          <ActionCard title="Ask a question" text="Contact leadership about sponsorships, tax documentation, or project planning." href={`mailto:${club.email}`} cta="Email us" />
        </div>
      </Section>
    </>
  )
}

function Section({ eyebrow, title, intro, children }) {
  return (
    <section className="section container reveal">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {intro ? <p className="section-intro">{intro}</p> : null}
      {children}
    </section>
  )
}

function PageIntro({ eyebrow, title, text }) {
  return (
    <section className="page-intro container reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="section-intro">{text}</p>
    </section>
  )
}

function InfoCard({ title, text }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function EventCard({ event }) {
  return (
    <article className="event-card">
      <p className="event-date">{event.date}</p>
      <h3>{event.title}</h3>
      <p>{event.summary}</p>
      <div className="event-meta">
        <span>{event.time}</span>
        <span>{event.location}</span>
      </div>
      <a href={event.link} target={event.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {event.linkLabel ?? 'View event'}
      </a>
    </article>
  )
}

function EventListItem({ event }) {
  return (
    <article className="event-list-item">
      <div>
        <p className="event-date">{event.date}</p>
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
      </div>
      <div className="event-list-side">
        <span>{event.time}</span>
        <span>{event.location}</span>
        <a href={event.link} target={event.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          {event.linkLabel ?? 'View event'}
        </a>
      </div>
    </article>
  )
}

function EventsStatusNotice({ calendarState, compact = false }) {
  if (calendarState.status === 'ready') {
    return null
  }

  return (
    <div className={`events-status ${compact ? 'compact' : ''}`}>
      <strong>{calendarState.noticeTitle}</strong>
      <p>{calendarState.noticeText}</p>
    </div>
  )
}

function LeaderCard({ person }) {
  return (
    <article className="carousel-card leader-card">
      <img src={person.image} alt={person.name} />
      <div className="carousel-copy">
        <h3>{person.name}</h3>
        <p>{person.role}</p>
      </div>
    </article>
  )
}

function SubcommitteeCard({ committee }) {
  return (
    <article className="carousel-card subcommittee-card">
      <img src={committee.image} alt={committee.name} />
      <div className="carousel-copy">
        <h3>{committee.name}</h3>
        <p>{committee.description}</p>
      </div>
    </article>
  )
}

function ActionCard({ title, text, href, cta }) {
  return (
    <article className="action-card">
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={href}>{cta}</a>
    </article>
  )
}

function Carousel({ items, renderItem }) {
  const [index, setIndex] = useState(0)
  const visibleItems = items.slice(index, index + 3)

  const next = () => {
    setIndex((current) => (current + 1 > items.length - 3 ? 0 : current + 1))
  }

  const previous = () => {
    setIndex((current) => (current === 0 ? Math.max(items.length - 3, 0) : current - 1))
  }

  return (
    <div className="carousel">
      <div className="carousel-track">
        {visibleItems.map((item) => renderItem(item))}
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={previous} aria-label="Previous cards">
          Prev
        </button>
        <div className="carousel-dots" aria-hidden="true">
          {items.map((item, dotIndex) => (
            <span
              key={item.name || item.title}
              className={dotIndex >= index && dotIndex < index + 3 ? 'active' : ''}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next cards">
          Next
        </button>
      </div>
    </div>
  )
}

function FloatingBlobs() {
  return (
    <div className="background-blobs" aria-hidden="true">
      <span className="blob blob-1"></span>
      <span className="blob blob-2"></span>
      <span className="blob blob-3"></span>
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <strong>{club.name}</strong>
          <p>{club.about}</p>
        </div>
        <div>
          <p>
            <a href={`mailto:${club.email}`}>{club.email}</a>
          </p>
          <p>
            <a
              href="https://www.instagram.com/texasafa/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram: @texasafa
            </a>
          </p>
          <p>
            <a
              href="https://www.linkedin.com/company/texas-arts-for-aid/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn: Texas Arts for Aid
            </a>
          </p>
          <p>
            <a href={club.groupMeLink} target="_blank" rel="noreferrer">
              Join our GroupMe
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function useCalendarEvents() {
  const [state, setState] = useState({
    events: fallbackUpcomingEvents,
    status: calendarApiKey ? 'loading' : 'needs_key',
    noticeTitle: calendarApiKey
      ? 'Loading live events'
      : 'Live calendar not configured yet',
    noticeText: calendarApiKey
      ? 'Fetching the next events from Google Calendar.'
      : 'Add a Google Calendar API key in your local environment to replace these placeholders with live event data.',
  })

  useEffect(() => {
    if (!calendarApiKey) {
      return
    }

    const controller = new AbortController()
    const params = new URLSearchParams({
      key: calendarApiKey,
      singleEvents: 'true',
      orderBy: 'startTime',
      timeMin: new Date().toISOString(),
      maxResults: '6',
      timeZone: calendarConfig.timeZone,
    })

    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarConfig.calendarId,
      )}/events?${params.toString()}`,
      { signal: controller.signal },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Google Calendar API returned ${response.status}.`)
        }

        return response.json()
      })
      .then((payload) => {
        const liveEvents =
          payload.items?.map(normalizeGoogleCalendarEvent).filter(Boolean) ?? []

        if (liveEvents.length === 0) {
          setState({
            events: fallbackUpcomingEvents,
            status: 'empty',
            noticeTitle: 'No upcoming events found',
            noticeText:
              'The calendar request succeeded, but there are no future events yet. Placeholder cards are still shown so the layout stays complete.',
          })
          return
        }

        setState({
          events: liveEvents,
          status: 'ready',
          noticeTitle: '',
          noticeText: '',
        })
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return
        }

        setState({
          events: fallbackUpcomingEvents,
          status: 'error',
          noticeTitle: 'Live calendar unavailable',
          noticeText:
            'The Google Calendar request failed, so placeholder events are shown instead. Check that the API key is valid and that the calendar is public.',
        })
      })

    return () => controller.abort()
  }, [])

  return state
}

function normalizeGoogleCalendarEvent(event) {
  const startValue = event.start?.dateTime ?? event.start?.date
  const endValue = event.end?.dateTime ?? event.end?.date

  if (!startValue) {
    return null
  }

  return {
    title: event.summary || 'Untitled event',
    date: formatEventDate(startValue),
    time: formatEventTime(startValue, endValue),
    location: event.location || 'Location to be announced',
    summary: event.description
      ? stripHtml(event.description).slice(0, 150)
      : 'Details will be shared on the club calendar.',
    link: event.htmlLink || '#',
    linkLabel: event.htmlLink ? 'Open in Google Calendar' : 'Details soon',
  }
}

function formatEventDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: calendarConfig.timeZone,
  }).format(new Date(value))
}

function formatEventTime(startValue, endValue) {
  const isAllDay = !String(startValue).includes('T')

  if (isAllDay) {
    return 'All day'
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: calendarConfig.timeZone,
  })

  const start = formatter.format(new Date(startValue))
  const end = endValue ? formatter.format(new Date(endValue)) : null

  return end ? `${start} to ${end}` : start
}

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export default App
