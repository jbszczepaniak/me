---
layout: page
title: Personal Technial Blog
---
{% include JB/setup %}

<div class="blog-index">
  {% assign post = site.posts.first %}
  {% assign content = post.content %}
  {% include post_detail.html %}
</div>