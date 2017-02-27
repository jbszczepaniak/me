---
layout: default
title: Przydatne komendy linuxa
permalink: /pl/przydatne-komendy-linuxa/
lang: pl
---

<!-- Przydatne komendy linuxa
 -->
1. Znajdź plik o danej nazwie w danej ścieżce.
```bash
$ find /home/ -name 'index*'
```
2. Prześlij plik między systemami przez SSH.
```bash
$ scp file.txt remote_system.com:/tmp
```
3. Utwórz archiwum o nazwie arch.tar.gz z folderu arch i skompresuj do formatu gz.
```bash
$ tar zcvf arch.tar.gz arch
```
4. Rozpakuj skompresowane archiwum arch.tar.gz do folderu arch (tar sam potrafi zorientować się jakiego typu kompresji użyto).
```bash
$ tar xvf arch.tar.gz
```
5. Graficznie pokaż hierarchię folderów.
```bash
$ tree
```
6. Utwórz hierarchię folderów.
```bash
$ mkdir -p grandparent/{parent1,parent2/{child1,child2}}
$ tree grandparent
grandparent
├── parent1
└── parent2
      ├── child1
      └── child2
```

7. Zawartość plku <b>/etc/services</b> zawiera informacje dotyczące przyporządkowania portów do usług.

8. Wyszukaj tekst wewnątrz plików w folderze.
```bash
$ grep -rnw 'path/to/somewhere' -e "string to be searched"
```
9. Zmień wyświetlania ścieżki w terminalu tak, żeby ograniczyć się do 'najbardziej zagnieżdżonych' X folderów (np dla X=2).
```bash
$ PROMPT_DIRTRIM=2
```
czyli np zamiast:
```
user@machine:~/home/user/grandparent/parent $
```
będzie:
```
user@machine:~/.../grandparent/parent $
```
10. Wyświetl zawartość pliku tekstowego, w ten sposób, że jeżeli plik się zmieni to, zmiany zostaną dopisane (przydatne do wyświetlania logów).
```bash
$ tail -f /var/log/apache2/error.log
```
11. Wyświetl tylko unikalnw wiersze pliku.
```bash
$ uniq file.txt
```
12. Wyświetl manualnie zainstalowane paczki.
```bash
$ apt-mark showmanual
```
13. Wyświetl załadowany pliku php.ini.
```bash
$ php -i | grep php.ini
```
14. Utwórz foldery razem z folderami rodzicami.(jeżeli folder rodzic  nie istnieje, nie występi błąd)
```bash
$ mkdir -p grandparent/parent/child
```
15. Dodaj do automatycznego śledzenia zdalnej gałęzi przez lokalną gałąź, na której akurat jesteś. W tym przypadku akutalna gałąaź lokalna będzie śledzić gałąź zdalną *my_branch*
```bash
$ git branch -u origin/my_branch
```
16. Zmień nazwy plików w folderze. W podanym niżej przykładzie spację zamienione zostają na podkreślniki. Modyfikator -n powoduje, że wyświetlone zostają nazwy, które zostałyby nadane - bardzo przydatne narzędzie testowe. Po usunięciu flagi -n, nazwy plików w bieżącym folderze zostają zamienione.
```bash
$ rename -n "s/ /_/g" *
```
Rozwiązanie tego samego problemu z użyciem siły:
```bash
for file in *; do mv "$file"  `echo $file | tr ' ' '_'`; done
```