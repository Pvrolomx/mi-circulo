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
  { pos: 1, name: 'La Máscara', desc: 'Cómo apareces', emoji: '🎭' },
  { pos: 2, name: 'El Corazón', desc: 'Deseos internos', emoji: '❤️' },
  { pos: 3, name: 'El Don', desc: 'Talento natural', emoji: '🎁' },
  { pos: 4, name: 'La Herramienta', desc: 'Carrera / Acción', emoji: '🔧' },
  { pos: 5, name: 'El Alma', desc: 'Esencia core', emoji: '✨' },
  { pos: 6, name: 'El Camino', desc: 'Caminar diario', emoji: '🛤️' },
  { pos: 7, name: 'El Llamado', desc: 'Meta de vida', emoji: '📯' },
  { pos: 8, name: 'La Sombra', desc: 'Reto oculto', emoji: '🌑' },
  { pos: 9, name: 'El Legado', desc: 'Resultado final', emoji: '👑' },
];

const KAIROS_MEANINGS = {
  1: { title: 'El Pionero', keywords: 'Liderazgo · Independencia · Iniciativa', desc: 'Energía de inicio y creación. Impulso para abrir caminos nuevos, liderar con originalidad y confiar en uno mismo. Fuerza de voluntad pura.' },
  2: { title: 'El Diplomático', keywords: 'Cooperación · Sensibilidad · Equilibrio', desc: 'Energía de conexión y armonía. Capacidad natural para mediar, escuchar y crear puentes entre personas. Intuición emocional refinada.' },
  3: { title: 'El Creativo', keywords: 'Expresión · Alegría · Comunicación', desc: 'Energía de expresión artística y social. Talento para comunicar ideas, inspirar a otros y encontrar belleza en lo cotidiano.' },
  4: { title: 'El Constructor', keywords: 'Estructura · Disciplina · Fundamentos', desc: 'Energía de orden y estabilidad. Capacidad para construir bases sólidas, organizar sistemas y trabajar con paciencia metódica.' },
  5: { title: 'El Aventurero', keywords: 'Libertad · Cambio · Adaptabilidad', desc: 'Energía de movimiento y transformación. Curiosidad insaciable, versatilidad y necesidad de experiencias nuevas. Catalizador de cambio.' },
  6: { title: 'El Protector', keywords: 'Responsabilidad · Amor · Servicio', desc: 'Energía de cuidado y nutrición. Vocación natural de proteger, sanar y crear espacios seguros para los demás. Corazón de hogar.' },
  7: { title: 'El Buscador', keywords: 'Análisis · Espiritualidad · Profundidad', desc: 'Energía de introspección y búsqueda de verdad. Mente analítica con sed espiritual. Necesidad de entender los misterios de la vida.' },
  8: { title: 'El Poderoso', keywords: 'Abundancia · Autoridad · Manifestación', desc: 'Energía de poder material y logro. Capacidad para manifestar visiones en realidad, manejar recursos y ejercer influencia con propósito.' },
  9: { title: 'El Humanitario', keywords: 'Compasión · Sabiduría · Cierre', desc: 'Energía de culminación y servicio universal. Visión panorámica de la vida, generosidad innata y capacidad de soltar para avanzar.' },
  11: { title: 'Maestro Intuitivo', keywords: 'Visión · Iluminación · Canal', desc: 'Número maestro. Intuición amplificada al máximo, capacidad casi psíquica de percibir lo invisible. Canal entre lo espiritual y lo terrenal. Doble energía del 1 fusionada con la sensibilidad del 2.' },
  22: { title: 'Maestro Constructor', keywords: 'Visión práctica · Arquitecto · Legado', desc: 'Número maestro. El más poderoso en numerología. Capacidad de transformar sueños grandiosos en realidad tangible. Arquitecto de imperios con propósito espiritual. Doble 2 con la estabilidad del 4.' },
  33: { title: 'Maestro Sanador', keywords: 'Amor incondicional · Guía · Elevación', desc: 'Número maestro. El más raro y elevado. Amor incondicional expresado como servicio supremo. Guía espiritual que eleva la consciencia colectiva. Doble 3 con el corazón del 6.' },
};

// ═══ KAIROS CONTEXTUAL MEANINGS — 9 posiciones × 12 números = 108 interpretaciones ═══
const KAIROS_CONTEXTUAL = {
  // ══ POSICIÓN 1: LA MÁSCARA — Cómo apareces ante el mundo ══
  '1-1': 'Proyectas liderazgo nato. La gente te ve como alguien que toma el control de cualquier situación. Tu primera impresión es de confianza y determinación.',
  '1-2': 'Apareces como alguien accesible y diplomático. Tu presencia genera calma. La gente se siente escuchada contigo desde el primer momento.',
  '1-3': 'Irradias alegría y carisma natural. Tu energía es contagiosa y la gente gravita hacia ti por tu expresividad y sentido del humor.',
  '1-4': 'Proyectas seriedad y confiabilidad. Te perciben como alguien organizado y sólido. Tu primera impresión es de estabilidad y competencia.',
  '1-5': 'Apareces como alguien magnético e impredecible. Tu energía es de aventura y cambio. La gente te ve como un espíritu libre que no sigue las reglas.',
  '1-6': 'Proyectas calidez y protección. La gente siente que puede confiar en ti inmediatamente. Tu presencia es de hogar y seguridad emocional.',
  '1-7': 'Apareces como alguien profundo y misterioso. Tu mirada dice más que tus palabras. La gente percibe que hay sabiduría detrás de tu silencio.',
  '1-8': 'Proyectas poder y autoridad natural. Tu presencia impone respeto sin necesidad de palabras. La gente te ve como alguien que sabe lo que quiere.',
  '1-9': 'Apareces como alguien sabio y compasivo. Tu energía es de alguien que ha vivido mucho. La gente siente tu generosidad y visión panorámica de la vida.',
  '1-11': 'Proyectas una intensidad magnética y visionaria. La gente te percibe como alguien que sabe algo que ellos no, incluso sin decir nada. Tu presencia comunica autoridad espiritual.',
  '1-22': 'Apareces como un arquitecto de realidades. Tu presencia transmite que puedes materializar lo imposible. La gente te ve como alguien destinado a construir algo grande.',
  '1-33': 'Proyectas amor incondicional desde el primer encuentro. Tu presencia sana. La gente siente paz al estar cerca de ti, como si llegaras a elevar cualquier espacio.',

  // ══ POSICIÓN 2: EL CORAZÓN — Deseos internos ══
  '2-1': 'En el fondo deseas liderar y ser pionero. Tu corazón anhela independencia total y la libertad de crear tus propias reglas sin depender de nadie.',
  '2-2': 'Tu deseo más profundo es la armonía y la conexión genuina con otros. Anhelas relaciones equilibradas donde dar y recibir fluyan naturalmente.',
  '2-3': 'Tu corazón anhela expresarte plenamente — crear, comunicar, inspirar. La alegría y la conexión social son tu combustible interno.',
  '2-4': 'En el fondo deseas estabilidad y orden. Tu corazón anhela bases sólidas sobre las cuales construir con paciencia y disciplina.',
  '2-5': 'Tu deseo más profundo es la libertad absoluta. Anhelas experiencias nuevas, cambio constante y la emoción de lo desconocido.',
  '2-6': 'Tu corazón anhela cuidar y ser cuidado. El amor familiar, la responsabilidad compartida y crear un refugio seguro son tu motor interno.',
  '2-7': 'En el fondo deseas entender los misterios de la vida. Tu corazón anhela verdad, conocimiento profundo y momentos de introspección sagrada.',
  '2-8': 'Tu deseo más profundo es el logro y la abundancia con propósito. Anhelas dejar huella material y demostrar que la visión puede volverse realidad.',
  '2-9': 'Tu corazón anhela servir a algo más grande que tú mismo. El humanitarismo, la compasión universal y el cierre de ciclos son tu motivación profunda.',
  '2-11': 'Tus deseos internos son puros y elevados. No te motiva lo material por sí solo, sino la revelación y la conexión profunda. Lo que muestras es lo que sientes — autenticidad radical.',
  '2-22': 'Tu corazón anhela construir imperios con propósito espiritual. No cualquier logro te satisface — necesitas que lo que construyas transforme generaciones.',
  '2-33': 'Tu deseo más profundo es el amor incondicional expresado como servicio. Anhelas elevar la consciencia colectiva a través de la sanación y la guía.',

  // ══ POSICIÓN 3: EL DON — Talento natural ══
  '3-1': 'Tu talento innato es el liderazgo. Naciste con la capacidad de iniciar proyectos, inspirar a otros y abrir caminos donde no los hay.',
  '3-2': 'Tu don natural es la diplomacia. Tienes una capacidad extraordinaria para mediar conflictos, leer emociones y crear puentes entre personas.',
  '3-3': 'Tu talento innato es la creatividad pura. Las ideas fluyen en ti como agua. Comunicar, crear y expresarte artísticamente es tan natural como respirar.',
  '3-4': 'Tu don natural es construir sistemas sólidos. Donde otros ven caos, tú ves estructura. Organizas, planificas y ejecutas con precisión metódica.',
  '3-5': 'Tu talento innato es la adaptabilidad. Navegas el cambio con gracia. Donde otros se paralizan, tú ves oportunidad. Eres catalizador de transformación.',
  '3-6': 'Tu don natural es el cuidado y la nutrición. Creas espacios seguros de forma instintiva. Las personas florecen bajo tu protección y guía amorosa.',
  '3-7': 'Tu talento innato es el análisis profundo. Ves patrones que otros ignoran. Tu mente conecta puntos invisibles y encuentra verdades ocultas.',
  '3-8': 'Tu don natural es la manifestación material. Conviertes ideas en realidad con una eficiencia que asombra. El mundo de los recursos y el poder responde a tu energía.',
  '3-9': 'Tu talento innato es la visión panorámica. Ves el cuadro completo cuando otros se pierden en detalles. Tu generosidad y compasión inspiran movimientos.',
  '3-11': 'Tu don natural es la percepción extrasensorial. Captas lo que otros no ven: intenciones, energías, patrones ocultos. Eres canal entre lo invisible y lo visible.',
  '3-22': 'Tu talento innato es la arquitectura de lo imposible. No solo sueñas en grande — tienes la capacidad real de materializar visiones que otros consideran inalcanzables.',
  '3-33': 'Tu don natural es la sanación a través del amor. Tu presencia eleva. Las personas se transforman al estar cerca de ti sin que necesites hacer nada especial.',

  // ══ POSICIÓN 4: LA HERRAMIENTA — Carrera / Acción ══
  '4-1': 'Tu herramienta profesional es la iniciativa. Funcionas mejor liderando proyectos propios que siguiendo instrucciones. El emprendimiento es tu medio natural.',
  '4-2': 'Tu herramienta de trabajo es la cooperación. Brillas en alianzas y sociedades. Tu capacidad de escuchar y negociar es tu mayor activo profesional.',
  '4-3': 'Tu herramienta profesional es la comunicación. Vendes ideas, inspiras equipos y conectas personas. Las carreras creativas y sociales son tu campo natural.',
  '4-4': 'Tu herramienta de trabajo es la disciplina metódica. Sistemas, procesos, orden — construyes infraestructura que perdura. Eres el pilar que sostiene cualquier organización.',
  '4-5': 'Tu herramienta profesional es la versatilidad. Cambias de rol, de proyecto, de industria con facilidad. Tu carrera no es lineal — es un caleidoscopio productivo.',
  '4-6': 'Tu herramienta de trabajo es la armonía y el servicio. Resuelves problemas a través del consejo, la estética o el cuidado. Tu martillo es la diplomacia equilibrada.',
  '4-7': 'Tu herramienta profesional es la investigación. Analizas, estudias, profundizas. Las carreras que requieren expertise especializado son tu terreno ideal.',
  '4-8': 'Tu herramienta de trabajo es la gestión de recursos. Manejas dinero, personas y proyectos con visión estratégica. El mundo corporativo o empresarial responde a tu energía.',
  '4-9': 'Tu herramienta profesional es el servicio humanitario. Tu carrera cobra sentido cuando ayuda a otros. Las causas sociales, la enseñanza o la consultoría transformadora son tu camino.',
  '4-11': 'Tu método de trabajo es la intuición, no el manual. Tomas decisiones acertadas de corazonada donde otros necesitan datos. Tu carrera florece cuando confías en tu voz interior.',
  '4-22': 'Tu herramienta profesional es la visión arquitectónica. No haces tareas — diseñas sistemas completos. Tu carrera es construir imperios, no administrar cubículos.',
  '4-33': 'Tu herramienta de trabajo es la guía compasiva. Tu carrera se trata de elevar a otros: enseñanza, sanación, mentoría. Lideras desde el corazón, no desde el ego.',

  // ══ POSICIÓN 5: EL ALMA — Esencia core ══
  '5-1': 'Tu esencia más profunda es la del iniciador. En tu centro hay una chispa que necesita crear, liderar y abrir caminos. Sin eso, te sientes vacío.',
  '5-2': 'Tu esencia core es la del conector. En lo más profundo, necesitas armonía y relaciones genuinas. Tu paz interior depende de tus vínculos.',
  '5-3': 'Tu esencia más profunda es la del artista. La creatividad no es lo que haces — es lo que eres. Sin expresión, tu alma se marchita.',
  '5-4': 'Tu esencia core es la del constructor. En tu centro hay una necesidad de orden y solidez. Te sientes pleno cuando edificas algo tangible y duradero.',
  '5-5': 'Tu esencia más profunda es la del explorador. Necesitas movimiento, cambio y novedad para sentirte vivo. La rutina mata tu espíritu.',
  '5-6': 'Tu esencia core es la del protector. En lo más profundo, necesitas cuidar y ser amado. Tu hogar interior es tu santuario.',
  '5-7': 'Tu esencia más profunda es la del buscador de verdad. Necesitas periodos de soledad y estudio para alimentar tu espíritu. Sin introspección, tu energía se agota.',
  '5-8': 'Tu esencia core es la del manifestador. En tu centro hay una fuerza que transforma visiones en materia. Tu poder interior es magnético y tangible.',
  '5-9': 'Tu esencia más profunda es la del sabio compasivo. Has vivido muchas vidas en una. Tu alma busca trascender lo personal y servir a lo universal.',
  '5-11': 'Tu esencia core es la del iluminador. Necesitas momentos de silencio y conexión espiritual para recargar. Sin esa pausa, tu alta frecuencia se convierte en ansiedad.',
  '5-22': 'Tu esencia más profunda es la del arquitecto cósmico. Sientes el peso de un propósito enorme. Tu alma no descansa hasta que la visión se vuelve estructura.',
  '5-33': 'Tu esencia core es amor puro. En lo más profundo, existes para elevar. Tu alma irradia una frecuencia de sanación que transforma todo lo que toca.',

  // ══ POSICIÓN 6: EL CAMINO — Caminar diario ══
  '6-1': 'Tu día a día debe incluir actos de liderazgo e independencia. Las rutinas donde otros deciden por ti te drenan. Necesitas autonomía en tu cotidiano.',
  '6-2': 'Tu caminar diario requiere cooperación y armonía. Los días conflictivos te desestabilizan. Necesitas paz y colaboración en tu rutina para funcionar.',
  '6-3': 'Tu día a día debe tener dosis de creatividad y conexión social. Los días monótonos sin expresión artística o conversaciones significativas te apagan.',
  '6-4': 'Tu caminar diario necesita estructura y orden. Una rutina clara con tareas definidas te da paz. El caos cotidiano es tu kryptonita.',
  '6-5': 'Tu día a día necesita variedad y aventura. La misma rutina todos los días te mata lentamente. Necesitas novedad, viajes o al menos cambios de escenario.',
  '6-6': 'Tu caminar diario se centra en el hogar y las responsabilidades familiares. Cuidar tu espacio y tus seres queridos es lo que le da sentido a tus días.',
  '6-7': 'Tu día a día necesita momentos de soledad y reflexión. Sin tiempo para pensar profundamente, acumulas ruido mental que te desconecta de tu propósito.',
  '6-8': 'Tu caminar diario debe orientarse a la productividad y el logro. Necesitas sentir que cada día te acerca a una meta concreta. El ocio sin propósito te frustra.',
  '6-9': 'Tu día a día debe estar orientado a servir un propósito mayor. Las tareas triviales te vacían. Necesitas sentir que tu rutina contribuye a algo trascendente.',
  '6-11': 'Tu día a día debe incluir momentos de inspiración y conexión espiritual. Las rutinas mecánicas te drenan. Necesitas sentir revelación o servicio elevado cada día.',
  '6-22': 'Tu caminar diario es el de un constructor de visiones. Cada día debe tener un ladrillo puesto hacia tu obra mayor. La dispersión es tu enemigo.',
  '6-33': 'Tu día a día se trata de servir y sanar. Tu rutina ideal incluye actos de amor y guía. Los días sin conexión humana profunda se sienten vacíos.',

  // ══ POSICIÓN 7: EL LLAMADO — Meta de vida ══
  '7-1': 'Tu meta de vida es liderar algo propio. Viniste a ser pionero, a crear caminos nuevos. Tu éxito se mide en cuántas puertas abriste para otros.',
  '7-2': 'Tu meta de vida es ser el puente entre personas. Viniste a crear armonía donde hay conflicto. Tu legado es la paz que sembraste en tus relaciones.',
  '7-3': 'Tu meta de vida es inspirar a través de la expresión. Viniste a comunicar, crear y alegrar. Tu éxito se mide en cuántas almas tocaste con tu arte.',
  '7-4': 'Tu meta de vida es construir algo que perdure. Viniste a dejar estructuras sólidas — sistemas, organizaciones, legados tangibles que sobrevivan a tu tiempo.',
  '7-5': 'Tu meta de vida es expandir los límites de lo posible. Viniste a romper moldes, explorar territorios nuevos y mostrar que la libertad es un derecho sagrado.',
  '7-6': 'Tu meta de vida es proteger y nutrir. Viniste a ser el pilar de tu comunidad. Tu éxito se mide en cuántas personas florecieron bajo tu cuidado.',
  '7-7': 'Tu meta de vida es descubrir verdades profundas. Viniste a ser el buscador, el filósofo, el que conecta los puntos que nadie ve. Tu legado es conocimiento.',
  '7-8': 'Tu meta de vida es manifestar abundancia con propósito. Viniste a demostrar que el poder material puede usarse para transformar realidades positivamente.',
  '7-9': 'Tu meta de vida es el servicio universal. Viniste a cerrar ciclos kármicos y enseñar a otros a soltar. Tu éxito se mide en la evolución que inspiraste.',
  '7-11': 'Tu misión de vida es ser canal de luz. Viniste a traer información e inspiración que eleve la conciencia de quienes te rodean. Tu llamado es iluminar.',
  '7-22': 'Tu meta de vida es arquitectar el futuro. Viniste a construir estructuras que cambien la civilización. No piensas en años — piensas en generaciones.',
  '7-33': 'Tu meta de vida es la elevación colectiva a través del amor incondicional. Viniste a ser maestro de maestros. Tu legado trasciende lo individual.',

  // ══ POSICIÓN 8: LA SOMBRA — Reto oculto ══
  '8-1': 'Tu reto oculto es el ego descontrolado. La necesidad de ser primero puede aislarte. El desafío es liderar desde el servicio, no desde la dominancia.',
  '8-2': 'Tu reto oculto es la dependencia emocional. Buscas aprobación externa para validarte. El desafío es encontrar tu equilibrio interior sin necesitar a otros.',
  '8-3': 'Tu reto oculto es la dispersión. Tanta creatividad sin foco se vuelve caos. El desafío es canalizar tu expresión hacia proyectos que termines.',
  '8-4': 'Tu reto oculto es la rigidez. Tu necesidad de control y orden puede convertirse en una prisión. El desafío es soltar el perfeccionismo y fluir.',
  '8-5': 'Tu reto oculto es la inestabilidad. Tanto cambio sin ancla te puede dejar sin raíces. El desafío es encontrar libertad dentro de la estructura.',
  '8-6': 'Tu reto oculto es el sacrificio excesivo. Das tanto que te vacías. El desafío es aprender que cuidar de ti mismo no es egoísmo — es supervivencia.',
  '8-7': 'Tu reto oculto es el aislamiento. Tu búsqueda de profundidad puede convertirse en desconexión del mundo. El desafío es compartir tu sabiduría, no guardarla.',
  '8-8': 'Tu reto oculto es la obsesión con el poder. La ambición desmedida puede costarte relaciones y salud. El desafío es usar tu fuerza para elevar, no dominar.',
  '8-9': 'Tu reto oculto es el apego. No puedes soltar personas, proyectos o ideales que ya cumplieron su ciclo. El desafío es aprender que soltar es avanzar.',
  '8-11': 'Tu reto oculto es la hipersensibilidad. Absorbes emociones ajenas como esponja y eso te paraliza. El desafío es distinguir lo tuyo de lo ajeno y poner límites energéticos.',
  '8-22': 'Tu reto oculto es la autoexigencia imposible. El peso de tu visión puede aplastarte. El desafío es aceptar que el progreso gradual también es maestría.',
  '8-33': 'Tu reto oculto es el martirio espiritual. Cargas el dolor del mundo sobre tus hombros. El desafío es servir sin sacrificarte — tu bienestar también eleva al colectivo.',

  // ══ POSICIÓN 9: EL LEGADO — Resultado final ══
  '9-1': 'Tu legado es el de un pionero. Serás recordado como alguien que abrió puertas que nadie se atrevía a tocar. Dejaste caminos donde solo había selva.',
  '9-2': 'Tu legado es la paz que sembraste. Serás recordado como el puente entre mundos opuestos. Dejaste armonía donde había conflicto.',
  '9-3': 'Tu legado es la inspiración. Serás recordado por tu creatividad y tu capacidad de hacer que otros sonrían, piensen y creen. Dejaste belleza en el mundo.',
  '9-4': 'Tu legado es lo que construiste. Serás recordado por las estructuras sólidas que dejaste — organizaciones, sistemas, fundaciones que perduran sin ti.',
  '9-5': 'Tu legado es la libertad. Serás recordado como alguien que enseñó a otros a vivir sin cadenas. Dejaste una frecuencia de aventura y autenticidad.',
  '9-6': 'Tu legado es el amor. Serás recordado por cuántas personas protegiste y nutriste. Dejaste un hogar emocional que trasciende las paredes físicas.',
  '9-7': 'Tu legado es la verdad. Serás recordado como alguien que buscó y encontró respuestas profundas. Dejaste conocimiento que ilumina a generaciones futuras.',
  '9-8': 'Tu legado es el poder transformador. Serás recordado por haber convertido visiones en imperios con propósito. Dejaste abundancia que sigue generando.',
  '9-9': 'Tu legado es la trascendencia. Serás recordado como un alma vieja que completó su ciclo con gracia. Dejaste sabiduría universal y compasión infinita.',
  '9-11': 'Tu legado es la frecuencia vibratoria que dejaste en otros. Serás recordado no por lo que construiste, sino por la intuición que despertaste en quienes te conocieron.',
  '9-22': 'Tu legado es la obra maestra que construiste. Serás recordado como el arquitecto de algo que cambió la realidad para generaciones enteras.',
  '9-33': 'Tu legado es la elevación espiritual del colectivo. Serás recordado como un ser de luz que vino a recordarle al mundo lo que es el amor incondicional.',
};


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

// ═══ KAIROS MASTER EDITION — Interpretación vibracional ═══

const KAIROS_POSITIONS_MASTER = [
  { pos: 1, name: 'La Máscara', desc: 'Tu impacto externo', emoji: '🎭' },
  { pos: 2, name: 'El Corazón', desc: 'Lo que tu alma anhela', emoji: '❤️' },
  { pos: 3, name: 'El Don', desc: 'Tu superpoder innato', emoji: '🎁' },
  { pos: 4, name: 'La Herramienta', desc: 'Tu método de trabajo', emoji: '🔧' },
  { pos: 5, name: 'El Alma', desc: 'Centro de gravedad', emoji: '✨' },
  { pos: 6, name: 'El Camino', desc: 'Tu estilo de vida', emoji: '🛤️' },
  { pos: 7, name: 'El Llamado', desc: 'Misión espiritual', emoji: '📯' },
  { pos: 8, name: 'La Sombra', desc: 'Apego emocional', emoji: '🌑' },
  { pos: 9, name: 'El Legado', desc: 'Liberación final', emoji: '👑' },
];

function calcKairosFlowMaster(fechaNacimiento) {
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
    ...KAIROS_POSITIONS_MASTER[i],
    value: val,
    isMaster: val === 11 || val === 22 || val === 33,
  }));
}

// ═══ AÑO PERSONAL — Ciclo de 9 años ═══

const PERSONAL_YEAR_MEANINGS = {
  1: { title: 'La Semilla', desc: 'Nuevos comienzos, identidad, fuerza de voluntad' },
  2: { title: 'La Conexión', desc: 'Cooperación, paciencia, relaciones, diplomacia' },
  3: { title: 'La Expresión', desc: 'Creatividad, comunicación, alegría, expansión social' },
  4: { title: 'Los Cimientos', desc: 'Trabajo duro, estructura, disciplina, bases sólidas' },
  5: { title: 'El Cambio', desc: 'Libertad, aventura, transformación, adaptabilidad' },
  6: { title: 'El Hogar', desc: 'Responsabilidad, familia, amor, servicio, armonía' },
  7: { title: 'La Introspección', desc: 'Análisis, espiritualidad, soledad productiva, verdad' },
  8: { title: 'El Poder', desc: 'Abundancia, logros materiales, autoridad, cosecha' },
  9: { title: 'La Conclusión', desc: 'Cierre de ciclos, soltar, sabiduría, humanitarismo' },
  11: { title: 'Despertar', desc: 'Iluminación, intuición amplificada, año de visiones' },
  22: { title: 'Construcción Maestra', desc: 'Manifestar lo imposible, arquitectura de legado' },
  33: { title: 'Servicio Supremo', desc: 'Guía espiritual, amor incondicional, elevación colectiva' },
};

function calcPersonalYear(fechaNacimiento, currentYear) {
  const d = new Date(fechaNacimiento + 'T12:00:00');
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const yearSum = String(currentYear).split('').reduce((a, c) => a + Number(c), 0);
  const total = reduceMaster(day) + reduceMaster(month) + reduceMaster(yearSum);
  return reduceMaster(total);
}

export { ZODIAC_ANIMALS, ELEMENTS, LIFE_NUMBER_MEANINGS, WESTERN_SIGNS, AFFINITY_TRIANGLES, OPPOSITES, KAIROS_POSITIONS, KAIROS_POSITIONS_MASTER, KAIROS_MEANINGS, KAIROS_CONTEXTUAL, calcKairosFlow, calcKairosFlowMaster, PERSONAL_YEAR_MEANINGS, calcPersonalYear };

