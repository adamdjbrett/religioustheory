---
layout: base.njk
title: Archive
permalink: /archive/
---

# Archive

<p>Browse all {{ collections.posts | length }} posts organized chronologically by year and month.</p>

<div style="margin-top: 2em;">

{# Get list of unique years in reverse order #}
{% set yearsSet = [] %}
{% for post in collections.posts %}
  {% set year = post.date.getFullYear() %}
  {% if year not in yearsSet %}
    {% set yearsSet = yearsSet.concat([year]) %}
  {% endif %}
{% endfor %}

{# Sort years in reverse (newest first) #}
{% set yearsSorted = yearsSet | sort | reverse %}

{# Display each year #}
{% for year in yearsSorted %}
  {# Get posts for this year #}
  {% set yearPosts = [] %}
  {% for post in collections.posts %}
    {% if post.date.getFullYear() == year %}
      {% set yearPosts = yearPosts.concat([post]) %}
    {% endif %}
  {% endfor %}
  
  <details>
    <summary><h2 style="display: inline; margin: 0;">{{ year }} ({{ yearPosts | length }} posts)</h2></summary>
    <div style="margin: 1em 0 1em 1.5em;">
    
    {# Get unique months for this year #}
    {% set monthsSet = [] %}
    {% for post in yearPosts %}
      {% set month = post.date | dateFilter('YYYY-MM') %}
      {% if month not in monthsSet %}
        {% set monthsSet = monthsSet.concat([month]) %}
      {% endif %}
    {% endfor %}
    
    {# Sort months in reverse #}
    {% set monthsSorted = monthsSet | sort | reverse %}
    
    {# Display each month #}
    {% for monthKey in monthsSorted %}
      {% set monthPosts = [] %}
      {% for post in yearPosts %}
        {% if post.date | dateFilter('YYYY-MM') == monthKey %}
          {% set monthPosts = monthPosts.concat([post]) %}
        {% endif %}
      {% endfor %}
      
      {% set monthDisplay = monthPosts[0].date | dateFilter('MMMM') %}
      <details>
        <summary><strong>{{ monthDisplay }}</strong> <small>({{ monthPosts | length }} posts)</small></summary>
        <ul style="margin: 0.5em 0 0.5em 2em;">
        {%- for post in monthPosts | reverse -%}
          <li><a href="{{ post.url }}">{{ post.data.title }}</a> <small>({{ post.date | readableDate }})</small></li>
        {%- endfor -%}
        </ul>
      </details>
    {% endfor %}
    
    </div>
  </details>
  {% endfor %}

</div>


