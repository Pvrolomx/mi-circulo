// Zodiaco Chino - ciclo de 12 años
const ZODIAC_ANIMALS = [
  { name: 'Rata', emoji: '🐀', element_cycle: 0, traits: 'Ingeniosa, astuta, versátil, encantadora' },
  { name: 'Buey', emoji: '🐂', element_cycle: 1, traits: 'Fuerte, confiable, determinada, paciente' },
  { name: 'Tigre', emoji: '🐅', element_cycle: 2, traits: 'Valiente, competitiva, impredecible, segura' },
  { name: 'Conejo', emoji: '🐇', element_cycle: 3, traits: 'Elegante, amable, responsable, prudente' },
  { name: 'Dragón', emoji: '🐉', element_cycle: 4, traits: 'Enérgico, audaz, ambicioso, carismático' },
  { name: 'Serpiente', emoji: '🐍', element_cycle: 5, traits: 'Sabia, intuitiva, elegante, misteriosa' },
  { name: 'Caballo', emoji: '🐴', element_cycle: 6, traits: 'Libre, activa, enérgica, aventurera' },
  { name: 'Cabra', emoji: '🐐', element_cycle: 7, traits: 'Creativa, compasiva, gentil, artística' },
  { name: 'Mono', emoji: '🐵', element_cycle: 8, traits: 'Ingenioso, curioso, juguetón, inteligente' },
  { name: 'Gallo', emoji: '🐓', element_cycle: 9, traits: 'Observador, trabajador, valiente, puntual' },
  { name: 'Perro', emoji: '🐕', element_cycle: 10, traits: 'Leal, honesto, amable, prudente' },
  { name: 'Cerdo', emoji: '🐖', element_cycle: 11, traits: 'Generoso, compasivo, diligente, optimista' },
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

export function getChineseZodiac(year) {
  // El zodiaco chino se basa en año lunar, simplificamos con año gregoriano
  const index = (year - 4) % 12;
  return ZODIAC_ANIMALS[index];
}

export function getChineseElement(year) {
  const index = Math.floor(((year - 4) % 10) / 2);
  return ELEMENTS[index];
}

export function calcCompatibility(person1, person2) {
  const year1 = new Date(person1.fecha_nacimiento).getFullYear();
  const year2 = new Date(person2.fecha_nacimiento).getFullYear();
  
  const zodiac1 = getChineseZodiac(year1);
  const zodiac2 = getChineseZodiac(year2);
  const element1 = getChineseElement(year1);
  const element2 = getChineseElement(year2);
  const life1 = calcLifeNumber(person1.fecha_nacimiento);
  const life2 = calcLifeNumber(person2.fecha_nacimiento);

  // Zodiac compatibility (0-10)
  let zodiacScore = 5;
  const inTriangle = AFFINITY_TRIANGLES.some(t => t.includes(zodiac1.name) && t.includes(zodiac2.name));
  const isOpposite = OPPOSITES.some(o => (o[0] === zodiac1.name && o[1] === zodiac2.name) || (o[1] === zodiac1.name && o[0] === zodiac2.name));
  
  if (zodiac1.name === zodiac2.name) zodiacScore = 7;
  if (inTriangle) zodiacScore = 9;
  if (isOpposite) zodiacScore = 3;

  // Element compatibility
  let elementScore = 5;
  const ELEMENT_COMPAT = { 'Madera': 'Agua', 'Agua': 'Metal', 'Metal': 'Tierra', 'Tierra': 'Fuego', 'Fuego': 'Madera' };
  const ELEMENT_CONFLICT = { 'Madera': 'Tierra', 'Tierra': 'Agua', 'Agua': 'Fuego', 'Fuego': 'Metal', 'Metal': 'Madera' };
  
  if (element1.name === element2.name) elementScore = 7;
  if (ELEMENT_COMPAT[element1.name] === element2.name || ELEMENT_COMPAT[element2.name] === element1.name) elementScore = 9;
  if (ELEMENT_CONFLICT[element1.name] === element2.name || ELEMENT_CONFLICT[element2.name] === element1.name) elementScore = 3;

  // Numerology compatibility
  let numScore = 5;
  const diff = Math.abs(life1 - life2);
  if (life1 === life2) numScore = 8;
  else if (diff <= 2) numScore = 7;
  else if (diff >= 6) numScore = 4;
  // Special combos
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
