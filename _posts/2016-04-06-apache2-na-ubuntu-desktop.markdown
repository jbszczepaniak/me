---
layout: post
title:  "Apache2 na Ubuntu Desktop"
date:   2016-04-06 21:00:00 +0100
lang: pl
featured-image: /assets/apache2-na-ubuntu/featured.png
permalink: /pl/apache2-na-ubuntu-desktop/
---

<p align="justify">
Po wejściu na adres <code>127.0.0.1</code> w przeglądarce na Ubuntu wchodzi się na stronę z nagłówkiem jak poniżej.
</p>
![featured-image]({{ site.url }}/assets/apache2-na-ubuntu/featured.png)
<p align="justify">
Oznacza to, że domyślnie Ubuntu ma zainstalowany serwer WWW. Żeby sprawdzić, że taki serwis jest zainstalowany, i że działa, można wywołać podane niżej komendy i prześledzić ich wynik.
</p>
```bash
$ which apache2
$ service apache2 status
```
<p align="justify">
Pliki konfiguracyjne serwera znadują się w <i>/etc/apache2/</i>. Po wejściu na <code>127.0.0.1</code> można przeczytać informacje dotyczące poszczególnych plików (na rysunku powyżej jest wycięty tylko nagłówek). Chciałbym bez wchodzenia w szczegóły pokazać jak można wykorzystać taką aplikację i jak zmienić jej konfigurację. Zacznijmy od wyłączenia strony domyślnej, czyli tej której nagłówek pokazałem na pierwszym rysunku.
</p>
<p align="justify">
W folderze <i>/etc/apache2/</i> między innymi znajdują się foldery <i>sites-enabled/</i> oraz <i>sites-available/</i>. W pierwszym z nich znajdują się konfiguracje stron, które mają być serwowane przez Apache2. W drugim folderze znajdują linki symboliczne do plików konfiguracyjnych z pierwszego folderu. Komenda <code>a2ensite</code> służy do uruchomienia serwowania strony na skutek czego tworzy jest link symboliczny. Komenda <code>a2dissite</code> powoduje wyłączenie serwowania strony, niszczony jest też link symboliczny. Po każdorazowym użyciu komend obu komend, należy przeładować serwer apache2 za pomocą <code>service apache2 reload</code>
</p>
<p align="justify">
Następnie przedstawię procedurę wyłączenia domyślnej strony razem z wynikiem komend <code>ls -l</code>, które powinny pomóc w zrozumieniu jak działa konfiguracja serwera.
</p>
```bash
$ ll /etc/apache2/sites-available/ | grep default
-rw-r--r-- 1 root root 1332 maj 20 2015 000-default.conf
-rw-r--r-- 1 root root 6437 maj 20 2015 default-ssl.conf

$ ll /etc/apache2/sites-enabled/ | grep default
lrwxrwxrwx 1 root root 35 mar 26 11:48 000-default.conf -> ../sites-available/000-default.conf

$ sudo a2dissite 000-default.conf
Site 000-default disabled.
To activate the new configuration, you need to run:
service apache2 reload

$ sudo service apache2 reload

$ ll /etc/apache2/sites-available/ | grep default
-rw-r--r-- 1 root root 1332 maj 20 2015 000-default.conf
-rw-r--r-- 1 root root 6437 maj 20 2015 default-ssl.conf

$ ll /etc/apache2/sites-enabled/ | grep default
```
<p align="justify">
Po wyłączeniu strony domyślnej, jej plik konfiguracyjny nie zniknął. W celu uruchomienia innej strony należy utworzyć Virtual Host. W folderze <i>sites-available</i> tworzymy plik <i>netitup.conf</i> i wklejamy do niego zawartość:
</p>
```apache
<VirtualHost *:80>
  ServerName netitup.localhost
  DocumentRoot /var/www/netitup
  SetEnv APPLICATION_ENV "development"
  <Directory /var/www/netitup>
    DirectoryIndex index.php
    AllowOverride All
    Require all granted
    </Directory>
</VirtualHost>
```
<p align="justify">
Taki plik konfiguracyjny oznacza, że serwer będzie próbował znaleźć w folderze <i>/var/www/netitup/</i> pliku <i>index.php</i>, żeby móc wyświetlić stronę <code>netitup.localhost</code>. Dodatkowo należy wskazać systemowi, że nazwa domenowa netitup odnosi się do systemu lokalnego poprzez wpisanie do pliku <i>/etc/hosts</i> :
</p>
```bash
127.0.0.1   netitup.localhost
```
<p align="justify">
Dodatkowo utworzymy plik <i>index.php</i> w folderze <i>/var/www/netitup</i> o zawartości:
</p>
```php
<?php
    $lines = file("/etc/hostname");
    echo "<h2> The hostname of this machine is <h2>";
    foreach($lines as $line) {
        echo "<h1>"" . $line . "</h1>";
    }
```
<p align="justify">
Po otworzeniu przeglądarki i wpisaniu <code>netitup.localhost</code> otrzymamy  stronę internetową wyświetlającą lokalną nazwę komputera.
</p>
![webpage-look]({{ site.url }}/assets/apache2-na-ubuntu/webpage.png)
<p align="justify">
Możemy dodatkowo założyć, że nie chcemy, żeby strona na rysunku była wprost dostępna za pomocą adresu <code>netitup.localhost</code>, ale żeby istniał jakiś sposób, żeby na nią wejść. W tym celu w pliku <i>/etc/apache2/ports.conf</i>  należy dopisać wiersz:
</p>
```apache
Listen 8080
```
<p align="justify">
Natomiast w pliku  <i>/etc/apache2/sites-available/netitup.conf</i> w pierwszym wierszu należy zamienić liczbę 80 na 8080. Na skutek takiej zmian, serwer (po restarcie) będzie nasłuchiwał na zapytania na porcie 8080. Zatem do strony wyświetlającej hostname urządzenia można dostać się podając jawne adres <code>netitup.localhost:8080</code>.
</p>
<p align="justify">Żeby posprzątać i wrócić do ustawień domyślnych, wystarczy wykonać komendy:
</p>
```bash
$ sudo a2ensite 000-default.conf
$ sudo a2dissite netitup.conf
$ sudo rm -rf /var/www/netitup/
$ sudo rm /etc/apache2/sites-available/netitup.conf
```