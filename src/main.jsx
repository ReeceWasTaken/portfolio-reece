import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Github, Linkedin, Mail, Terminal, Shield, Cpu, ChevronRight, Download } from 'lucide-react';
import { profile, projects, skills } from './data';
import './style.css';
import { certificationRoadmap } from "./data";

const commands = ['help', 'whoami', 'status', 'education', 'projects', 'skills', 'certifications', 'contact', 'date', 'clear'];
const intro = [
  { type: 'system', text: 'Initializing secure portfolio environment...' },
  { type: 'success', text: '[ OK ] Interface loaded successfully' },
  { type: 'success', text: '[ OK ] Project directory mounted' },
  { type: 'muted', text: 'Type "help" to see available commands.' },
];

function TerminalPanel({ onNavigate }) {
  const [lines, setLines] = useState(intro);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }); }, [lines]);
  const execute = (raw) => {
    const value = raw.trim();
    if (!value) return;
    const cmd = value.toLowerCase();
    setHistory(prev => [...prev, value]);
    setHistoryIndex(-1);
    setInput('');
    if (cmd === 'clear') { setLines([]); return; }
    const output = [];
    if (cmd === 'help') output.push({ type: 'normal', text: 'Available commands: ' + commands.join('  ·  ') });
    else if (cmd === 'whoami') output.push({ type: 'success', text: profile.name + ' — ' + profile.title });
    else if (cmd === 'status') output.push({ type: 'success', text: 'SYSTEM ONLINE | PORTFOLIO READY | OPEN TO OPPORTUNITIES' });
    else if (cmd === 'education') output.push({ type: 'normal', text: 'B.S. Cybersecurity — Cum Laude' });
    else if (cmd === 'certifications') { onNavigate('certifications'); output.push({ type: 'normal', text: 'Opening certification status ...' }); }
    else if (cmd === 'date') output.push({ type: 'normal', text: new Date().toLocaleString() });
    else if (['about', 'projects', 'skills', 'contact'].includes(cmd)) {
      onNavigate(cmd);
      output.push({ type: 'success', text: 'Opening /' + cmd + ' ...' });
    } else output.push({ type: 'error', text: `Command not found: ${value}. Type "help".` });
    setLines(prev => [...prev, { type: 'command', text: value }, ...output]);
  };
  const onKeyDown = (event) => {
    if (event.key === 'Enter') execute(input);
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (next >= 0) { setHistoryIndex(next); setInput(history[history.length - 1 - next]); }
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next < 0 ? '' : history[history.length - 1 - next]);
    }
  };
  return <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
    <div className="window-bar"><div className="window-dots"><i/><i/><i/></div><span>reece@portfolio: ~/terminal</span><span className="window-right">bash — 80x24</span></div>
    <div className="terminal-content" ref={scrollRef} aria-live="polite">
      {lines.map((line, i) => <div className={'terminal-line ' + line.type} key={i}>{line.type === 'command' && <span className="prompt">➜ ~ </span>}{line.text}</div>)}
      <div className="input-line"><span className="prompt">➜ ~ </span><input ref={inputRef} aria-label="Terminal command" autoComplete="off" spellCheck="false" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown} placeholder="enter a command..." /></div>
    </div>
  </div>;
}
function App() {
  const navigate = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const [menu, setMenu] = useState(false);
  return <div className="site">
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">&gt;_</span> {profile.name.toLowerCase()}<span className="green">.sec</span></a><nav className={menu ? 'nav open' : 'nav'}>{['about', 'projects', 'skills', 'certifications', 'contact'].map(x => <a key={x} href={'#'+x} onClick={() => setMenu(false)}><span className="green">/</span>{x}</a>)}</nav><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenu(!menu)}>☰</button><span className="availability"><span className="live-dot"/> OPEN TO OPPORTUNITIES</span></header>
    <main>
      <section id="home" className="hero section"><div className="hero-copy"><div className="eyebrow"><span className="green">//</span> SYSTEM ACCESS GRANTED <span className="line"/></div><p className="hero-kicker">HELLO WORLD, I'M</p><h1>{profile.name}<span className="green">.</span></h1><div className="title-line"><span className="green">&gt;</span> {profile.title}<span className="cursor">_</span></div><p className="hero-summary">{profile.summary}</p><div className="actions"><button className="primary" onClick={() => navigate('projects')}>EXPLORE PROJECTS <ArrowUpRight size={16}/></button><button className="secondary" onClick={() => navigate('contact')}>CONTACT ME <ChevronRight size={16}/></button></div><div className="system-strip"><span><span className="green">●</span> SECURITY CONSOLE</span><span>PORTFOLIO / V2.0</span><span>STATUS: ONLINE</span></div><div className="hero-meta"><span><span className="green">●</span> BUILDING & LEARNING</span><span>BASED IN THE USA</span></div></div><div className="hero-terminal"><div className="terminal-label"><Terminal size={15}/> INTERACTIVE SHELL <span>v2.0</span></div><TerminalPanel onNavigate={navigate}/><div className="terminal-hint">TIP: TRY <code>help</code>, <code>status</code> OR <code>education</code></div></div></section>
      <section id="about" className="section content-section"><div className="section-head"><span className="section-number">01 / ABOUT</span><h2><span className="green">$</span> cat about_me.txt</h2></div><div className="about-grid"><div><p className="lead">Cybersecurity isn't just what I studied. It's what I build.</p><p>I'm a cybersecurity graduate interested in network defense, security operations, and developing tools that make systems safer. I enjoy translating theory into hands-on projects and documenting what I learn along the way.</p><p>My portfolio highlights practical work, including an AI-assisted phishing detection system, as well as ongoing networking and defensive security projects.</p></div><div className="info-panel"><div className="panel-title"><Shield size={16}/> PROFILE.DATA</div><div className="info-row"><span>EDUCATION</span><strong>B.S. Cybersecurity</strong></div><div className="info-row"><span>ACADEMIC HONORS</span><strong>Cum Laude</strong></div><div className="info-row"><span>FOCUS</span><strong>Blue Team / Networking</strong></div><div className="info-row"><span>STATUS</span><strong className="green">Open to Opportunities</strong></div></div></div></section>
      <section id="projects" className="section content-section"><div className="section-head"><span className="section-number">02 / PROJECTS</span><h2><span className="green">$</span> ls ./projects/</h2><p>Selected builds and planned labs. Project links will activate when repository URLs are added.</p></div><div className="project-grid">{projects.map((project, i) => <article className="project-card" key={project.name}><div className="project-top"><span className="project-index">0{i+1} / {project.type}</span><span className={project.status === 'PLANNED' ? 'status planned' : 'status'}>{project.status}</span></div><div className="project-symbol"><Cpu size={25}/></div><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">VIEW REPOSITORY <ArrowUpRight size={15}/></a> : <span className="project-link inactive">REPOSITORY LINK PENDING</span>}</article>)}</div></section>
      <section id="skills" className="section content-section"><div className="section-head"><span className="section-number">03 / SKILLS</span><h2><span className="green">$</span> cat skills.json</h2></div><div className="skills-grid">{skills.map(group => <div className="skill-panel" key={group.group}><div className="skill-title"><span className="green">◆</span> {group.group}</div>{group.items.map(item => <div className="skill-item" key={item}><span className="green">›</span> {item}</div>)}</div>)}</div></section>
      <div className="cert-grid"> {certificationRoadmap.map((cert) => (<div className="cert-card" key={cert.name}> <span className="cert-icon">[ + ]</span><div><h3>{cert.name}</h3><p>{cert.description}</p><span className="cert-state">{cert.status.toUpperCase()}</span></div></div>))}</div></span><div><h3>B.S. Cybersecurity</h3><p>Graduated cum laude with a bachelor's degree in Cybersecurity, building a strong foundation in networking, information security, and threat analysis.</p><span className="cert-state">EDUCATION VERIFIED BY OWNER</span></div></div></div></section><section id="contact" className="section content-section contact-section"><div className="section-head"><span className="section-number">05 / CONTACT</span><h2><span className="green">$</span> ./connect.sh</h2></div><p className="lead">Let's build something secure.</p><p>Interested in connecting about cybersecurity, security engineering, or technical opportunities? Reach out below.</p><div className="contact-links"><a href={'mailto:'+profile.email}><Mail size={18}/> EMAIL <ArrowUpRight size={16}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GITHUB <ArrowUpRight size={16}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LINKEDIN <ArrowUpRight size={16}/></a>{profile.resume && <a href={profile.resume} target="_blank" rel="noreferrer"><Download size={18}/> RESUME <ArrowUpRight size={16}/></a>}</div></section>
    </main><footer><span><span className="green">&gt;_</span> {profile.name.toLowerCase()}.sec</span><span>BUILT WITH REACT · DEPLOYED ON GITHUB PAGES</span><a href="#home">BACK TO TOP ↑</a></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);

<section id="certifications" className="section content-section">
  <div className="section-head">
    <span className="section-number">04 / CERTIFICATIONS</span>
    <h2>
      <span className="green">$</span> cat certifications.log
    </h2>
    <p>Certifications I'm working toward and future goals.</p>
  </div>

  <div className="cert-grid">
    {certificationRoadmap.map((cert) => (
      <div className="cert-card" key={cert.name}>
        <span className="cert-icon">[ + ]</span>
        <div>
          <h3>{cert.name}</h3>
          <p>{cert.description}</p>
          <span className="cert-state">
            {cert.status.toUpperCase()}
          </span>
        </div>
      </div>
    ))}
  </div>
</section>
