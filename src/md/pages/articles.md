---
title: Things that make me a better software engineer
description: Here is a collection of articles about some things I've learned over the last decade and a half working as a software engineer.
slug: articles
---
{% if collections.articles.length > 0 %}
<ul>
{% for article in collections.articles %}
  <li><a href="{{ article.url }}">{{ article.data.short_title | default: article.data.title }}</a></li>
{% endfor %}
<ul>
{% endif %}
