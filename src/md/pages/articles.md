---
title: Things that make me a better software engineer
slug: articles
---
{% if collections.articles.length > 0 %}
<ul>
{% for article in collections.articles %}
  <li><a href="{{ article.url }}">{{ article.data.short_title | default: article.data.title }}</a></li>
{% endfor %}
<ul>
{% endif %}
