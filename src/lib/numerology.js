// ═══ MI CÍRCULO v2.0 — numerology.js ═══

// ═══ ZODIACO CHINO ═══
const ZODIAC_ANIMALS = [
  { name: 'Rata', emoji: '🐀', traits: 'Ingeniosa, astuta, versátil, encantadora' },
  { name: 'Buey', emoji: '🐂', traits: 'Fuerte, confiable, determinado, paciente' },
  { name: 'Tigre', emoji: '🐅', traits: 'Valiente, competitivo, impredecible, seguro' },
  { name: 'Conejo', emoji: '🐇', traits: 'Elegante, amable, responsable, prudente' },
  { name: 'Dragón', emoji: '🐉', traits: 'Enérgico, audaz, ambicioso, carismático' },
  { name: 'Serpiente', emoji: '🐍', traits: 'Sabia, intuitiva, elegante, misteriosa' },
  { name: 'Caballo', emoji: '🐴', traits: 'Libre, activo, enérgico, aventurero' },
  { name: 'Cabra', emoji: '🐐', traits: 'Creativa, compasiva, gentil, artística' },
  { name: 'Mono', emoji: '🐵', traits: 'Ingenioso, curioso, juguetón, inteligente' },
  { name: 'Gallo', emoji: '🐓', traits: 'Observador, trabajador, valiente, puntual' },
  { name: 'Perro', emoji: '🐕', traits: 'Leal, honesto, amable, prudente' },
  { name: 'Cerdo', emoji: '🐖', traits: 'Generoso, compasivo, diligente, optimista' },
];

const ELEMENTS = [
  { name: 'Madera', emoji: '🌳', color: '#2d7d32', influence: 'Crecimiento, creatividad, expansión' },
  { name: 'Fuego', emoji: '🔥', color: '#c62828', influence: 'Pasión, dinamismo, liderazgo' },
  { name: 'Tierra', emoji: '🌍', color: '#8d6e63', influence: 'Estabilidad, paciencia, practicidad' },
  { name: 'Metal', emoji: '⚔️', color: '#9e9e9e', influence: 'Determinación, rigidez, fuerza' },
  { name: 'Agua', emoji: '💧', color: '#1565c0', influence: 'Adaptabilidad, sabiduría, intuición' },
];

const AFFINITY_TRIANGLES = [
  ['Rata', 'Dragón', 'Mono'],
  ['Buey', 'Serpiente', 'Gallo'],
  ['Tigre', 'Caballo', 'Perro'],
  ['Conejo', 'Cabra', 'Cerdo'],
];

const OPPOSITES = {
  Rata:'Caballo', Caballo:'Rata', Buey:'Cabra', Cabra:'Buey',
  Tigre:'Mono', Mono:'Tigre', Conejo:'Gallo', Gallo:'Conejo',
  Dragón:'Perro', Perro:'Dragón', Serpiente:'Cerdo', Cerdo:'Serpiente',
};

const COMPATIBLE = {
  Rata:['Buey','Dragón','Mono'], Buey:['Rata','Serpiente','Gallo'],
  Tigre:['Caballo','Perro','Cerdo'], Conejo:['Cabra','Cerdo','Perro'],
  Dragón:['Rata','Mono','Gallo'], Serpiente:['Buey','Gallo','Dragón'],
  Caballo:['Tigre','Cabra','Perro'], Cabra:['Conejo','Caballo','Cerdo'],
  Mono:['Rata','Dragón','Serpiente'], Gallo:['Buey','Serpiente','Dragón'],
  Perro:['Tigre','Conejo','Caballo'], Cerdo:['Conejo','Cabra','Tigre'],
};

const ELEM_GEN = { Madera:'Fuego', Fuego:'Tierra', Tierra:'Metal', Metal:'Agua', Agua:'Madera' };
const ELEM_DES = { Madera:'Tierra', Tierra:'Agua', Agua:'Fuego', Fuego:'Metal', Metal:'Madera' };

// ═══ AÑO NUEVO CHINO ═══
const LUNAR_NEW_YEAR = {
  1940:[2,8],1941:[1,27],1942:[2,15],1943:[2,5],1944:[1,25],1945:[2,13],1946:[2,2],1947:[1,22],1948:[2,10],1949:[1,29],
  1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],1954:[2,3],1955:[1,24],1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],
  1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],1964:[2,13],1965:[2,2],1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],
  1970:[2,6],1971:[1,27],1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],1978:[2,7],1979:[1,28],
  1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],1988:[2,17],1989:[2,6],
  1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],
  2000:[2,5],2001:[1,24],2002:[2,12],2003:[2,1],2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],2008:[2,7],2009:[1,26],
  2010:[2,14],2011:[2,3],2012:[1,23],2013:[2,10],2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
  2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],2026:[2,17],2027:[2,6],2028:[1,26],2029:[2,13],
  2030:[2,3],
};

function getChineseYear(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const lny = LUNAR_NEW_YEAR[year];
  if (lny) {
    const [lnyMonth, lnyDay] = lny;
    if (month < lnyMonth || (month === lnyMonth && day < lnyDay)) return year - 1;
  }
  return year;
}

export function getChineseZodiac(yearOrDate) {
  const year = typeof yearOrDate === 'string' ? getChineseYear(yearOrDate) : yearOrDate;
  return ZODIAC_ANIMALS[(year - 4) % 12];
}

export function getChineseElement(yearOrDate) {
  const year = typeof yearOrDate === 'string' ? getChineseYear(yearOrDate) : yearOrDate;
  return ELEMENTS[Math.floor(((year - 4) % 10) / 2)];
}

export function getYinYang(yearOrDate) {
  const year = typeof yearOrDate === 'string' ? getChineseYear(yearOrDate) : yearOrDate;
  return year % 2 === 0
    ? { type: 'Yang', emoji: '☀️', desc: 'Activo, expansivo, extrovertido' }
    : { type: 'Yin', emoji: '🌙', desc: 'Receptivo, introspectivo, intuitivo' };
}

export function getChineseYear_export(dateStr) { return getChineseYear(dateStr); }

// ═══ ALIADOS Y ENEMIGOS ═══
export function getAllies(animalName) {
  const triangle = AFFINITY_TRIANGLES.find(t => t.includes(animalName));
  return triangle ? triangle.filter(a => a !== animalName) : [];
}

export function getEnemy(animalName) {
  return OPPOSITES[animalName] || null;
}

export function getCompatibles(animalName) {
  return COMPATIBLE[animalName] || [];
}

export function matchRelationships(persona, allPersonas) {
  const zodiac = getChineseZodiac(persona.fecha_nacimiento);
  const allies = getAllies(zodiac.name);
  const enemy = getEnemy(zodiac.name);
  const compatibles = getCompatibles(zodiac.name);
  const others = allPersonas.filter(p => p.id !== persona.id);

  const allyMatches = allies.map(allyAnimal => {
    const emoji = ZODIAC_ANIMALS.find(a => a.name === allyAnimal)?.emoji || '';
    const people = others.filter(p => getChineseZodiac(p.fecha_nacimiento).name === allyAnimal);
    return { animal: allyAnimal, emoji, people };
  });

  const enemyEmoji = ZODIAC_ANIMALS.find(a => a.name === enemy)?.emoji || '';
  const enemyMatches = others.filter(p => getChineseZodiac(p.fecha_nacimiento).name === enemy);

  const compatibleMatches = compatibles.filter(c => !allies.includes(c)).map(compAnimal => {
    const emoji = ZODIAC_ANIMALS.find(a => a.name === compAnimal)?.emoji || '';
    const people = others.filter(p => getChineseZodiac(p.fecha_nacimiento).name === compAnimal);
    return { animal: compAnimal, emoji, people };
  });

  return {
    allies: allyMatches,
    enemy: { animal: enemy, emoji: enemyEmoji, people: enemyMatches },
    compatibles: compatibleMatches,
  };
}

// ═══ NUMEROLOGÍA ═══
const LIFE_NUMBER_MEANINGS = {
  1: { title: 'El Líder', desc: 'Independiente, pionero, ambicioso. Nació para liderar y abrir caminos.' },
  2: { title: 'El Diplomático', desc: 'Cooperador, sensible, pacificador. Brilla en la armonía y las relaciones.' },
  3: { title: 'El Creativo', desc: 'Expresivo, artístico, comunicativo. Su energía inspira y alegra.' },
  4: { title: 'El Constructor', desc: 'Práctico, organizado, estable. Construye bases sólidas para todo.' },
  5: { title: 'El Aventurero', desc: 'Libre, adaptable, curioso. Busca experiencias y cambio constante.' },
  6: { title: 'El Protector', desc: 'Responsable, amoroso, hogareño. Cuida y nutre a quienes ama.' },
  7: { title: 'El Buscador', desc: 'Analítico, espiritual, introspectivo. Busca verdades profundas.' },
  8: { title: 'El Poderoso', desc: 'Ambicioso, eficiente, materialista. Domina el mundo material.' },
  9: { title: 'El Humanitario', desc: 'Compasivo, generoso, idealista. Vive para servir a los demás.' },
  11: { title: 'Maestro Intuitivo', desc: 'Visionario, inspirador, iluminado. Canal de energía superior.' },
  22: { title: 'Maestro Constructor', desc: 'Visionario práctico. Transforma sueños grandes en realidad.' },
  33: { title: 'Maestro Sanador', desc: 'Amor incondicional, servicio supremo. Eleva la consciencia colectiva.' },
};

function reduceToSingle(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    let s = 0; for (const ch of String(n)) s += parseInt(ch); n = s;
  }
  return n;
}

export function calcLifeNumber(dateStr) {
  const digits = dateStr.replace(/\D/g, '');
  let sum = digits.split('').reduce((a, b) => a + parseInt(b), 0);
  return reduceToSingle(sum);
}

export function getLifeNumberMeaning(num) {
  return LIFE_NUMBER_MEANINGS[num] || { title: 'Desconocido', desc: '' };
}

const letterValues = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};
const VOWELS = ['a','e','i','o','u'];

function cleanName(fullName) {
  if (!fullName) return '';
  return fullName.toLowerCase().replace(/[^a-z\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1]/g, '').replace(/[\u00e1]/g,'a').replace(/[\u00e9]/g,'e').replace(/[\u00ed]/g,'i').replace(/[\u00f3]/g,'o').replace(/[\u00fa]/g,'u').replace(/[\u00f1]/g,'n');
}

export function calcSoulNumber(fullName) {
  const name = cleanName(fullName);
  if (!name) return null;
  let sum = 0;
  for (const ch of name) { if (VOWELS.includes(ch)) sum += letterValues[ch] || 0; }
  return sum > 0 ? reduceToSingle(sum) : null;
}

export function calcDestinyNumber(fullName) {
  const name = cleanName(fullName);
  if (!name) return null;
  let sum = 0;
  for (const ch of name) { sum += letterValues[ch] || 0; }
  return sum > 0 ? reduceToSingle(sum) : null;
}

// ═══ ZODIACO OCCIDENTAL ═══
const WESTERN_SIGNS = [
  { name: 'Capricornio', emoji: '♑', element: 'Tierra', modality: 'Cardinal', start: [12, 22], end: [1, 19] },
  { name: 'Acuario', emoji: '♒', element: 'Aire', modality: 'Fijo', start: [1, 20], end: [2, 18] },
  { name: 'Piscis', emoji: '♓', element: 'Agua', modality: 'Mutable', start: [2, 19], end: [3, 20] },
  { name: 'Aries', emoji: '♈', element: 'Fuego', modality: 'Cardinal', start: [3, 21], end: [4, 19] },
  { name: 'Tauro', emoji: '♉', element: 'Tierra', modality: 'Fijo', start: [4, 20], end: [5, 20] },
  { name: 'Géminis', emoji: '♊', element: 'Aire', modality: 'Mutable', start: [5, 21], end: [6, 20] },
  { name: 'Cáncer', emoji: '♋', element: 'Agua', modality: 'Cardinal', start: [6, 21], end: [7, 22] },
  { name: 'Leo', emoji: '♌', element: 'Fuego', modality: 'Fijo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', emoji: '♍', element: 'Tierra', modality: 'Mutable', start: [8, 23], end: [9, 22] },
  { name: 'Libra', emoji: '♎', element: 'Aire', modality: 'Cardinal', start: [9, 23], end: [10, 22] },
  { name: 'Escorpio', emoji: '♏', element: 'Agua', modality: 'Fijo', start: [10, 23], end: [11, 21] },
  { name: 'Sagitario', emoji: '♐', element: 'Fuego', modality: 'Mutable', start: [11, 22], end: [12, 21] },
];

export function getWesternSign(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const month = date.getMonth() + 1;
  const day = date.getDate();
  for (const sign of WESTERN_SIGNS) {
    const [sm, sd] = sign.start;
    const [em, ed] = sign.end;
    if (sm === 12 && em === 1) {
      if ((month === 12 && day >= sd) || (month === 1 && day <= ed)) return sign;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return sign;
    }
  }
  return WESTERN_SIGNS[0];
}

function westernElementCompat(sign1, sign2) {
  const e1 = sign1.element, e2 = sign2.element;
  if (sign1.name === sign2.name) return 85;
  if (e1 === e2) return 90;
  const comp = { Fuego:'Aire', Aire:'Fuego', Tierra:'Agua', Agua:'Tierra' };
  if (comp[e1] === e2) return 75;
  const neut = { Fuego:'Tierra', Tierra:'Fuego', Aire:'Agua', Agua:'Aire' };
  if (neut[e1] === e2) return 50;
  return 30;
}

// ═══ VÉDICO — NAKSHATRAS ═══
const NAKSHATRAS = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra',
  'Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni',
  'Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishta',
  'Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'
];

const NAKSHATRA_GROUPS = [
  'Deva','Manushya','Rakshasa','Deva','Deva','Manushya',
  'Deva','Deva','Rakshasa','Rakshasa','Manushya','Manushya',
  'Deva','Rakshasa','Deva','Rakshasa','Deva','Rakshasa',
  'Rakshasa','Manushya','Manushya','Deva','Rakshasa',
  'Rakshasa','Manushya','Manushya','Deva'
];

function approxMoonLong(dateStr, hourStr) {
  const date = new Date(dateStr + 'T12:00:00');
  if (hourStr) {
    const [h, m] = hourStr.split(':').map(Number);
    date.setHours(h, m, 0, 0);
  }
  const J2000 = new Date('2000-01-01T12:00:00Z');
  const days = (date - J2000) / 86400000;
  const L = (218.316 + 13.176396 * days) % 360;
  const ayanamsa = 23.85 + ((date.getFullYear() - 2000) * 0.0139);
  return ((L - ayanamsa) % 360 + 360) % 360;
}

export function getNakshatra(dateStr, hourStr) {
  const moonLong = approxMoonLong(dateStr, hourStr || null);
  const span = 360 / 27;
  const idx = Math.floor(moonLong / span) % 27;
  const pada = Math.floor((moonLong % span) / (span / 4)) + 1;
  const precision = hourStr ? 'buena' : 'aproximada';
  return { name: NAKSHATRAS[idx], group: NAKSHATRA_GROUPS[idx], index: idx, pada, precision };
}

function nakshatraCompat(n1, n2) {
  if (n1.name === n2.name) return 95;
  if (n1.group === n2.group) return 70;
  if ((n1.group === 'Deva' && n2.group === 'Manushya') || (n1.group === 'Manushya' && n2.group === 'Deva')) return 60;
  return 40;
}

// ═══ COMPATIBILIDAD CHINA ═══
function chineseAnimalScore(a1, a2) {
  if (a1 === a2) return 70;
  if (AFFINITY_TRIANGLES.some(t => t.includes(a1) && t.includes(a2))) return 95;
  if (COMPATIBLE[a1]?.includes(a2)) return 75;
  if (OPPOSITES[a1] === a2) return 30;
  return 50;
}

function chineseElementScore(e1, e2) {
  if (e1 === e2) return 10;
  if (ELEM_GEN[e1] === e2 || ELEM_GEN[e2] === e1) return 5;
  if (ELEM_DES[e1] === e2 || ELEM_DES[e2] === e1) return -10;
  return 0;
}

// ═══ COMPATIBILIDAD NUMEROLÓGICA ═══
function singleNumCompat(n1, n2) {
  if (n1 === null || n2 === null) return 50;
  if (n1 === n2) return 85;
  const MASTER = [11, 22, 33];
  if (MASTER.includes(n1) && MASTER.includes(n2)) return 88;
  if (MASTER.includes(n1) || MASTER.includes(n2)) return 70;
  const COMP = [[1,9],[2,8],[3,7],[4,6],[5,5]];
  if (COMP.some(p => (p[0]===n1&&p[1]===n2)||(p[0]===n2&&p[1]===n1))) return 90;
  const HARM = [[1,5,7],[2,4,8],[3,6,9]];
  if (HARM.some(g => g.includes(n1) && g.includes(n2))) return 75;
  return 50;
}

// ═══ COMPATIBILIDAD GENERAL ═══
export function calcCompatibility(person1, person2) {
  const z1 = getChineseZodiac(person1.fecha_nacimiento);
  const z2 = getChineseZodiac(person2.fecha_nacimiento);
  const e1 = getChineseElement(person1.fecha_nacimiento);
  const e2 = getChineseElement(person2.fecha_nacimiento);
  const yy1 = getYinYang(person1.fecha_nacimiento);
  const yy2 = getYinYang(person2.fecha_nacimiento);

  let animalScore = chineseAnimalScore(z1.name, z2.name);
  animalScore += chineseElementScore(e1.name, e2.name);
  if (yy1.type !== yy2.type) animalScore += 5;
  animalScore = Math.max(10, Math.min(100, animalScore));

  const life1 = calcLifeNumber(person1.fecha_nacimiento);
  const life2 = calcLifeNumber(person2.fecha_nacimiento);
  const soul1 = calcSoulNumber(person1.nombre);
  const soul2 = calcSoulNumber(person2.nombre);
  const dest1 = calcDestinyNumber(person1.nombre);
  const dest2 = calcDestinyNumber(person2.nombre);

  const lifeScore = singleNumCompat(life1, life2);
  const soulScore = singleNumCompat(soul1, soul2);
  const destScore = singleNumCompat(dest1, dest2);
  const numScore = Math.round(lifeScore * 0.5 + soulScore * 0.3 + destScore * 0.2);

  const zodiacDisplay = Math.round(animalScore / 10);
  const numDisplay = Math.round(numScore / 10);

  let tips = [];
  if (animalScore >= 80) tips.push('El zodiaco chino favorece esta conexión — hay afinidad natural.');
  else if (animalScore <= 40) tips.push('Sus signos chinos son opuestos — necesitan paciencia y respeto mutuo.');
  if (numScore >= 80) tips.push('Sus números vibran en armonía — conexión profunda.');
  else if (numScore <= 40) tips.push('Numerológicamente diferentes — la diversidad puede ser su fortaleza.');
  if (yy1.type !== yy2.type) tips.push('Yin + Yang — energías complementarias que se equilibran.');
  if (tips.length === 0) tips.push('Una relación con potencial de crecimiento mutuo.');

  const overall = Math.round((zodiacDisplay + numDisplay) / 2 * 10) / 10;

  return { overall, zodiacScore: zodiacDisplay, numScore: numDisplay, tips,
    details: { lifeScore, soulScore, destScore, soul1, soul2, dest1, dest2 } };
}

// ═══ COMPATIBILIDAD 4 TRADICIONES ═══
export function calcFullCompatibility(person1, person2) {
  const chineseCompat = calcCompatibility(person1, person2);
  const w1 = getWesternSign(person1.fecha_nacimiento);
  const w2 = getWesternSign(person2.fecha_nacimiento);
  const westernScore = westernElementCompat(w1, w2);
  const nk1 = getNakshatra(person1.fecha_nacimiento, person1.hora_nacimiento);
  const nk2 = getNakshatra(person2.fecha_nacimiento, person2.hora_nacimiento);
  const vedicScore = nakshatraCompat(nk1, nk2);

  const chineseNorm = chineseCompat.overall * 10;
  const numNorm = chineseCompat.numScore * 10;
  const overall = Math.round((chineseNorm * 0.3 + westernScore * 0.25 + vedicScore * 0.2 + numNorm * 0.25) / 10 * 10) / 10;

  const vedicPrecision = (!person1.hora_nacimiento && !person2.hora_nacimiento) ? 'aproximada'
    : (person1.hora_nacimiento && person2.hora_nacimiento) ? 'buena' : 'parcial';

  return {
    overall,
    chinese: { score: chineseCompat.overall, zodiac1: getChineseZodiac(person1.fecha_nacimiento), zodiac2: getChineseZodiac(person2.fecha_nacimiento) },
    western: { score: Math.round(westernScore / 10 * 10) / 10, sign1: w1, sign2: w2 },
    vedic: { score: Math.round(vedicScore / 10 * 10) / 10, nakshatra1: nk1, nakshatra2: nk2, precision: vedicPrecision },
    numerology: { score: chineseCompat.numScore, num1: calcLifeNumber(person1.fecha_nacimiento), num2: calcLifeNumber(person2.fecha_nacimiento),
      soul1: chineseCompat.details.soul1, soul2: chineseCompat.details.soul2,
      dest1: chineseCompat.details.dest1, dest2: chineseCompat.details.dest2 },
    tips: chineseCompat.tips,
  };
}

// ═══ KAIROS FLOW — 9 Posiciones Numerológicas ═══

const KAIROS_POSITIONS = [
  { pos: 1, name: 'The Mask', desc: 'Cómo apareces', emoji: '🎭' },
  { pos: 2, name: 'The Heart', desc: 'Deseos internos', emoji: '❤️' },
  { pos: 3, name: 'The Gift', desc: 'Talento natural', emoji: '🎁' },
  { pos: 4, name: 'The Tool', desc: 'Carrera / Acción', emoji: '🔧' },
  { pos: 5, name: 'The Soul', desc: 'Esencia core', emoji: '✨' },
  { pos: 6, name: 'The Path', desc: 'Caminar diario', emoji: '🛤️' },
  { pos: 7, name: 'The Calling', desc: 'Meta de vida', emoji: '📯' },
  { pos: 8, name: 'The Shadow', desc: 'Reto oculto', emoji: '🌑' },
  { pos: 9, name: 'The Legacy', desc: 'Legado final', emoji: '👑' },
];

function reduceMaster(n) {
  while (n > 9) {
    if (n === 11 || n === 22 || n === 33) return n;
    n = String(n).split('').reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

function digitSumMaster(n) {
  const s = String(Math.abs(n)).split('').reduce((a, d) => a + Number(d), 0);
  return reduceMaster(s);
}

function calcKairosFlow(fechaNacimiento) {
  const d = new Date(fechaNacimiento + 'T12:00:00');
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const last2 = year % 100;
  const yearDigitSum = String(year).split('').reduce((a, c) => a + Number(c), 0);

  const mask = reduceMaster(day);
  const heart = reduceMaster(month);
  const gift = reduceMaster(day + month);
  const tool = reduceMaster(digitSumMaster(last2));
  const soul = reduceMaster(yearDigitSum);
  const path = reduceMaster(heart + yearDigitSum);
  const calling = reduceMaster(mask + heart + yearDigitSum);
  const shadow = reduceMaster(day + yearDigitSum);
  const legacy = reduceMaster(mask + heart + gift + tool + soul + path + calling + shadow);

  return [mask, heart, gift, tool, soul, path, calling, shadow, legacy].map((val, i) => ({
    ...KAIROS_POSITIONS[i],
    value: val,
    isMaster: val === 11 || val === 22 || val === 33,
  }));
}

export { ZODIAC_ANIMALS, ELEMENTS, LIFE_NUMBER_MEANINGS, WESTERN_SIGNS, AFFINITY_TRIANGLES, OPPOSITES, KAIROS_POSITIONS, calcKairosFlow };

