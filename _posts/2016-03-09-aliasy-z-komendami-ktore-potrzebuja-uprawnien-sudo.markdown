---
layout: post
title:  "Aliasy z komendami, które potrzebują uprawnień sudo"
date:   2016-03-09 21:00:00 +0100
lang: pl
permalink: /pl/aliasy-z-komendami-ktore-potrzebuja-uprawnien-sudo
---

<p align="justify">
Po instalacji Ubuntu na moim komputerze, okazało się, że mogę liczyć na dobre wsparcie dla większości sprzętu. Nie działa za to zmiana jasności podświetlenia monitora za pomocą klawiszy funkcyjnych- istotna dla mnie funkcja. Poniżej prezentuję rozwiązanie tego problemu (chociaż nie aż tak dobre, jak przytrzymanie <code>fn+f5</code> i <code>fn+f6</code>).
</p>
<!--more-->
<p align="justify">
W przypadku mojego systemu i sprzętu wprowadzenie wartości liczbowej do pliku <i>/sys/class/backlight/intel_backlight/brightness</i> z zakresu 1-937 pozwala na regulację jasności ekranu.
</p>
<p align="justify">
Tworzę zatem plik o nazwie <i>.brt</i> w moim katalogu domowym i wpisuję do niego:
</p>

```bash
sudo sh -c "echo $1 > /sys/class/backlight/intel_backlight/brightness"
```

<p align="justify">
Taka komenda oznacza, że przekierowujemy podany parametr <i>($1)</i> do pliku  <i>/sys/class/backlight/intel_backlight/brightness</i>. Nie można wykonać z sudo komendy echo, dlatego użyta została komenda sh z parametrem -c. Oznacza to, że wykonana zostanie komenda podana w ciągu znaków, zamiast komendy ze strumienia STDIN (czyli z terminala).
</p>
<p align="justify">
Po zachowaniu zmian w plku <i>.brt</i>, należy zezwolić na jego wykonywanie. Domyślne uprawnienia dla noweo pliku w Ubuntu to <b>664</b>, czyli <b>rw-rw-r--</b>.  Należy je zmienić na <b>775</b> <b>(rwxrwxr-x)</b>.
</p>

```bash
$chmod 775 .brt
```
<p align="justify">Teraz po użyciu komendy</p>
```bash
$./.brt 465
```
<p align="justify">
Ekran zmienia swoją jasność (wartość 465 jest podstawiana do $1 w skrypcie). Problemem jest jednak to, że jesteśmy proszeni o podanie hasła przy próbie wykonania takiej komendy. Żeby temu zaradzić, należy edytować plik <i>/etc/sudoers</i>. W tym celu można otworzyc go w dowolnym edytorze tekstu z uprawnieniami sudo, albo skorzystać z komendy <code>$visudo</code>, dzięki której można edytować plik <i>/etc/sudoers</i>. Na końcu pliku należy dodać wpis:
</p>
```bash
username ALL=NOPASSWD: /path_to/.brt
```
<p align="justify">
Naturalnie za <b>username</b> i <b>path_to</b> należy podstawić wartości słuszne dla danego systemu. Drugi parametr wpisu określa listę hostów, dla których ten wpis ma działać. Dla pojedynczej maszyny nie ma to znaczenia. Równie dobrze, zamiast ALL można zapisać localhost. Reszta wpisu wygląda zrozumiale bez dokumentacji (dostępnej pod komendą $man sudoers). Po zapisaniu pliku, można wykonać
</p>
```bash
$ sudo ./.brt 465
```
<p align="justify">
i sytem nie zapyta już o hasło. Dla wygody, w ostatnim kroku stworzymy alias, dzięki któremu będzie można używać którszego zapisu. Do pliku <i>.bashrc</i>, należy dopisać wiersz:
</p>
```bash
alias brt="sudo /path_to/.brt"
```
<p align="justify">
Żeby móc skorzystać z nowego aliasa, należy otworzyć nowy terminal (wtedy uruchomiony zostanie skrypt .bashrc) i po prostu użyć  nowej "komendy" <b>brt</b>.
</p>