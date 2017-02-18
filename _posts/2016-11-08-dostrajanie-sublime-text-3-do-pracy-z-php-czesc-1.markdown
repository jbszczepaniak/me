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
<p align="justify">
Po uruchomieniu pliku, otwierają się dwie zakładki. W lewej zakładce znajdują się domyślne ustawienia, które można nadpisywać wpisując wartości  po prawej stronie w pliku konfiguracyjnym. Ustawienia zaczynają działać natychmiast po zapisaniu zmian wpliku. Jeżeli naruszona zostanie składnia, Sublime nie zgodzi się na jego zapisanie.
</p>

<h3>Key Bindings</h3>
<p align="justify">
W Sublime można dowolnie przypisywać komendy (te dostępne w Sublime) do skrótów klawiszowych. Ustawienia dotyczące skrótów klawiszowych można znaleźć w <b>~/.config/sublime-text-3/Packages/User/Default\ \(Linux\).sublime-keymap</b>, albo wybierając z paska narzędzi <b>Preferences > Key Bindings</b> (ukośniki w ścieżce powodują, że można je wkleić bezpośrednio do terminala).  W moim pliku ze skrótami na pierwszym miejscu znajdują się:
</p>
```
{ "keys": ["ctrl+tab"], "command": "next_view" }
{ "keys": ["ctrl+shift+tab"], "command": "prev_view" }
```
<p align="justify">
Powodują one, że między zakładkami można się przełączać w ten sam sposób jak w przeglądarce. Domyślne ustawienia działają w taki sposób, że można poruszać się między ostatnio edytowanymi plikami.
</p>
<h3>Mouse Map</h3>
<p align="justify">
Dodatkowy plik z ustawieniami, o którego istnieniu dowiedziałem się całkiem niedawno. W przeciwieństwie do poprzednich nie można się do niego dostać z poziomu Sublime, domyślnie w ogóle nie istnieje. Można go jednak dodać i skorzystać z oferowanych przez niego funkcji. Należy utworzyć plik <b>Default\ \(Linux\).sublime-mousemap</b> w folderze <b>~/.config/sublime-text-3/Packages/User/</b> . W moim pliku mousemap znajduje się tylko wpis powodujący, że po umieszczeniu kursora na użycie klasy albo metody i naciśnięciu ctrl i lewego przycisku myszy, Sublime przejdzie do definicji, a jeżeli znajdzie wiele możliwych definicji wyświetli je wszystkie w liście. Definicja skrótu wygląda następująco:
</p>
```
{
    "button": "button1",
    "count": 1,
    "modifiers": ["ctrl"],
    "press_command": "drag_select",
    "command": "goto_definition"
}
```
<p align="justify">
Działanie skrótu pokazałem poniżej:
</p>
![sublime-mouse-map]({{ site.url }}/assets/dostrajanie-sublime-cz1/sublime-gif1.gif)
<p align="justify">
To samo zachowanie można uzyskać używając klawisza F12, dlatego, że również związany jest z komendą "goto_definition". Takie rozwiązanie jest nawet krótsze, ale z przyzwyczajenia lubię mieć możliwość użycia <i>ctrl  + prawy przycisk myszy</i>. Można wspomnieć o jeszcze innym sposobie na zajrzenie do definicji metody/klasy. Po wskazaniu kursorem na użycie metody/klasy wyświetalane jest okienko z proponowanymi definicjami.
</p>
![sublime-mouse-map]({{ site.url }}/assets/dostrajanie-sublime-cz1/sublime-gif2.gif)
<p align="justify">
Jak widać, jeżeli satysfakcjonujące jest tylko sprawdzenie w jakim pliku jest definicja, to takie rozwiązanie jest wystarczające. Jeżeli jednak chce się ten plik otworzyć, wygodniej jest skorzystać z podanego wcześniej rozwiązania dlatego, że szybciej można przeglądać pliki z proponowanymi definicjami.
</p>
<h2>Package Control</h2>
<p align="justify">
Warto wykorzystywać dodatki napisane do Sublime Text, żeby ułatwić sobie pracę. Na <a href="packagecontrol.io">packagecontrol.io</a> można przeglądać dostępne paczki. Można również samemu proponować dodatki dla społeczności korzystającej z Sublime. Na podstronie <i>/installation</i> udostępniona jest instrukcja instalacji <b>Package Control</b>, który umożliwia przeglądanie i instalowanie dodatków wewnątrz programu. W celu użycia Package Control, należy użyć skrótu <i>ctrl+shift+p</i>, który powoduje uruchomienie palety komend, z której zarządza się paczkami.  Załóżmy, że szukamy paczek dotyczących języka python, poniższy gif prezentuje w jak prosty sposób można zainstalować przykładową paczkę.
</p>
![sublime-package-control]({{ site.url }}/assets/dostrajanie-sublime-cz1/sublime-gif3.gif)
<p align="justify">
Po zakończonej instalacji wyświetlony został komunikat z informacją o tym jak korzystać z paczki. Każda paczka jest inna, tzn. trzeba poświęcić chwilę i sprawdzić w jaki sposób z niej korzystać i czy w ogóle warto było ją instalować. Dodatek, może w różny sposób ubogacać działanie Sublime. Często, oferowane ustawienia można edytować podobnie jak inne ustawienia Sublime w plikach o składni JSON. Ustawienia zainstalowanych paczek można odnaleźć otwierając na pasku narzędzi <i>Preferences > Package Settings</i>.
</p>
![sublime-package-control-setting]({{ site.url }}/assets/dostrajanie-sublime-cz1/sublime-png2.png)
<p align="justify">
Do tej pory omówione zostały:
</p>
* instalacja i uruchamianie Sublime Text 3
* ustawienia
* Package Control
<p align="justify">
W kolejnym poście pokażę konkretne dodatki i ustawienia, którego wchodzą w skład mojego środowiska Sublime Text 3.
</p>