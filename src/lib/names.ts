// American & Canadian first/last names
export const AMERICAN_CANADIAN_FIRST_NAMES = [
  "James","John","Robert","Michael","William","David","Richard","Joseph","Thomas","Charles",
  "Christopher","Daniel","Matthew","Anthony","Mark","Donald","Steven","Paul","Andrew","Joshua",
  "Kevin","Brian","George","Edward","Ronald","Timothy","Jason","Jeffrey","Ryan","Jacob","Gary",
  "Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin","Samuel",
  "Frank","Gregory","Raymond","Alexander","Patrick","Jack","Dennis","Jerry","Tyler","Aaron"
];

export const AMERICAN_CANADIAN_LAST_NAMES = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson","Walker",
  "Young","Allen","King","Wright","Scott","Torres","Nguyen","Hill","Flores","Green","Adams","Nelson",
  "Baker","Hall","Rivera","Campbell","Mitchell","Carter","Roberts"
];

// Country-specific names (examples — expand as needed)
export const COUNTRY_FIRST_NAMES: Record<string, string[]> = {
  France: ["Jean","Pierre","Louis","Nicolas","Antoine","Hugo","Lucas","Julien","Mathieu","Théo"],
  Spain: ["Alejandro","Carlos","Diego","Javier","Manuel","Luis","Miguel","Pablo","Sergio","Raúl"],
  Germany: ["Lukas","Leon","Finn","Noah","Elias","Paul","Jonas","Felix","Maximilian","Moritz"],
  Italy: ["Lorenzo","Andrea","Matteo","Giovanni","Alessandro","Marco","Francesco","Paolo","Gabriele","Stefano"],
  Japan: ["Haruto","Ren","Yuto","Sota","Itsuki","Daiki","Ryusei","Tsubasa","Kaito","Sho"],
  Australia: ["Jack","Oliver","William","Noah","James","Lucas","Ethan","Liam","Thomas","Harrison"],
  Brazil: ["João","Gabriel","Lucas","Mateus","Pedro","Rafael","Thiago","Felipe","Bruno","Gustavo"],
  China: ["Wei","Jun","Hao","Lei","Feng","Ming","Peng","Tao","Jian","Chen"],
  Nigeria: ["Emeka","Chinedu","Ifeanyi","Tunde","Kelechi","Chukwuemeka","Uche","Obinna","Segun","Kunle"],
  Russia: ["Ivan","Dmitry","Sergey","Alexey","Nikolay","Andrey","Mikhail","Vladimir","Pavel","Yuri"]
};

export const COUNTRY_LAST_NAMES: Record<string, string[]> = {
  France: ["Dubois","Durand","Lefevre","Moreau","Laurent","Simon","Michel","Garcia","Petit","Roux"],
  Spain: ["García","Martínez","López","Sánchez","Pérez","Gómez","Martín","Jiménez","Ruiz","Hernández"],
  Germany: ["Müller","Schmidt","Schneider","Fischer","Weber","Meyer","Wagner","Becker","Hoffmann","Koch"],
  Italy: ["Rossi","Russo","Ferrari","Esposito","Bianchi","Romano","Colombo","Ricci","Marino","Greco"],
  Japan: ["Sato","Suzuki","Takahashi","Tanaka","Watanabe","Ito","Yamamoto","Nakamura","Kobayashi","Matsumoto"],
  Australia: ["Smith","Jones","Williams","Brown","Taylor","Wilson","Johnson","White","Martin","Anderson"],
  Brazil: ["Silva","Santos","Oliveira","Souza","Rodrigues","Ferreira","Almeida","Costa","Gomes","Martins"],
  China: ["Wang","Li","Zhang","Liu","Chen","Yang","Huang","Zhao","Wu","Zhou"],
  Nigeria: ["Okafor","Balogun","Adeyemi","Eze","Olawale","Ibrahim","Okoro","Abiola","Ogunleye","Nwosu"],
  Russia: ["Ivanov","Petrov","Sidorov","Smirnov","Kuznetsov","Popov","Volkov","Fedorov","Orlov","Morozov"]
};

// Helper to get a random item from an array
export const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
