---
layout: post
title: "yo bitches"
description: ""
category:
tags: []
---
{% include JB/setup %}
<h1>Processing</h1>

{% highlight ruby %}
def foo
  puts 'foo'
end
{% endhighlight %}

{% highlight python %}
class Node:
    def __init__(self, key):
        self.data = key
        self.left = None
        self.right = None

def top_view(root, hash_map={}, horizontal_distance=0, vertical_distance=0):
    '''
    Task is inspired by https://www.hackerrank.com/challenges/tree-top-view/
    However solution provided here is more versatile, because it's general,
    it is mentioned in this editorial https://www.hackerrank.com/challenges/tree-top-view/editorial
    '''
    if not root:
        return

    if horizontal_distance not in hash_map.keys() or hash_map[horizontal_distance][1] > vertical_distance:
        hash_map[horizontal_distance] = (root.data, vertical_distance)


    if root.left:
        top_view(root.left, hash_map, horizontal_distance-1, vertical_distance+1)
    if root.right:
        top_view(root.right, hash_map, horizontal_distance+1, vertical_distance+1)
    return hash_map
{% endhighlight %}