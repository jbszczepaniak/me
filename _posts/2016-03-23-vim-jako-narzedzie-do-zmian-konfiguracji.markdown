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

<p align="justify">Wszystkie podane powyżej polecenia vima, można poprzedzić cyframi, które spowodują, że dana akcja wykona się wielokrotnie. Czyli np <code>8l</code>, przesunie kursor o 8 znaków w prawo. Poniżej znajdują się inne przydatne polecenia.</p>

* `u` – cofnij zmianę,
* `dd` – usuń aktualny wiersz,
* `d3d` – usuń aktualny i 2 kolejne wiersze,
* `dl` – usuń aktualną literę,
* `d3l` – usuń aktualną i 2 kolejne litery,
* `dw` – usuń akutalne słowo,
* `d3w` – usuń aktualne i 3 kolejne słowa,

* `v` – po naciśnięciu teo klawisza można zaznaczyć tekst, który chce się skopiować albo wyciąć. (Wszystkie  komendy służące do przesuwania kursora działają również tutaj),
* `d` – po zaznaczeniu tekstu za pomocą v, d wycina tekst,
* `y` – po zaznaczeniu tekstu za pomocą v, y wycina tekst,
* `p` – wkleja skopiowany/wycięty tekst za kursorem,
* `P` – wkleja skopiowany/wycięty tekst przed kursorem,

* `/wyrażenieRegularne` – wyszukuje podane wyrażenie regularne. Można wpisać po prostu szukany ciąg wyrazów. Po naciśnięciu klaiwsza enter można nawigować po wyszukiwaniach za pomocą n – kolejny wynik  N – poprzedni wynik,

* `:s/wyrażenieRegularne/ciąg/` – zamienia pierwsze napotkane podane wyrażenie regularne na podany ciąg. Znak / może być zastąpiony innym. Taki zapis: :s:wyrażenieRegularne:ciąg: jest równoznaczny. Jeżeli dodamy na końcu takiej komendy flagę g, zamiana odbędzie się dla wszystkich dopasowań wyrażenia regularnego w linii, Natomiast jeżeli na począttku komendy postawimy znak %, zamiana odbędzie się dla całego pliku,

<p align="justify">
Zatem jeżeli jest plik, w którym wielokrotnie na początku lini występuje znak #(komentarze), który życzymy sobie usunąć, należy zastosować komendę <code>:%s/^#//g</code>, ^ jest częścią wyrażenia regularnego i oznacza, że szukamy tylko # umiesczonych na początku linii. W efekcie, takie # zostają zamienione na nic, czyli są usuwane.
</p>
<p align="justify">
Ciężko rozróżnić czym jest komenda w vim, dlatego pojedyncze skróty klawiaturowe również opisywałem jako komendy. Komendy rozpoczynające się na : bądź / są widoczne podczas wpisywania na dole ekranu i są zapisywane w historii. Zatem po naciśnięciu : można strzałkami odwoływać się do wcześniej wywoływanych komend rozpoczynających się na :, syturacja jest analogiczna dla komend zaczynających się na /.
</p>

* `:set number` wkleja na początek linii ich numerację.
*
* `:q!` – wychodzi z vim bez zapisywania zmian.
* `:w` – zapisuje zmiany w pliku. Jeżeli plik nie ma jeszcze nazwy, jako argument trzeba podać nazwę pliku.
* `:wq` – zapisuje zmiany i zamyka plik.
* `:x` – praktycznie robi to samo co :wq, jednak w dokumentacji można przeczytać "Like „:wq”, but write only when changes have been made".

<p align="justify">
Zdaje sobie sprawę z tego, że takich artykułów jak ten wyżej są w sieci dziesiątki albo setki, ale to jest moja lista najpotrzebniejszych komend. Myślę również, że za każdym razem kiedy w celu osiągnięcia jakiegoś efektu naciska się podejrzanie dużo klawiszy, warto sprawdzić w dokumentacji, czy nie da się tego zrobić sprawniej.</p>