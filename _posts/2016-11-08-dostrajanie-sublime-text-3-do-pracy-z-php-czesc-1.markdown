---
layout: post
title:  "Dostrajanie Sublime Text 3 do pracy z PHP, część 1"
date:   2016-11-08 21:00:00 +0100
lang: pl
permalink: /pl/dostrajanie-sublime-text-3-do-pracy-z-php-czesc-1
---
<p align="justify">
Zacząłem używać Sublime Text do pracy nad projektami w PHP po okresie używania PHPStorm, dlatego miałem bardzo duże oczekiwania wobec narzędzia do pisania kodu. W tym poście pokażę, jak używać Sublime'a, żeby skorzystać z jego najlepszych cech. Nie chcę udowadniać, że Sublime przerasta możliwościami PHPStorm, dlatego, że brakuje mi paru funkcji. Z pewnośćią jednak, Sublime pokonuje PHPStorm szybkością działania. Dodatkowym atutem Sublime'a jest jego wszechstronność. Mogę mieć jeden edytor, w którym mogę pisać nie tylko w PHP, ale również w Pythonie.
</p>
<p align="justify">
Funkcje, które uważam, za koniecznie:
</p>
* rozpoznawanie przestrzeni nazw (namespaces)
* rozpoznawanie składni języka
* rozpoznawanie klas i metod.
* obsługa wielu kursorów
* integracja z gitem

<p align="justify">
Pracuję na Ubuntu 16.04, dlatego wszystkie pokazane tutaj przykłady będą odnosić się do tego systemu.
</p>
<h2>Instalacja</h2>
```bash
$ sudo apt-get install sublime
```
<p align="justify">
powinno zainstalować sublime text w 3. wersji. Po takiej instalacji, dowolny plik tekstowy można otworzyć za pośrednictwem podania ścieżki do pliku jako argumentu dla:
</p>
```bash
$ subl
```
<h2>Uruchamianie</h2>
<p align="justify">
Żeby jednak móc uruchamiać Sublime z poziomu paska bocznego Ubuntu, potrzebne jest trochę więcej pracy. Należy odnaleźć plik konfiguracyjny, który znajduje się pod ścieżką: <b>/usr/share/applications/sublime_text.desktop</b>. W tym pliku należy umieścić zapis o tym, czym ma być ikona Sublime:
</p>
```
Icon=/opt/sublime_text/Icon/256x256/sublime-text.png
```
<p align="justify">
256x256 to tylko przykład, dlatego, że w folderze <b>/opt/sublime_text/Icon/</b> znajduje się najprawdopodniej więcej folderów z obrazkami o innych rozdzielczościach.
</p>
<p align="justify">
Ostatnim krokiem jest uruchomienie programu z poziomu Launcher'a Ubuntu i przypięcie programu do paska bocznego.
</p>
<p align="justify">
Jeżeli nie wykona się opisanej tutaj procedury i przejdzie się natychmiast do ostatniego kroku, to po zamknięciu programu, logo Sublime zamieni się na znak zapytania. Po próbie wywołania programu za pomocą ikony nie otworzy się Sublime Text.
</p>

<h2>Ustawenia</h2>
<h3>Preferences</h3>
<p align="justify">
Sublime jest programem, którego konfiguracja opiera się na wielu plikach tekstowych. Główny plik z ustawieniami znajduje się pod ścieżką <b>~/.config/sublime-text-3/Packages/User/Preferences.sublime-settings</b>. Można otworzyć ten plik wybierając na pasku narzędzi <b>Preferences > Settings</b>. Pliki konfiguracyjne wykorzystują składnię json, mimo tego nie mają rozszerzenia .json. Najczęściej nazwy plików konfiguracyjnych kończą się na .sublime-*.
</p>
![sublime-preferences]({{ site.url }}/assets/dostrajanie-sublime-cz1/sublime-png1.png)
