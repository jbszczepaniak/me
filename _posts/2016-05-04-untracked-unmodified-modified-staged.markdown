---
layout: post
title:  "untracked, unmodified, modified, staged"
date:   2016-05-04 21:00:00 +0100
lang: pl
featured-image: /assets/untracked-unmodified-modified-staged/lifecycle.png
permalink: /pl/untracked-unmodified-modified-staged
---

<p align="justify">
Po dodaniu nowego pliku do repozytorium, Git oznacza go jako untracked. Podczas czasu życia pliku, przechodzi on przez różne fazy na skutek różnych operacji. Ten post ma wyjaśnić w jaki sposób plik przmieszcza się między fazami <i>untracked</i>, <i>unmodified</i>, <i>modified</i>, <i>staged</i>. Poniższy rysunek można znaleźć w <a href="https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository">dokumentacji Gita</a> (nie jestem jego autorem). Będze pomocny w zrozumieniu tego co dzieje się w repozytorium i warto wracać do niego przy każdym prezentowanym przykładzie. Wszystkie operacje będą odbywać się lokalnie, bez połączenia ze zdalnym rezpozytorium.
</p>

![schema]({{ site.url }}/assets/untracked-unmodified-modified-staged/lifecycle.png)

<p align="justify">
Zaczniemy z pustym repozytorium i utworzymy nowy plik.
</p>
```bash
$ git init
Initialized empty Git repository in /home/jedrzej/Desktop/post/.git/
$ git status
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)
$ touch file
$ git status
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

    file

nothing added to commit but untracked files present (use "git add" to track)
$ git add file
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   file
```
<p align="justify">
Po dodaniu pliku file, jest on w fazie <i>untracked</i>. Git podpowiada, że  żeby zacząć śledzić nowy plik, należy użyć komendy <b>$git add</b>. Na skutek tej komendy nowy plik znajduje się w fazie <i>staged(cached)</i>.
</p>
<p align="justify">
Po wykonaniu <b>$git commit</b>, zarejestrowane zostaną zmiany tylko w plikach, które są w fazie <i>staged</i>. Mówiąc dokładniej tylko te zmiany, które są w fazie <i>staged</i>. Jest bowiem możliwa sytuacja, w której za pomocą <b>$git add</b> umieścimy plik w fazie <i>staged</i>, a następnie wprowadzimy do niego kolejne zmiany. Po wykonaniu komendy <b>$git commit</b>, nie zostaną zarejestrowane w commicie zmiany, które nie znalazły się w fazie <i>staged</i>.
</p>
```bash
$ echo "new line" >> file
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

    new file:   file

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   file
```
<p align="justify">
Po wprowadzeniu zmian do pliku file, w wyniku <b>$git status</b> znajduje się informacja o dwóch plikach o tej samej nazwie. Te wpisy odnoszą się jednak do tego samego pliku. Taka sytuacja zawsze będzie występować kiedy wykonamy na pliku komendę <b>$git add</b>, a później zmienimy go bez wykonania komendy <b>$git commit</b>. Git oznacza na zielono zmiany, które znajdą się w następnym commicie.
</p>
```bash
$ git commit -m "New file added"
[master (root-commit) eed7c08] New file added
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 file
(master) $ git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   file

no changes added to commit (use "git add" and/or "git commit -a")
(master) $ git diff file
diff --git a/file b/file
index e69de29..86ba82a 100644
--- a/file
+++ b/file
@@ -0,0 +1 @@
+new line
```
<p align="justify">
Po wykonaniu <b>$git commit</b>, a następnie <b>$git status</b> widać, że cześć zmian nie znalazło się w commicie (zgodnie oczekiwaniami). Komenda <b>$git diff</b> wyświetla różnice wprowadzone do plików w stosunku do zmian w fazie <i>staged</i>. W statusie można przeczytać też, że zmiany (oznaczone kolorem czerwonym) są <i>not staged</i>. Oznacza to, że są w fazie <i>modifed</i>. Żeby przenieść pliki z fazy <i>modifed</i> do fazy <i>staged</i>, należy użyć komendy <b>$git add</b>.
</p>

```bash
$ git add file
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    modified:   file

$ git commit -m "File overwritten"
[master c4e38d8] File overwritten
 1 file changed, 1 insertion(+)
$ git status
On branch master
nothing to commit, working directory clean
```
<p align="justify">
Wynika z tego, że każdorazowo po modyfikacji pliku, należy wykonać na pliku najpierw <b>$git add</b>, a następnie <b>$git commit</b>, żeby zmiany w plikach zostały zarejestrowane. Można użyć <b>$git commit -a</b>, żeby zarejestrować zmiany  w plikach w fazie <i>modifed</i> i <i>staged</i>.Jest to pewne usprawnienie, należy jednak pamiętać, że nowe pliki muszą za pierwszym razem zostać dodane, za pomocą  <b>$git add</b>, żeby można było rejestrować w nich zmainy.
</p>
```bash
$ git status
On branch master
nothing to commit, working directory clean
$ touch new_file
$ git commit -a -m "Commit with a new file"
On branch master
Untracked files:
    new_file

nothing added to commit but untracked files present
$ git add new_file
$ git commit -m "Commit with new file"
[master 2bb1760] Commit with new file
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 new_file
```
<p align="justify">
Plik <i>new_file</i> nie został dodany do commicie, dlatego, że jest nieśledzony, dopiero dodanie go do repozytorium za pomocą <b>$git add</b>, sprawiło, że mógł znaleźć się w commicie. Dopiero teraz, można go zmienić i wykonując <b>$git commit -a</b> zaoszczędzić czas wpisania jednej komendy.
</p>

<p align="justify">
Nie zostało to wcześniej napisane wprost, ale po wykonaniu <b>$git commit</b>, pliki zostają przeniesione z fazy <i>staged</i> do <i>unmodified</i>. To, że plik jest w fazie <i>unmodified</i> oznacza, że nie został on zmodyfikowany od ostatniego wykonania <b>$git commit</b>. Komenda <b>$git add</b>, używana jest do przeniesienia pliku z fazy <i>untracked</i> do <i>staged</i>, oraz z fazy <i>modified</i> do <i>staged</i>.
</p>
