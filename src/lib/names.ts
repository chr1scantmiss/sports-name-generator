// Name pools for nationality-aware generation.
// Keep lists reasonably sized for bundle; they’re sampled randomly.

export const FIRST_NA = [
  // North America (use for USA/Canada/college-style)
  "James","Michael","Christopher","Matthew","Andrew","Daniel","Joseph","Ryan","Brandon","Tyler",
  "Jacob","Ethan","Noah","Liam","Logan","Aiden","Elijah","Owen","Caleb","Jordan","Jason","Kevin",
  "Jonathan","Anthony","Nathan","Evan","Cole","Dylan","Austin","Zachary","Marcus","Justin","Bryce",
  "Carter","Mason","Connor","Hunter","Colton","Gavin","Elliot","Nolan","Hayden","Parker"
];

export const LAST_NA = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Walker","Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores",
  "Green","Adams","Nelson","Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts",
  // sprinkle a few common Canadian surnames
  "Bouchard","Lambert","Gagnon","Tremblay","Roy","Lefebvre","Moreau"
];

// ——— Regional pools ———

// Romance (Spain/Latin America – Spanish)
const FIRST_SPANISH = ["Alejandro","Carlos","Diego","Eduardo","Fernando","Javier","Luis","Manuel","Miguel","Pablo","Sergio","Álvaro","Hugo","Nicolás","Tomás","Matías","Joaquín","Andrés","Gabriel"];
const LAST_SPANISH  = ["García","Fernández","González","Rodríguez","López","Martínez","Sánchez","Pérez","Gómez","Díaz","Silva","Reyes","Rojas","Castro","Méndez","Vargas","Romero","Navarro","Ibarra","Arias"];

// Portuguese (Brazil/Portugal)
const FIRST_PORT = ["Bruno","Carlos","Daniel","Eduardo","Felipe","Gustavo","Henrique","João","Lucas","Marcos","Mateus","Paulo","Rafael","Thiago","Vitor","Leonardo","Pedro","Caio","André","Diego"];
const LAST_PORT  = ["Silva","Santos","Oliveira","Souza","Rodrigues","Fernandes","Almeida","Gomes","Costa","Ribeiro","Carvalho","Pereira","Araujo","Barbosa","Melo","Castro","Cardoso","Teixeira","Lima","Moreira"];

// French (France, francophone Africa/Caribbean base + specific pools below)
const FIRST_FRENCH = ["Antoine","Baptiste","Clément","Damien","Emile","Étienne","Hugo","Julien","Lucas","Mathis","Noé","Quentin","Raphaël","Théo","Tristan","Yann","Adrien","Louis","Maxime","Nicolas"];
const LAST_FRENCH  = ["Dupont","Durand","Moreau","Lefèvre","Fournier","Lambert","Rousseau","Vincent","Muller","Faure","Mercier","Blanc","Garnier","Chevalier","Francois","Boyer","Gauthier","Perrin","Renard","Fontaine"];

// Germanic (Germany/Austria/Switzerland/Belgium‑DE)
const FIRST_GERMAN = ["Lukas","Finn","Jonas","Leon","Niklas","Tobias","Felix","Tim","Johannes","Maximilian","Paul","David","Simon","Jan","Moritz","Noah","Ben","Philipp","Matthias","Stefan"];
const LAST_GERMAN  = ["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Hoffmann","Schäfer","Koch","Bauer","Richter","Klein","Wolf","Neumann","Schwarz","Zimmermann","Braun","Krüger"];

// Italian
const FIRST_ITALIAN = ["Alessandro","Andrea","Antonio","Davide","Fabio","Francesco","Gabriele","Lorenzo","Luca","Marco","Matteo","Michele","Nicola","Paolo","Pietro","Riccardo","Simone","Tommaso","Stefano","Roberto"];
const LAST_ITALIAN  = ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Gallo","Costa","Fontana","Moretti","Conti","De Luca","Lombardi","Barbieri","Giordano","Mancini","Colombo","Ricci","Marino","Greco"];

// Dutch/Belgian‑NL
const FIRST_DUTCH = ["Daan","Sem","Luuk","Jesse","Lars","Thijs","Bram","Timo","Niels","Koen","Ruben","Sven","Jasper","Guus","Jens","Milan","Sam","Max","Tom","Nick"];
const LAST_DUTCH  = ["de Jong","Jansen","de Vries","van den Berg","van Dijk","Bakker","Visser","Smit","Meijer","de Boer","Mulder","Bos","Peters","Hendriks","van Leeuwen","van der Meer","Vos","Kok","Willems","van Dam"];

// Nordic (Denmark/Norway/Sweden/Iceland/Finland pops handled with this & Finn/Est below)
const FIRST_NORDIC = ["Anders","Erik","Lars","Karl","Henrik","Jonas","Magnus","Nils","Oskar","Per","Sven","Tobias","Viktor","Mikael","Johan","Emil","Filip","Rasmus","Elias","Mats"];
const LAST_NORDIC  = ["Johansson","Andersen","Hansen","Larsen","Olsen","Nielsen","Eriksson","Berg","Lund","Svensson","Iversen","Dahl","Pedersen","Gustafsson","Jakobsen","Halvorsen","Magnussen","Hagen","Kristensen","Bergström"];

// Finnish/Estonian
const FIRST_FIEE = ["Mikko","Jari","Juho","Antti","Sami","Eero","Petri","Ville","Timo","Joonas","Risto","Ari","Heikki","Kalle","Aleksi","Marko","Arto","Taneli","Tuomas","Rasmus"];
const LAST_FIEE  = ["Korhonen","Virtanen","Mäkinen","Nieminen","Mäkelä","Laine","Heikkinen","Kinnunen","Salonen","Oja","Tamm","Saar","Kask","Pärn","Mets","Kalda","Toom","Sild","Vaher","Valk"];

// Slavic (Poland/Czech/Slovakia/Ukraine/Russia/Belarus etc.)
const FIRST_SLAVIC = ["Jakub","Jan","Adam","Tomasz","Mateusz","Marek","Petr","Lukáš","Ondřej","Miroslav","Jiří","Kamil","Filip","Dominik","Radek","Viktor","Daniel","Pavel","Andriy","Dmytro"];
const LAST_SLAVIC  = ["Nowak","Kowalski","Wiśniewski","Novák","Svoboda","Dvořák","Zieliński","Szymański","Mazur","Kaczmarek","Kučera","Procházka","Urban","Král","Janković","Petrović","Ivanov","Volkov","Shevchenko","Kovalenko"];

// Balkan South Slavic (Bosnia/Croatia/Serbia/Montenegro/N. Macedonia)
const FIRST_BALKAN = ["Marko","Nikola","Milan","Luka","Stefan","Petar","Aleksandar","Nemanja","Miloš","Vladimir","Dario","Ante","Ivan","Josip","Matej","Tomislav","Zoran","Goran","Bojan","Dragan"];
const LAST_BALKAN  = ["Jovanović","Petrović","Nikolić","Kovačević","Ilić","Marković","Stojanović","Bogdanović","Knežević","Kovačić","Horvat","Radić","Matić","Vuković","Milinković","Vrbanac","Barišić","Perković","Antić","Nastić"];

// Greek
const FIRST_GREEK = ["Giorgos","Kostas","Dimitris","Nikolas","Vasilis","Petros","Andreas","Christos","Stavros","Theodoros","Ioannis","Alexandros","Panagiotis","Antonis","Spyros","Marios"];
const LAST_GREEK  = ["Papadopoulos","Papadakis","Nikolaou","Georgiou","Vasileiou","Papanikolaou","Karagiannis","Kostopoulos","Giannopoulos","Athanasios","Spanos","Manolis","Kouris","Makris","Lazaridis","Antoniou"];

// Turkish
const FIRST_TURK = ["Ahmet","Mehmet","Mustafa","Ali","Hüseyin","Hasan","İbrahim","Yusuf","Emre","Murat","Kemal","Furkan","Berk","Oğuz","Arda","Serkan","Onur","Tolga","Burak"];
const LAST_TURK  = ["Yılmaz","Kaya","Demir","Şahin","Çelik","Yıldız","Yıldırım","Öztürk","Aydın","Arslan","Doğan","Kılıç","Aslan","Kurt","Koç","Erdoğan","Aksoy","Polat","Avcı","Sezer"];

// Caucasus
const FIRST_ARMEN = ["Arman","Gevorg","Hayk","Tigran","Vardan","Ara","Levon","Artur","Gor","Stepan"];
const LAST_ARMEN  = ["Petrosyan","Grigoryan","Harutyunyan","Karapetyan","Sargsyan","Hovhannisyan","Vardanyan","Avetisyan","Hakobyan","Ghazaryan"];
const FIRST_GEORG = ["Giorgi","Irakli","Levan","Mikheil","Davit","Zurab","Tornike","Nika","Shota","Lasha"];
const LAST_GEORG  = ["Beridze","Giorgadze","Lomidze","Kharazishvili","Gelashvili","Kiknadze","Tsiklauri","Japaridze","Papashvili","Tsereteli"];
const FIRST_AZERI = ["Ali","Murad","Kanan","Rashad","Nijat","Ilgar","Samir","Emin","Orkhan","Rauf"];
const LAST_AZERI  = ["Aliyev","Mammadov","Huseynov","Hasanov","Ibrahimov","Guliyev","Ismayilov","Rzayev","Rahimov","Mustafayev"];

// Israel / Middle East (Hebrew/Arabic blend kept short)
const FIRST_ISRAEL = ["Omri","Deni","Yotam","Noam","Itay","Ariel","Tal","Gal","Amit","Shai"];
const LAST_ISRAEL  = ["Cohen","Levi","Mizrahi","Biton","Peretz","Haddad","Azoulay","Ben‑David","Ben‑Ami","Dayan"];

// East Asia
const FIRST_CHINA = ["Yao","Jian","Wei","Jun","Ming","Bo","Lei","Qiang","Tao","Hao"];
const LAST_CHINA  = ["Wang","Zhang","Li","Liu","Chen","Yang","Huang","Zhao","Wu","Zhou"];
const FIRST_JPN   = ["Rui","Yuta","Daichi","Kenta","Tatsuya","Haruki","Kazuki","Sota","Ren","Taiga"];
const LAST_JPN    = ["Suzuki","Sato","Takahashi","Tanaka","Watanabe","Ito","Yamamoto","Nakamura","Kobayashi","Kato"];
const FIRST_KOR   = ["Seung","Min‑jae","Ji‑hoon","Hyun","Dong‑wook","Jae‑won","Sung","Jin‑woo","Tae‑yong","Yong‑ho"];
const LAST_KOR    = ["Kim","Lee","Park","Choi","Jung","Kang","Cho","Yoon","Jang","Lim"];
const FIRST_TWN   = ["Wei‑Chen","Chia‑Hao","Yu‑Hsuan","Chih‑Hao","Po‑Wei","Chun‑Hao","Yi‑Hao","Kun‑Lin","Chia‑Wei","Chih‑Wei"];
const LAST_TWN    = ["Chen","Lin","Huang","Chang","Liu","Wang","Tsai","Yang","Wu","Hsu"];

// Oceania (Australia/New Zealand)
const FIRST_OCE   = ["Lachlan","Cooper","Jackson","Harrison","Ethan","Callum","Josh","Ben","Jai","Tyrese","Taika","Liam","Logan","Noah","Caleb"];
const LAST_OCE    = ["Smith","Jones","Williams","Brown","Wilson","Johnson","Taylor","Miller","Martin","Thompson","Walker","White","Clark","Harris","Lewis"];

// Caribbean – English
const FIRST_CAR_EN = ["Andre","Dwayne","Shane","Akeem","Jamal","Keon","Ricardo","Troy","Dwight","Nicholas","Kemar","Delroy","Marlon","Devon","Trevor"];
const LAST_CAR_EN  = ["Williams","Johnson","Brown","Campbell","Allen","Miller","Thompson","Roberts","Clarke","Grant","Lewis","Gordon","Davis","Henry","Stewart"];

// Caribbean – Spanish (DR, Puerto Rico, Cuba)
const FIRST_CAR_ES = ["Alfonso","Bryan","Cristian","Erik","Felix","Jorge","José","Luis","Manuel","Rafael","Yamil","Yonel"];
const LAST_CAR_ES  = ["Alvarado","Barea","Vásquez","Santos","Hernández","Sánchez","Cruz","Rivera","García","Rodríguez","Martínez","Pérez"];

// West Africa (anglophone) – Nigeria/Ghana/Liberia/Sierra Leone
const FIRST_WAF_EN = ["Chinedu","Chukwu","Emeka","Ike","Kelechi","Uche","Tunde","Kwame","Kofi","Yaw","Femi","Sola","Seyi","Ade","Baba"];
const LAST_WAF_EN  = ["Okafor","Okoye","Ogunleye","Adebayo","Adeyemi","Oladipo","Akinwale","Mensah","Boateng","Owusu","Frimpong","Addo","Appiah","Tetteh","Kargbo"];

// West/Central Africa (francophone) – Cameroon/Senegal/Mali/Gabon/CAR/Côte d’Ivoire
const FIRST_WAF_FR = ["Cheikh","Mamadou","Ibrahima","Abdoulaye","Ousmane","Babacar","Moussa","Ismaël","Souleymane","Serge","Pascal","Joel","Franck","Stephane"];
const LAST_WAF_FR  = ["Ndiaye","Diop","Sarr","Dieng","Cissé","M'Baye","Traoré","Diallo","Doumbia","Konaté","Camara","Embalo","Tchami","Gueye","Faye"];

// North Africa (Arabic) – Egypt/Tunisia
const FIRST_NAF_AR = ["Alaa","Ahmed","Mohamed","Hassan","Mahmoud","Mostafa","Karim","Youssef","Tarek","Rami"];
const LAST_NAF_AR  = ["Abdelnaby","Haddadi","Hassan","Abdelaziz","Saleh","Farouk","Nagy","Saad","Khalil","Fathy"];

// Southern Africa (English) – South Africa/Zimbabwe
const FIRST_SAF_EN = ["Jason","Bradley","Darren","Grant","Shane","Ryan","Dean","Kyle","Shaun","Clinton"];
const LAST_SAF_EN  = ["Anderson","Botha","Naidoo","Pietersen","van der Merwe","Moyo","Ndlovu","Dlamini","Sibanda","Mhlanga"];

// Generic fallback
export const FIRST_INTL_GENERIC = ["Niko","Jonas","Dario","Marco","Thiago","Mateo","Pedro","Enzo","Leo","Hugo","Anton","Roman","Milan","Emil","Omar","Youssef","Soren","Magnus","Filip","Zoran"];
export const LAST_INTL_GENERIC  = ["Fernandez","Alvarez","Silva","Costa","Rossi","Bianchi","Dubois","Lefevre","Kovacs","Novak","Horvat","Popov","Ivanov","Vasilev","Hassan","Aziz","Lund","Hansen","Petrov","Markovic"];

// ——— Country → Pool mapping ———

type Pool = { first: string[]; last: string[] };

export const NAME_POOLS: Record<string, Pool> = {
  // Africa
  "Angola": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "Cameroon": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "Central African Republic": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "Côte d’Ivoire": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "Egypt": { first: FIRST_NAF_AR, last: LAST_NAF_AR },
  "Gabon": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "Ghana": { first: FIRST_WAF_EN, last: LAST_WAF_EN },
  "Liberia": { first: FIRST_WAF_EN, last: LAST_WAF_EN },
  "Mali": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "Nigeria": { first: FIRST_WAF_EN, last: LAST_WAF_EN },
  "Senegal": { first: FIRST_WAF_FR, last: LAST_WAF_FR },
  "South Africa": { first: FIRST_SAF_EN, last: LAST_SAF_EN },
  "South Sudan": { first: FIRST_WAF_EN, last: LAST_WAF_EN },
  "Sudan": { first: FIRST_WAF_EN, last: LAST_WAF_EN },
  "Tunisia": { first: FIRST_NAF_AR, last: LAST_NAF_AR },
  "Zimbabwe": { first: FIRST_SAF_EN, last: LAST_SAF_EN },

  // Americas (non‑USA)
  "Argentina": { first: FIRST_SPANISH, last: LAST_SPANISH },
  "Bahamas": { first: FIRST_CAR_EN, last: LAST_CAR_EN },
  "Brazil": { first: FIRST_PORT, last: LAST_PORT },
  "Canada": { first: FIRST_NA, last: LAST_NA },
  "Cuba": { first: FIRST_CAR_ES, last: LAST_CAR_ES },
  "Dominican Republic": { first: FIRST_CAR_ES, last: LAST_CAR_ES },
  "Jamaica": { first: FIRST_CAR_EN, last: LAST_CAR_EN },
  "Mexico": { first: FIRST_SPANISH, last: LAST_SPANISH },
  "Puerto Rico": { first: FIRST_CAR_ES, last: LAST_CAR_ES },
  "Venezuela": { first: FIRST_SPANISH, last: LAST_SPANISH },

  // Asia
  "China": { first: FIRST_CHINA, last: LAST_CHINA },
  "India": { first: ["Arjun","Rohit","Rahul","Vikram","Aman","Karan","Sanjay","Varun","Pranav","Rajat"], last: ["Singh","Kumar","Sharma","Patel","Gupta","Mehta","Jain","Joshi","Reddy","Kapoor"] },
  "Iran": { first: ["Hamed","Sajjad","Amir","Alireza","Hossein","Mehdi","Reza","Ehsan","Milad","Arash"], last: ["Haddadi","Ghahremani","Eskandari","Karimi","Azizi","Rahimi","Jafari","Mohammadi","Gholami","Ebrahimi"] },
  "Israel": { first: FIRST_ISRAEL, last: LAST_ISRAEL },
  "Japan": { first: FIRST_JPN, last: LAST_JPN },
  "South Korea": { first: FIRST_KOR, last: LAST_KOR },
  "Taiwan": { first: FIRST_TWN, last: LAST_TWN },

  // Europe
  "Austria": { first: FIRST_GERMAN, last: LAST_GERMAN },
  "Belgium": { first: FIRST_FRENCH, last: LAST_FRENCH },
  "Bosnia and Herzegovina": { first: FIRST_BALKAN, last: LAST_BALKAN },
  "Bulgaria": { first: FIRST_SLAVIC, last: LAST_SLAVIC },
  "Croatia": { first: FIRST_BALKAN, last: LAST_BALKAN },
  "Czechia": { first: FIRST_SLAVIC, last: LAST_SLAVIC },
  "Denmark": { first: FIRST_NORDIC, last: LAST_NORDIC },
  "Estonia": { first: FIRST_FIEE, last: LAST_FIEE },
  "Finland": { first: FIRST_FIEE, last: LAST_FIEE },
  "France": { first: FIRST_FRENCH, last: LAST_FRENCH },
  "Georgia": { first: FIRST_GEORG, last: LAST_GEORG },
  "Germany": { first: FIRST_GERMAN, last: LAST_GERMAN },
  "Greece": { first: FIRST_GREEK, last: LAST_GREEK },
  "Hungary": { first: ["Bence","Dániel","Gergő","Máté","Zoltán","László","István","Péter","Gábor","Balázs"], last: ["Nagy","Kovács","Tóth","Szabó","Horváth","Varga","Kiss","Molnár","Németh","Farkas"] },
  "Ireland": { first: FIRST_NA, last: LAST_NA },
  "Italy": { first: FIRST_ITALIAN, last: LAST_ITALIAN },
  "Latvia": { first: ["Kristaps","Janis","Davis","Arturs","Kaspars","Mareks","Reinis","Rihards","Edgars","Roberts"], last: ["Porziņģis","Berzins","Ozols","Liepa","Mežs","Vilks","Kalniņš","Krastiņš","Eglitis","Vilsons"] },
  "Lithuania": { first: ["Jonas","Domantas","Mantas","Arvydas","Mindaugas","Valdas","Sarunas","Deividas","Lukas","Paulius"], last: ["Valančiūnas","Sabonis","Kleiza","Kuzminskas","Jankūnas","Klemenčić","Motiejunas","Macijauskas","Kaciulis","Petrauskas"] },
  "Montenegro": { first: FIRST_BALKAN, last: LAST_BALKAN },
  "Netherlands": { first: FIRST_DUTCH, last: LAST_DUTCH },
  "North Macedonia": { first: FIRST_BALKAN, last: LAST_BALKAN },
  "Norway": { first: FIRST_NORDIC, last: LAST_NORDIC },
  "Poland": { first: FIRST_SLAVIC, last: LAST_SLAVIC },
  "Romania": { first: ["Gheorghe","Mihai","Andrei","Alexandru","Vlad","Stefan","Bogdan","Radu","Ion","Sorin"], last: ["Mureșan","Popa","Ionescu","Popescu","Dumitru","Stan","Gheorghe","Stoica","Radu","Munteanu"] },
  "Russia": { first: FIRST_SLAVIC, last: LAST_SLAVIC },
  "Serbia": { first: FIRST_BALKAN, last: LAST_BALKAN },
  "Slovenia": { first: FIRST_BALKAN, last: LAST_BALKAN },
  "Spain": { first: FIRST_SPANISH, last: LAST_SPANISH },
  "Sweden": { first: FIRST_NORDIC, last: LAST_NORDIC },
  "Switzerland": { first: ["Luca","Leon","Noah","Marco","Matteo","Julien","Nico","Fabian","Joel","Raphael"], last: ["Müller","Meier","Schmid","Keller","Weber","Fischer","Gerber","Huber","Dubois","Favre"] },
  "Turkey": { first: FIRST_TURK, last: LAST_TURK },
  "Ukraine": { first: FIRST_SLAVIC, last: LAST_SLAVIC },
  "United Kingdom": { first: FIRST_NA, last: LAST_NA },

  // Oceania
  "Australia": { first: FIRST_OCE, last: LAST_OCE },
  "New Zealand": { first: FIRST_OCE, last: LAST_OCE },
};

// Convenience getter (your generator can use this)
export function getNamePoolForCountry(country: string): Pool {
  return NAME_POOLS[country] ?? { first: FIRST_INTL_GENERIC, last: LAST_INTL_GENERIC };
}
