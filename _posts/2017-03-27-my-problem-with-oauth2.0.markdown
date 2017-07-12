---
layout: post
title:  "My problem with OAuth 2.0"
date:   2017-03-27 00:15:00 +0100
lang: en
permalink: /en/my-problem-with-oauth2
featured-image: /assets/moj-problem-z-oauth2.0/oauth-logo.png
---

How does OAuth 2.0 works with 'Authorization Code' grant type and why it is so hard for developrs to understand OAuth 2.0 protocol?
<!--more-->

<p align="justify">
I've tried to understand how OAuth 2.0 operates many times, but each time my conclusion was that this is to hard for me. But last time when someone asked me how does OAuth 2.0 works and the only think I was able to say was:</p>

> well, You know, this is this thing You use when You want to log user with Facebook


<p align="justify">
I've decided that this is the time when I'll learn this technology.
</p>

<p align="justify">
I went to <a href="https://oauth.net/2/">the offical website of OAuth2.0</a> immediately and I've started to read. It is strongly emphasized in the documentaion that the OAuth2.0 protocol should be used for authorization and <b>not for authentication</b>. The difference between those two notions you can find <a href="https://en.wikipedia.org/wiki/Authentication">here</a>. OAuth 2.0 offers different use cases. For each use case there is an individual <b>grant type</b>. So we have the following types:</p>
<ol>
    <li>Authorization Code,</li>
    <li>Password,</li>
    <li>Client credentials,</li>
    <li>Implicit.</li>
</ol>

<p align="justify">
About all scenarios one can read on fantastic, comprehensible blog post: <a href="https://aaronparecki.com/oauth-2-simplified">https://aaronparecki.com/oauth-2-simplified</a>. I will focus on the first scenario because it is sufficent to show an absurd which I found while reading about OAuth2.0.</p>

<p align="justify">
OAuth 2.0 defines roles which are involved in tokens exchange:
</p>
<ol>
    <li>API - server, with resources to which access one want to have an access,</li>
    <li>client - server, which wants to have an access to resources from point 1,</li>
    <li>authorization server,</li>
    <li>resource owner.</li>
</ol>

<p align="justify">
It is not unusual that authorization server and server with resources are sitting on the same machine, but from perspective of OAuth 2.0 those are two different entities, and we will treat them separately here. The server which is called here a "client" is a regular application server with application written in PHP, ASP.NET, Ruby on Rails...
</p>

<p align="justify">
To enable communication with API of interest (for example with Graph API from Facebook), one has to register the appliaction (in case of Facebook on <a href="https://developers.facebook.com/">https://developers.facebook.com</a>). During registration, address on which application should redirect user must be provided. The result of a registration is client id as well as client secret which will be used during requests to authorization server. Keys should be hold in secret on the back-end of application (from perspective of Auth 2.0, this back-end is called the client).
</p>

<h2>Actural authorization with 4 messages</h2>
<ol>
    <li>Authorization Request</li>
    <li>Authorization Response</li>
    <li>Access Token Request</li>
    <li>Access Token Response</li>
</ol>

<h1>1. Authorization Request</h1>
<p align="justify">
URI is prepared - address under which authorization server will display for the user (the owner of the resource) question, whether user agrees to grant access to protected resource to the client. URI consist of: 
</p>

* `response_type=grant` constant value for this scenario,
* `client_id=CLIENT_ID` identification obtained during registration of app on authorization server,

* `redirect_uri=REDIRECT_URI` address of redirection after confirmitation from user that he or she is granting access to resource (defined during app registration on authorization server),
* `scope=user_account` scope of resources to which access is granted,
* `state=hkj34kjh5lkj2` random value used for CSRF protection.

After address assembly, it should look like this (formatting added for clarity):

```
https://oauth2-authorization-server.com/endpoint?
    response_type=grant&
    client_id=CLIENT_ID&
    redirect_uri=REDIRECT_URI&
    scope=user_account&
    state=hkj34kjh5lkj2
```

Assembled address is sent in response to the browser in <b>location</b> header.

![phase1_eng]({{ site.url }}/assets/my-problem-with-oauth2.0/phase1_eng.svg){: .center-image }

After receiving such response, browser redirects to given url.

![phase2_eng]({{ site.url }}/assets/my-problem-with-oauth2.0/phase2_eng.svg){: .center-image }

<h1>2. Authorization Response</h1>

![phase3_en]({{ site.url }}/assets/my-problem-with-oauth2.0/phase3_en.svg){: .center-image }

<p align="justify">
If the owner of resource will grant access to resource, authorization server will answer with HTTP response with redirect_uri address in <b>location</b> header with two parameter:</p>

* `code=AUTHORIZATION_CODE` value which will be 'exchanged' for access token,
* `state=hkj34kjh5lkj2` value which must be identical to one sent in authorization request.

The browser upon receiving such answer, makes a redirection ordered by authorization server:

![phase4_en]({{ site.url }}/assets/my-problem-with-oauth2.0/phase4_en.svg){: .center-image } 

<h1>3. Access Token Request</h1>
<p align="justify">
In order to obtain access token, client must present to the authorization server receivede authorization code. To do that, client sends to the authorization server request with following parameters:
</p>

* `grant_type=authorization_code` constant value for this scenario,
* `code=AUTHORIZATION_CODE` received in previous step,
* `redirect_uri=REDIRECT_URI` address defined during app registration on authorization server,
* `client_id=CLIENT_ID` identificator received during app registration on authorization server,
* `client_secret=CLIENT_SECRET` identificator received during app registration on authorization server.

After address assembly, it should look like this (formatting added for clarity):

```
https://api.oauth2server.com/token-endpoint?
    grant_type=authorization_code&
    code=AUTHORIZATION_CODE&
    redirect_uri=REDIRECT_URI&
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET
```

Request is sent via HTTP POST method.










