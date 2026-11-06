// Public profile details displayed throughout the portfolio.
export const profile = {
  name: 'Reece',
  handle: 'security@portfolio',
  title: 'Cybersecurity Graduate | Security & Network Engineering',
  summary: 'Cybersecurity graduate focused on threat detection, network defense, and building practical security tools. I turn technical curiosity into projects that solve real problems.',
  github: 'https://github.com/ReeceWasTaken',
  linkedin: 'https://www.linkedin.com/in/reece-ludlow/',
  email: 'reeceludlow51802@gmail.com',
  resume: 'Reece_Ludlow_Resume.pdf',
};

// Featured and planned projects.
export const projects = [
  { name: 'PhishHook', type: 'THREAT DETECTION', status: 'FEATURED', description: 'Hybrid AI phishing detection project using a three-model voting approach. Reported approximately 90% accuracy during project evaluation.', tags: ['Python', 'Machine Learning', 'Email Security'], link: 'https://github.com/ReeceWasTaken/PhishHook' },
  { name: 'Network Defense Lab', type: 'NETWORK SECURITY', status: 'PLANNED', description: 'A future hands-on lab documenting network segmentation, traffic analysis, and defensive controls.', tags: ['Wireshark', 'Networking', 'Firewall'], link: '' },
  { name: 'Security Automation', type: 'BLUE TEAM', status: 'PLANNED', description: 'A future project for automating repetitive security analysis and incident triage workflows.', tags: ['Python', 'Automation', 'SOC'], link: '' },
];

// Skills displayed in the skills section.
export const skills = [
  { group: 'SECURITY', items: ['Threat Detection', 'Phishing Analysis', 'Security Monitoring', 'Incident Response Concepts'] },
  { group: 'NETWORKING', items: ['TCP/IP', 'Subnetting', 'VLANs', 'Routing & Switching'] },
  { group: 'TOOLS & DEVELOPMENT', items: ['Python', 'Git & GitHub', 'Linux', 'Wireshark'] },
];

// Completed certification first, followed by future certification goals.
export const certificationRoadmap = [
  {
    name: 'GIAC Foundational Cybersecurity Technologies (GFACT)',
    description: 'Foundational cybersecurity knowledge, including networking, operating systems, and security concepts.',
    status: 'Completed',
  },
  {
    name: 'Cisco CCNA',
    description: 'Networking, routing, switching, and infrastructure security.',
    status: 'Next Target',
  },
  {
    name: 'Cisco CCNP Security',
    description: 'Advanced network security, firewalls, VPNs, and secure infrastructure.',
    status: 'Planned',
  },
  {
    name: 'OffSec OSCP+',
    description: 'Hands-on penetration testing, exploitation, and privilege escalation.',
    status: 'Long-Term Goal',
  },
];
