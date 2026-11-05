# Cybersecurity Terminal Portfolio

A responsive React + Vite portfolio designed for GitHub Pages, featuring an interactive terminal, projects, skills, and contact links.

## Quick start

Requires Node.js 20.19+ or 22.12+ (compatible with Vite 6).

```bash
npm install
npm run dev
```

## Customize

Edit `src/data.js` to set your name, headline, links, projects, and skills. Set `profile.resume` to a public resume URL or add `public/resume.pdf` and use `./resume.pdf`. Replace placeholders before publishing.

## Deploy to GitHub Pages

1. Create a GitHub repository, e.g. `cyber-terminal-portfolio`.
2. Push this project to the `main` branch.
3. In GitHub repository Settings > Pages, choose **GitHub Actions** as the source.
4. The included workflow will build and deploy on each push to `main`.
5. Your website will be available at `https://YOUR_USERNAME.github.io/cyber-terminal-portfolio/`.

For a root user site at `https://YOUR_USERNAME.github.io/`, create a repository named `YOUR_USERNAME.github.io` instead.

The Vite base is `./`, so static assets work at either deployment path.

## Terminal commands

`help`, `about`, `projects`, `skills`, `contact`, `clear`, `whoami`, `date`. Use up/down arrows for command history.

## Version 2 upgrades

- Interactive console supports `help`, `whoami`, `status`, `education`, `projects`, `skills`, `certifications`, `contact`, `date`, and `clear`.
- Terminal history: use the Up/Down arrow keys.
- Status strip and a separate certification roadmap section.
- Resume remains disabled until you set `profile.resume`.
- Replace the placeholder GitHub, LinkedIn and email values in `src/data.js` before publishing.
