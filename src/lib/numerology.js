// Zodiaco Chino - ciclo de 12 años
const ZODIAC_ANIMALS = [
  { name: 'Rata', emoji: '🐀', traits: 'Ingeniosa, astuta, versátil, encantadora' },
  { name: 'Buey', emoji: '🐂', traits: 'Fuerte, confiable, determinada, paciente' },
  { name: 'Tigre', emoji: '🐅', traits: 'Valiente, competitiva, impredecible, segura' },
  { name: 'Conejo', emoji: '🐇', traits: 'Elegante, amable, responsable, prudente' },
  { name: 'Dragón', emoji: '🐉', traits: 'Enérgico, audaz, ambicioso, carismático' },
  { name: 'Serpiente', emoji: '🐍', traits: 'Sabia, intuitiva, elegante, misteriosa' },
  { name: 'Caballo', emoji: '🐴', traits: 'Libre, activa, enérgica, aventurera' },
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

// Triángulos de afinidad
const AFFINITY_TRIANGLES = [
  ['Rata', 'Dragón', 'Mono'],
  ['Buey', 'Serpiente', 'Gallo'],
  ['Tigre', 'Caballo', 'Perro'],
  ['Conejo', 'Cabra', 'Cerdo'],
];

// Opuestos (conflicto)
const OPPOSITES = [
  ['Rata', 'Caballo'], ['Buey', 'Cabra'], ['Tigre', 'Mono'],
  ['Conejo', 'Gallo'], ['Dragón', 'Perro'], ['Serpiente', 'Cerdo'],
];

// Fechas de Año Nuevo Chino (aproximadas, basadas en luna nueva)
// Formato: [mes, día] del año nuevo chino para cada año
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

/**
 * Obtiene el año chino correcto considerando el Año Nuevo Lunar.
 * Si la persona nació ANTES del Año Nuevo Chino de su año,
 * su signo corresponde al año anterior.
 */
function getChineseYear(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  const lny = LUNAR_NEW_YEAR[year];
  if (lny) {
    const [lnyMonth, lnyDay] = lny;
    // Si nació antes del año nuevo chino, pertenece al año anterior
    if (month < lnyMonth || (month === lnyMonth && day < lnyDay)) {
      return year - 1;
    }
  }
  return year;
}

export function calcLifeNumber(dateStr) {
  const digits = dateStr.replace(/\D/g, '');
  let sum = digits.split('').reduce((a, b) => a + parseInt(b), 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }
  return sum;
}

export function getLifeNumberMeaning(num) {
  return LIFE_NUMBER_MEANINGS[num] || { title: 'Desconocido', desc: '' };
}

export function getChineseZodiac(yearOrDate) {
  const year = typeof yearOrDate === 'string' ? getChineseYear(yearOrDate) : yearOrDate;
  const index = (year - 4) % 12;
  return ZODIAC_ANIMALS[index];
}

export function getChineseElement(yearOrDate) {
  const year = typeof yearOrDate === 'string' ? getChineseYear(yearOrDate) : yearOrDate;
  const index = Math.floor(((year - 4) % 10) / 2);
  return ELEMENTS[index];
}

export function getChineseYear_export(dateStr) {
  return getChineseYear(dateStr);
}

export function calcCompatibility(person1, person2) {
  const year1 = getChineseYear(person1.fecha_nacimiento);
  const year2 = getChineseYear(person2.fecha_nacimiento);

  const zodiac1 = getChineseZodiac(year1);
  const zodiac2 = getChineseZodiac(year2);
  const element1 = getChineseElement(year1);
  const element2 = getChineseElement(year2);
  const life1 = calcLifeNumber(person1.fecha_nacimiento);
  const life2 = calcLifeNumber(person2.fecha_nacimiento);

  let zodiacScore = 5;
  const inTriangle = AFFINITY_TRIANGLES.some(t => t.includes(zodiac1.name) && t.includes(zodiac2.name));
  const isOpposite = OPPOSITES.some(o => (o[0] === zodiac1.name && o[1] === zodiac2.name) || (o[1] === zodiac1.name && o[0] === zodiac2.name));

  if (zodiac1.name === zodiac2.name) zodiacScore = 7;
  if (inTriangle) zodiacScore = 9;
  if (isOpposite) zodiacScore = 3;

  let elementScore = 5;
  const ELEMENT_COMPAT = { 'Madera': 'Agua', 'Agua': 'Metal', 'Metal': 'Tierra', 'Tierra': 'Fuego', 'Fuego': 'Madera' };
  const ELEMENT_CONFLICT = { 'Madera': 'Tierra', 'Tierra': 'Agua', 'Agua': 'Fuego', 'Fuego': 'Metal', 'Metal': 'Madera' };

  if (element1.name === element2.name) elementScore = 7;
  if (ELEMENT_COMPAT[element1.name] === element2.name || ELEMENT_COMPAT[element2.name] === element1.name) elementScore = 9;
  if (ELEMENT_CONFLICT[element1.name] === element2.name || ELEMENT_CONFLICT[element2.name] === element1.name) elementScore = 3;

  let numScore = 5;
  const diff = Math.abs(life1 - life2);
  if (life1 === life2) numScore = 8;
  else if (diff <= 2) numScore = 7;
  else if (diff >= 6) numScore = 4;
  if ((life1 === 1 && life2 === 5) || (life1 === 5 && life2 === 1)) numScore = 9;
  if ((life1 === 2 && life2 === 6) || (life1 === 6 && life2 === 2)) numScore = 9;
  if ((life1 === 3 && life2 === 9) || (life1 === 9 && life2 === 3)) numScore = 9;

  const overall = Math.round((zodiacScore * 0.4 + elementScore * 0.3 + numScore * 0.3) * 10) / 10;

  let tips = [];
  if (zodiacScore >= 8) tips.push('El zodiaco chino favorece esta conexión — hay afinidad natural.');
  if (zodiacScore <= 4) tips.push('Sus signos chinos son opuestos — necesitan paciencia y respeto mutuo.');
  if (elementScore >= 8) tips.push('Sus elementos se alimentan mutuamente — energía complementaria.');
  if (elementScore <= 4) tips.push('Sus elementos chocan — busquen actividades que equilibren sus energías.');
  if (numScore >= 8) tips.push('Sus números de vida vibran en armonía — conexión profunda.');
  if (numScore <= 4) tips.push('Numerológicamente diferentes — la diversidad puede ser su fortaleza.');
  if (tips.length === 0) tips.push('Una relación con potencial de crecimiento mutuo.');

  return { overall, zodiacScore, elementScore, numScore, tips };
}

export { ZODIAC_ANIMALS, ELEMENTS, LIFE_NUMBER_MEANINGS };
