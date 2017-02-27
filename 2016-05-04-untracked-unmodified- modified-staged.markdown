---
layout: post
title:  "untracked, unmodified, modified, staged"
date:   2016-05-04 21:00:00 +0100
lang: pl
featured-image: /assets/untracked-unmodified-modified-staged/lifecycle.png
permalink: /pl/untracked-unmodified-modified-staged
---
<p align="justify">
Po dodaniu nowego pliku do repozytorium, Git oznacza go jako untracked. Podczas czasu życia pliku, przechodzi on przez różne fazy na skutek różnych operacji. Ten post ma wyjaśnić w jaki sposób plik przmieszcza się między fazami <i>untracked</i>, <i>unmodified</i>, <i>modified</i>, <i>staged</i>. Poniższy rysunek można znaleźć w <a href="https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository">dokumentacji Gita</a> (nie jestem jego autorem). Będze pomocny w zrozumieniu tego co dzieje się w repozytorium i warto wracać do niego przy każdym prezentowanym przykładzie. Wszystkie operacje będą odbywać się lokalnie, bez połączenia ze zdalnym rezpozytorium.
</p>
<p align="justify">
Zaczniemy z pustym repozytorium i utworzymy nowy plik.
</p>
