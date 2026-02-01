# Changelog — 2026-01-31

## Summary of work (today) ✅

- **Ran comprehensive markdown validation** across posts using `scripts/fix-markdown-links.js`.
  - Processed 342 markdown files; **167 files modified** to remove incorrect in-text footnote colons (`[^1]:` → `[^1]`).
  - **0** files required `[text](<url>)` → `[text](url)` fixes (those had been corrected earlier).

- **Fixed single-file investigation** for malformed dictionary links in `/content/posts/2024/08/24/sikh-environmental-ethics-theory-and-praxis-part-2-harpreet-kaur.md`.
  - Observed many occurrences of the pattern: `] ( <https://www>.srigranth.org/… )` (extra `<>` surrounding `https://www`).
  - Created `scripts/fix-single-file.js` to attempt an automated fix; script reported **0** automatic replacements (pattern mismatch).
  - Status: **manual regex fix required** (targeted replacement of `(<https://www>.srigranth.org/... )` → `(https://srigranth.org/...)`).

- **Rebuilt the site** to verify changes:
  - `npm run build` completed successfully.
  - Result: **449 pages** built; **49,879 words** indexed by Pagefind.

## Files created / modified today

- Created: `scripts/fix-markdown-links.js` (comprehensive validator)
- Created: `scripts/fix-single-file.js` (attempted auto-fix for a specific post)
- Modified: 167 post files (in-text footnote colon fixes)

## Pending items / next steps 🔧

1. Run a targeted replace on `/content/posts/2024/08/24/sikh-environmental-ethics-theory-and-praxis-part-2-harpreet-kaur.md` to correct all `] ( <https://www>.srigranth.org/… )` links to proper Markdown `(https://srigranth.org/…)` links. (I can do this now if you want.)
2. Optionally re-run the full validator and rebuild to ensure nothing else remains.

---

If you'd like, I can proceed to apply the targeted fix in place and rebuild now. 

*Generated automatically by workflow on 2026-01-31.*

# Changelog — 2026-02-01

## Summary of work (today) ✅

- **Fixed malformed angle-bracketed links** across multiple posts (removed `<`/`>` within Markdown link parentheses).
- **Added Pagefind title metadata** so search results display page titles instead of the site title (`_includes/base.njk`).
- **Added post navigation** links (“← Back” / “Forward →”) to all posts (`_includes/post.njk`).
- **Removed stray carets (`^`) outside brackets** across content.
- **Rebuilt the site and Pagefind index** after deleting `_site` (`npm run build`).

## Files created / modified today

- Modified: `_includes/base.njk` (Pagefind title metadata)
- Modified: `_includes/post.njk` (post navigation)
- Modified: `content/posts/**/*.md` (link cleanup, caret cleanup)
- Rebuilt: `_site` (regenerated)

## Notes / blockers

- **VS Code Copilot chats (last 24 hours)**: I don’t have access to your local VS Code chat history. If you paste or export the chat transcript, I can summarize it and add it here.
- **This chat summary** (today’s Codex session) is captured above under “Summary of work (today) ✅”.

---

## Template (for future daily entries)

# Changelog — YYYY-MM-DD

## Summary of work (today) ✅

- **Change 1** — what was done and why.
- **Change 2** — key details (files, behavior).
- **Change 3** — results or outcome (builds/tests).

## Files created / modified today

- Created: `path/to/file.ext` — brief purpose.
- Modified: `path/to/file.ext` — brief purpose.

## Notes / blockers

- **Blocker** — what is missing, how to proceed.
- **Follow-up** — next steps or owner.

---

# Changelog — 2026-02-01 (continued)

## Summary of work (today) ✅

- **Normalized footnotes sitewide** in `religioustheory-11ty`: standardized markdown-it syntax (`[^n]` in-text, `[^n]:` after `## Footnotes`), added a single `## Footnotes` heading after `***`, and replaced `## Notes` / `## Endnotes` with `## Footnotes`.
- **Cleaned Markdown links and stray characters** in `religioustheory-11ty`: removed `<`/`>` inside link parentheses, removed `^` outside brackets, and converted `../`-prefixed external domains to `https://` (including `www.jcrt.org` → `jcrt.org`).
- **Fixed internal permalink formats** in `religioustheory-11ty`: changed `/index.html` references to trailing-slash permalinks.
- **Improved post UX** in `religioustheory-11ty`: added previous/next nav, ensured Pagefind uses page titles, and adjusted breadcrumbs to use `site.title`.
- **Added heading anchors** in `religioustheory-11ty`: included `<heading-anchors>` component, added heading `id` generation, and passed through the component script.
- **Added TOC support** in `religioustheory-11ty`: installed `eleventy-plugin-toc`, configured h2–h6, and rendered TOC only when headings exist.
- **Adjusted in-text footnote spacing** in `religioustheory-11ty`: enforced a trailing space after `[^n]` in-text, excluding punctuation and anything after `## Footnotes`.

## Files created / modified today

- Modified: `religioustheory-11ty/_includes/base.njk` (Pagefind title meta, heading anchors script, wrapper)
- Modified: `religioustheory-11ty/_includes/post.njk` (post nav, TOC render)
- Modified: `religioustheory-11ty/eleventy.config.js` (breadcrumbs use `site.title`, pagefind on build, heading ids, TOC plugin, heading anchors passthrough)
- Modified: `religioustheory-11ty/package.json` (TOC dependency)
- Modified: `religioustheory-11ty/content/posts/**/*.md` (footnotes, links, caret cleanup, spacing, permalink updates)

## Notes / blockers

- These changes were applied in `religioustheory-11ty`. You said not to move them into `religioustheory` yet.

# Changelog — 2026-02-01 (religioustheory)

## Summary of work (today) ✅

- **Added post hero images** by importing `single-post-image` URLs from `religioustheory-content` into `image:` front matter and rendering above post titles.
- **Added ShareOpenly links** for posts, including a ShareOpenly section after post content.
- **Improved Pagefind relevance** by weighting post titles and ignoring the site header `h1`.
- **Faster builds**: production builds avoid redundant Pagefind runs; dev builds use `--incremental`.
- **Reduced collection overhead** by reusing the posts collection helper in categories/tags/authors/authorPages.

## Files created / modified today

- Modified: `religioustheory/content/posts/**/*.md` (added `image:` front matter)
- Modified: `religioustheory/_includes/post.njk` (hero image, ShareOpenly, title weighting)
- Modified: `religioustheory/_includes/base.njk` (ignore header in Pagefind)
- Modified: `religioustheory/eleventy.config.js` (urlencode filter, build optimizations, collection reuse)
- Modified: `religioustheory/package.json` (production env for build, incremental dev)

## Notes / blockers

- 13 posts referenced in `religioustheory-content` have no matching markdown file under `religioustheory/content/posts` (listed in the session notes). If those slugs exist under different filenames, we can remap and add images.
