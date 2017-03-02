---
layout: post
title:  "vi(m) jako narzędzie do zmian konfiguracji"
date:   2016-03-23 21:00:00 +0100
lang: pl
permalink: /pl/vim-jako-narzedzie-do-zmian-konfiguracji
---
<p align="justify">
Chciałbym w tym poście zaprezentować zbiór najpotrzebniejszych ułatwień, które oferuje edytor tekstu vi. Nie chcę się skupiać na różnicach między vi a vim (vi improved). Wszystkie funkcje tutaj prezentowane będą działały w obu edytorach. Wyjątkiem jest sterowanie kursorem. W vim można swobodnie używać strzałek, podczas gdy w vi należy w tym celu używać klawiszy h,j,k,l. Uważam, jednak że warto przyzwczyczaić się do używania liter, dlatego, że na systemie, na którym chce się skorzystać z vim,  a zainstalowany jest tylko vi, sporo nerwów kosztuje przestawienie się na h,j,k,l. Warto też zaznaczayć, że przynajmniej na Ubuntu po zainstalowaniu vim, vi jest podlinkowane do vim:
</p>
```bash
$which vi
/usr/bin/vi

$ll /usr/bin/vi
lrwxrwxrwx 1 root root 20 lut 27 23:44 /usr/bin/vi -> /etc/alternatives/vi*

$ll /etc/alternatives/vi
lrwxrwxrwx 1 root root 18 mar 19 09:06 /etc/alternatives/vi -> /usr/bin/vim.basic*
```
<p align="justify">
Po otworzeniu programu vi użytkownik znajduje się w trybie <i>Normal</i>, żeby rozpocząć pisanie, należy uruchomić tryb <i>Insert</i>. Wejść do trybu insert można na dwa sposoby. Klawisz <code>a</code> spowoduje, że kursor zostanie umieszczony za miejscem, na które ostatnio wskazywał, natomiast klawisz <code>i</code> spowoduje, że można wpisywać w miejscu na które wskazuje kursor. W trybie Insert, u dołu terminala widoczny jest napis „– INSERT –„ . Żeby wrócić do trybu Normal, należy nacisnąć klawisz <code>esc</code>.

</p>
Poniżej przedstawiam najbardziej przydatne w mojej oceny komendy:

* `h` – przesuń kursor w lewo,
* `j` – przesuń kursor w dół,
* `k` – przesuń kursor w górę,
* `l` – przesuń kursor w prawo,
* `w` – przesuń kursor na początek kolejnego słowa. Wieloktorne naciśnięcie przesuwa kursor na początek każdego kolejnego słowa,
* `b` – przesuń kursor na początek słowa. Wielokrotne naciśnięcie przesuwa kursor na początek każdego poprzedniego słowa,
* `e` – przesuń kursor na koniec słowa. Wielokrotne naciśnięcie przesuwa kursor na koniec każdego kolejnego słowa,
* `0` – przesuń kursor na początek aktualnej linii,
* `$` – przesuń kursor na koniec aktualnej linii.

<p align="justify"></p>
<p align="justify"></p>
<p align="justify"></p>
<p align="justify"></p>
<p align="justify"></p>
<p align="justify"></p>
<p align="justify"></p>
<p align="justify"></p>
