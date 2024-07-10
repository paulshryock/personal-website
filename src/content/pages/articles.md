---
seo_title: Articles about life & software engineering by Paul Shryock
page_title: Articles about life and software engineering
title: Articles
slug: articles
description: Articles written by Paul Shryock, a senior software engineer with over 15 years experience building accessible, performant, secure apps and websites.
---

{% if collections.articles.length > 0 %}

<ul>
{% for article in collections.articles %}
  <li><a href="{{ article.url }}">{{ article.data.title }}</a></li>
{% endfor %}
<ul>
{% endif %}
