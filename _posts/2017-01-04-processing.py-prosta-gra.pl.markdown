---
layout: post
title:  "Processing.py - prosta gra"
date:   2017-01-04 21:00:00 +0100
lang: pl
permalink: /pl/prosta-gra-processing
---
<p align="justify">
    Pierwszy raz z biblioteką Processing spotkałem się w trakcie <a href="https://www.coursera.org/learn/object-oriented-java">kursu dot. obiektowego programowania w Javie</a>. Projekt do wykonania podczas tego kursu opierał się o bibliotekę <a href="http://unfoldingmaps.org/">unfoldingmaps.org</a>, która mocno wykorzystuje Processing.
</p>

<p align="justify">
Processing to nie tylko biblioteki, ale również środowisko programistyczne, w którym można (trzeba) uruchamiać napisane przez siebie programy. Dostępne są API dla: Javy, Pythona (Jython) i JavaScript. Na <a href="https://www.openprocessing.org"> https://www.openprocessing.org</a> można obejrzeć projekty napisane w Processing (kod + efekt działania).  Część zaprezentowanych tam projektów jest interaktywna, a inne pokazują narysowane figury.
</p>

<p align="justify">
W tym poście pokażę jak napisać prostą grę w Processing. Gra będzie polegać na zbieraniu zdrowego jedzenia (czerwonych kwadratów), za co gracz otrzymywać będzie punkty. Przeszkadzać bedą zepsute kawałki jedzenia (zielone kwadraty), które złapane, będą powodowały odjęcie graczowi punktów i namnożenie się zepsutych fragmentów jedzenia.
</p>
<p align="justify">
Życie aplikacji w Processing opiera się na funkcjach setUp() (wszystkie funkcje dostępne w bibliotece processing dziedziczą konwencję nazywania funkcji z Javy w stylu camelCase) oraz draw(). W metodzie setUp() rysujemy jedynie tło, na którym rysować będziemy pozostałe elementy.
</p>
```python
def setup():
  size(width, height)
  background(255)
```
<p align="justify">
Zmienne width i height mogą pozostać zadeklarowane globalnie w głównym pliku projektu, na przykład jako:
</p>
```python
width = 1080
height = 720
```
<h3>Dygresja:</h3>
<p align="justify">
Główny plik programu ma rozszerzenie .pyde. Używanie pythona w Processing, oznacza tylko tyle, że korzystamy ze składni Pythona. W <a href="https://github.com/jdf/processing.py">repozytorium processing.py</a>, możemy przeczytać: <i>"Python Mode is implemented in Java, and is designed to be compatible with the existing ecosystem of <a href="https://processing.org/reference/libraries/">Processing libraries</a>."</i>.  Możliwe jest nawet <a href="https://github.com/jdf/processing.py/wiki/How-to-call-%22native%22-Java-code-from-your-Python-Mode-sketch">importowanie modułów javy do programów pisanych w Processing w trybie Pythona</a>. Chcę tym samym podkreślić, że programy napisane w Processing w Pythonie nie są kompatybilne z najbardziej powszechną implementacją Pythona - CPython.

Wracając do gry, nie zrobiliśmy do tej pory nic powalającego.
</p>
![Blog Post 1]({{ site.url }}/assets/processing_blog_post1.png)

<p align="justify">
Mamy tło, na którym można zacząć coś rysować. Metoda <b>draw()</b> służy do definiowania tego co ma być wyświetlane. Nie powinno się samodzielnie wywoływać metod <b>setUp()</b>, ani <b>draw()</b>. Processing wywołuje je samodzielnie, <b>setUp()</b>, podobnie jak we framework'ach testowania wykonywany jest na początku działania programu i przygotowuje środowisko. Z kolei <b>draw()</b> wykonywany jest przez Processing w pętli, aż do zakończenia programu. Można sterować częstotliwością wykonywania metody <b>draw()</b> za pomocą metody <a href="http://py.processing.org/reference/frameRate.html"><b>frameRate()</b></a>, my pozostaniemy jednak przy domyślnej wartości tego parametru.
</p>
<p align="justify">
Punkt (0,0) w Processing znajduje się w lewym górnym rogu tła. Gdyby chcieć narysować pojedynczy kwadrat o środku w punkcie (100, 100) i o bokach szerokości 20 pikseli,  wystarczy w metodzie draw(), napisać:
</p>
```python
def draw():
  rectMode(CENTER)
  rect(100, 100,20, 20)
```
<p align="justify">
Bez wywołania rectMode(CENTER) narysowany zostałby kwadrat o zadanych bokach, ale (100,100) znajdowałoby się nie w środku, a w lewym górnym rogu rysowanego kwadratu.
</p>
<p align="justify">
Będziemy potrzebować wielu, poruszajacych się kwadratów, dlatego rysowanie takich kwadratów przeniesiemy do osobnej klasy. Skórt <i>ctrl+shift+n</i> powoduje w processing otwarcie nowej karty - z nowym plikiem źródłowym - który nazwiemy <b>food.py</b>.
</p>
<p align="justify">
Klasa Food (jedzenie, które będziemy zbierać w grze) wygląda następująco (bezpośrednio w kodzie komentuję przeznaczenie poszczególnych elementów:
</p>
```python
class Food():
  def __init__(self, canvas_width, canvas_height):

    # Wartości potrzebne, żeby określić ograniczenie
    # współrzędnych nowo powstałych obiektów.
    self.canvas_width = canvas_width
    self.canvas_height = canvas_height

    # Rozmiar obiektów.
    self.volume = random(10, 20)

    # Obiekty, które będziemy łapać, będą się poruszać,
    # stąd definicja prędkości.
    # Funkcja random jest wbudowana w processing.
    self.x_speed = random(-1,1)
    self.y_speed = random(-1,1)

    # Pozycja pojawiania się na obiektów. Należy zwrócić
    # uwagę na to, że początkowo obiekty na skraju tła
    # będą częściowo niewidoczne, ale możemy to pominąć.
    self.x_position = random(0, canvas_width)
    self.y_position = random(0, canvas_height)

  # Tę metodę będziemy wywoływać w funkcji głównej funkcji draw().
  def display(self):
    rectMode(CENTER)
    rect(self.x_position, self.y_position,self.volume, self.volume)
    self.move()

  # Wrażenie ruchu obiektu osiąg się poprzez każdorazową zmianę położenia
  # o wartości zdefiniowane podczas tworzenia obiektu biorąc pod uwagę
  # korektę, gdy obiekt znajdzie się poza tłem.
  def move(self):
    self.x_position += self.x_speed
    self.y_position += self.y_speed
    self.x_position %= self.canvas_width
    self.y_position %= self.canvas_height
```
<p align="justify">
Po zdefiniowaniu klasy Food, należy zadbać o to, żeby utworzyć początkowy zestaw obiektów w głównym pliku programu.
</p>
```python
from food import Food

foods = [Food(width, height) for _ in range(200)]
bad_foods = [Food(width, height) for _ in range(5)]
```
<p align="justify">
Użyłem konwencji zmiennej o nazwie _, która oznacza w Pyhonie tzw. <a href="http://stackoverflow.com/questions/5893163/what-is-the-purpose-of-the-single-underscore-variable-in-python">throwaway variables</a>, dlatego że nie dbam o wartość iteratora, chcę po prostu otrzymać X nowych obiektów i trzymać je w liście.
</p>
<p align="justify">
Kolejnym krokiem jest wyświetlanie poruszających się złych i dobrych fragmentów jedzenia, które będziemy łapać!
</p>
```python
def draw():
  background(255)
  for food in foods:
    fill(0, 255, 23)
    food.display()

  for bad_food in bad_foods:
    fill(254, 34, 100)
    bad_food.display()
```
![Blog post 2]({{ site.url }}/assets/processing_blog_post2.png)
<p align="justify">
Każdorazowo przy wywołaniu draw() rysujemy tło na biało. Jeśli tego nie zrobimy, kwadraty będą zostawiać za sobą smugi, spowodowane tym, że przy każdym kolejnym wywołaniu draw w miejscu gdzie wcześniej był kwadrat, teraz rysowane będzie 'nic'.
</p>
![Blog post 3]({{ site.url }}/assets/processing_blog_post3.png)
<p align="justify">
Tak wygląda tło po kilku sekundach gry jeśli usunie się wywołanie metody background(255) w metodzie draw.
</p>
<p align="justify">
Doszliśmy do momentu, w którym należy zaplanować w jaki sposób użytkownik będzie prowadził interakcję z grą.
</p>
<p align="justify">
Kawałaki jedzenia mają być łapane myszką - czyli zaznaczane nią. Żeby zrealizować taką funkcję, można wykorzystać wbudowane metody biblioteki processing: mousePressed(), która wywoływana jest każdorazowo po kliknięciu myszą, oraz mouseReleased(), wywoływana po puszczeniu przycisku na myszy. Dodatkowo udostępniona jest w bibliotece zmienna mousePressed, która zwraca True, gdy przycisk na myszy jest aktualnie wciśnięty.
</p>
<p align="justify">
Obsłużmy najpierw możliwość zaznaczania fragmentu tła myszą. Gdy naciśniemy w dowolnym miejscu ekranu na przycisk myszy i przeciągniemy mysz w stronę prawego dolnego rogu (dla prostoty umożliwimy zaznaczanie fragmentu ekranu tylko w tę stronę), to tak długo jak przycisk myszy będzie naciśnięty - będziemy rysować prostokąt, który obejmuje obszar zaznaczenia.
</p>
<p align="justify">
W głównym pliku naszego małego projektu definiuję zmienne:
</p>
```python
mark_start_x = 0
mark_start_y = 0
```
<p align="justify">
które będą aktualizowane za każdym razem, gdy użytkownik zacznie zaznaczać fragment ekranu.
</p>
```python
def mousePressed():
  global mark_start_x, mark_start_y
  mark_start_x = mouseX
  mark_start_y = mouseY
```
<p align="justify">
<i>mouseX</i> oraz <i>mouseY</i>, to wbudowane funkcje processing, które zczytują aktualną pozycję myszy. Skoro mamy już współrzędne punktu, w którym rozpoczęte zostało zaznaczane, możemy w metodzie <i>draw()</i> zaimplementować mechanizm, który będzie rysował zaznaczenie.
</p>
<p align="justify">
Pod pętlami rysującymi dobre i zepsute fragmenty jedzenia, dopisuję:
</p>
```python
global mark_start_x, mark_start_y
if mousePressed:
  rectMode(CORNER)
  noFill()
  rect(mark_start_x, mark_start_y, mouseX -
        mark_start_x, mouseY - mark_start_y)
```
<p align="justify">
Tryb <i>CORNER</i> oznacza, że początek rysowanego prostokąta jest w jego górnym rogu. Jest to domyślny tryb dla prostokąta, ale dodanie tej linii jest konieczne, ponieważ podczas rysowania fragmentów jedzenia nadpisaliśmy to (globalne) zachowanie w metodzie <i>display()</i> klasy <i>Food</i>.
</p>
<p align="justify">
Powyższy fragment kodu zawarty jest w funkcji <i>draw()</i> wywoływanej w pętli, co oznacza, że podczas przeciągania myszy, będziemy widzieli jak rysowany jest prostokąt na obszarze, który zaznaczamy.
</p>
<p align="justify">
Kolejnym etapem jest 'łapanie' fragmentów jedzenia. W tym celu defniuję metodę <i>mouseRelased()</i>, która wywoływana będzie za każdym razem podczas puszczania przycisku myszy.
</p>
```python
# Punktacja dla aktualnej gry.
points = 0
def mouseReleased():
  global mark_start_x, mark_start_y, points

  # Wszystkie fragmenty dobrego jedzenia, które znalazły się w obszarze
  # zaznaczenia myszy znikają, za każdy złapany fragment, dodawany jest
  # dodatkowy punkt.
  for food in foods:
    if ((mark_start_x < food.x_position < mouseX) and
        (mark_start_y < food.y_position < mouseY)):
      foods.remove(food)
      points += 1

  # Analogicznie, wykrywane jest złapanie zepsutego fragmentu jedzenia,
  # za karę, pojawia się 5 dodatkowych fragmentów i odejmowane jest 10
  # punktów.
  for bad_food in bad_foods:
    if ((mark_start_x < bad_food.x_position < mouseX) and
        (mark_start_y < bad_food.y_position < mouseY)):
      bad_foods.extend([Food(width, height) for _ in range(5)])
      points -= 10
```
<h3>
W zasadzie gra już działa!
</h3>
<p align="justify">
Ostatnim elementem będzie wyświetlanie aktualnej punktacji. Processing umożliwia tworzenie czcionek. Na pasku narzędzi po kliknięciu na Tools, należy wybrać <i>Create Font...</i> Po wybraniu czcionki w nowym oknie i naciśnięciu <i>OK</i>, w folderze <i>/data</i> danego projektu, pojawia się plik z rozszerzeniem <i>.vlw</i>. Po utworzeniu czcionki w ten sposób, można ją załadować do aplikacji za pośrednictwem wbudowanej metody <i>loadFont()</i>.
</p>
<p align="justify">
W metodzie <i>draw()</i> po bloku <i>if mousePressed:</i>, definiuję wyświetlanie punktacji dla danej gry.
</p>
```python
 fill(0)
 font = loadFont('Purisa-Bold-48.vlw')
 textFont(font, 32)
 text("Punkty: {}".format(points), width - width / 6, height / 6)
```
<p align="justify">
Co ciekawe, projekty napisane w processing można eksportować do formatu, który może być uruchomiony na innych systemach operacyjnych.
</p>

![Blog Post 4]({{ site.url }}/assets/processing_blog_post4.png)

<p align="justify">
Cały kod tej gry można pobrać na moim <a href="https://github.com/jedruniu/processing-game">repozytorium gitowym</a>, zachęcam do pobrania Processing z <a href="http://py.processing.org/">http://py.processing.org/</a> oraz kodu gry, uruchomienie go i eksperymentowanie z nim.
</p>
