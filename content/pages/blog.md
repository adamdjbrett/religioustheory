---
layout: base.njk
title: Blog
permalink: /blog/
---

# All Posts

<p>Complete listing of all {{ collections.posts | length }} posts from Religious Theory.</p>

<ul>
{%- for post in collections.posts -%}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
    <br><small>{{ post.date | readableDate }}{% if post.data.author %} by <a href="/author/{{ post.data.author | slugify }}/">{{ authors[post.data.author].name or post.data.author }}</a>{% endif %}</small>
  </li>
{%- endfor -%}
</ul>
