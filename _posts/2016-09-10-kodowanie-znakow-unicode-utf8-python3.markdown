---
layout: post
title:  "Kodowanie znaków, Unicode, UTF-8, Python3"
date:   2016-09-10 21:00:00 +0100
lang: pl
permalink: /pl/kodowanie-znakow-unicode-utf8-python3
---
<p align="justify">
Niejednokrotnie zdarza się, że brak kompatybilności między kodowaniami napisów w aplikacjach powoduje problemy. Najczęściej znajdowałem problem w przypadku odbierania danych z formularzy, albo przy interakcji z bazą danych. Lekarstwem na te problemy najczęściej było hasło 'UTF-8’. Faktycznie zastosowanie kodowania UTF-8 rozwiązywało problemy. Zacząłem się zastanawiać, co to w ogóle oznacza , że używam takiego kodowania? Kiedy napisy kodować? Kiedy je dekodować? Później doszedłem do wniosku, że warto usystematyzować tą wiedzę i napisać o tym post.
</p>
<p align="justify">
Trzeba uświadomić (przypomnieć) sobie, że każdy napis w końcu prezentowany jest jako ciąg bajtów. Dla mnie ważną informacja było poniższe zdanie, które warto wynieść z lektury tego posta:
</p>

<h1>Znaki Unicode <u>kodujemy</u> do postaci bajtów. Bajty <u>dekodowane</u> są do postaci znaków Unicode.</h1>
<p align="justify">
Podstawowym, znanym programistom sposobem kodowania znaków jest <a href="https://pl.wikipedia.org/wiki/ASCII">ASCII</a>. Ważne jest to, że mamy w tym kodowaniu do czynienia jedynie ze znakami z języka angielskiego oraz to, że reprezentacja wszystkich znaków przewidzianych w tym kodowaniu mieszczą się na 7 bitach. Ósmy bajt w tym kodowaniu jest niejako marnowany i różne firmy, w różny sposób używały tego bajtu po to, żeby rozszerzyć możliwości kodowania. Prowadziło to do niemożliwości dekodowania takich napisów na różnych platformach.
</p>
<p align="justify">
Pomijając historię, dzisiaj mamy do czynienia z zestawem znaków Unicode. Każdy możliwy znak, ma przyporządkowany w zestawie Unicode swój kod (ang. code point). Rozmiar Unicode, to 4 bajty co daje możliwość zakodowania 2^32 różnych znaków.  W chwili pisania postu, najbardziej aktualną wersją Unicode jest 9.0, w której zdefiniowano 128237 znaków. Stanowi to około 0.003 % przestrzeni, która oferowana jest przez 32 bity. Unicode jest wersjononowany. Przestrzeń oferowanych znaków jest stopniowo rozszerzana.
</p>
<p align="justify">
Pierwsze 128 znaków Unicode, odpowiada kodowaniu ASCII. To znaczy, że zakodowany w ASCII napis, jest zrozumiały też w Unicode. Notacja kodów Unicode to 4 liczby heksadecymalne poprzedzone przez U+. Na przykład U+0119 reprezentuje znak ę.
</p>
<p align="justify">
Unicode defniuje zestaw znaków kodowych. Nie oznacza to jednak, że musimy na każdy znak przeznaczać 32 bity w pamięci. Byłoby to dużym marnotrawstwem, szczególnie dlatego, że znaki z przedziału ASCII są wykorzystywane w naszym języku bardzo często. Nie byłoby to jedynie marnotrawstwo pamięci w komputerach, trzeba zwrócić również uwagę na potrzebną czterokrotnie większą przepustowość łącza internetowego na każdy znak z zakresu ASCII a zaprezentowany jako kod Unicode.
</p>
<p align="justify">

Z pomocą przychodzą między innymi kodowania UTF (ang. Unicode Transformation Format). Opisywany powyżej problem marnotrawstwa istnieje w kodowaniu UTF-32, gdzie każdy kod Unicode jest podawany wprost jako 4 bajty. Bardziej powszechnym sposobem jest kodowanie UTF-8. W tym kodowaniu wykorzystuje się fakt, że część znaków wykorzystywana jest częściej niż inne. Wcześniej wspominałem, że pierwsze 128 kodów Unicode odpowiada kodom ASCII. W kodowaniu UTF-32 jest to prawda, ale perwsze 3 bajty znaku są zawsze zerami. W kodowaniu UTF-8 pierwsze 128 znaków jest identycznych z ASCII tzn. zajmują jeden bajt. Dla znaków kodowych wyższych niż 127 czyli U+007F, zastosowano następującą zasadę: pierwszy bajt użyty jest po to, żeby poinformować o tym ile bajtów zużytych jest dla danego znaku. Każdy kolejny bajt danego znaku zawiera ’10’ na najstarszych bitach i 6 bitów poświęconych na użyteczną informację o znaku kodowym. UTF-8 dla jednego znaku Unicode, może używać maksymalnie do 6 bajtów, dokładne informacje na ten temat można przeczytać <a href="https://en.wikipedia.org/wiki/UTF-8">tutaj</a>.
</p>
<h2>Trochę kodu</h2>
<p align="justify">
W języku Python 3, wszystkie napisy kodowane są za pomocą Unicode. Nie używa się już ASCII. Typ str zawiera znaki Unicode.
</p>
```python
>>> polish_chars = "ąęłĄ"
>>> type(polish_chars)
<class str>
```

<p align="justify">
Jak wspominałem wcześniej znaki Unicode kodujemy w pewien sposób (np. za pomocą UTF-8), otrzymując ciąg bajtów np. po to, żeby móc te bajty przesłać przez sieć. W Pythonie, próba zakodowania takiego ciągu znaków za pomocą ASCII spowoduje błąd:
</p>

```python
>>> polish_chars.encode('ascii')
Traceback (most recent call last):
File "<stdin>", line 1, in <module>
UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-3: ordinal not in range(128)
```

<p align="justify">
Da się natomiast zakodować taki ciąg znaków Unicode za pomocą kodowania UTF-8:
</p>

```python
>>> polish_chars_bytes = polish_chars.encode('utf-8')
>>>polish_chars_bytes
b'\xc4\x85\xc4\x99\xc5\x82\xc4\x84'
```

<p align="justify">
Prefix b oznacza, że mamy doczynienia z obiektem typu bytes, a \x występuje przed każdym bajtem. Po zdekodowaniu ciągu:
</p>

```python
>>> polish_chars_bytes.decode('utf-8')
'ąęłĄ'
```

<p align="justify">
otrzymujemy porządany ciąg znaków Unicode zaprezentowny w zrozumiały dla człowieka sposób. Ważne jest to, żeby znać kodowanie, które zostało zastosowane. W przeciwnym wypadku, otrzymamy niepożądany efekt:
</p>

```python
>>> polish_chars_bytes.decode('utf-16')
'藄駄苅蓄'
```

<p align="justify">
W przykładzie powyżej kodowałem jedynie znaki spoza zakresu ASCII. Największym problemem były dla mnie sytuacje, w których otrzymywałem ciąg danych w których są znaki z zakresu ASCII i jakieś niezrozumiałe znaki. Czy powinienem to zakodować? Może zdekodować?
</p>

```python
>>> mixed_characters = "bloguję"
>>> mixed_characters_bytes = "bloguję".encode('utf-8')
>>> mixed_characters_bytes
b'bloguj\xc4\x99'
```

<p align="justify">
Żeby odpowiedzieć na pytanie, z czym mamy do czynienia skorzystam z wbudowanej funkcji Pythona. Funkcja ord(), jako argument pobiera znak Unicode i zwraca wartość kodu dla niego.
</p>

```python
>>> ord('ę')
281
>>> ord('b')
98
>>> ord(b'b')
98
```

<p align="justify">
Trzeba zwrócić uwagę na to, że dla typu bytes, tym samym jest 98 i literka b. To znaczy, że w ciągu b'bloguj\xc4\x99′ mieliśmy doczynienia z ciągiem bajtów. Po prostu w przypadku ciągu ąęłĄ wszystkie znaki były zakodowane za pomocą UTF-8 i niezrozumiałe w kodowaniu ASCII.  W przypadku bloguję też wszystkie znaki były zakodowane za pomocą UTF-8, ale część z tych znaków mogła była być zinterpretowana za pomocą kodowania ASCII, dlatego podczas wyświetlania ciągu bajtów, część znaków została automatycznie zinterpretowana w czytelny sposób. Warto więc mieć świadomość, że obiekt klasy bytes, spróbuje automatycznie wyświetlić znak z zastosowaniem ASCII, jeżeli będzie potrafił.
</p>

```python
>>> b'\x51'.decode('ascii')
'Q'
>>> b'Q'.decode('ascii')
'Q'
```

<p align="justify">
W podanym wyżej przykładzie nie miało znaczenia to, czy mieliśmy do czynienia z kodem czy ze znakiem.
</p>
<p align="justify">
Słowem zakończenia, kiedy widzimy coś w rodzaju <b>bloguj\xc4\x99</b> należy sobie zadać pytanie jakiego typu widzimy ciąg, czy są to bajty ? Czy mamy doczynienia z niepoprawnie zdekodowanymi bajtami ? Jeżeli natomiast wiemy już, że są to bajty, musimy wiedzieć z jakim kodowaniem mamy do czynienia. Bez takiej informacji nie będziemy w stanie poprawnie pracować z Unicode.
</p>