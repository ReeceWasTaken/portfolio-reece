# Cybersecurity Terminal Portfolio

A responsive, terminal-inspired cybersecurity portfolio built with React and Vite, showcasing defensive security projects, technical skills, education, and certifications.

**Live portfolio:** [reecewastaken.github.io/portfolio-reece](https://reecewastaken.github.io/portfolio-reece/)

**Version:** 2.1.0

## Features

- Interactive terminal with command history and section navigation.
- Dynamic interface themes, animated effects, and hidden Easter eggs.
- Dedicated project pages for PhishHook and Foxbat NIDS.
- Technical skills, certification roadmap, resume, and professional contact links.
- Responsive desktop and mobile layouts.
- Automated GitHub Pages deployment with separate build and deployment jobs.

## Featured projects

| Project | Description |
| --- | --- |
| [PhishHook](https://github.com/ReeceWasTaken/PhishHook) | Hybrid AI-assisted phishing email detection using a three-model voting approach. |
| [Foxbat NIDS](https://github.com/ReeceWasTaken/Foxbat-NIDS) | Python-based network intrusion detection system with live packet capture, PCAP analysis, and a desktop monitoring dashboard. |

## Quick start

Requires Node.js 20.19+ or 22.12+ (compatible with Vite 6).

```bash
npm install
npm run dev
```

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Terminal commands

| Command | Description |
| --- | --- |
| `help` | Display available commands. |
| `whoami` | Display the current session identity. |
| `status` | Display system status. |
| `education` | Display educational background. |
| `about` | Navigate to the about section. |
| `projects` | Navigate to featured projects. |
| `skills` | Navigate to technical skills. |
| `certifications` | Navigate to certifications. |
| `contact` | Navigate to contact information. |
| `date` | Display the local date and time. |
| `clear` | Clear terminal output. |

Use the Up and Down arrow keys to navigate command history. Additional hidden commands are intentionally undocumented. The terminal is a simulated browser interface, not a real shell, and does not grant system privileges.

## Project structure

```text
src/
├── main.jsx       # React application and interactive terminal
├── data.js        # Profile, projects, skills, and certifications
└── style.css      # Layout, themes, and animations
public/            # Static assets and resume
.github/workflows/ # GitHub Pages deployment workflow
```

## Customize

Edit `src/data.js` to update profile information, projects, skills, certifications, and contact links. Set `profile.resume` to a public resume URL or place a PDF in `public/` and reference it using a relative path.

## Deploy to GitHub Pages

1. Push the project to the `main` branch of your GitHub repository.
2. In **Settings > Pages**, select **GitHub Actions** as the source.
3. The included workflow builds and deploys on each push to `main`, or can be triggered manually from the Actions tab.

The workflow uses Node.js 22, separate build and deployment jobs, job-specific permissions, and unique artifact names for each build attempt to avoid deployment conflicts.

The Vite base is `./`, allowing static assets to work at repository and root-site deployment paths.

## Version 2.1.0 — Terminal Easter Eggs Update

- Added hidden terminal sessions with dynamic color themes and custom prompts.
- Added full-screen Matrix code rain and game-inspired transition animations.
- Added custom session emblems and additional hidden commands.
- Improved GitHub Pages deployment reliability and workflow permission scoping.
- Preserved the core portfolio layout, project pages, certification section, and resume access.

## Technologies

React · Vite · JavaScript · CSS · Lucide React · GitHub Actions · GitHub Pages
