import { useState, useEffect, lazy, Suspense } from 'react';
import GooeyNav from './GooeyNav';
import RotatingText from './RotatingText';

const DarkVeil = lazy(() => import('./DarkVeil'));

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Flutter', icon: '📱' },
  { name: 'Docker', icon: '🐳' },
  { name: 'NestJS', icon: '🦅' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'Python', icon: '🐍' },
  { name: 'Redis', icon: '⚡' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'Laravel', icon: '🎭' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'TypeScript', icon: '📘' },
];

const education = [
  {
    school: 'Ain Shams University',
    location: 'Cairo, Egypt',
    degree: 'Computer Engineering',
    minor: 'Distributed & Mobile Systems',
    period: '2020 - 2025',
    type: 'Dual Degree - ICHP'
  },
  {
    school: 'University of East London',
    location: 'London, UK',
    degree: 'Computer Engineering',
    period: '2020 - 2025',
    type: 'Dual Degree'
  }
];

const experiences = [
  {
    title: 'Backend Engineer Intern',
    company: 'INTcore',
    period: 'Sep 2024 - Jan 2025',
    icon: '🏢',
    achievements: [
      'Engineered production-grade CMS using PHP/Laravel for 5+ client projects',
      'Reduced deployment time by 40% with Git branching strategy and CI/CD workflows',
      'Optimized database queries improving response time by 50%, handling 10,000+ daily requests'
    ],
    tags: ['PHP', 'Laravel', 'Docker', 'MySQL', 'CI/CD']
  },
  {
    title: 'Cloud Engineer Intern',
    company: 'GBG',
    period: 'Jul 2024 - Sep 2024',
    icon: '☁️',
    achievements: [
      'Built microservices architecture using AWS Lambda and API Gateway',
      'Implemented infrastructure as code with Terraform',
      'Developed RESTful APIs with Node.js and Express'
    ],
    tags: ['AWS', 'Node.js', 'Terraform', 'Docker', 'Microservices']
  },
  {
    title: 'Computer Science Teacher',
    company: 'Multiple Schools',
    period: 'Oct 2020 - Present',
    icon: '👨‍🏫',
    achievements: [
      'Teaching programming fundamentals and problem-solving',
      'Curriculum development for Python and algorithms courses',
      'Mentoring students in competitive programming'
    ],
    tags: ['Python', 'Algorithms', 'Teaching', 'Mentoring']
  }
];

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Spring 2023',
    type: 'badge',
    imageUrl: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    verifyLink: '#'
  },
  {
    name: 'Linux System Administrator',
    issuer: 'Linux Foundation',
    date: 'Fall 2022',
    type: 'pdf',
    pdfId: 'YOUR_GOOGLE_DRIVE_PDF_ID',
    verifyLink: '#'
  },
];

const projects = [
  {
    id: 1,
    name: 'Therabot',
    tagline: 'AI-Powered Mental Health Chatbot',
    icon: '🤖',
    liveUrl: null,
    github: 'https://github.com/OsamaKhaled9/therabot',
    status: 'completed',
    achievements: [
      'Achieved 87% accuracy in mental health assessment',
      'Graduated with A+ grade'
    ],
    tech: ['Python', 'TensorFlow', 'FastAPI', 'AWS'],
    metrics: { grade: 'A+' },
    year: '2024'
  },
  {
    id: 2,
    name: 'Hedieaty',
    tagline: 'Gift List & Event Management App',
    icon: '🎁',
    liveUrl: null,
    playStore: 'https://play.google.com/store/apps/details?id=com.hedieaty',
    github: 'https://github.com/OsamaKhaled9/Hedieaty',
    status: 'live',
    achievements: [
      '4.5★ rating on Google Play Store',
      'Firebase real-time sync & offline mode'
    ],
    tech: ['Flutter', 'Dart', 'Firebase', 'SQLite'],
    metrics: { rating: '4.5★', downloads: '500+' },
    year: '2024'
  },
  {
    id: 3,
    name: 'Portfolio Platform',
    tagline: 'Full-Stack with AI & 3D Visualization',
    icon: '💼',
    liveUrl: null,
    github: 'https://github.com/OsamaKhaled9/portfolio-platform',
    status: 'completed',
    achievements: [
      'RAG-powered chatbot with OpenAI',
      '3D data visualizations with Three.js'
    ],
    tech: ['React', 'NestJS', 'PostgreSQL', 'OpenAI'],
    year: '2024'
  },
  {
    id: 4,
    name: 'Serverless Pipeline',
    tagline: 'AWS Lambda Image Processing',
    icon: '☁️',
    liveUrl: null,
    status: 'completed',
    achievements: [
      'Event-driven serverless architecture',
      'Handled 10,000+ image uploads'
    ],
    tech: ['AWS Lambda', 'S3', 'API Gateway', 'Node.js'],
    year: '2024'
  },
  {
    id: 5,
    name: 'HA Cloud Architecture',
    tagline: 'Multi-AZ High-Availability Setup',
    icon: '🏗️',
    liveUrl: null,
    status: 'completed',
    achievements: [
      '99.9% uptime with multi-AZ deployment',
      'Infrastructure as Code with Terraform'
    ],
    tech: ['AWS', 'Terraform', 'EC2', 'RDS'],
    year: '2024'
  }
];

function LightVeil() {
  return (
    <div className="light-veil" aria-hidden="true">
      <div className="light-veil-gradient"></div>
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme-preference', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      title="Toggle light & dark theme" 
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-live="polite"
    >
      <svg className="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask className="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle className="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
        <g className="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
}

function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const currentProject = projects[currentIndex];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (isMobile) {
    return (
      <div className="project-carousel-mobile">
        <div className="project-scroll-container">
          {projects.map((project) => (
            <div key={project.id} className="project-card-mobile">
              <div className="project-header-compact">
                <span className="project-icon-compact">{project.icon}</span>
                <div className={`project-status project-status-${project.status}`}>
                  {project.status === 'live' && '🟢 Live'}
                  {project.status === 'completed' && '🔵 Completed'}
                </div>
              </div>

              <h3 className="project-name-compact">{project.name}</h3>
              <p className="project-tagline-compact">{project.tagline}</p>

              {project.metrics && (
                <div className="project-metrics-compact">
                  {project.metrics.grade && <span>🎓 {project.metrics.grade}</span>}
                  {project.metrics.rating && <span>⭐ {project.metrics.rating}</span>}
                  {project.metrics.downloads && <span>📥 {project.metrics.downloads}</span>}
                  <span>📅 {project.year}</span>
                </div>
              )}

              <ul className="project-achievements-compact">
                {project.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>

              <div className="project-tech-compact">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag-compact">{tech}</span>
                ))}
              </div>

              {/* FIXED: Container with min-height to prevent jumping */}
              <div className="project-actions-container">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn-fixed">
                    View Live ↗
                  </a>
                )}
                {project.playStore && (
                  <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="project-btn-fixed">
                    Play Store ↗
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-btn-fixed">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="project-carousel">
      <button 
        className="carousel-arrow carousel-arrow-left"
        onClick={prevProject}
        aria-label="Previous project"
      >
        ←
      </button>

      <div className="project-card-container">
        <div className="project-card-compact" key={currentProject.id}>
          <div className="project-header-compact">
            <span className="project-icon-compact">{currentProject.icon}</span>
            <div className={`project-status project-status-${currentProject.status}`}>
              {currentProject.status === 'live' && '🟢 Live'}
              {currentProject.status === 'completed' && '🔵 Completed'}
            </div>
          </div>

          <div className="project-info-compact">
            <h3 className="project-name-compact">{currentProject.name}</h3>
            <p className="project-tagline-compact">{currentProject.tagline}</p>

            {currentProject.metrics && (
              <div className="project-metrics-compact">
                {currentProject.metrics.grade && <span>🎓 {currentProject.metrics.grade}</span>}
                {currentProject.metrics.rating && <span>⭐ {currentProject.metrics.rating}</span>}
                {currentProject.metrics.downloads && <span>📥 {currentProject.metrics.downloads}</span>}
                <span>📅 {currentProject.year}</span>
              </div>
            )}

            <ul className="project-achievements-compact">
              {currentProject.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>

            <div className="project-tech-compact">
              {currentProject.tech.map((tech, i) => (
                <span key={i} className="tech-tag-compact">{tech}</span>
              ))}
            </div>

            {/* FIXED: Container with min-height */}
            <div className="project-actions-container">
              {currentProject.liveUrl && (
                <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer" className="project-btn-fixed">
                  View Live ↗
                </a>
              )}
              {currentProject.playStore && (
                <a href={currentProject.playStore} target="_blank" rel="noopener noreferrer" className="project-btn-fixed">
                  Play Store ↗
                </a>
              )}
              {currentProject.github && (
                <a href={currentProject.github} target="_blank" rel="noopener noreferrer" className="project-btn-fixed">
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <button 
        className="carousel-arrow carousel-arrow-right"
        onClick={nextProject}
        aria-label="Next project"
      >
        →
      </button>

      <div className="carousel-pagination">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToProject(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme-preference');
    return stored || 'light';
  });

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const getActiveNavIndex = () => {
    return navItems.findIndex(item => item.href === `#${activeSection}`);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative' }}>
      {/* Background with custom colors */}
      {theme === 'dark' ? (
        <Suspense fallback={<div style={{ background: '#0a0a0f', position: 'fixed', inset: 0, zIndex: -1 }} />}>
          <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
            <DarkVeil 
              speed={0.5}
              hueShift={0}
              noiseIntensity={0.05}
              scanlineIntensity={0.1}
              warpAmount={0.2}
              primaryColor="#667eea"
              secondaryColor="#764ba2"
            />
          </div>
        </Suspense>
      ) : (
        <LightVeil />
      )}
      
      <ThemeToggle theme={theme} setTheme={setTheme} />
      
      <header className="nav-header">
        <GooeyNav
          items={navItems}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={getActiveNavIndex()}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </header>
      
      {/* All sections remain the same... */}
      <section id="home" className="section">
        <div className="container-center">
          <h1 className="hero-title">Osama Khaled</h1>
          
          <div className="hero-subtitle">
            <span style={{ opacity: 0.9 }}>I'm a</span>
            <RotatingText
              texts={['Full-Stack Engineer', 'Cloud Architect', 'Mobile Developer', 'Backend Specialist']}
              mainClassName="rotating-text-highlight"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </div>
          
          <div className="hero-tech-badges">
            <RotatingText
              texts={['React', 'NestJS', 'Flutter', 'AWS', 'Docker', 'TypeScript']}
              mainClassName="tech-badge"
              staggerFrom="first"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              staggerDuration={0.03}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              rotationInterval={2500}
            />
          </div>
          
          <p className="hero-description">
            Computer Engineering graduate specializing in building scalable 
            full-stack applications, cloud infrastructure, and mobile solutions. 
            Experienced in microservices, AI integration, and security best practices.
          </p>
          
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="https://github.com/OsamaKhaled9" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A passionate engineer building innovative solutions across web, mobile, and cloud platforms.
          </p>

          <div className="subsection">
            <h3 className="subsection-title">💻 Skills & Technologies</h3>
            <div className="skills-carousel-container">
              <div className="skills-carousel">
                {[...skills, ...skills].map((skill, index) => (
                  <div key={index} className="skill-card">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">🎓 Education</h3>
            <div className="grid-2">
              {education.map((edu, index) => (
                <div key={index} className="education-card">
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                      {edu.school}
                    </h4>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>{edu.location}</p>
                  </div>
                  <p style={{ fontSize: '1rem', marginBottom: '0.5rem', fontWeight: 500 }}>
                    {edu.degree}
                  </p>
                  {edu.minor && (
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Minor: {edu.minor}
                    </p>
                  )}
                  <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {edu.period}
                  </p>
                  <span className="education-badge">{edu.type}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">💼 Professional Experience</h3>
            <div className="experience-list">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{exp.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                        {exp.title}
                      </h4>
                      <p style={{ opacity: 0.8, marginBottom: '0.5rem' }}>
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="achievement-list">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  
                  <div className="tech-tags">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">🏅 Certifications</h3>
            <div className="grid-2">
              {certifications.map((cert, index) => (
                <a 
                  key={index}
                  href={cert.verifyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-card"
                >
                  <div className="cert-image">
                    {cert.type === 'badge' && (
                      <img 
                        src={cert.imageUrl} 
                        alt={cert.name}
                        loading="lazy"
                        width="340"
                        height="340"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {cert.type === 'pdf' && (
                      <img 
                        src={`https://drive.google.com/thumbnail?id=${cert.pdfId}&sz=w400`}
                        alt={cert.name}
                        loading="lazy"
                        width="400"
                        height="400"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {cert.name}
                  </h4>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    {cert.issuer}
                  </p>
                  <p style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                    {cert.date}
                  </p>
                  <span className="cert-link">View Certificate ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section section-projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Explore my portfolio of full-stack applications, mobile apps, and cloud solutions.
          </p>
          <ProjectCarousel />
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container-center" style={{ maxWidth: '800px' }}>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat!
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <a href="mailto:osamakhaled236@gmail.com" className="contact-card-primary">
              <div className="contact-icon-medium">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem', fontWeight: 600 }}>Email Me</h3>
                <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>osamakhaled236@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="social-icons">
            <a href="https://github.com/OsamaKhaled9" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <a href="https://linkedin.com/in/osama-khaledd" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

          <div className="footer">
            <p>© 2025 Osama Khaled. Built with React & Motion</p>
          </div>
        </div>
      </section>
      
      {/* CSS with button container fix */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        :root,
        [data-theme="light"] {
          --bg-color: #f8f9fa;
          --text-color: #1a1a1a;
          --text-secondary: rgba(0, 0, 0, 0.7);
          --card-bg: rgba(255, 255, 255, 0.9);
          --card-border: rgba(0, 0, 0, 0.1);
          --card-hover-bg: rgba(255, 255, 255, 1);
          --card-hover-border: rgba(0, 0, 0, 0.2);
          --icon-fill: hsl(210, 10%, 30%);
          --icon-fill-hover: hsl(210, 10%, 15%);
        }

        [data-theme="dark"] {
          --bg-color: #0a0a0f;
          --text-color: #ffffff;
          --text-secondary: rgba(255, 255, 255, 0.7);
          --card-bg: rgba(255, 255, 255, 0.05);
          --card-border: rgba(255, 255, 255, 0.1);
          --card-hover-bg: rgba(255, 255, 255, 0.08);
          --card-hover-border: rgba(255, 255, 255, 0.2);
          --icon-fill: hsl(210, 10%, 70%);
          --icon-fill-hover: hsl(210, 15%, 90%);
        }

        body {
          background: var(--bg-color);
          color: var(--text-color);
          transition: background 0.3s ease, color 0.3s ease;
        }

        .light-veil {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
        }

        .light-veil-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #e0c3fc 100%);
          animation: lightVeilMove 20s ease-in-out infinite;
        }

        @keyframes lightVeilMove {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .nav-header {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
        }

        @media (max-width: 768px) {
          .nav-header {
            top: 4.5rem;
            transform: translateX(-50%) scale(0.85);
          }
        }

        .theme-toggle {
          position: fixed;
          top: 1.5rem;
          right: 1.5rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 101;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .theme-toggle {
            top: 1rem;
            right: 1rem;
            width: 45px;
            height: 45px;
          }
        }

        .theme-toggle:hover {
          transform: scale(1.1);
          background: var(--card-hover-bg);
          border-color: var(--card-hover-border);
        }

        .sun-and-moon > :is(.moon, .sun, .sun-beams) {
          transform-origin: center;
        }

        .sun-and-moon > :is(.moon, .sun) {
          fill: var(--icon-fill);
          transition: fill 0.3s ease;
        }

        .theme-toggle:is(:hover, :focus-visible) > .sun-and-moon > :is(.moon, .sun) {
          fill: var(--icon-fill-hover);
        }

        .sun-and-moon > .sun-beams {
          stroke: var(--icon-fill);
          stroke-width: 2px;
          transition: stroke 0.3s ease;
        }

        .theme-toggle:is(:hover, :focus-visible) .sun-and-moon > .sun-beams {
          stroke: var(--icon-fill-hover);
        }

        [data-theme="dark"] .sun-and-moon > .sun {
          transform: scale(1.75);
          transition: transform 0.5s cubic-bezier(0.5, 1.25, 0.75, 1.25);
        }

        [data-theme="dark"] .sun-and-moon > .sun-beams {
          opacity: 0;
          transform: rotateZ(-25deg);
          transition: opacity 0.15s ease, transform 0.15s ease;
        }

        [data-theme="dark"] .sun-and-moon > .moon > circle {
          transform: translateX(-7px);
          transition: transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25);
        }

        [data-theme="light"] .sun-and-moon > .sun {
          transform: scale(1);
          transition: transform 0.25s ease;
        }

        [data-theme="light"] .sun-and-moon > .sun-beams {
          opacity: 1;
          transform: rotateZ(0deg);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.5, 1.5, 0.75, 1.25);
        }

        @supports (cx: 1) {
          [data-theme="dark"] .sun-and-moon > .moon > circle {
            cx: 17;
            transform: translateX(0);
            transition: cx 0.25s ease;
          }
        }

        .section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6rem 2rem;
          font-family: system-ui, -apple-system, sans-serif;
          scroll-margin-top: 100px;
          will-change: scroll-position;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .container-center {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          margin-bottom: 2rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.8;
          opacity: 0.85;
          max-width: 700px;
          margin: 0 auto 2.5rem;
        }

        .hero-actions,
        .hero-tech-badges {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          margin-bottom: 1rem;
          font-weight: bold;
          text-align: center;
        }

        .section-subtitle {
          font-size: 1.125rem;
          opacity: 0.85;
          margin-bottom: 4rem;
          text-align: center;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .subsection {
          margin-bottom: 5rem;
        }

        .subsection-title {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          font-weight: 600;
          text-align: center;
          opacity: 0.9;
        }

        .rotating-text-highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0.25rem 1rem;
          border-radius: 10px;
          font-weight: 700;
          display: inline-flex;
          color: white;
        }
        
        .tech-badge {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          padding: 0.5rem 1.25rem;
          border-radius: 100px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid var(--card-border);
          display: inline-flex;
        }
        
        .overflow-hidden {
          overflow: hidden;
        }

        .btn-primary,
        .btn-secondary {
          padding: 0.875rem 2rem;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          display: inline-block;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: #667eea;
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: var(--card-bg);
          color: var(--text-color);
          border: 2px solid var(--card-border);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: var(--card-hover-bg);
          border-color: #667eea;
          transform: translateY(-2px);
        }

        .skills-carousel-container {
          overflow: hidden;
          padding: 1rem 0;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .skills-carousel {
          display: flex;
          gap: 1rem;
          animation: scroll 30s linear infinite;
          width: fit-content;
          will-change: transform;
        }

        .skills-carousel:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .skill-card {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          white-space: nowrap;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .skill-card:hover {
          background: var(--card-hover-bg);
          border-color: var(--card-hover-border);
          transform: translateY(-4px);
        }

        .skill-icon {
          font-size: 1.5rem;
        }

        .skill-name {
          font-weight: 500;
          font-size: 0.95rem;
        }

        .education-card,
        .experience-card,
        .cert-card {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          will-change: transform;
        }

        .education-card:hover,
        .experience-card:hover,
        .cert-card:hover {
          transform: translateY(-8px);
          background: var(--card-hover-bg);
          border-color: var(--card-hover-border);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .cert-card {
          text-decoration: none;
          color: var(--text-color);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding: 1.5rem;
        }

        .cert-image {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-link {
          color: #667eea;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .cert-card:hover .cert-link {
          text-decoration: underline;
        }

        .education-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          background: rgba(102, 126, 234, 0.2);
          border: 1px solid rgba(102, 126, 234, 0.4);
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .achievement-list {
          list-style: none;
          padding: 0;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .achievement-list li {
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          position: relative;
        }

        .achievement-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 6px;
          height: 6px;
          background: #667eea;
          border-radius: 50%;
        }

        .tech-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tech-tag,
        .tech-tag-compact {
          display: inline-block;
          padding: 0.35rem 0.75rem;
          background: rgba(102, 126, 234, 0.15);
          border: 1px solid rgba(102, 126, 234, 0.3);
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .project-carousel {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 2rem 0;
        }

        .carousel-arrow {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .carousel-arrow:hover {
          background: var(--card-hover-bg);
          transform: scale(1.1);
        }

        .project-card-container {
          flex: 1;
          max-width: 700px;
          overflow: hidden;
        }

        .project-card-compact {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 2rem;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .project-header-compact {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .project-icon-compact {
          font-size: 4rem;
        }

        .project-status {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }

        .project-status-live {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.4);
        }

        .project-status-completed {
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
        }

        .project-info-compact {
          text-align: left;
        }

        .project-name-compact {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .project-tagline-compact {
          font-size: 1rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }

        .project-metrics-compact {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: var(--card-bg);
          border-radius: 10px;
          font-size: 0.85rem;
        }

        .project-achievements-compact {
          list-style: none;
          padding: 0;
          margin-bottom: 1rem;
        }

        .project-achievements-compact li {
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          position: relative;
          opacity: 0.9;
        }

        .project-achievements-compact li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
        }

        .project-tech-compact {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        /* FIX: Container with min-height prevents jumping */
        .project-actions-container {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          min-height: 48px;
          align-items: flex-start;
        }

        .project-btn-fixed {
          padding: 0.65rem 1.25rem;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #667eea;
          color: white;
          min-width: 130px;
          text-align: center;
        }

        .project-btn-fixed:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .carousel-pagination {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          margin-top: 2rem;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }

        .pagination-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--card-border);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .pagination-dot.active {
          background: var(--text-color);
          width: 30px;
          border-radius: 5px;
        }

        .pagination-dot:hover {
          background: var(--text-secondary);
        }

        .project-carousel-mobile {
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
        }

        .project-scroll-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 1rem;
        }

        .project-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .project-card-mobile {
          min-width: 85vw;
          scroll-snap-align: center;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 1.5rem;
          flex-shrink: 0;
        }

        .contact-card-primary {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          text-decoration: none;
          color: var(--text-color);
          display: inline-flex;
          align-items: center;
          gap: 1.25rem;
          transition: all 0.3s ease;
          cursor: pointer;
          max-width: 450px;
          width: 100%;
        }

        .contact-card-primary:hover {
          transform: translateY(-4px);
          background: var(--card-hover-bg);
          border-color: var(--card-hover-border);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .contact-icon-medium {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .contact-card-primary:hover .contact-icon-medium {
          transform: scale(1.1) rotate(5deg);
        }

        .contact-card-primary div:last-child {
          text-align: left;
        }

        .social-icons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .social-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          border-radius: 50%;
          background: var(--card-bg);
          transition: all 0.3s ease;
          text-decoration: none;
          border: 1px solid var(--card-border);
        }

        .social-icon:hover {
          transform: translateY(-4px) scale(1.1);
          background: var(--card-hover-bg);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .footer {
          padding-top: 2rem;
          border-top: 1px solid var(--card-border);
          opacity: 0.7;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .section {
            padding: 4rem 1.5rem;
          }

          .skills-carousel {
            animation-duration: 20s;
          }

          .project-icon-compact {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
