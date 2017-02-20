---
layout: post
title:  "Nowy projekt, Bitbucket + Git"
date:   2016-05-18 21:00:00 +0100
lang: pl
featured-image: /assets/nowy-projekt-bitbucket-git/bitbucket_rgb_slate.svg
permalink: /pl/nowy-projekt-bitbucket-git
---

<p align="justify">
W tym poście zaprezentuję scenariusz pracy nad projektem z użyciem Gita i Bitbucketa.
</p>

1. Utworzenie nowego repozytorium na koncie Bitbucket
2. Sklonowanie repozytorium
3. Wprowadzenie zmian do repozytorium
4. Sprawdzenie stanu zdalnego repozytorium
5. Współpraca z innymi programistami
6. Utworzenie forka
7. Klonowanie forka i wprowadzanie zmian do niego
8. Korzystanie z pull request
9. Synchronizacja

<h2>1. Utworzenie nowego repozytorium na koncie Bitbucket</h2>
<p align="justify">
Po zalogowaniu się na swoje konto, należy odnaleźć zakładkę <i>Repositories</i> i otworzyć <i>Create Repository</i>, można też z dowolnego miejsca po zalogowaniu nacisnąć klawisze <i>'c'</i> i <i>'r'</i>.
</p>
![create-new-repo]({{ site.url }}/assets/nowy-projekt-bitbucket-git/image1.png)
<p align="justify">
Tutaj należy wpisać nazwę nowego repozytorium. Pozostałe opcje mogą pozostać domyślne. Po utworzeniu repozytorium na koncie, Bitbucket sam podpowiada co należy zrobić w kolejnym kroku, to znaczy:
</p>
1. stworzyć folder dla repozytorum lokalnego,
2. otworzyć ten folder,
3. wykonać `git init`,
4. wykonać `git remote add`.

<h2>2. Sklonowanie repozytorium</h2>
<p align="justify">
My postąpimy inaczej, sklonujemy repozytorium. Na panelu po lewej stronie należy kliknąć na <i>Clone</i> i wybrać protokół, który ma być wykorzystany do klonowania repozytorium. Zaletą użycia HTTPS jest prostota. Nie trzeba przeprowadzać żadnej konfiguracji na maszynie, na której chce się klonować repozytorium. Wadą jest konieczność wpisywania hasła do swojego konta w BitBucket, każdorazowo podczas wykonywania operacji podczas których następuje połączenie ze zdalnym repozytorium ($git pull, $git push, $git fetch).  Po wybraniu protokołu SSH, nie trzeba będzie każdorazowo wpisywać hasła, ale wymagana jest wcześniejsza konfiguracja (świetnie opisana <a href="https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html">tutaj</a>). Po dokonaniu wyboru (przy wprowadzaniu częstych zmian HTTPS jest w mojej ocenie niewygodne), należy skopiować link do repozytorium i wkleić go w terminalu.
</p>
<h2>3. Wprowadzenie zmian do repozytorium</h2>
![changes-in-repo]({{ site.url }}/assets/nowy-projekt-bitbucket-git/image2.png)

<p align="justify">
Po wykonaniu komend  jw. w zdalnym repozytorium zostanie umieszczony pierwszy plik. <b>$git push</b> wysyła zmiany lokalne do repozytorium, które sklonowaliśmy. Po sklonowaniu repozytorium, Git lokalnie dodaje zdalną gałąź <i>origin</i>, która przyporządkowana jest do repozytorium, z którego klonowaliśmy. Natomiast lokalnie tworzona jest gałąź <i>master</i>, w której domyślnie będą rejestrowane wprowadzane zmiany. Dlatego, że odbyło się klonowanie – gałąź <i>origin</i> automatycznie śledzi gałąź <i>master</i> i po wykonaniu komendy <b>$git push</b>, zmiany z gałęzi <i>master</i> wysyłane są do zdalnej gałęzi <i>origin</i>, czyli do zdalnego repozytorium, które było klonowane.
</p>
<h2>4. Sprawdzenie stanu zdalnego repozytorium</h2>
![bitbucket-panel]({{ site.url }}/assets/nowy-projekt-bitbucket-git/image3.png)
<p align="justify">
Po lewej stronie panelu na Bitbucket, dostępne są wszystkie najbardziej potrzebne funkcje. Pod <i>Overview</i>, kryje się podsumowanie dotyczące repozytorium, pod <i>Source</i> można prześledzić aktualny kod umieszczony w repozytorium, a w <i>Commits</i>, można prześledzić commity wprowadzone do repozytorium. Każdy commit oznaczony jest sumą kontrolną. Commity znajdujące się w lokalnym repozytorium oznaczone są tą samą sumą kontrolną co commity w zdalnym repozytorium.
</p>
<h2>5. Współpraca z innymi programistami</h2>
<p align="justify">
Do tej pory stworzyliśmy repozytorium na Bitbucket, do którego możemy wprowadzać sami zmiany. Załóżmy jednak, że to jest repozytorium, w którym znajdować się będzie tylko kod produkcyjny, który zawsze jest stabilny. Jeżeli nad tym kodem ma pracować wielu programistów, można przyjąć strategię, w której użytkownicy będą pracować na swoich kopiach repozytorium, a wprowadzanie zmian do głównego repozytorium będzie kontrolowane przez wszystkich współpracujących programistów. Żeby to osiągnąć, można użyć akcji (widocznych na rysunku panelu bocznego Bitbucketa): <i>Fork</i> i <i>Create pull request</i>. Fork to nic innego jak kopia repozytorium. To znaczy, że możemy stworzyć fork jakiegoś repozytorium i pracować na nim. Jeżeli będziemy chcieli wprowadzić zmiany do głównego repozytorium, skorzystamy z pull request. To znaczy wyślemy zapytanie do głównego repozytorium o wprowadzenie naszych zmian do głównego repozytorium, zmiany te mogą być przeanalizowane przez innych użytkowników i faktycznie wprowadzone do repozytorium, albo odrzucone.
</p>
<h2>6. Utworzenie forka</h2>
<p align="justify">
Po naciśnięciu <i>Fork</i> w panelu bocznym, pojawia się okno, w którym należy wpisać proponowaną nazwę repozytorum (przyjmijmy, że tworzenie nowego forka to <i>forkowanie</i>, a samo repozytorium powstałe na skutek akcji <i>„Fork”</i>, to <i>fork</i>. Ciężko jest opisywać działania w Gicie przy użyciu w miarę poprawnego jęyzka polskiego. Pozwalam sobie więc na różne odmiany Git, Gita, Gicie, commity, commitowanie, itp…). Nasz fork nazywać się będzie <i>net-it-up-fork-jb</i>. Po naciśnięciu fork repository, tworzone jest repozytorium, które możemy traktować jako własne.
</p>
<h2>7. Klonowanie forka i wprowadzanie zmian do niego</h2>
<p align="justify">
Pracowanie na forku niczym nie różni się od pracy na każdym innym repozytorium. Dlatego punkty 2 i 3 tego posta obowiązują również tutaj.
</p>
<h2>8. Korzystanie z pull request</h2>
<p align="justify">
Załóżmy, że w wprowadziliśmy jakieś zmiany w forku i wykonaliśmy <b>$git push</b>. Mamy teraz oryginalne repozytorum <i>net-it-up</i>, oraz drugie repozytorium <i>net-it-up-fork-jb</i>. Żeby wprowadzić zmiany z forka do oryginalnego repozytorium, należy w panelu po lewej stronie w repozytorium <i>net-it-up-fork-jb</i> na Bitbucket wybrać Create pull request. Na nowo otworzonym panelu widać, z jakiego repozytorium do jakiego mają zostać wprowadzone zmiany, oraz jakie commity wchodzą w skład pull requesta. Po naciśnięciu Create pull request, możemy wprowadzić zmiany do głównego repozytorium albo je odrzucić. Po akceptacji zostanie wykonane natychmiastowe przekierowanie do głównego repozytorium dlatego, że jesteśmy właścicielami obu repozytoriów. Po naciśnięciu na <i>merge</i>, w repozytorum głównym (do którego nastąpiło przeniesienie), zmiany zostaną do niego wprowadzone. Opisany wyżej scenariusz pokazuje jedynie działanie wprowadzania zmian do głównego repozytorium z forka. Można natomiast pracować w ten sposób, że każdy programista pracujący nad projektem tworzy swojego forka, w nim pracuje i za pomocą pull requestów wprowadza zmiany do główego repozytorium.
</p>
<h2>9. Synchronizacja</h2>
<p align="justify">
Po zaakceptowaniu zmian w repozytorium <i>net-it-up</i> i przejściu z powrotem do <i>net-it-up-fork-jb</i>, na panelu po prawej stronie widać „This fork is 1 commit behind ******/net-it-up. Sync now.” To znacza, że musimy dokonać synchronizacji naszego forka z głównym repozytorium, żeby móć na nim dalej pracować. W tym przypadku, należy dokonać synchronizacji dlatego, że na repozytorum net-it-up została przeprowadzona operacja merge (z forkiem </i>net-it-up-fork-jb</p>). Konieczność synchronizacji wystąpi też gdy inny programista wprowadzi zmiany do głównego repozytorium. Należy pamiętać, żeby synchronizować swój fork z głównym repozytorium zawsze przed wprowadzaniem do niego zmian ze swojego forka.
</p>
<p align="justify">
Po synchronizacji forka z głównym repozytorium, należy jeszcze lokalnie pobrać zmiany które zostały zsynchronizowane zdalnie na koncie Bitbucket za pomocą <b>$git pull</b>, bądź <b>$git merge</b> poprzedzone <b>$git fetch</b>. Jest to warunek konieczny, żeby móc wysłać swoje zmiany do swojego forka.
</p>
![git push failes]({{ site.url }}/assets/nowy-projekt-bitbucket-git/image4.png)

<p align="justify">
Po wykonaniu <b>$git status</b>, Git doradził, żeby opublikować swoje zmiany za pomocą <b>$git push</b>, po wykonaniu tej komendy okazało się jednak, że nie jest to możliwe dlatego, że zdalne repozytorium ma zmiany, których nie zarejestrowano lokalnie. Po wykonaniu <b>$git pull</b>, można  wykonać $git push po to, żeby zaktualizować swój fork o nowe zmiany.
</p>
<p align="justify">
Należy pamiętać o synchronizacji dlatego, że z jednej strony Git bez synchronizacji może nie pozwolić na wprowadzenie zmiany do repozytorium, z drugiej dlatego, że może to prowadzić do konfliktów, które utrudniają operacje merge między repozytoriami.
</p>
<h2>Podsumowanie</h2>
Praca na głównym repozytorium, w którym znajduje się kod produkcyjny, z forkami dla każdego programisty  to tylko jedna z możliwości pracy z Gitem. Warto przeczytać <a href="https://www.atlassian.com/git/tutorials/comparing-workflows">ten artykuł</a>, żeby dowiedzieć się więcej na temat sposobów pracy z Gitem.