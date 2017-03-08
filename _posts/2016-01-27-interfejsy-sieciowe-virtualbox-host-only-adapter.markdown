---
layout: post
title:  "Interfejsy sieciowe VirtualBox - Host-only Adapter"
date:   2016-01-27 21:00:00 +0100
lang: pl
permalink: /pl/interfejsy-sieciowe-virtualbox-host-only-adapter
featured-image: /assets/host-only-adapter/host-only-network1.png
---
<p align="justify">
Jedną z możliwości ustawienia interfejsu sieciowego w VirtualBox jest Host-only Adapter. Host-only, czyli maszyna wirtualna ma mieć za pośrednictwem takiego połączenia dostęp tylko do maszyny hostującej.
</p>
<!--more-->
<p align="justify">
Na rysunku poniżej przedstawiono przykładową konfgurację, którą można uzyskać za pomocą interfejsów Host-only:
</p>
![topology]({{ site.url }}/assets/host-only-adapter/host-only-network1.png){: .center-image }

<p align="justify">
VirtualBox daje większe możliwości konfiguracyjne niż darmowa wersja VMware Workstation. Za jego pomocą można np. definiować w łatwy sposób pulę adresów jakie ma przydzielać serwer DHCP (dostępny domyślnie w sieci wirtualnej).
</p>
<p align="justify">
Przełączniki Host-only Network Adapter widoczne na rysunku są wirtualne. W celu uruchomienia takiego przełącznika należy na maszynie hostującej włączyć interfejs  typu Host-only. Nazewnictwo może być tutaj mylące. Tworzony jest interfejs, ale reprezentuje on wirtualny przełącznik, o którym można myśleć jako o wirtualnej sieci.
</p>
<p align="justify">
Uruchomienie wirtualnego przełącznika dla VirtualBox na Windows 10:
</p>
<p align="justify">
<b>1) Uruchomienie programu dodającego sprzęt Hardware Wizard</b>
</p>
![hdwwiz]({{ site.url }}/assets/host-only-adapter/hdwwiz.png){: .center-image }

<p align="justify">
    <b>
    2) Wybranie zaawansowanej instalacji i w kolejnym kroku wybranie rodzaju sprzętu jaki ma zostać dodany (Network Adapter)
    </b>
</p>
![hdwwiz2]({{ site.url }}/assets/host-only-adapter/hdwwiz2.png){: .center-image }

<p align="justify">
    <b>
    3) Odnalezienie producenta sprzętu i typu sprzętu
    </b>
</p>
![hdwwiz3]({{ site.url }}/assets/host-only-adapter/hdwwiz3.png){: .center-image }

<p align="justify">
Po ukończeniu instalacji w Network Connections widoczny będzie nowy interfejs
</p>
![networkadapters]({{ site.url }}/assets/host-only-adapter/networkaapteres.png){: .center-image }

<p align="justify">
Po włączeniu preferencji w VirtualBox <code>(Ctrl + G)</code> i wybraniu działu dotyczącego sieci, a następnie zakładki Host-only, dodany wcześnej interfejs jest widoczny.
</p>

![vboxpreferences]({{ site.url }}/assets/host-only-adapter/vboxpreferences.png){: .center-image }

<p align="justify">
Istnieje druga metoda dodawania wirtualnych przełączników dla VirtualBox. Należy w tym celu kliknąć na "+" widoczny po prawej stronie na rysunku wyżej. Kroki 1-3 opisane wcześniej wykona za nas VirtualBox. Warto mieć jednak świadomość tego, że mamy do czynienia z faktycznym (choć wirtualnym) sprzętem. W efekcie widoczny będzie drugi interfejs.
</p>
![vboxpreferenceswith2]({{ site.url }}/assets/host-only-adapter/vboxpreferenceszdwoma.png){: .center-image }

<p align="justify">
W Network Connections drugi interfejs też jest widoczny.
</p>
![networkadapters-z-hdwwiz-i-z-vbox]({{ site.url }}/assets/host-only-adapter/networkadapters-z-hdwwiz-i-z-vbox.png){: .center-image }

<p align="justify">
Nazewnictwo interfejsów jest różne i nie zależy od tego jaką metodą interfejs został utworzony (na co mógłby wskazywać powyższy przykład). Często zdarza sie, że interfejsy są nazywane jako Ethernet z numerem porządkowym. VirtualBox korzysta z takiego nazewnictwa jakie jest w Network Connections w kolumnie Device Name.
</p>
<p align="justify">
Dwukrotne kliknięcie w sieciowych preferencjach VirtualBoxa w dany interfejs spowoduje otwarcie okna zakładkami Adapter i DHCP Server.
</p>
![ustawienia-host-only-adaptera]({{ site.url }}/assets/host-only-adapter/ustawienia-host-only-adaptera.png){: .center-image }

<p align="justify">
Adapter dotyczy adresu, jaki będzie mieć w wirtualnej sieci maszyna hostująca, co łatwo można sprawdzić wydając komendę ipconfig na niej (maszynie hostującej).
</p>
![ethernet-adapter]({{ site.url }}/assets/host-only-adapter/ethernet-adapter.png){: .center-image }

<p align="justify">
W zakładce DHCP Server należy wybrać parametry wirtualnego serwera DHCP, który jest udostępniony przez VirtualBox.
</p>

![ustawienie-dhcp]({{ site.url }}/assets/host-only-adapter/ustawienie-dhcp.png){: .center-image }

<p align="justify">
Dla VirtualBox Host-only Network Adapter #2 przeprowadzona została analogiczna konfiguracja - zamiast 56 w trzecim oktecie jest 100, reszta pozostaje bez zmian.
</p>
<p align="justify">
W preferencjach VirtualBoxa zmieniać można ustawienia warstwy 3. Jednak, żeby spowodować, że wirtualna maszyna zostanie podłączona do wirtualnej sieci, należy maszynie przypisać interfejs, z którego ma korzystać.
</p>

![ustaweniasieciowe-hosta]({{ site.url }}/assets/host-only-adapter/ustaweniasieciowe-hosta.png){: .center-image }

<p align="justify">
W VirtualBoxie, każdej maszynie można przypisać 4 interfejsy. Pierwszy zazwyczaj konfigurowany jest automatycznie przez VirtualBox jako NAT i zapewnia łączność z Internetem. Na rysunku powyżej pokazano konfigurację interfejsu Adapter 2 w trybie Host-only. Name wskazywać musi na sieć, do której ma zostać przyłączona maszyna. VirtualBox rozpoznaje nazwy tylko jako "VirtualBox Host-only Ethernet Adapter (#nr)". Jeżeli podczas instalowania interfejsu otrzymał on nazwę typu "Ethernet (nr)", należy upewnić się, który interfejs ma jaką konfigurację. W ustawieniach zaawansowanych Adapter Type oznacza jakiego rodzaju sprzęt ma zostać użyty i VirtualBox potrafi automatycznie rozpoznać odpowiednie ustawienie. Promiscuous Mode dotyczy tego, jakie ramki mają być przechwytywane przez interfejs. Po ustawieniu Deny, procesor maszyny wirtualnej przetwarzać będzie jedynie ramki, których adres docelowy wskazuje na to, że są przeznaczone dla tej maszyny. Allow VMs oznacza, że procesor przetworzy wszystkie ramki pochodzące od maszyn wirtualnych, a Allow All, że przetworzone zostaną wszystkie otrzymane ramki. Przetwarzanie wszystkich ramek może być przydatne, jeżeli chce się monitorować pakiety w sieci (np. za pomocą programu Wireshark). MAC Address można wybrać prawie dowolnie. VirtualBox nie pozwoli na przykład na ustawienie adresu MAC, który oznacza, że jest to adres Multicast (1 w najmniej znaczącym bicie pierwszego oktetu aresu). Pole Cable Connected musi być zaznaczone, po odznaczeniu interfejs zostanie odłączony. Opcja Port Forwarding nie jest dostępna dla interfejsów Host-only.
</p>
<p align="justify">
Adapter 3 skonfigurowany został w analogiczny sposób - zmieniony został jedynie adres MAC.
</p>
<p align="justify">
Na maszynie wirtualnej, która ma podłączony interfejs NAT i dwa interfejsy Host-only, konfiguracja sieciowa widoczna jest jak na rysunku poniżej.
</p>

![widoczne-z-ubuntu]({{ site.url }}/assets/host-only-adapter/widoczne-z-ubuntu.png){: .center-image }

<p align="justify">
Na czerwono zaznaczono znaczące elementy. Oba interfejsy otrzymały pierwszy adres z puli adresów udostępnianych przez serwer DHCP dla każdej z sieci. Rysunek na początku postu zakładał, że nie będzie połączenia z internetem, ale to dodatkowy element, poza którym, konfiguracja wygląda jak na rysunku. Żeby sprawdzić, że maszyna hostująca jest połączona z maszyną wirtualną poprzez dwa przełączniki, można spróbować zalogować się za pomocą SSH na adres <code>192.168.56.101</code> i <code>192.168.100.101</code>.
</p>

![ssh-do-maszyny]({{ site.url }}/assets/host-only-adapter/ssh-do-maszyny.png){: .center-image }

<p align="justify">
Dobrze widać, że do maszyny zalogowano się z dwóch różnych adresów, mimo tego, że to ta sama maszyna.
</p>
<p align="justify">
Jeżeli na maszynie wirtualnej zainstalowany jest Linux Ubuntu i wcześniej nie używano SSH do połączeń z nią, trzeba przeprowadzić instalację za pomocą:
</p>
```bash
sudo apt-get install openssh-server
```
<p align="justify">
Po instalacji należy restartować usługę ssh:
</p>
```bash
sudo service ssh restart
```
<p align="justify">
Jeżeli powiedzie się zalogowanie na maszynie wirtualnej na adres loopback (wszystkie spośród podanych czterech metod robią to samo):
</p>
```bash
ssh <nazwa_uzytkownika>@127.0.0.1
ssh <nazwa_uzytkownika>@localhost
ssh -l <nazwa_uzytkownika> 127.0.0.1
ssh -l <nazwa_uzytkownika> localhost
```
<p align="justify">
to sukcesem powinno zakończyć się też połączenie z maszyny hostującej na wirtualną.
</p>