# Proposal Programmeerproject 2016
## Data visualisatie over de economische intergatie van Europa
----------------------

#### Idee
Europa is een fascinerend continent. Het heeft op een relatief klein gebied veel landen en kent zo een hoge diversiteit. De landen verschillen onderling, maar toch is er vanaf de Tweede Wereldoorlog een beweging van toenemende samenwerking op verschillende fronten. Het meest sprekende voorbeeld hiervan is de Europese Unie. Deze visualisatie laat met drie hoofdvariabelen zien hoe Europa is geïntergreerd.
1. Export en import van goederen en diensten binnen Europa (in € natuurlijk)
2. Export en import vqn arbeid (het aantal mensen dat in een ander Europees land werkt)
3. Het aantal mensen dat binnen Europa emigreert
#### Startscherm
Een kaart van Europa is te zien wanneer de gebruiker de pagina opent. Hierop is per land de verhouding weergegeven - in staafdiagrammen - tussen de import en export met de rest van Europa in 2015 (zie figuur 1).
![Overview](/doc/1.JPG)
Daaronder is een grafiek te zien van de import en export van goederen en diensten van Nederland (als default) over de tijd geplot. Hierin zijn crises en toetreding tot de EU (in het geval van Nederland de oprichting van de EGKS) weergegeven.
#### Interactiviteit
Bij de bovenste kaart is het mogelijk op een land te klikken. Ten eerste worden dan vanuit dat land lijnen getrokken met een dikte die correspondeert met de grootte van de c.q. goederenstroom (zie Figuur 2).
![lijnen vanuit selectie](/doc/2.jpeg)
 Ten tweede zie je ernaast enige basale informatie over het land genoemd en het verloop van import en export van goederen en diensten over de tijd geplot. Deze grafiek is een verkleinde versie van de grafiek die onder de kaart staat. Er kan overheen gehoverd worden om specifieke datapunten te zien (zie figuur 3). 
 ![zoom op selectie](/doc/3.jpeg)
 De grafiek kan echter ook worden gesleept naar de grafiek eronder waardoor de data van dat land aan de onderste grafiek wordt toegevoegd. Er kan ook door middel van checkboxes onder de grafiek worden aangegeven welke landen worden weergegeven. Er zijn ook voorgeprogrammeerde selecties om bijvoorbeeld direct Oost-Europa te vergelijken met elkaar (zie figuur 4).
 ![Grafiek](/doc/4.jpeg)
Als default worden op zowel de kaart, als de grafiek de data getoond van goederen en diensten. Het is echter bij beide mogelijk om een andere variabele te laten zien. Door middel van buttons kan de gebruiken switchen. Wanneer de bovenste een andere variabele heeft dan de onderste en er wordt vanuit de bovenste een land naar de grafiek gesleept, past de onderste zich aan aan de bovenste. Als laatste is het zo dat de kaart staafdiagrammen laat zien van een bepaald jaar. Door middel van een slider is het mogelijk aan te passen welk jaar de staafdiagrammen representeren. 

#### Extra ideeën
Extra toevoegingen aan de visualisatie zouden eveneens toevoegingen van extra data zijn. het is bijvoorbeeld mogelijk om de import en export van goederen en diensten te laten zien per sector. Ook zouden landen gekleurd kunnen worden naar de aard van hun economie. Het liefst doe ik echter het eerste: zorgen dat het mogelijk is om verder in te zoomen op data in plaats van een nog overweldigender overview te geven. 
>Overview first, zoom and filter, then details on demand. (Schneiderman, 1996)

Dit mantra zie ik als de basis van elke visualisatie. In dit voorstel ligt de nadruk vooralsnog het meeste op overview en zoom and filter. Bij uitbreiding van het voorstel zou ik daarom het liefst ingaan op het laatse: detail. 

#### Referenties
1.  Shneiderman, B. (1996, September). The eyes have it: A task by data type taxonomy for information visualizations. In Visual Languages, 1996. Proceedings., IEEE Symposium on (pp. 336-343). IEEE.