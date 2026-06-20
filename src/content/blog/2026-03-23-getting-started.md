---
title: "Getting started with Astro"
description: "Why I chose Astro for my blog and how the setup works."
pubDate: 2026-03-23
tags: ["astro", "meta"]
---

This blog is built with [Astro](https://astro.build) and hosted on GitHub Pages.
Here's why, and how the whole thing fits together.

## Why Astro?

Astro ships zero JavaScript by default — the output is pure static HTML.
That means fast load times, great Lighthouse scores, and nothing to maintain at runtime.

Posts are just Markdown files. To publish, I write a `.md` file, commit it, and push.
GitHub Actions handles the build and deploy automatically.

## Project structure

```
src/
  content/blog/    ← your .md posts live here
  layouts/         ← Base.astro wraps every page
  pages/           ← index.astro + about.astro
  styles/          ← global.css
.github/workflows/ ← deploy.yml
```

## Writing a new post

Create a file in `src/content/blog/my-post.md` with frontmatter:

```markdown
---
layout: ../../layouts/Post.astro
title: "My post title"
description: "One-line summary shown on the home page."
pubDate: 2024-03-10
tags: ["tag1", "tag2"]
---

Post body here...
```

Commit and push — that's it.
