# my-blog

A minimal technical blog built with [Astro](https://astro.build), hosted on GitHub Pages.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

## Writing a post

Create a Markdown file in `src/content/blog/`:

```markdown
---
layout: ../../layouts/Post.astro
title: "Your post title"
description: "Short summary for the home page listing."
pubDate: 2024-03-15
tags: ["tag1", "tag2"]
---

Post content here (Markdown + code blocks fully supported).
```

Commit and push to `main` — GitHub Actions builds and deploys automatically.

## Initial GitHub setup (one-time)

1. Create a new repository on GitHub
2. In **Settings → Pages**, set source to **GitHub Actions**
3. Edit `astro.config.mjs`:
   - Set `site` to `https://YOUR_USERNAME.github.io`
   - Set `base` to `/YOUR_REPO_NAME` (omit if the repo is `username.github.io`)
4. Also update the site name in `src/layouts/Base.astro` and `src/pages/index.astro`
5. Push:

```bash
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git add .
git commit -m "initial commit"
git push -u origin main
```

Your blog will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`.

## Project structure

```
src/
  content/blog/    ← Markdown posts
  layouts/
    Base.astro     ← site shell (header, footer)
    Post.astro     ← individual post layout
  pages/
    index.astro    ← home / post listing
    about.astro    ← about page
  styles/
    global.css     ← all styles
public/
  favicon.svg
.github/workflows/
  deploy.yml       ← CI/CD pipeline
```
