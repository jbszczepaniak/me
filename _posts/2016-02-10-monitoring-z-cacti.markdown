---
layout: post
title:  "Monitoring z Cacti"
date:   2016-02-10 21:00:00 +0100
lang: pl
permalink: /pl/monitoring-z-cacti
featured-image: /assets/monitoring-z-cacti/cacti1.png
---
<p align="justify">
Celem niniejszego postu jest prezentacja uruchomienia monitoringu sieci domowej za pomocą Cacti (aplikacja wydana na licencji GPL). Monitoring będzie dostępny z Internetu dzięki usłudze DynamicDNS.
</p>
<!--more-->
![topology]({{ site.url }}/assets/monitoring-z-cacti/cacti1.png){: .center-image }

<p align="justify">
Cacti może być wykorzystywane w Network Opertions Center jako przydatne narzędzie do diagnoz awarii w sieci. Dzięki protokołowi SNMP, odpytuje monitorowane urządzenia i wyświetla zebrane informacje na wykresach. Oprócz obciążenia interfejsów sieciowch, można monitorować np. wykorzystanie procesora i pamięci w urządzniu. Po instalacji Cacti na Ubuntu 15.10, uruchomimy monitoring tej maszyny. Kolejnym krokiem będzie umożliwienie dostępu do aplikacji Cacti z Internetu.
</p>
<h4>Dygresja</h4>
<p align="justify">
W Ubuntu 15.10 wycofano konwencję nazewnictwa interfejsów eth0, eth1, eth2… Teraz nazwy przypominają te znane z RHEL. Wprowadzona konwencja nazywa się Predictable Network Interface Names. Dla interfejsów ethernet nazwa składa się z <code>en p <b>bus_nr</b> s <b>slot_nr</b></code>. Przewidywalność tej konwencji polega na tym, że nazwa odzwierciedla położenie sprzętu na szynie. Na przykład:
</p>

```bash
jedrzej@jedrzej-VirtualBox:~$ ifconfig | grep enp
enp0s3 Link encap:Ethernet HWaddr 08:00:27:16:a8:57
enp0s8 Link encap:Ethernet HWaddr 08:00:27:28:af:2e
enp0s9 Link encap:Ethernet HWaddr 08:00:27:0f:56:17
enp0s10 Link encap:Ethernet HWaddr 08:00:27:8e:bb:72

jedrzej@jedrzej-VirtualBox:~$ lspci | grep Ethernet
00:03.0 Ethernet controller:
00:08.0 Ethernet controller:
00:09.0 Ethernet controller:
00:0a.0 Ethernet controller:
```

<p align="justify">
W każdej linii za dwukroptkiem pojawiła się też nazwa użytego sprzętu Intel Corporation 82540EM Gigabit Ethernet Controller (rev 02).
</p>

<p align="justify">
Wracając do tematu. Instalacja Cacti zaczyna się od:
</p>
```bash
sudo apt-get install cacti
```
<p align="justify">
Jeżeli jakiś z elementów potrzebnych Cacti jest niezainstalowany, instalator Cacti go zainstaluje, w szczególności potrzebne są: serwer http i baza danych. Na rysunkach poniżej pokazane są kolejne kroki instalacji, w których należy skonfigurować dostęp do bazy danych i serwera.
</p>
![instalall1]({{ site.url }}/assets/monitoring-z-cacti/instalacja1.png){: .center-image }


![instalall2]({{ site.url }}/assets/monitoring-z-cacti/instalacja2.png){: .center-image }


![instalall3]({{ site.url }}/assets/monitoring-z-cacti/instalacja3.png){: .center-image }
<p align="justify">
Wykorzystałem MySQL i apache2, czyli ustawienia domyślne.
</p>

![instalall4]({{ site.url }}/assets/monitoring-z-cacti/instalacja4.png){: .center-image }


![instalall6]({{ site.url }}/assets/monitoring-z-cacti/instalacja6.png){: .center-image }


![instalall5]({{ site.url }}/assets/monitoring-z-cacti/instalacja5.png){: .center-image }


![instalall7]({{ site.url }}/assets/monitoring-z-cacti/instalacja7.png){: .center-image }
<p align="justify">
W kolejnym etapie należy wejść do przeglądarki i uruchomić aplikację Cacti. Na maszynie, na której zainstalowane jest Cacti wystarczy wejść na <code>http://127.0.0.1/cacti</code> albo <code>http://localhost/cacti</code>. Z maszyny hostującej, można uruchomić aplikację za pośrednictwem jej adresu interfejsu bridged. W moim przypadku <code>http://192.168.0.15/cacti</code>. W kolejnym etapie, należy skonfigurować Cacti, a następnie zalogować się na admin/admin i zmienić hasło administratora.
</p>

![instalall9]({{ site.url }}/assets/monitoring-z-cacti/instalacja9.png){: .center-image }


![instalall10]({{ site.url }}/assets/monitoring-z-cacti/instalacja10.png){: .center-image }


![instalall8]({{ site.url }}/assets/monitoring-z-cacti/instalacja8.png){: .center-image }


![instalall11]({{ site.url }}/assets/monitoring-z-cacti/instalacja11.png){: .center-image }


![instalall12]({{ site.url }}/assets/monitoring-z-cacti/instalacja12.png){: .center-image }

<p align="justify">
Po zalogowaniu się, w górnej częśi strony widać czerwoną zakładkę console i niebieską graphs. Pod tymi zakładkami znajduje się ścieżka do akutalnego „miejsca” w aplikacji. Wygodnie będzie mi odwołując się do różnych elementów podawać tę właśnie ścieżkę.
</p>
<p align="justify">
Natychmiast po zainstalowaniu, Cacti monitoruje pewne parametry urządzenia, na którym jest zainstalowane. Po wejściu do Graphs->Tree Mode, w Default Tree można kliknąć na localhost i obejrzeć wykresy zużycia pamięci, ilości zalogowanych użytkowników, ilości procesów w sytemie itp.
</p>
<p align="justify">
Na przykładzie maszyny, na której uruchomione jest Cacti można pokazać monitorowanie urządzeń z zainstalowanym linuxem. W tym celu, zainstalujemy na Ubuntu agenta SNMP, który używany jest przez Cacti do odpytywania urządzeń o ich parametry.
</p>
```bash
sudo apt-get install snmpd
```
<p align="justify">
W pliku <i>/etc/snmp/snmpd.conf</i> należy dodać linię rocommunity cacti. Należy też zrestartować usługę SNMP
</p>
```bash
sudo service snmpd restart
```
<p align="justify">
Teraz po uruchomieniu w aplikacji Cacti: Console -> Devices i kliknięciu na localhost, wybieramy wersję SNMP.
</p>

![choose-version]({{ site.url }}/assets/monitoring-z-cacti/wybor-wersji-snmp.png){: .center-image }

<p align="justify">
Po wybraniu wersji pojawi się do uzupełnienia opcja SNMP Community, która musi być zgodna z tym co zostało skonfigurowane w pliku <i>/etc/snmp/snmpd.conf</i>, wpisujemy więc cacti.
</p>
<p align="justify">
W dolnej części strony po prawej stronie klikamy Save. Po odświeżeniu strony, u góry powinny pojawić się szczegółowe informacje o maszynie Ubuntu zebrane przez SNMP.
</p>
```
SNMP Information
System:Linux jedrzej-VirtualBox 4.2.0-16-generic #19-Ubuntu SMP Thu Oct 8
15:35:06 UTC 2015 x86_64
Uptime: 48567 (0 days, 0 hours, 8 minutes)
Hostname: jedrzej-VirtualBox
Location: Sitting on the Dock of the Bay
Contact: Me me@example.org
```
<p align="justify">
Teraz możemy za pomocą SNMP zacząć monitorować interfejsy urządzenia. W dolnej części strony wybieramy:
</p>

![snmp-interfaces]({{ site.url }}/assets/monitoring-z-cacti/snmp-interfejsy.png){: .center-image }

<p align="justify">
i klikamy Add po prawej stronie. Następnie w górnej części strony wybieramy Create Graphs for this host. Przeniesieni zostajemy do strony, na której wylistowane są interfejsy urządzenia razem z ich adresami MAC i IP. Wybieramy interfejsy, które chcemy interesować i klikamy Create. Przechodzimy teraz do Console > Graph Management. Cacti zna już źródło danych, teraz należy stworzyć wykresy dla tych danych umieszczając je na jednym z drzew (tutaj w domyślnym).
</p>

![graph-mgmt]({{ site.url }}/assets/monitoring-z-cacti/graph-management.png){: .center-image }

<p align="justify">Po naciśnięciu Go na rysunku wyżej i przejściu do Graphs->Tree Mode, można obejrzeć statystyki zajętości interfejsów.</p>

![interface-monitor]({{ site.url }}/assets/monitoring-z-cacti/monitorowanie_interfejsow.png){: .center-image }
<p align="justify">
Uruchomiliśmy podstawowy monitoring urządzenia. Celem jest monitorowanie go z sieci publicznej. Najpierw jednak trzeba sprawdzić, czy monitoring możliwy jest w sieci prywatnej. Korzystamy z interfejsu Bridged, dlatego Ubuntu z uruchomionym Cacti otrzymał adres w tej samej sieci co maszyna hostująca. Można zatem z dowolnego urządzenia w sieci domowej uruchomić stronę, zalogować się i podejrzeć wykresy.
</p>
![from-ipad]({{ site.url }}/assets/monitoring-z-cacti/z-ipada.jpg){: .center-image }

<p align="justify">W kolejnym poście umożliwimy monitorowanie z sieci publicznej za pomocą DynamicDNS. Pokażę również co należy zrobić, żeby wykresy odświeżały się częściej niż co 5 minut.</p>