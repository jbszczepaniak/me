---
layout: post
title:  "Dostrajanie Sublime Text 3 do pracy z PHP, część 2"
date:   2016-12-14 21:00:00 +0100
lang: pl
permalink: /pl/dostrajanie-sublime-text-3-do-pracy-z-php-czesc-2
---
<p align="justify">
W poprzednim poście omówiłem podstawy używania Sublime Text jako narzędzia do pisania kodu. W tym poście pokażę ciekawe skróty z których korzystam na co dzień i  paczki z którymi  można bardzo wygodnie pracować.
</p>
<p align="justify">
Do momentu odnalezienia optymalnego ustawienia paczek zainstalowałem ich tak dużo, że w pewnym momencie nie potrafiłem już powiedzieć, która z paczek za co odpowiada. Usunąłem wtedy wszystkie ustawienia i na świeżo wybrałem paczki, które spełaniają większość moich oczekiwań.
</p>
<h2>Ctrl + P</h2>
<p align="justify">
Dzięki temu skrótowi, można w bardzo przystępny sposób przeszukiwać i otwierać pliki, znajdujące się w biężącym folderze/projekcie.
</p>
![ctrl-p]({{ site.url }}/assets/dostrajanie-sublime-cz2/sublime-gif1.gif)
<h2>Paleta komend</h2>
<p align="justify">
Paleta komend jest interfejsem do wszystkich zainstalowanych paczek w Sublime, a także do domyślnych komend Sublime. To oznacza, że jeżeli paczka udostępnia jakieś komendy, to można je wywołać za pośrednictwem palety komend. Skrót uruchamiający paletę komend to <i>ctrl+shift + p</i>.
</p>
![command-palette]({{ site.url }}/assets/dostrajanie-sublime-cz2/sublime-gif2.gif)
<h2>SideBarEnhancements</h2>
<p align="justify">
Domyślnie Sublime ma bardzo ograniczone możliwości, jeśli chodzi o akcje na plikach, w bocznym pasku. SideBarEnhacements niweluje ten ubytek. Wszystkie możliwości tego dodatku, można zobaczyć na jego <a href="https://packagecontrol.io/packages/SideBarEnhancements ">stronie</a>. Instalacja odbywa się za pośrednictwem PackageControl. Żeby zwiększyć przejrzystość paska bocznego, warto wprowadzić  do ustawień <b>~/.config/sublime-text-3/Packages/User/Preferences.sublime-settings</b> wiersz:
</p>
```
„bold_folder_labels”: true
```
<h2>Git</h2>
<p align="justify">
Najczęściej korzystam z gita za pomocą interfejsu terminala. Chyba dlatego, że mam poczucie, że jeśli klikam na jakąś ikonę (np. w PhpStorm), to nie jestem pewny, czy stało się dokładnie to czego oczekiwałem podczas gdy w terminalu w celu upewnienia się jak wygląda sytuacja mogę uruchomić komendę git status. W przypadku Sublime Text również korzystam z terminala, ale tylko pomocniczo. Świetne możliwości i poczucie kontroli  daje <a href="https://github.com/kemayo/sublime-text-git">sublime-text-git</a>. Po zainstalowania dodatku, warto do ustawień dotyczących Key Bindings, dodać:
</p>
```jso
[
    { "keys": ["ctrl+alt+a"], "command": "git_raw", "args":
        {
            "command": "git add", "append_current_file": true }
        },
    { "keys": ["ctrl+alt+c"], "command": "git_commit"}
]
```
<p align="justify">
Przy pomocy tych skrótów, po wprowadzeniu zmian do pliku, wystarczy nacisnąć <i>ctrl+alt+a</i>, żeby wykonać na bieżącym pliku <b>git add</b>, następnie, po naciśnięciu <i>ctrl+alt+c</i>, pojawia się nowa karta, w której znajdują się wszystkie zmiany, które mają znaleźć się w commicie. Po wpisaniu treści wiadomości commita i naciśnięciu <i>ctrl+w</i>, (zamknięcie zakładki, w której pojawiła się wiadomość dotycząca commita) otrzymujemy taki efekt, jak przy <b>git commit -m "wiadomość"</b>.
</p>
<p align="justify">
Inną przydatną kommendą jest <b>Git Diff Current File</b>. Nie powiązałem z nią jednak żadnego skrótu klawiszowego i każdorazowo, gdy chcę wykonać <b>git diff</b>, naciskam <i>ctrl+shift+p</i>(paleta komend)  i wpisuję <b>git diff</b>. Wynik różnicy między wprowadzonymi zmianami, a poprzednim commitem otwierany jest w nowej karcie i domyślnie jest sformtowany tak jak wynik działania komendy z terminala <b>git diff</b>.
</p>
<h2>SublimeCodeIntel</h2>
<p align="justify">
Kod źrodłowy tej paczki można znaleźć <a href="https://github.com/SublimeCodeIntel/SublimeCodeIntel">tutaj</a>, a zainstalować można ją za pośrednictwem PackageControl. Kluczowy dodatek, z którego korzystam w celu otrzymywania podpowiedzi w kodzie. Wystarczy zainstalować paczkę i powinna sama zacząć działać. To znaczy, że jeżeli klasa, z której korzystamy znajdzie się na liście użytych klas w danym pliku, to CodeIntel podpowie zarówno metody statyczne z tej klasy jak i metody, które można wykonać na obiekcie tej klasy.
</p>
![sublime-code-intel]({{ site.url }}/assets/dostrajanie-sublime-cz2/sublime-gif3.gif)
<p align="justify">
Dodatkowo dzięki SublimeCodeIntel uzyskujemy podpowiedzi podczas dodawania wyrażeń z <b>use</b>.
</p>
![sublime-code-intel-use]({{ site.url }}/assets/dostrajanie-sublime-cz2/sublime-gif4.gif)
<h2>PHP Code Sniffer</h2>
<p align="justify">
Kod źródłowy tej paczki można znaleźć tutaj. W Package Control można ją znaleźć jako Phpcs. Do prawidłowego działania tego dodatku potrzebne są programy zainstalowane bezpośrednio w systemie operacyjnym:
</p>
* phpcs
* php-cs-fixer
* phpcbf
* phpmd
* scheck
<p align="justify">
Po zainstalowaniu wszystkich tych dodatków, należy wprowadzić ścieżki do ich plików wykonywalnych w <b>~/.config/sublime-text-3/Packages/User/phpcs.sublime-settings</b>.
</p>
<p align="justify">
Przykładowa zawartość tego pliku:
</p>
```
{
    "phpcs_executable_path": "/usr/bin/phpcs",
    "php_cs_fixer_show_quick_panel": true,
    "php_cs_fixer_executable_path": "/usr/local/bin/php-cs-fixer",
    "phpcbf_executable_path": "/usr/bin/phpcbf",
    "phpmd_executable_path": "/usr/bin/phpmd",
    "phpmd_run": true,
    "scheck_run": true,
    "scheck_command_on_save": true,
    "scheck_executable_path": "/opt/pfff/scheck"
}
```
<p align="justify">
Najbardziej przydatną funkcją tej paczki jest informowanie o błędach składniowych w kodzie. Dodatkowo możliwe jest sprawdzanie zgodności kodu z zadanym standardem np. PSR-2, a także dostosowanie białych znaków w ten sposób, żeby zachować zgodność z tym standardem.
</p>
<h2>Podsumowanie</h2>
<p align="justify">
Unikalną zaletą Sublime Text 3 jest <b>szybkość działania</b>. Nie spotkałem się z innym narzędziem, które potrafiłoby tak szybko się uruchamiać, oraz w tak szybkim tempie przeszukiwać projekt. Na początku pierwszej części posta dot. Sublime Text 3 wymieniłem cechy, które uważam za konieczne w oprogramowaniu tego typu. Myślę, że udało mi się pokazać, że większość z nich Sublime Text 3 spełnia z łatwością:
</p>
* rozpoznawanie składni języka
> TAK.
* rozpoznawanie przestrzeni nazw (namespaces)
> TAK/NIE. Dzięki dodatkowi CodeIntel, można podczas dodawania namespace’ów korzystać z podpowiedzi. Nie znalazłem jednak sposobu na to, żeby Sublime informował o tym, że użyłem klasy nie załączając jej wcześniej. Narzędzia takie jak PHPStorm czy Netbeans natychmiast zaznaczyłyby użycie takiej klasy jako niepoprawne.
* rozpoznawanie klas i metod
> TAK
* obsługa wielu kursorów
> TAK, o szczegółach można poczytać tutaj
* integracja z gitem
> TAK

<p align="justify">
Krótko mówiąc Sublime Text 3, nie jest zintegrowanym środowiskiem programowania, więc ciężko oczekiwać od niego niektórych funkcji dostępnych w IDE, jest jednak doskonałym edytorem.
</p>