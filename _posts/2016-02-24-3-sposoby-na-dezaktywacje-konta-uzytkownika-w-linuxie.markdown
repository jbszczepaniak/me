---
layout: post
title:  "3 sposoby na dezaktywację konta użytkownika w linuxie"
date:   2016-02-24 21:00:00 +0100
lang: pl
permalink: /pl/3-sposoby-na-dezaktywacje-konta-uzytkownika-w-linuxie
---
<p align="justify">
Konto użytkownika dodaje się za pomocą komendy useradd.
</p>
```bash
jedrzej@jedrzej-VirtualBox:~$ sudo useradd testAccount
```
<p align="justify">Żeby konto nadawało się do użytku należy nadać użytkownikowi hasło:</p>
```bash
jedrzej@jedrzej-VirtualBox:~$ sudo grep testAccount /etc/shadow
testAccount:!:16855:0:99999:7:::
```
<p align="justify">
Przed nadaniem hasła - jak widać wyżej - w pliku <code>/etc/shadow</code> gdzie przechowywane są skróty haseł kont użytkowników, dla konta testAccount zamiast skrótu znajduje się "!".
</p>
<p align="justify">
Po nadaniu hasła za pomocą komendy <code>passwd</code>, można zalogować się na konto, a w pliku /etc/passwd będzie znajdować się skrót hasła.</p>
```bash
jedrzej@jedrzej-VirtualBox:~$ sudo passwd testAccount
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
jedrzej@jedrzej-VirtualBox:~$ su testAccount
Password:
testAccount@jedrzej-VirtualBox:/home/jedrzej$ whoami
testAccount
```
<p align="justify">Da się dezaktywować konto użytkownika bez jego usuwania. Tradycyjnie można to wykonać komendą usermod z opcją -L, po jej wykonaniu nie można zalogować się na konto
</p>
```bash
jedrzej@jedrzej-VirtualBox:~$ sudo usermod -L testAccount
jedrzej@jedrzej-VirtualBox:~$ su testAccount
Password:
su: Authentication failure
```

<p align="justify">
Opcja -U komendy usermod aktywuje konto.
</p>
<p align="justify">
Są inne sposoby dezaktyawcji konta użytkownika bez użycia komendy usermod. Można zmienić datę wygaszenia konta na datę z przeszłości za pomocą komendy chage:
</p>
```bash
jedrzej@jedrzej-VirtualBox:~$ sudo chage -E 2001-01-01 testAccount
jedrzej@jedrzej-VirtualBox:~$ su testAccount
Password:
Your account has expired; please contact your system administrator
su: Authentication failure
```
<p align="justify">
Żeby odwrócić działanie tej dezaktywacji wystarczy zmienić datę wygaszenia konta na datę w przyszłości.
</p>
<p align="justify">
Można również podmienić w pliku <i>/etc/shadow</i> podmienić (wystarczy uruchomiić program vim z prawami super usera) hash hasła na "!", albo na jakikolwiek inny nieprawidłowy hash). Żeby ponownie aktywować konto wystarczy użyć komendy passwd i nadać hasło.
</p>