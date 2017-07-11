---
layout: post
title:  "Mój problem z OAuth 2.0"
date:   2017-03-27 00:15:00 +0100
lang: pl
permalink: /pl/moj-problm-z-oauth2
featured-image: /assets/moj-problem-z-oauth2.0/oauth-logo.png
---

Jak działa OAuth 2.0 z grant type 'Authorization Code' i dlaczego programistom ciężko jest zrozumieć działanie protokołu OAuth2.0?
<!--more-->
<p align="justify">
Próbowałem wcześniej zrozumieć jak działa OAuth 2.0, ale zawsze uznawałem, że jest to na tyle skomplikowane, że sobie podaruję. Gdy zapytany ostatnio o szczegóły działania OAuth 2.0 nie potrafiłem powiedzieć nic więcej niż:</p>
> no.. to jest.. protokół do logowania w social media

<p align="justify">
powiedziałem sobie, że trzeba uzupełnić lukę w wiedzy webowej.
</p>
<p align="justify">
Natychmiast udałem się do <a href="https://oauth.net/2/">źródła</a> i zaczałem czytać. Duży nacisk w dokumentacji kładzie się na to, że OAuth 2.0 służy do autoryzacji, a nie do uwierzytelniania. Różnicę między uwierzytelnieniem a autoryzacją można przypomnieć sobie <a href="https://pl.wikipedia.org/wiki/Uwierzytelnianie">tutaj</a>. OAuth 2.0 oferuje różne scenariusze użycia. Dla każdego scenariusza określony jest osobny tzw. <b>grant type</b>. I tak mamy:</p>
<ol>
    <li>Authorization Code,</li>
    <li>Password,</li>
    <li>Client credentials,</li>
    <li>Implicit.</li>
</ol>

<p align="justify">
Fantastyczny, zrozumiały post o wszystkich czterech scenariuszach można przeczytać na <a href="https://aaronparecki.com/oauth-2-simplified">https://aaronparecki.com/oauth-2-simplified</a>. Ja skupię się na pierwszym scenariuszu, dlatego, że wystarczy to, żeby pokazać absurd, którego się doszukałem przeglądając artykuły dotyczące OAuth 2.0.</p>
<p align="justify">
OAuth 2.0 definiuje role, które biorą udział przy wymianie tokenów:
</p>
<ol>
    <li>API - serwer, na którym znajdują się zasoby, do których dostęp chcemy uzyskać,</li>
    <li>klient - serwer, który chce uzyskać dostęp do zasobów wyszczególnionych w punkcie 1,</li>
    <li>serwer autoryzacyjny,</li>
    <li>właściciel zasobów.</li>
</ol>

<p align="justify">
Często serwer autoryzacyjny i serwer z zasobami, mogą być tym samym serwerem, ale z punktu widzenia OAuth 2.0 to są dwa różne byty i tak je będziemy dalej traktować. Serwer nazwany tutaj klientem, jest zwykłym serwerem z aplikacją w PHP, ASP.NET, czy w Ruby on Rails...
</p>

<p align="justify">
Żeby umożliwić komunikację z API którym jesteśmy zainteresowani, np z Graph API od Facebook'a, należy najpierw zarejestrować aplikację (w przypadku Facebooka na <a href="https://developers.facebook.com/">https://developers.facebook.com</a>). Przy rejestracji aplikacji należy podać adres na jaki aplikacja ma przekierowywać użytkownika. Wynikiem rejestracji jest identyfikator (client id) oraz klucz (client secret), które będą używane podczas zapytań do serwera autoryzacyjnego. Klucze te trzyma się w back-endzie aplikacji (która z perspektywy OAuth 2.0 nazwana została klientem).
</p>

<h2>Faktyczna autoryzacja za pomocą 4 wiadomości</h2>
<ol>
    <li>Authorization Request</li>
    <li>Authorization Response</li>
    <li>Access Token Request</li>
    <li>Access Token Response</li>
</ol>

<h1>1. Authorization Request</h1>
<p align="justify">
Przygotowywany jest URI - adres pod którym serwer autoryzacyjny wyświetli dla użytkownika (właściciela zasobu) pytanie o to, czy ten zgadza się na udzielenie klientowi zgody na dostęp do danych. W skład URI wchodzą:
</p>
* `response_type=grant` wartość stała dla tego scenariusza.
* `client_id=CLIENT_ID` identyfikator otrzymany podczas rejestracji apliacji na serwerze autoryzującym,
* `redirect_uri=REDIRECT_URI` adres przekierowania po wyświetleniu użytkownikowi zapytania o dostęp do zasobu (zdefiniowany na etapie tworzenia aplikacji na serwerze autoryzującym),
* `scope=user_account` zakres zasobów do jakich udzielany jest dostęp,
* `state=hkj34kjh5lkj2` wartość losowa mająca na celu zapobieganie atakom CSRF.

Po złożeniu adresu będzie on wyglądać mniej więcej tak:

```
https://oauth2-authorization-server.com/endpoint?response_type=grant&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=user_account&state=hkj34kjh5lkj2
```

Złożony adres wysyłany jest w  odpowiedzi do przeglądarki w nagłówku <b>location</b>.

![phase1]({{ site.url }}/assets/moj-problem-z-oauth2.0/phase1.svg){: .center-image }

Przeglądarka po otrzymaniu takiej odpowiedzi, przekierowuje na otrzymany adres.

![phase2]({{ site.url }}/assets/moj-problem-z-oauth2.0/phase2.svg){: .center-image }

<h1>2. Authorization Response</h1>

![phase3]({{ site.url }}/assets/moj-problem-z-oauth2.0/phase3.svg){: .center-image }

<p align="justify">
Jeśli właściciel zasobu wyrazi zgodę na dostęp, serwer autoryzacyjny odpowiada wiadomością HTTP z adresem redirect_uri w nagłówku <b>location</b>
z dwoma paramterami:
</p>
* `code=AUTHORIZATION_CODE` wartość, która zostanie 'wymieniona' na token dostępu,
* `state=hkj34kjh5lkj2` ta wartość musi być identyczna do tej wysłanej w zapytaniu.

Przeglądarka po otrzymaniu tej odpowiedzi wykonuje zlecone przekierowanie:

![phase4]({{ site.url }}/assets/moj-problem-z-oauth2.0/phase4.svg){: .center-image }

<h1>3. Access Token Request</h1>
<p align="justify">
Żeby klient uzyskał token dostępu, musi zaprezentować serwerowi autoryzującemu otrzymany kod autoryzacyjny. W tym celu wysyłane jest zapytanie do serwera autoryzacyjnego z następującymi parametrami:
</p>

* `grant_type=authorization_code` wartość stała dla tego scenariusza,
* `code=AUTHORIZATION_CODE` otrzymany w poprzednim kroku kod,
* `redirect_uri=REDIRECT_URI` adres zdefiniowany na etapie tworzenia aplikacji na serwerze autoryzującym,
* `client_id=CLIENT_ID` identyfikator otrzymany podczas rejestracji apliacji na serwerze autoryzującym,
* `client_secret=CLIENT_SECRET` klucz otrzymany podczas rejestracji apliacji na serwerze autoryzującym,

Adres po złożeniu:

```
https://api.oauth2server.com/token-endpoint?grant_type=authorization_code&?code=AUTHORIZATION_CODE&redirect_uri=REDIRECT_URI&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
```

Zapytanie wysyłane jest za pomocą metody HTTP POST.


![phase5]({{ site.url }}/assets/moj-problem-z-oauth2.0/phase5.svg){: .center-image }

<h1>4. Access Token Response</h1>
<p align="justify">
Jeżeli parametry zapytania się zgadzają, serwer autoryzacyjny wysyła do klienta token dostępu, wraz z jego datą ważności.
</p>


<p align="justify">
Taki token może być używany po to, żeby odpytywać z nim API o zasoby, których właścicielem jest użytkownik (np. jego listę kontaktów, zdjęcia, dane personalne...).
API po otrzymaniu zapytania z tokenem jest w stanie stwierdzić czy może udzielić dostępu do zasobu.

Celowo pominąłem tutaj problem niepowodzenia na poszczególnych etapach wymiany oraz problem tokenów odświeżających.
</p>
<h2>Do czego nie używać wygenerowanego tokenu dostępu?</h2>
<p align="justify">
W sekcji <b>Common pitfalls for authentication using OAuth</b> na stronie <a href="https://oauth.net/articles/authentication/">https://oauth.net/articles/authentication</a> znajduje się zakładka, w której można przeczytać o tym, że <b>nie należy traktować faktu uzyskania tokenu dostępu jako dowód na uwierzytelnienie.</b> Wydaje się to być zrozumiałe. Na tej samej stronie napisane jest, że można budować uwierzytelnianie użytkowników z OAuth 2.0, jeżeli użyje się protokołu <a href="http://openid.net/connect/">OpenID Connect</a>, który zbudowany jest własnie z pomocą OAuth 2.0.
</p>

<h2>Dlaczego programiści mają problem ze zrozumieniem OAuth 2.0?</h2>
<p align="justify">
Z jednej strony dostępne są bardzo obszerne materiały na oficjalnej stronie <a href="https://oauth.net/">OAuth 2.0</a>. Dostępne są dokumenty RFC, mówiące dokładnie o tym jak zbudowany jest protokół, dostępne są świetne posty na blogach dotyczące OAuth 2.0, jak choćby ten wspomniany przeze mnie wcześniej na <a href="https://aaronparecki.com/oauth-2-simplified/">https://aaronparecki.com/oauth-2-simplified</a>.
Z drugiej strony, można wejść na stronę
<a href="https://developers.facebook.com/docs/php/howto/example_facebook_login">https://developers.facebook.com/docs/php/howto/example_facebook_login</a> gdzie podane są poniższe przykłady 'logowania z Facebook':
</p>

<b>/login.php</b>

```php
$fb = new Facebook\Facebook([
  'app_id' => '{app-id}', // Replace {app-id} with your app id
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);

$helper = $fb->getRedirectLoginHelper();

$permissions = ['email']; // Optional permissions
$loginUrl = $helper->getLoginUrl('https://example.com/fb-callback.php', $permissions);

echo '<a href="' . htmlspecialchars($loginUrl) . '">Log in with Facebook!</a>';
```

<b>/fb-callback.php</b>

```php
$fb = new Facebook\Facebook([
  'app_id' => '{app-id}', // Replace {app-id} with your app id
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);

$helper = $fb->getRedirectLoginHelper();

try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

if (! isset($accessToken)) {
  if ($helper->getError()) {
    header('HTTP/1.0 401 Unauthorized');
    echo "Error: " . $helper->getError() . "\n";
    echo "Error Code: " . $helper->getErrorCode() . "\n";
    echo "Error Reason: " . $helper->getErrorReason() . "\n";
    echo "Error Description: " . $helper->getErrorDescription() . "\n";
  } else {
    header('HTTP/1.0 400 Bad Request');
    echo 'Bad request';
  }
  exit;
}

// Logged in
echo '<h3>Access Token</h3>';
var_dump($accessToken->getValue());

// The OAuth 2.0 client handler helps us manage access tokens
$oAuth2Client = $fb->getOAuth2Client();

// Get the access token metadata from /debug_token
$tokenMetadata = $oAuth2Client->debugToken($accessToken);
echo '<h3>Metadata</h3>';
var_dump($tokenMetadata);

// Validation (these will throw FacebookSDKException's when they fail)
$tokenMetadata->validateAppId({app-id}); // Replace {app-id} with your app id
// If you know the user ID this access token belongs to, you can validate it here
//$tokenMetadata->validateUserId('123');
$tokenMetadata->validateExpiration();

if (! $accessToken->isLongLived()) {
  // Exchanges a short-lived access token for a long-lived one
  try {
    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
  } catch (Facebook\Exceptions\FacebookSDKException $e) {
    echo "<p>Error getting long-lived access token: " . $helper->getMessage() . "</p>\n\n";
    exit;
  }

  echo '<h3>Long-lived</h3>';
  var_dump($accessToken->getValue());
}

$_SESSION['fb_access_token'] = (string) $accessToken;

// User is logged in with a long-lived access token.
// You can redirect them to a members-only page.
//header('Location: https://example.com/members.php');
```

<p align="justify">
Czytając ten kod, ciężko jest nie odnieść wrażenia, że Facebook proponuje dokładnie takie rozwiązanie, które odradza oficjalna strona OAuth 2.0. To znaczy, po uzyskaniu tokenu autoryzacyjnego i wymienieniu go na token dostępu, zakłada się, że użytkownik jest zalogowany w aplikacji. Wydaje mi się, że ciężko jest zrozumieć programistom działanie OAuth 2.0 i logowania w mediach społecznościowych, gdy informacje w sieci na ten temat są tak niespójne.
</p>
