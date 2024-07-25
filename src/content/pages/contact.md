---
seo_title: Connect with Paul Shryock online
page_title: Contact Paul
title: Contact
slug: contact
description: If you need a senior software engineer to bring your Awesome Project™ to life, get in touch with Paul in one of the following ways.
summary: If you need a senior software engineer to bring your Awesome Project™ to life, get in touch with me in one of the following&nbsp;ways.
---

{%- if links %}

<ul>
{%- for item in links %}
{%- if item.cta %}
<li><a href="{{ item.link }}">{{ item.cta }}</a></li>
{%- endif %}
{%- endfor %}
</ul>
{%- endif %}

## Send a message

If you don't have an account on any of the above platforms, you can send a message to my inbox. This is the slowest way to communicate with me, since I don't use email very&nbsp;often.

<form action="{{ site.origin }}/api/contact/" method=POST>
  <div>
    <label for=name>Name</label>
    <input id=name name=name required type=text></input>
  </div>
  <div>
    <label for=email>Email</label>
    <input id=email name=email required type="email"></input>
  </div>
  <div>
    <label for=message>Message</label>
    <textarea id=message name=message required></textarea>
  </div>
  <button>Send message</button>
</form>
