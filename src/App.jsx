import { useEffect, useRef, useState } from 'react'
import ReactSlick from 'react-slick'
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
import braceletsImage from './assets/bracelets.jpg'
import halloweenEventImage from './assets/halloween_event.jpg'
import valentinesEventImage from './assets/valentines_day_event.jpg'
import groupPhotoMain from './assets/group_photo_main.jpg'
import braceletsMainImage from './assets/bracelets_main.jpg'
import valentinesMainImage from './assets/Valentines_main.jpg'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './App.css'

const Slider = ReactSlick.default ?? ReactSlick

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
      groupPhotoMain,
  },
  {
    title: 'Hands-on service all semester long',
    image: braceletsMainImage,
  },
  {
    title: 'Small teams, real neighborhood impact',
    image: valentinesMainImage,
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
    name: 'Dragonflies',
    logo: logoImage,
    description:
      'Build relationships with Austin nonprofits and help members plug into service opportunities that are consistent, local, and easy to join. This team helps turn club interest into real community partnerships.',
    gallery: [
      {
        image: groupPhotoMain,
        alt: 'Members gathering together at a community event',
      },
      {
        image: valentinesMainImage,
        alt: 'A volunteer project with handmade crafts prepared for the community',
      },
    ],
    leaders: [
      {
        name: 'Michelle Wainaina',
        title: 'Outreach Director',
        image: outreachDirectorHeadshot,
      },
      {
        name: 'Lindsey Levan',
        title: 'Committee Leader',
        image: committeeLeaderHeadshot,
      },
    ],
  },
  {
    name: 'Ladybugs',
    logo: logoImage,
    description:
      'Plan the flow, setup, and member experience behind socials, service days, and appreciation events. This subcommittee focuses on making every event feel warm, organized, and welcoming from the moment people arrive.',
    gallery: [
      {
        image: valentinesEventImage,
        alt: 'Members at a themed club event',
      },
      {
        image: halloweenEventImage,
        alt: 'A festive volunteer event with club members participating together',
      },
    ],
    leaders: [
      {
        name: 'Vani Agarwal',
        title: 'Events Officer',
        image: eventsOfficerHeadshot,
      },
      {
        name: 'Radhwa Habib',
        title: 'Committee Leader',
        image: committeeLeader2Headshot,
      },
    ],
  },
  {
    name: 'Bumblebees',
    logo: logoImage,
    description:
      'Coordinate donation drives, sponsorship ideas, and impact storytelling that helps projects grow. Members on this team connect the creative side of the club with the resources needed to sustain it.',
    gallery: [
      {
        image: braceletsImage,
        alt: 'Bracelets arranged during a fundraising craft project',
      },
      {
        image: braceletsMainImage,
        alt: 'Members making crafts for a fundraising initiative',
      },
    ],
    leaders: [
      {
        name: 'Sarah Poliuc',
        title: 'Social Media Director',
        image: socialMediaDirectorHeadshot,
      },
      {
        name: 'Mallory Craft',
        title: 'Committee Leader',
        image: committeeLeader3Headshot,
      },
    ],
  },
  {
    name: 'Fireflies',
    logo: logoImage,
    description:
      'Create flyers, social posts, and visual campaigns that make Texas Arts for Aid easy to discover and easy to understand. This team shapes the club’s public voice across campus and online.',
    gallery: [
      {
        image: groupPhotoMain,
        alt: 'A large group photo from a Texas Arts for Aid event',
      },
      {
        image: braceletsMainImage,
        alt: 'A styled photo highlighting a creative service project',
      },
    ],
    leaders: [
      {
        name: 'Sophia Nguyen',
        title: 'Web and Communications Director',
        image: webCommsDirectorHeadshot,
      },
      {
        name: 'Breña Hernandez',
        title: 'Recruitment Officer',
        image: recruitmentOfficerHeadshot,
      },
    ],
  },
]

const pastProjects = [
  {
    title: 'Back-to-School Supply Drive',
    text: 'Members collected 1,100 school supplies and packed backpacks for elementary students across Austin ISD partner campuses.',
    image: valentinesEventImage,
  },
  {
    title: 'Bracelets for Aid',
    text: 'Text about the bracelet-making event where members crafted x bracelets to sell at a x, raising $x for x.',
    image: braceletsImage,
  },
  {
    title: 'Halloween school event',
    text: 'Teams painted fences, cleaned shared spaces, and planted flowers alongside residents and community leaders.',
    image: halloweenEventImage,
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
          {values.map((value, index) => (
            <InfoCard key={value.title} {...value} delay={String(index % 3)} />
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
          {featuredEvents.map((event, index) => (
            <EventCard key={event.title} event={event} delay={String(index % 3)} />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Impact stats"
        title="Small actions, visible results"
      >
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Reveal as="article" className="stat-card" key={stat.label} delay={String(index % 4)}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Featured photos"
        title="Moments that make the club feel like home"
      >
        <div className="photo-grid">
          {photoHighlights.map((photo, index) => (
            <Reveal
              as="article"
              className={`photo-card photo-card-${index + 1}`}
              key={photo.title}
              delay={String(index % 3)}
            >
              <img src={photo.image} alt={photo.title} />
              <div className="photo-card-copy">
                <h3>{photo.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}

function Hero() {
  return (
    <section className="hero-section container">
      <Reveal className="hero-copy" delay="0">
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
      </Reveal>
      <Reveal className="hero-art hero-logo-art" delay="1">
        <img
          className="hero-logo"
          src={logoImage}
          alt="University of Texas Arts for Aid logo"
        />
      </Reveal>
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
            delay="0"
          />
          <InfoCard
            title="Our mission"
            text={club.mission}
            delay="1"
          />
        </div>
      </Section>

      <Section title="Our values">
        <div className="three-up-grid">
          {values.map((value, index) => (
            <InfoCard key={value.title} {...value} delay={String(index % 3)} />
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
            delay="0"
          />
          <InfoCard
            title="Built for busy students"
            text="Service opportunities vary in time commitment so students can stay involved through different seasons of the semester."
            delay="1"
          />
          <InfoCard
            title="Benefits of membership"
            text="Members gain leadership experience, close friendships, service hours, project management skills, and a strong campus community."
            delay="2"
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
          {calendarState.events.map((event, index) => (
            <EventListItem key={event.title} event={event} delay={String(index % 3)} />
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
            <Reveal
              as="article"
              className={`project-row ${index % 2 === 1 ? 'reverse' : ''}`}
              key={project.title}
              delay={String(index % 2)}
            >
              <img src={project.image} alt={project.title} />
              <div className="project-copy">
                <p className="eyebrow">Project highlight</p>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
              </div>
            </Reveal>
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
          <InfoCard title="Build leadership" text="Gain experience planning projects, coordinating teams, and communicating with campus and community partners." delay="1" />
          <InfoCard title="Create local impact" text="Support Austin organizations through regular projects instead of one-off appearances only." delay="2" />
        </div>
      </Section>

      <Section title="Membership details">
        <div className="split-grid">
          <InfoCard title="Requirements" text="Attend an interest meeting, complete the member form, stay in good standing, and participate in at least two service touchpoints each semester." delay="0" />
          <InfoCard title="Dues" text="$35 per semester placeholder. This can be replaced later with actual dues policy, payment method, and scholarship information." delay="1" />
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
            <Reveal as="article" className="step-card" key={step} delay={String(index % 2)}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Subcommittees">
        <SubcommitteeTabs committees={subcommittees} />
      </Section>

      <Section title="FAQ">
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <Reveal as="article" className="faq-card" key={faq.question} delay={String(index % 2)}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </Reveal>
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
            delay="0"
          />
          <ActionCard
            title="Collaborations form"
            text="Placeholder link for campus and nonprofit collaboration requests."
            href="#"
            cta="Collaborate"
            delay="1"
          />
          <ActionCard
            title="Join the GroupMe"
            text="Get quick reminders, event updates, and club communication in the main member chat."
            href={club.groupMeLink}
            cta="Open GroupMe"
            delay="0"
          />
          <ActionCard
            title="Donations"
            text="Support transportation, supplies, and club-led service initiatives."
            href={club.donationLink}
            cta="Support the club"
            delay="1"
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
          <Reveal className="contact-card" delay="0">
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
          </Reveal>
          <Reveal as="form" className="contact-form" delay="1">
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
          </Reveal>
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
          {supportOptions.map((option, index) => (
            <InfoCard key={option.title} title={option.title} text={option.text} delay={String(index % 3)} />
          ))}
        </div>
      </Section>

      <Section title="Donation options">
        <div className="split-grid">
          <InfoCard title="One-time giving" text="Ideal for alumni, parents, and community supporters who want to underwrite an immediate service need." delay="0" />
          <InfoCard title="Recurring support" text="Monthly giving helps the club plan stable transportation, supplies, and emergency relief efforts across the year." delay="1" />
        </div>
      </Section>

      <Section title="Partnership opportunities">
        <div className="three-up-grid">
          <InfoCard title="Corporate sponsorships" text="Sponsor a service day, care-package build, or member leadership retreat." delay="0" />
          <InfoCard title="Nonprofit collaborations" text="Share volunteer needs and project goals so the club can mobilize students effectively." delay="1" />
          <InfoCard title="In-kind donations" text="Contribute supplies, food, transportation help, venue support, or print materials." delay="2" />
        </div>
      </Section>

      <Section title="Volunteer support information">
        <div className="link-card-grid">
          <ActionCard title="Donate now" text="Placeholder external donation button for a future giving platform." href="#" cta="Make a gift" delay="0" />
          <ActionCard title="Partner with us" text="Placeholder partnership inquiry form for organizations and campus collaborators." href="#" cta="Start a partnership" delay="1" />
          <ActionCard title="Ask a question" text="Contact leadership about sponsorships, tax documentation, or project planning." href={`mailto:${club.email}`} cta="Email us" delay="0" />
        </div>
      </Section>
    </>
  )
}

function Section({ eyebrow, title, intro, children }) {
  return (
    <Reveal as="section" className="section container">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {intro ? <p className="section-intro">{intro}</p> : null}
      {children}
    </Reveal>
  )
}

function PageIntro({ eyebrow, title, text }) {
  return (
    <Reveal as="section" className="page-intro container">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      <p className="section-intro">{text}</p>
    </Reveal>
  )
}

function InfoCard({ title, text, delay = '0' }) {
  return (
    <Reveal as="article" className="info-card" delay={delay}>
      <h3>{title}</h3>
      <p>{text}</p>
    </Reveal>
  )
}

function EventCard({ event, delay = '0' }) {
  return (
    <Reveal as="article" className="event-card" delay={delay}>
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
    </Reveal>
  )
}

function EventListItem({ event, delay = '0' }) {
  return (
    <Reveal as="article" className="event-list-item" delay={delay}>
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
    </Reveal>
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
    <article className="carousel-card leader-card scroll-reveal is-visible">
      <img src={person.image} alt={person.name} />
      <div className="carousel-copy">
        <h3>{person.name}</h3>
        <p>{person.role}</p>
      </div>
    </article>
  )
}

function SubcommitteeTabs({ committees }) {
  const [activeCommittee, setActiveCommittee] = useState(committees[0]?.name ?? '')
  const committee =
    committees.find((entry) => entry.name === activeCommittee) ?? committees[0]

  if (!committee) {
    return null
  }

  return (
    <div className="subcommittee-tabs">
      <div className="subcommittee-tab-list" role="tablist" aria-label="Subcommittees">
        {committees.map((entry) => {
          const isActive = entry.name === committee.name

          return (
            <button
              key={entry.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`subcommittee-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveCommittee(entry.name)}
            >
              {entry.name}
            </button>
          )
        })}
      </div>

      <Reveal as="article" className="subcommittee-panel" key={committee.name}>
        <div className="subcommittee-top-row">
          <div className="subcommittee-logo-frame">
            <img src={committee.logo} alt={`${committee.name} logo`} className="subcommittee-logo" />
          </div>
          <div className="subcommittee-summary">
            <h3>{committee.name}</h3>
            <p>{committee.description}</p>
          </div>
        </div>

        <div className="subcommittee-gallery">
          {committee.gallery.map((photo) => (
            <div className="subcommittee-gallery-card" key={photo.alt}>
              <img src={photo.image} alt={photo.alt} />
            </div>
          ))}
        </div>

        <div className="subcommittee-leaders">
          <div className="subcommittee-leaders-header">
            <h4>Leaders</h4>
          </div>
          <div className="subcommittee-leader-grid">
            {committee.leaders.map((leader) => (
              <article className="subcommittee-leader-card" key={`${committee.name}-${leader.name}`}>
                <img src={leader.image} alt={leader.name} />
                <div>
                  <h5>{leader.name}</h5>
                  <p>{leader.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function ActionCard({ title, text, href, cta, delay = '0' }) {
  return (
    <Reveal as="article" className="action-card" delay={delay}>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={href}>{cta}</a>
    </Reveal>
  )
}

function Reveal({
  as: Component = 'div',
  className = '',
  delay = '0',
  children,
  ...props
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return undefined
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true)
      return undefined
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const revealClassName = [
    className,
    'scroll-reveal',
    `reveal-delay-${delay}`,
    isVisible ? 'is-visible' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component ref={elementRef} className={revealClassName} {...props}>
      {children}
    </Component>
  )
}

function Carousel({ items, renderItem }) {
  const [isSliderReady, setIsSliderReady] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1200 : window.innerWidth
  )

  useEffect(() => {
    setIsSliderReady(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const slidesToShow = viewportWidth <= 640 ? 1 : viewportWidth <= 960 ? Math.min(2, items.length) : Math.min(3, items.length)

  const settings = {
    dots: true,
    infinite: items.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    swipe: true,
    draggable: true,
    touchMove: true,
  }

  if (!isSliderReady) {
    return (
      <div className="carousel">
        <div className="carousel-loading">
          {items.slice(0, 3).map((item) => (
            <div key={item.name || item.title} className="carousel-slide">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="carousel">
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.name || item.title} className="carousel-slide">
            {renderItem(item)}
          </div>
        ))}
      </Slider>
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
