# Cyber Nate AI Job Board

> AI-powered global remote & relocation job board built with Claude AI + live web search.
> Built by [Nathaniel T.O.](https://cybernatesec.netlify.app) — Cybersecurity Analyst · SOC · DFIR · Lagos, Nigeria.

## Live Demo
🔗 [View Live App](https://cybernatejobp.netlify.app)

## Features
- 🔍 **AI-powered live search** — Claude AI + web search finds real, currently open jobs
- 🌐 **Remote Worldwide** — targets companies known to hire internationally from Africa/Nigeria
- ✈️ **Relocation / Sponsorship** — AU, NZ, CA, DE with visa sponsorship filter
- 🏢 **Company Career Pages** — direct search on Huntress, Arctic Wolf, Group-IB, Andela, etc.
- 5 role groups: Cybersecurity/SOC · IT Support · Web Dev · Helpdesk/Support · VA/Admin/Data Entry
- Colour-coded tabs, keyword filter, stats bar, direct apply links

## Tech Stack
- Vanilla HTML/CSS/JS (no framework, no build step)
- [Anthropic Claude API](https://anthropic.com) via Netlify serverless function proxy
- `web_search` tool for live job discovery

## Deploy to Netlify

### 1. Clone & set up
```bash
git clone https://github.com/Cyber-Nate/cyber-nate-job-board
cd cyber-nate-job-board
```

### 2. Folder structure
```
cyber-nate-job-board/
├── index.html
├── netlify.toml
├── netlify/
│   └── functions/
│       └── claude-proxy.js
└── README.md
```

### 3. Set environment variable
Netlify Dashboard → Site Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-...
```

### 4. Deploy
Push to GitHub → connect repo to Netlify → auto-deploy.

## Local Testing
Open `index.html`, find the `callClaude()` function and temporarily add:
```js
headers['x-api-key'] = 'sk-ant-YOUR_KEY';
headers['anthropic-version'] = '2023-06-01';
headers['anthropic-dangerous-direct-browser-access'] = 'true';
```
And change `API_URL` to `https://api.anthropic.com/v1/messages`.

⚠️ Never commit your API key. Remove before pushing.

## Portfolio Integration
Feature this on [cybernatesec.netlify.app](https://cybernatesec.netlify.app) as a project card:
- **Live App:** `https://cybernatejobp.netlify.app`
- **GitHub:** `https://github.com/Cyber-Nate/cyber-nate-job-board`

---
Built with 🔵 Claude AI · Anthropic
