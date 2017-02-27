---
layout: post
title:  "Docker labs - wstęp"
date:   2017-01-28 20:00:00 +0100
lang: pl
permalink: /pl/docker-labs-wstep
featured-image: /assets/docker-introduction/docker_logo.png
---


<p align="justify">
Im dłużej bawię się Dockerem, tym bardziej przekonuję się, że jest to narzędzie, które każdy programista będzie chciał poznać dlatego, że można dzięki niemu zaoszczędzić mnóstwo czasu na zarządzaniu środowiskiem deweloperskim i produkcyjnym. Na pierwszy rzut oka Docker wygląda na oprogramowanie, które działa w taki sam sposób jak maszyny wirtualne. W kolejnych postach pokażę jaką przewagę Docker ma nad klasycznymi maszynami wirtualnymi i dlaczego warto się go nauczyć.
</p>

<p align="justify">Dwie sytuacje, które przychodzą mi do głowy gdzie Docker może się okazać przydatny:</p>

1. Firma X tworzy i zarządza pięcioma różnymi aplikacjami. Wszystkie z tych aplikacji używają różnych zestawów bibliotek. Kiedy nowy programista zostaje zatrudniony i ma za zadanie mniej więcej zapoznać się z projekami, możliwe są dwa przykładowe scenariusze:

    1.1. Programiści w firmie wiedzą w jaki sposób uruchomić środowiska deweloperskie dla każdej aplikacji. Wiedzą też co włączyć i co wyłączyć, żeby sprawnie przełączyć się między projektami. Nowy programista musi nauczyć się jak uruchamiać każdy projekt, bo każdy z nich korzysta ze swojej bazy danych i potrzebuje innych zależności. Musi też zorientować się, które paczki z różnych aplikacji wchodzą ze sobą w konflikty. Musi minąć wiele godzin zanim nowy programista będzie umiał tak sprawnie jak jego starsi koledzy przełączać się między projektami.

    1.2.Firma używa Dockera do zarządzania środowiskami. Nowy programista bo pobraniu kodu źródłowego z systemu kontroli wersji odnajduje w nim plik o nazwie `Dockerfile`. Następnie buduje kontener na bazie definicji z Dockerfile, uruchamia go i w mgnieniu oka
    ma lokalną wersję aplikacji.

2. Chcesz testować swoją aplikację, ale testy end-to-end wymagają nowych wpisów w bazie danych. Za każdym razem po uruchomieniu aplikacji chcesz mieć świeże środowisko, żeby być przekonanym, że testy są każdorazowo uruchamiane w taki sam sposób. Dzięki Dockerowi, możesz zapakować aplikację do kontenera i uruchamiać testy w identycznych warunkach. Przy uruchamianiu testów utworzysz nowy kontener, sprawdzisz wynik testów i wyrzucisz kontener.

<p align="justify">
W kolejnych postach pokażę w jaki sposób świadomie korzystać z Dockera. Każdy post będzie w formie laboratorium, może więc będzie czytając post samemu uruchamiać komendy i sprawdzać ich wynik.
</p>

