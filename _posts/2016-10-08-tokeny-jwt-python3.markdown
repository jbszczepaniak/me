---
layout: post
title:  "Tokeny JWT w Python3"
date:   2016-10-08 20:00:00 +0100
lang: pl
featured-image: /assets/tokeny-jwt-w-python3/jwt-logo.gif
permalink: /pl/tokeny-jwt-w-python3
---
<p align="justify">
JWT to standard, który pozwala zabezpieczać np. zapytania do RESTful API. W niniejszym poście chciałbym przyjrzeć się tokenom JWT w Pythonie 3. Standard JWT zdefiniowany jest w <a href="https://tools.ietf.org/html/rfc7519">RFC 7519</a>. Na <a href="https://jwt.io/#libraries">jwt.io</a> można znaleźć kilka propozycji implementacji biblioteki. W moim przypadku (na Ubuntu 16.04 LTS) po uruchomieniu:
</p>
```bash
$ pip3 install pyjwt
```
<p align="justify">
okazało się, że mam bibliotekę już pobraną w: <b>/usr/lib/python3/dist-packages/jwt</b> i mogę z niej bezpośrednio korzystać.
</p>

<p align="justify">
Tokeny JWT składają się z trzech części: <i>header</i>, <i>payload</i>, <i>signature</i>. W częśći header zawarta jest informacja o tym, że token jest typu JWT oraz o algorytmie szyfrowania użytym do podpisania tokenu. Część payload, może zawierać tzw. roszczenia (ang. claims). Część roszczeń zdefiniowana jest w RFC, zostawione jest również miejsce na zdefiniowanie przez użytkownika biblioteki własnych roszczeń. Signature to podpis tokenu, służący do zweryfikowania tokenu. Za pomocą tego mechanizmu, można sprawdzić, czy token został wytworzony przy pomocy podanego klucza. JWT wspiera najpopularniejse algorytmy szyfrowania, zarówno symetryczne jak i niesymetryczne.
</p>

<p align="justify">
Kod do tego postu przygotowałem w postaci testów jednostkowych. Żeby moć pokolei wykonywać poszczególne testy wystarczy do pliku z roszerzeniem <b>.py</b> wkleić:
</p>

```python
import jwt, unittest, sys, datetime, time

class TestJWT(unittest.TestCase):
  def setUp(self):
    self.informations = {}
    self.informations['version'] = sys.version
    self.informations['default_ecoding'] = sys.getdefaultencoding()
    self.jwt_key = "test_key"
    self.jwt_algorthm = "HS256"
    self.token_jwt = jwt.encode(self.informations, self.jwt_key, self.jwt_algorthm)

if __name__ == "__main__":
  unittest.main()
```
<p align="justify">
I dopisywać kolejne metody testujące. W metodzie setUp, utworzyłem słownik informations, w którym zawarłem informacje systemowe, które załączyłem w tokenie jako roszczenia. Poza roszczenami metoda jwt.encode przyjmuje jako argumenty klucz do szyfrowania oraz metodę szyfrowania. Po wydrukowaniu tokenu do konsoli, otrzymamy:
</p>
```
b'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZWZhdWx0X2Vjb2
RpbmciOiJ1dGYtOCIsInZlcnNpb24iOiIzLjUuMiAoZGVmYXVsdCwgU2V
wIDEwIDIwMTYsIDA4OjIxOjQ0KSBcbltHQ0MgNS40LjAgMjAxNjA2MDld
In0.fk_slvRTjFhWBQkHGdxrW3VlVVivCnDoCiCfOU2G2Ng'
```
<p align="justify">
Przedrostek b oznacza, że jest to ciąg bajtów. Na stronie <a href="https://jwt.io/">jwt.io</a> dostępny jest debugger, za pomocą którego można spróbować zdekodować token. Zachęcam czytelnika tego posta, żeby to zrobił. Po wklejeniu klucza użytego do wytworzenia klucza, można również token zweryfikować.
</p>

<p align="justify">
Pierwszy test sprawdza, czy token ma trzy części oddzielone kropką - to cecha charakterystyczna każdego tokenu JWT, dlatego test powinien przechodzić.
</p>
```python
def test_jwt_token_is_has_three_parts(self):
  token_jwt_as_string = self.token_jwt.decode('utf-8')
  token_as_array = token_jwt_as_string.split('.')
  self.assertEqual(len(token_as_array), 3)
```
<p align="justify">
Metodę <i>split</i> można wykonać jedynie na ciągu znaków, dlatego przed wykonaniem jej należy token zdekodować. Test przechodzi - token ma trzy części.
</p>
<p align="justify">
Ważną cechą tokenów JWT jest ich weryfikowalność, tzn fakt, że można sprawdzić, że token został wytworzony za pomocą konkretnego klucza. Poniższy test sprawdza tę weryfikowalność:
</p>
```python
def test_jwt_token_can_be_verified_with_right_key(self):
  result = jwt.decode(self.token_jwt, key=self.jwt_key, verify=True)
  self.assertDictEqual(self.informations, result)
```
<p align="justify">
Testem komplementarnym jest sprawdzenie, że nie da się zweryfikować tokenu, przy pomocy klucza, który nie został użyty do jego wytworzenia.
</p>
```python
def test_jwt_token_with_wrong_key_throws_exceptions(self):
  with self.assertRaises(Exception) as context:
    jwt.decode(self.token_jwt, key="random key", verify=True)
```
<p align="justify">
W tym przypadku powinien zostać rzucony wyjątek. W przykładzie wykorzystany jest symetryczny algorytm szyfrowania, dlatego weryfikacja podpisu odbywa się za pomocą tego samego klucza. Gdyby użyty został algorytm asymetryczny - należałoby zastosować parę kluczy: publiczny i prywatny.
</p>
<p align="justify">
Dwa ostatnie testy sprawdzają jak działają predefiniowane roszczenia tokenów JWT. O wszystkich roszczeniach można przeczytać w <a href="https://tools.ietf.org/html/rfc7519">standardzie</a>. Zdecydowałem się na użycie <b>exp</b> (expiration time) oraz <b>nbf</b> (not before). Pierwszy z nich oznacza, że nie powinno dać się zweryfikować pozytywnie danego tokenu po podanym czasie, drugi mówi o tym, że przed podanym czasem token jest nieważny. Czas podany jest w formacie timestamp.
</p>
```python
def test_expired_token_cannot_be_verified(self):
  token_jwt = jwt.encode(
    {'exp': (datetime.datetime.utcnow() + datetime.timedelta(seconds=1))},
    self.jwt_key)
  time.sleep(2)
  with self.assertRaises(jwt.exceptions.ExpiredSignatureError) as context:
    result = jwt.decode(token_jwt, key=self.jwt_key, verify=True)

def test_before_nbf_time_cannot_be_verified(self):
  token_jwt = jwt.encode(
    {'nbf': (datetime.datetime.utcnow() + datetime.timedelta(seconds=1))},
    self.jwt_key)
  with self.assertRaises(jwt.exceptions.ImmatureSignatureError) as context:
    result = jwt.decode(token_jwt, key=self.jwt_key, verify=True)
```
<p align="justify">
W obu przypadkach wprowadzone zostały pewne opóźnienia, żeby upewnić się, że test odbywa się w warunkach zgodnych z założeniami. W obu przypadkach również, wytworzone zostały nowe tokeny (nie wykorzystałem tokenów z metody setUp). W obu testach rzucane zostają rzucone wyjątki, które dosyć jasno opisują co dzieje się w testach.
</p>
<p align="justify">
Więcej o szczegółach i zaletach JWT można przeczytać na <a href="jwt.io">oficjalnej stronie</a>. Mam nadzieję, że powyższy post pokazał w jak prosty sposób można korzystać z JWT. Cały kod dotyczący tego posta w postaci jednego pliku można pobrać <a href="https://gist.github.com/jedruniu/74cc20e716b051555b6481b61f67514b">tutaj</a>.
</p>