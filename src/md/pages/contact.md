---
seo_title: Connect with Paul Shryock online
title: Contact Paul
description: If you need a senior software engineer to bring your Awesome Project™ to life, get in touch with Paul in one of the following ways.
slug: contact
---
{%- if links %}
  {%- for item in links %}
  {%- if item.cta %}
- [{{ item.cta }}]({{ item.link }})
  {%- endif %}
  {%- endfor %}
{%- endif %}
