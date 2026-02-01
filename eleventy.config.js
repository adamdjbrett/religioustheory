import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginTOC from "eleventy-plugin-toc";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import { readFileSync } from "fs";
import { execSync } from "node:child_process";

export default function (eleventyConfig) {
  const isProduction = process.env.ELEVENTY_ENV === "production";
  // Add RSS plugin
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3", "h4", "h5", "h6"],
    wrapper: "nav",
    wrapperClass: "toc",
  });

  // Configure markdown-it with footnote support
  let mdOptions = {
    html: true,
    breaks: false,
    linkify: true
  };
  let mdEnv = {};
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const headingIdPlugin = (mdLib) => {
    mdLib.core.ruler.push("heading_ids", (state) => {
      const seen = new Map();
      for (let i = 0; i < state.tokens.length; i += 1) {
        const token = state.tokens[i];
        if (token.type !== "heading_open") continue;
        const inline = state.tokens[i + 1];
        if (!inline || inline.type !== "inline") continue;
        const base = slugify(inline.content);
        if (!base) continue;
        const count = seen.get(base) || 0;
        seen.set(base, count + 1);
        const slug = count > 0 ? `${base}-${count + 1}` : base;
        token.attrSet("id", slug);
      }
    });
  };

  const md = markdownIt(mdOptions).use(markdownItFootnote).use(headingIdPlugin);
  eleventyConfig.setLibrary("md", md);

  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy({ "public": "." });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@zachleat/heading-anchors/heading-anchors.js": "js/heading-anchors.js",
  });
  
  // Luxon date filters (no nunjucks-date)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  // Date filter for formatting
  eleventyConfig.addFilter("dateFilter", (dateObj, format) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("urlencode", (value) => {
    return encodeURIComponent(value);
  });

  // Limit filter
  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });

  // Filter posts by category
  eleventyConfig.addFilter("filterByCategory", (posts, category) => {
    return posts.filter(post => {
      return post.data.categories && post.data.categories.includes(category);
    });
  });

  // Filter posts by tag
  eleventyConfig.addFilter("filterByTag", (posts, tag) => {
    return posts.filter(post => {
      return post.data.tags && post.data.tags.includes(tag);
    });
  });

  // Filter posts by author
  eleventyConfig.addFilter("filterByAuthor", (posts, author) => {
    return posts.filter(post => {
      return post.data.author === author;
    });
  });

  // Generate breadcrumb from post date and title
  eleventyConfig.addFilter("breadcrumbs", (dateObj, title, site) => {
    if (!dateObj || !title) return [];
    const dt = DateTime.fromJSDate(dateObj, { zone: "utc" });
    return [
      { text: site?.title || "Religious Theory", url: "/" },
      { text: dt.toFormat("yyyy"), url: `/${dt.toFormat("yyyy")}/` },
      { text: dt.toFormat("MMMM"), url: `/${dt.toFormat("yyyy")}/${dt.toFormat("MM")}/` },
      { text: dt.toFormat("dd"), url: `/${dt.toFormat("yyyy")}/${dt.toFormat("MM")}/${dt.toFormat("dd")}/` },
      { text: title, url: null }
    ];
  });

  // Run Pagefind after each build so /search works in --serve (skip in production)
  if (!isProduction) {
    eleventyConfig.on("afterBuild", () => {
      execSync('npx pagefind --site _site --glob "**/*.html"', {
        stdio: "inherit",
      });
    });
  }

  // Posts collection (reverse chronological)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/posts/**/*.md").reverse();
  });

  const getPosts = (collectionApi) => collectionApi.getFilteredByGlob("content/posts/**/*.md").reverse();

  // Get all unique categories
  eleventyConfig.addCollection("categories", function(collectionApi) {
    let categories = new Set();
    getPosts(collectionApi).forEach(item => {
      if (item.data.categories) {
        item.data.categories.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories).sort();
  });

  // Get all unique tags
  eleventyConfig.addCollection("tags", function(collectionApi) {
    let tags = new Set();
    getPosts(collectionApi).forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  });

  // Get all unique authors
  eleventyConfig.addCollection("authors", function(collectionApi) {
    let authors = new Set();
    getPosts(collectionApi).forEach(item => {
      if (item.data.author) {
        authors.add(item.data.author);
      }
    });
    return Array.from(authors).sort();
  });

  // Author profiles with pagination
  eleventyConfig.addCollection("authorPages", function(collectionApi) {
    const authorsJson = readFileSync("./_data/authors.json", "utf-8");
    const authorsData = JSON.parse(authorsJson);
    let posts = getPosts(collectionApi);
    let authorPages = [];
    
    Object.entries(authorsData).forEach(([key, author]) => {
      let authorPosts = posts.filter(post => post.data.author === key);
      if (authorPosts.length > 0) {
        authorPages.push({
          key: key,
          name: author.name,
          bio: author.bio,
          posts: authorPosts,
          url: `/author/${key}/`
        });
      }
    });
    
    return authorPages;
  });

  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
