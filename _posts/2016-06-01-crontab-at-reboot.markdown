---
layout: post
title:  "Crontab @reboot"
date:   2016-06-01 21:00:00 +0100
lang: pl
permalink: /pl/crontab-reboot
---
<p align="justify">W <a href="https://netitup.wordpress.com/2016/03/09/aliasy-z-komendami-ktore-potrzebuja-uprawnien-sudo/">jednym w poprzednich postów</a> pisałem o utworzeniu w Ubuntu nowej komendy, dzięki której mogę zciemniać i rozjaśniać ekran (nie działają klawisze funkcyjne odpowiedzialne za te funkcje). Dodatkowo potrzebowałem komendy, dzięki której będe mógł zmieniać intensywność podświetlenia klawiszy. Podobnie jak w przypadku zmieniania jasności ekranu, należy wpisywać do jednego z plików systemowych wartość liczbową (z pozwoleniem sudo).
</p>

<p align="justify">
Mój system zachowuje się tak, że po ponowym uruchomieniu maszyny rozświetlenie ekranu zostaje na  poziomie sprzed restartu. Natomiast podświetlenie klawiatury jest przywracane każdorazowo do domyślnej, maksymalnej wartości podświetlenia.
</p>

<p align="justify">
Dzięki unixowemu deamonowi cron można każdorazowo po uruchomieniu maszyny automatycznie ustawiać rozświetlenia na odpowiednim poziomie (dzięki wyłączeniu podświetlnia klawiatury (często niepotrzebnego) i ustawieniu jasności na średnim poziomie (do którego można się przyzwyczaić), można na modelu Asus UX 303 L znacząco wydłużyć pracę na baterii).
</p>

<p align="justify">
Żeby skonfigurować cykliczne wykonywanie zadań wystarczy edytować plik /etc/crontab.
Oprócz argumentów liczbowych, których znaczenie wyjaśnione jest w przystępny sposób na wikipedii, można użyć argumentów słownych:
</p>
* @yearly (@annualy),
* @monthly,
* @weekly,
* @daily,
* @hourly,
* @reboot.

<p align="justify">
Cron może wykonywać pojedyncze komendy, albo całe skrypty. Żeby osiągnąć moje cele, na końcu pliku <b>/etc/crontab</b> dodałem dwa wiersze:
</p>

```bash
@reboot    root    /home/j/.brt 200
@reboot    root    /home/j/.lum0
```


<p align="justify">
.brt i .lum0 to skrypty zmieniające parametry, o których wspominałem wcześniej, natomiast root, oznacza, że komendy wykonywane mają być jako użytkownik root.
</p>

<p align="justify">
Dodatkowo warto planować np. tygodniowe sprzątanie:
</p>

```bash
@weekly    root     rm -rf ~/.local/share/Trash/files
@weekly    root     sudo apt-get clean
```