---
layout: post
title:  "7 pytań o Git'a"
date:   2016-04-20 21:00:00 +0100
lang: pl
permalink: /pl/7-pytan-o-gita
---
<p align="justify">
Podczas pierwszego kontaktu, Git może być kłopotliwy w zrozumieniu. Ponadto, można zacząć używać Git, korzystając z narzędzi wbudowanych w IDE (ang. Integrated Development Environment) niewiele wiedząc o tym systemie kontroli wersji. W tym poście, chciałbym odpowiedzieć na pytania, które postawiłem sobie na początku nauki gita.
</p>

<h2>1. Czy GitHub to Git? Co to jest Bitbucket ?</h2>
<p align="justify">
Git jest rozproszonym systemem kontroli wersji, w którym rozwijany kod źródłowy znajduje się w repozytoriach. GitHub, czy Bitbucket to serwisy internetowe, dzięki którym ich użytkownicy mogą współdzielić między sobą repozytoria. Są też inne serwisy spełniające podobną rolę, np. GitLab. Można główne repozytorium przechowywać na dowolnym serwerze, albo nawet na koncie Dropbox.
</p>

<h2>2. Czy system operacyjny ma  przy Git znaczenie?</h2>
<p align="justify">
Wygodniej jest używać Git w środowisku linuxowym. Instalacja odbywa się wtedy np. za pomocą  <b>apt-get</b>, a samo narzędzie staje się integralną częścią systemu. Po instalacji na Windows, Git trzeba uruchamiać jako osobny program, w którym symulowana jest konsola. W moich postach prezentacje dotyczące Git będą przeprowadzane na Ubuntu.
</p>
<h2>3. Jak utworzyć repozytorium</h2>
<p align="justify">
Wystarczy wykonać <b>$git init</b> w folderze, który ma zostać repozytorium.
</p>
```bash
$ mkdir netItUp
$ cd netItUp/
/netItUp $ git init
Initialized empty Git repository in /home/jedrzej/netItUp/.git/
```
<p align="justify">
Innym sposobem na posiadanie na swoim komputerze repozytorium jest sklonowanie innego, istniejącego repozytorium. Z jednej strony to popularny sposób pobierania aplikacji, a z drugiej umożliwienie szerokiemu gronu użytkowników współpracy w projekcie typu Open Source. Należy odnaleźć stronę wybranego projektu, znaleźć link do repozytorium Bitbucket,czy GitHub i skorzystać z komendy <b>$git clone</b>.
</p>
```bash
$ git clone https://github.com/git/git.git
Cloning into 'git'...
remote: Counting objects: 217565, done.
remote: Total 217565 (delta 0), reused 0 (delta 0), pack-reused 217565
Receiving objects: 100% (217565/217565), 79.86 MiB | 4.55 MiB/s, done.
Resolving deltas: 100% (159597/159597), done.
Checking connectivity... done.
```
<p align="justify">
To dużo większy projekt, ale efekt jest taki sam – na lokalnym komputerze jest pełne repozytorium tego projektu.
</p>
<h2>4. Jak sprawdzić stan repozytorium</h2>
<p align="justify">
Żeby sprawdzić bieżące zmiany w repozytorium należy wykonać komendę <b>$git status</b>.
</p>
```bash
$ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   file

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    file2

no changes added to commit (use "git add" and/or "git commit -a")
```
<p align="justify">
Widać tutaj jakie pliki są w jakiej fazie (untracked, unmodified, modified, staged) oraz wskazówki dotyczące komend, które można wykonać, żeby przejść między fazami. Żeby sprawdzić poprzednie commits należy wykonać <b>$git log</b> Na przykład:.
</p>
```bash
commit e7e07d5a4fcc2a203d9873968ad3e6bd4d7419d7
Author: Junio C Hamano <gitster@pobox.com>
Date:   Fri Feb 24 10:49:58 2017 -0800

    Git 2.12

    Signed-off-by: Junio C Hamano <gitster@pobox.com>

commit cca4f20edad04decdc268102f9a6ee2e3803bcc7
Merge: dc9ded4 7e82388
Author: Junio C Hamano <gitster@pobox.com>
Date:   Fri Feb 24 10:48:10 2017 -0800

    Merge branch 'ps/doc-gc-aggressive-depth-update'

    Doc update.

    * ps/doc-gc-aggressive-depth-update:
      docs/git-gc: fix default value for `--aggressiveDepth`

commit dc9ded480245c1014b526c4b951d1acb3a60d3fa
Merge: c6788b1 9993a7c
Author: Junio C Hamano <gitster@pobox.com>
Date:   Fri Feb 24 10:48:10 2017 -0800

    Merge branch 'bc/worktree-doc-fix-detached'

    Doc update.

    * bc/worktree-doc-fix-detached:
      Documentation: correctly spell git worktree --detach

commit c6788b1f45c6da1139570430b998028e3d2af590
Merge: eccf97c 115a40a
Author: Junio C Hamano <gitster@pobox.com>
Date:   Fri Feb 24 10:48:09 2017 -0800

    Merge branch 'dr/doc-check-ref-format-normalize'

```
<p align="justify">
Dodatkowo warto skorzystać z:
<a href="http://stackoverflow.com/questions/1057564/pretty-git-branch-graphs">http://stackoverflow.com/questions/1057564/pretty-git-branch-graphs</a>
żeby móc wyświetlać logi w bardziej przejrzysty sposób.
</p>
<h2>5. Co to jest HEAD, origin, master?</h2>
<p align="justify">
<b>HEAD</b> to wskaźnik pokazujący na aktualną gałąź (branch) w repozytorium. Jeżeli aktualna gałąź to master, to HEAD wskazuje na gałąź o nazwie master, jeżeli zmienimy gałąź na development  to HEAD wskazywać będzie na development.
</p>
<p align="justify">
<b>master</b> to nazwa gałęzi, która tworzona jest domyślnie po utworzeniu repozytorium. Nie ma szczególnego znaczenia, można ją usunąć i pracować na innej gałęzi.
</p>
<p align="justify">
<b>origin</b> to nazwa zdalnego repozytorium. Jeżeli klonujemy repozytorium za pomocą komendy $git clone, domyślnie zdalne repozytorium będzie widoczne pod nazwą origin. Tak jak w przypadku nazwy master, nie ma to szczególnego znaczenia. Można usunąć zdalne repozytorium o nazwie origin i skonfigurować to samo repozytorium pod inną nazwą.
</p>
<p align="justify">
Zatem jeżeli wywołujemy komendę <b>$git push origin master</b> to znaczy, że do zdalnego repozytorium o nazwie origin wysyłamy commits z gałęzi master. Należy jednak pamiętać że master i origin to tylko nazwy. Zwracam na to szczególną uwagę, dlatego, że zrozumienie tego sprawiło mi szczególną trudność.
</p>
<h2>Co to jest branch?</h2>
<p align="justify">
Każde repozytorium ma przynajmniej jedną gałąź, domyślnie nazywaną <b>master</b>. Utworzenie nowej gałęzi oznacza, że kod dostępny w gałęzi od której nastąpiło odgałęziene jest teraz dostępny w nowej gałęzi.
</p>
```bash
$ git status
On branch master
nothing to commit, working directory clean
$ git branch newFeature
$ git branch
* master
  newFeature
$ git checkout newFeature
Switched to branch 'newFeature'
$ git branch
  master
* newFeature
```
<p align="justify">
Komenda <b>$git branch</b> wywołana bez argumentów pokazuje gałęzie w repozytorium. Z gwiazdką oznaczona jest gałąź, na którą wskazuje HEAD, czyli gałąź, w której wprowadzane są aktualnie zmiany. Po podaniu argumentu, komenda <b>$git branch</b> tworzy nową gałąź o nazwie takiej jak podany argument. Komenda <b>$git checkout</b> przekierowuje wskaźnik HEAD na podaną w argumencie gałąź, czyli zmienia gałąź, w której wprowadzane są zmiany. Zamiast sekwencji <b>$git branch</b>, <b>$git checkout</b>, można wywołać <b>$git checkout -b</b> z nazwą nowej gałęzi jako argumentem. Git utworzy wtedy nową gałąź i automatycznie przekieruje wskaźnik HEAD na tę gałąź.
</p>
<p align="justify">
Przykład (trzeba czytać od dołu):
</p>
```bash
$ git log --pretty=format:"%h %s" --graph
*   bf679b6 Merge branch 'anotherFeature'
|\
| * fd16009 file5 added
* | a73c626 Merge branch 'newFeature'
|\ \
| * | c46d1ae changes in file4
| * | cef478e file4 changed
* | | c6712a6 file changed
| |/
|/|
* | 733eafa added file 3
|/
* bd4c696 committing changes to file and new file2
* 9c12d63 file
```
<p>W moim testowym repozytorium netItUp:</p>
<ol>
<li>utworzyłem plik file (commit 9c12d63),
</li><li>zmieniłem plik file i utworzyłem file2 (commit bd4c696),
</li><li>wykonałem $git branch newFeature tworząc nową gałąź,
</li><li>utworzyłem plik file3 (commit 733eafa),
</li><li>utworzyłem nową gałąź za pomocą $git branch anotherFeature,
</li><li>zmieniłem plik file (commit c671a6),
</li><li>przełączyłem się na gałąź newFeature z $git checkout newFeature,
</li><li>utworzyłem plik file4 (commit cef478e),
</li><li>zmieniłem plik file4 (commit c46d1ae),
</li><li>przełączyłem się na główną gałąź $git checkout master,
</li><li>włączyłem zmiany z gałęzi newFeature do gałęzi master, za pomocą $git merge newFeatue (commit a73c626),
</li><li>przełączyłem się na gałąź anotherFeature, $git checkout anotherFeature,
</li><li>dodałem plik file5 (commit fd16009),
</li><li>przełączyłem się na główną gałąź $git checkout master,
</li><li>włączyłem zmiany z gałęzi anotherFeature do głównej, za pomocą $git merge anotherFeature (commit bf679b6).
</li>
</ol>
<p align="justify">
W ten sposób, w gałęzi master znajdują się wszystkie utworzone i edytowane w między czasie pliki: file, file2, file3, file4, file5.
</p>
<h2>7. Czym się różni git pull od git fetch?</h2>
<p align="justify">
<b>$git pull</b> i <b>$git fetch</b> służą do pobrania zmian ze zdalnego repozytorium. <b>$git fetch</b> tylko uaktualnia gałąź wskazującą na zdalne repozytorium (domyślnie origin), natomiast <b>$git pull</b>, dodatkowo wykonuje operację <b>$git merge</b> na skutek czego, aktualna lokalna gałąź synchronizuje się dodatkowo z gałęzią wksazującą na zdalne repozytorium. Oznacza to, że jeśli sklonujemy repozytorium (z serwisu Bitbucket, czy GitHub) i do tego repozytorium zdalnie wprowadzone zostaną zmiany, to żeby gałąź wskazująca na to repozytorium była zsynchronizowana ze zdalnym repozytorium, należy wykonać właśnie komendę <b>$git fetch</b>. Jednak na skutek takiej akcji, pliki w lokalnej gałęzi się nie zmienią. Żeby się zmieniły należy wykonać jeszcze <b>$git merge origin</b> (jeśli gałąź śledząca zdalne zmiany nazywa się origin).
</p>



