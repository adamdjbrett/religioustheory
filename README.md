# Religious Theory - Eleventy Site

A modern static site conversion of the Religious Theory WordPress archive, built with Eleventy 3.1.2 ESM.

## Features

✅ **342 Posts Converted** from WordPress HTML archive (2016-2025)  
✅ **Ultraminimalist Design** - Clean, readable, accessible  
✅ **Full Metadata** - Categories, tags, authors, dates preserved  
✅ **Permalink Structure** - Original `/YYYY/MM/DD/slug/` URLs maintained  
✅ **RSS Feed** - `/feed/feed.xml`  
✅ **Sitemap** - `/sitemap.xml`  
✅ **Pagination** - 10 posts per page  
✅ **Category Archives** - Individual pages for each category  
✅ **Tag Archives** - Individual pages for each tag  
✅ **Author Pages** - Individual pages for each author  
✅ **📓 Favicon** - Notebook emoji as site icon  

## Technology Stack

- **Eleventy 3.1.2** - Static site generator (ESM module)
- **Nunjucks** - Template engine
- **Luxon** - Date handling (no nunjucks-date plugin needed)
- **Markdown** - Content format
- **Cheerio** - HTML parsing for conversion
- **Turndown** - HTML to Markdown conversion

## Project Structure

```
religioustheory-11ty/
├── _data/              # Site configuration
│   └── site.js
├── _includes/          # Templates
│   ├── base.njk       # Base layout
│   ├── post.njk       # Post layout
│   └── page.njk       # Page layout (implicit)
├── content/            # All content
│   ├── index.njk      # Homepage with pagination
│   ├── feed/          # RSS feed
│   ├── pages/         # Static pages & archive templates
│   │   ├── about.md
│   │   ├── categories.njk
│   │   ├── category.njk (generates /category/[name]/)
│   │   ├── tags.njk
│   │   ├── tag.njk (generates /tag/[name]/)
│   │   ├── authors.njk
│   │   └── author.njk (generates /author/[name]/)
│   └── posts/         # All blog posts
│       └── YYYY/MM/DD/*.md
├── public/             # Static assets
│   ├── css/
│   │   └── style.css  # Ultraminimalist CSS
│   ├── images/        # (Ready for WordPress uploads)
│   └── docs/          # PDF documents (17 files)
├── scripts/
│   └── convert-wp-archive.js  # Conversion script
├── _site/              # Generated site (gitignored)
├── eleventy.config.js  # Eleventy configuration
└── package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm start
```

Site runs at `http://localhost:8080/`

### Build for Production

```bash
npm run build
```

Output in `_site/` directory

### Convert Additional WordPress Posts

If you have more WordPress HTML to convert:

```bash
npm run convert
```

## Features Detail

### Permalink Preservation

All posts maintain the original WordPress URL structure:
- Original: `https://jcrt.org/religioustheory/YYYY/MM/DD/slug/`
- New: `http://localhost:8080/YYYY/MM/DD/slug/`

Links work relative to localhost:8080 for development.

### Collections

- **Posts** - All 342 posts in reverse chronological order
- **Categories** - 58 unique categories
- **Tags** - Extracted from post metadata
- **Authors** - 3 unique authors with dedicated pages

### Pagination

- Homepage: 10 posts per page (35 pages total)
- Category archives: All posts in that category
- Tag archives: All posts with that tag
- Author archives: All posts by that author

### Feeds & Metadata

- **RSS Feed**: `/feed/feed.xml` (last 20 posts)
- **Sitemap**: `/sitemap.xml` (all pages and posts)
- **Humans.txt**: `/humans.txt` (site credits)
- **Robots.txt**: `/robots.txt` (search engine directives)

### Styling

Ultraminimalist CSS inspired by `minimal-11ty-blog`:
- Max-width: 70ch for optimal readability
- System sans-serif font stack
- High contrast: #1d1d1d text on white
- Responsive: Works on all devices
- No external dependencies
- Total CSS: <3KB

## Next Steps

### Static Assets

All static assets are now in the `public/` directory:

- **PDFs**: `public/docs/` - 17 PDF documents (conference papers, bibliographies, etc.)
- **Images**: `public/images/` - 553 optimized images (duplicates removed)
- **CSS**: `public/css/` - Stylesheets

These are automatically copied to `_site/` during build and accessible via `/docs/`, `/images/`, and `/css/` URLs.

Links in posts use absolute paths (e.g., `/docs/filename.pdf`) for reliability.

#### Image Optimization

Removed 1,562 duplicate WordPress-generated image sizes:
- **Before**: 2,115 image files (originals + sized duplicates)
- **After**: 553 image files (originals only)
- **Removed pattern**: Files with `-WIDTHxHEIGHT` suffixes (e.g., `-464x290.jpg`, `-1200x642.png`)
- **Result**: 74% reduction in image files, cleaner structure

### Deployment

The site is ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Update `site.url` in `_data/site.js` to your production URL before deploying.

## Conversion Script Details

The conversion script (`scripts/convert-wp-archive.js`):

1. Walks through the WordPress archive directory structure
2. Finds all posts matching `YYYY/MM/DD/slug/index.html`
3. Extracts metadata: title, date, author, categories, tags
4. Parses content from `.entry-content` div
5. Removes social sharing buttons and WordPress artifacts
6. Converts HTML to Markdown using Turndown
7. Generates YAML frontmatter
8. Saves as `content/posts/YYYY/MM/DD/slug.md`
9. Preserves original permalink structure

Successfully converted **342 posts** with **0 errors**.

## Broken Links

**Status: ✅ No broken internal links detected**

Last checked: January 31, 2026

### Internal Links Audit

All internal navigation links have been verified and are working correctly:

- ✅ Homepage navigation
- ✅ Post permalinks (342 posts)
- ✅ Category pages and links
- ✅ Tag pages and links
- ✅ Author pages and links
- ✅ Archive page with year/month organization
- ✅ Blog listing page
- ✅ Pagination links
- ✅ RSS feed links
- ✅ Search page
- ✅ About page
- ✅ PDF documents (17 files in `/docs/`)

### Document Links Fixed

All relative document paths have been converted to absolute paths:

- ✅ Fixed `../../../../docs/References.pdf` → `/docs/References.pdf`
- ✅ Fixed `../../../../../docs/WC052120.pdf` → `/docs/WC052120.pdf`  
- ✅ Fixed `../../../../docs/HC-Biblio.pdf` → `/docs/HC-Biblio.pdf`
- ✅ PDFs moved from root `docs/` to `public/docs/` for proper build output

### Template Link Verification

All Nunjucks templates using proper URL generation:

- ✅ `{{ post.url }}` - Post links
- ✅ `{{ pagination.href.next }}` / `{{ pagination.href.previous }}` - Pagination
- ✅ `/category/{{ category | slugify }}/` - Category links
- ✅ `/tag/{{ tag | slugify }}/` - Tag links
- ✅ `/author/{{ author | slugify }}/` - Author links
- ✅ `/docs/*.pdf` - Document links

### Build Status

- ✅ Build completes successfully with no warnings
- ✅ 461 HTML files + 17 PDFs + 553 images + other assets = 1,031 total files
- ✅ All routes properly configured
- ✅ No undefined or null URL values in output
- ✅ Optimized: 74% reduction in duplicate images

### External Links

Note: External links in post content (links to external websites, references, citations) have not been validated and may contain outdated URLs from the original WordPress archive (2016-2025). These would require individual verification if needed.

### How to Check for Broken Links

To verify links after making changes:

```bash
# Build the site
npm run build

# Check for common broken link patterns
grep -r 'href="undefined"' _site/
grep -r 'href="null"' _site/
grep -r 'href=""' _site/

# All should return no results
```

For comprehensive external link checking, use a tool like:
- [Broken Link Checker](https://www.npmjs.com/package/broken-link-checker)
- [linkinator](https://www.npmjs.com/package/linkinator)

## License

Content from original Religious Theory archive.  
Site code: MIT License

## Credits

- Original content: Religious Theory / JCRT
- Conversion & Eleventy implementation: 2026
- Icons: 📓 (Notebook emoji)
