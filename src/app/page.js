'use client';
import { useState, useEffect } from 'react';
import { calcLifeNumber, getLifeNumberMeaning, getChineseZodiac, getChineseElement, calcCompatibility, getChineseYear_export, ZODIAC_ANIMALS, calcFullCompatibility, getWesternSign, getNakshatra, getYinYang, calcSoulNumber, calcDestinyNumber, getAllies, getEnemy, matchRelationships, LIFE_NUMBER_MEANINGS, AFFINITY_TRIANGLES, OPPOSITES } from '@/lib/numerology';
import { getPersonas, addPersona, updatePersona, deletePersona } from '@/lib/supabase';

const CATEGORIES = [
  { value: 'familia', label: '👨‍👩‍👧 Familia', color: '#c62828' },
  { value: 'amigo', label: '💛 Amigo', color: '#f9a825' },
  { value: 'cliente', label: '💼 Cliente', color: '#1565c0' },
  { value: 'trabajo', label: '🏢 Trabajo', color: '#2e7d32' },
];

function PersonCard({ persona, onClick }) {
  const zodiac = getChineseZodiac(persona.fecha_nacimiento);
  const lifeNum = calcLifeNumber(persona.fecha_nacimiento);
  const meaning = getLifeNumberMeaning(lifeNum);
  const cat = CATEGORIES.find(c => c.value === persona.categoria) || CATEGORIES[0];
  const birthDate = new Date(persona.fecha_nacimiento + 'T12:00:00');
  const birthStr = birthDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <button onClick={onClick} className="w-full text-left bg-white rounded-2xl p-4 card-glow hover:shadow-lg transition-all border border-[#f0e6d3] active:scale-[0.98]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full gradient-mystic flex items-center justify-center text-2xl shrink-0">
          {zodiac.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h3 className="font-semibold text-[#2d1f0e] truncate">{persona.nombre}</h3>
            <span className="text-xs text-[#c4a882] shrink-0">{birthStr}</span>
          </div>
          <p className="text-sm text-[#8d6e63]">{zodiac.name} · Nº {lifeNum} {meaning.title}</p>
          {persona.nota && <p className="text-xs text-[#c4a882] mt-0.5 truncate italic">"{persona.nota}"</p>}
        </div>
        <span className="text-xs px-2 py-1 rounded-full shrink-0" style={{ background: cat.color + '18', color: cat.color }}>
          {cat.label.split(' ')[0]}
        </span>
      </div>
    </button>
  );
}

function AddPersonForm({ onSave, onCancel, initial }) {
  const [nombre, setNombre] = useState(initial?.nombre || '');
  const [fecha, setFecha] = useState(initial?.fecha_nacimiento || '');
  const [categoria, setCategoria] = useState(initial?.categoria || 'familia');
  const [nota, setNota] = useState(initial?.nota || '');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#faf5eb] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold text-[#2d1f0e] mb-6">{initial ? 'Editar' : 'Agregar'} Persona</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#8d6e63] mb-1">Nombre</label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#f0e6d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4a843] text-[#2d1f0e]"
              placeholder="Nombre completo" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8d6e63] mb-1">Fecha de nacimiento</label>
            <input type="date" value={fecha} onChange={e => setFecha(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#f0e6d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4a843] text-[#2d1f0e]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8d6e63] mb-1">Nota <span className="text-[#c4a882] font-normal">(opcional)</span></label>
            <input type="text" value={nota} onChange={e => setNota(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#f0e6d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4a843] text-[#2d1f0e]"
              placeholder="Ej: vecina del 3B, compañera de yoga..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#8d6e63] mb-1">Categoría</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(c => (
                <button key={c.value} onClick={() => setCategoria(c.value)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${categoria === c.value ? 'ring-2 ring-offset-1' : 'opacity-60'}`}
                  style={{ background: c.color + '18', color: c.color, ringColor: c.color }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-[#f0e6d3] text-[#8d6e63] font-medium">Cancelar</button>
          <button onClick={() => { if (nombre && fecha) onSave({ nombre, fecha_nacimiento: fecha, categoria, nota: nota || null }); }}
            disabled={!nombre || !fecha}
            className="flex-1 py-3 rounded-xl gradient-mystic text-white font-medium disabled:opacity-40">
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryChanger({ currentCat, onChangeCat, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#faf5eb] w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6">
        <h2 className="text-lg font-bold text-[#2d1f0e] mb-4">Cambiar categoría</h2>
        <div className="space-y-2">
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => onChangeCat(c.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${c.value === currentCat ? 'ring-2 ring-offset-1 opacity-100' : 'opacity-70 hover:opacity-100'}`}
              style={{ background: c.color + '15', color: c.color, ringColor: c.color }}>
              <span className="text-lg">{c.label.split(' ')[0]}</span>
              <span className="font-medium">{c.label.split(' ').slice(1).join(' ')}</span>
              {c.value === currentCat && <span className="ml-auto text-sm">actual</span>}
            </button>
          ))}
        </div>
        <button onClick={onCancel} className="w-full mt-4 py-3 rounded-xl border border-[#f0e6d3] text-[#8d6e63]">Cancelar</button>
      </div>
    </div>
  );
}

function PersonProfile({ persona, onBack, onCompare, onDelete, onChangeCategory, onEditNota, onEdit, allPersonas }) {
  const zodiac = getChineseZodiac(persona.fecha_nacimiento);
  const element = getChineseElement(persona.fecha_nacimiento);
  const lifeNum = calcLifeNumber(persona.fecha_nacimiento);
  const meaning = getLifeNumberMeaning(lifeNum);
  const chineseYear = getChineseYear_export(persona.fecha_nacimiento);
  const birthDate = new Date(persona.fecha_nacimiento + 'T12:00:00');
  const gregorianYear = birthDate.getFullYear();
  const cat = CATEGORIES.find(c => c.value === persona.categoria) || CATEGORIES[0];
  const yinYang = getYinYang(persona.fecha_nacimiento);
  const soulNum = calcSoulNumber(persona.nombre);
  const destinyNum = calcDestinyNumber(persona.nombre);
  const western = getWesternSign(persona.fecha_nacimiento);
  const allies = getAllies(zodiac.name);
  const enemy = getEnemy(zodiac.name);
  const relationships = allPersonas ? matchRelationships(persona, allPersonas) : null;

  return (
    <div className="min-h-screen bg-[#faf5eb]">
      <div className="gradient-mystic text-white p-6 pb-10 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">←</button>
          <div className="flex-1" />
          <button onClick={onEdit} className="text-sm text-white/60 hover:text-white mr-3">Editar</button>
          <button onClick={onDelete} className="text-sm text-white/60 hover:text-red-300">Eliminar</button>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur mx-auto flex items-center justify-center text-4xl mb-3">
            {zodiac.emoji}
          </div>
          <h1 className="text-2xl font-bold">{persona.nombre}</h1>
          <p className="text-white/70 mt-1">{birthDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          <button onClick={onChangeCategory}
            className="mt-2 inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all">
            {cat.label} <span className="opacity-60">✎</span>
          </button>
          {persona.nota && (
            <p className="mt-2 text-sm text-white/50 italic">"{persona.nota}"</p>
          )}
          <button onClick={onEditNota}
            className="mt-1 text-xs text-white/40 hover:text-white/70 transition-all">
            {persona.nota ? '✎ editar nota' : '+ agregar nota'}
          </button>
        </div>
      </div>

      <div className="px-4 -mt-6 space-y-4 pb-24">
        {/* Número de vida */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-2">Número de Vida</p>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-[#d4a843]">{lifeNum}</span>
            <div>
              <h3 className="font-bold text-[#2d1f0e]">{meaning.title}</h3>
              <p className="text-sm text-[#8d6e63] mt-1">{meaning.desc}</p>
            </div>
          </div>
        </div>

        {/* Zodiaco Chino */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-2">Zodiaco Chino</p>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{zodiac.emoji}</span>
            <div>
              <h3 className="font-bold text-[#2d1f0e]">{zodiac.name}</h3>
              <p className="text-sm text-[#8d6e63] mt-1">{zodiac.traits}</p>
              {chineseYear !== gregorianYear && (
                <p className="text-xs text-[#d4a843] mt-1">⚡ Año chino: {chineseYear} (nació antes del Año Nuevo Lunar)</p>
              )}
            </div>
          </div>
        </div>

        {/* Elemento */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-2">Elemento Chino</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{element.emoji}</span>
            <div>
              <h3 className="font-bold" style={{ color: element.color }}>{element.name}</h3>
              <p className="text-sm text-[#8d6e63] mt-1">{element.influence}</p>
            </div>
          </div>
        </div>

        {/* Yin / Yang */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-2">Yin / Yang</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{yinYang.emoji}</span>
            <div>
              <h3 className="font-bold text-[#2d1f0e]">{yinYang.type}</h3>
              <p className="text-sm text-[#8d6e63] mt-1">{yinYang.desc}</p>
            </div>
          </div>
        </div>

        {/* Zodiaco Occidental */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-2">Zodiaco Occidental</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{western.emoji}</span>
            <div>
              <h3 className="font-bold text-[#2d1f0e]">{western.name}</h3>
              <p className="text-sm text-[#8d6e63] mt-1">Elemento: {western.element} · {western.modality}</p>
            </div>
          </div>
        </div>

        {/* Soul & Destiny Numbers */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-3">Numerología del Nombre</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-xl bg-[#faf5eb]">
              <p className="text-xs text-[#c4a882] mb-1">Nº del Alma</p>
              <span className="text-3xl font-bold text-[#d4a843]">{soulNum ?? '—'}</span>
              <p className="text-xs text-[#8d6e63] mt-1">Deseos internos</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-[#faf5eb]">
              <p className="text-xs text-[#c4a882] mb-1">Nº del Destino</p>
              <span className="text-3xl font-bold text-[#d4a843]">{destinyNum ?? '—'}</span>
              <p className="text-xs text-[#8d6e63] mt-1">Misión de vida</p>
            </div>
          </div>
        </div>

        {/* Aliados y Enemigos */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-3">Aliados y Opuestos</p>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#c4a882] mb-1.5">🤝 Aliados (triángulo de afinidad)</p>
              <div className="flex gap-2">
                {allies.map(a => {
                  const animal = ZODIAC_ANIMALS.find(z => z.name === a);
                  return (
                    <span key={a} className="px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm">
                      {animal?.emoji} {a}
                    </span>
                  );
                })}
              </div>
              {relationships && relationships.allies.some(a => a.people.length > 0) && (
                <div className="mt-2 text-xs text-[#2e7d32]">
                  {relationships.allies.filter(a => a.people.length > 0).map(a => (
                    <span key={a.animal}>{a.emoji} {a.people.map(p => p.nombre).join(', ')} · </span>
                  ))}
                </div>
              )}
            </div>
            {enemy && (
              <div>
                <p className="text-xs text-[#c4a882] mb-1.5">⚡ Opuesto</p>
                <span className="px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm">
                  {ZODIAC_ANIMALS.find(z => z.name === enemy)?.emoji} {enemy}
                </span>
                {relationships && relationships.enemy.people.length > 0 && (
                  <p className="mt-2 text-xs text-[#c62828]">
                    {relationships.enemy.people.map(p => p.nombre).join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <button onClick={onCompare}
          className="w-full py-4 rounded-2xl gradient-mystic text-white font-semibold text-lg hover:opacity-90 transition-all">
          🔮 Comparar con...
        </button>
      </div>
    </div>
  );
}

function CompareView({ person1, person2, onBack }) {
  const [showFull, setShowFull] = useState(false);
  const compat = calcCompatibility(person1, person2);
  const z1 = getChineseZodiac(person1.fecha_nacimiento);
  const z2 = getChineseZodiac(person2.fecha_nacimiento);
  const n1 = calcLifeNumber(person1.fecha_nacimiento);
  const n2 = calcLifeNumber(person2.fecha_nacimiento);

  const fullCompat = showFull ? calcFullCompatibility(person1, person2) : null;

  const ScoreBar = ({ label, score }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-[#8d6e63]">{label}</span>
        <span className="font-semibold text-[#2d1f0e]">{score}/10</span>
      </div>
      <div className="h-2 bg-[#f0e6d3] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{
          width: `${score * 10}%`,
          background: score >= 7 ? '#2e7d32' : score >= 5 ? '#f9a825' : '#c62828'
        }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf5eb]">
      <div className="gradient-mystic text-white p-6 pb-8 rounded-b-3xl">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">←</button>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center text-3xl">{z1.emoji}</div>
            <p className="mt-2 font-medium text-sm">{person1.nombre}</p>
            <p className="text-white/50 text-xs">Nº {n1}</p>
          </div>
          <div className="text-3xl">💫</div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center text-3xl">{z2.emoji}</div>
            <p className="mt-2 font-medium text-sm">{person2.nombre}</p>
            <p className="text-white/50 text-xs">Nº {n2}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 pb-8">
        <div className="bg-white rounded-2xl p-6 card-glow text-center">
          <p className="text-sm text-[#8d6e63] mb-2">Compatibilidad General</p>
          <div className="text-6xl font-bold" style={{
            color: compat.overall >= 7 ? '#2e7d32' : compat.overall >= 5 ? '#d4a843' : '#c62828'
          }}>{compat.overall}</div>
          <p className="text-[#8d6e63] text-sm mt-1">de 10</p>
        </div>

        <div className="bg-white rounded-2xl p-5 card-glow space-y-4">
          <ScoreBar label="🐲 Zodiaco Chino" score={compat.zodiacScore} />
          <ScoreBar label="🔢 Numerología" score={compat.numScore} />
        </div>

        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm font-semibold text-[#2d1f0e] mb-3">✨ Consejos</p>
          <div className="space-y-2">
            {compat.tips.map((tip, i) => (
              <p key={i} className="text-sm text-[#8d6e63]">• {tip}</p>
            ))}
          </div>
        </div>

        {/* 4 Traditions */}
        {!showFull ? (
          <button onClick={() => setShowFull(true)}
            className="w-full py-3 rounded-2xl border border-[#d4a843] text-[#d4a843] text-sm font-medium hover:bg-[#d4a843]/10 transition-all">
            🔮 Ver compatibilidad en 4 tradiciones
          </button>
        ) : fullCompat && (
          <div className="bg-white rounded-2xl p-5 card-glow space-y-4">
            <div className="text-center mb-2">
              <p className="text-xs text-[#c4a882]">Compatibilidad 4 Tradiciones</p>
              <p className="text-3xl font-bold" style={{
                color: fullCompat.overall >= 7 ? '#2e7d32' : fullCompat.overall >= 5 ? '#d4a843' : '#c62828'
              }}>{fullCompat.overall}<span className="text-sm text-[#8d6e63] font-normal">/10</span></p>
            </div>

            <ScoreBar label={`🐲 Chino — ${fullCompat.chinese.zodiac1.name} + ${fullCompat.chinese.zodiac2.name}`} score={fullCompat.chinese.score} />
            <ScoreBar label={`${fullCompat.western.sign1.emoji} Occidental — ${fullCompat.western.sign1.name} + ${fullCompat.western.sign2.name}`} score={fullCompat.western.score} />
            <ScoreBar label={`🪷 Védico — ${fullCompat.vedic.nakshatra1.name} + ${fullCompat.vedic.nakshatra2.name}`} score={fullCompat.vedic.score} />
            <ScoreBar label={`🔢 Numerología — ${fullCompat.numerology.num1} + ${fullCompat.numerology.num2}`} score={fullCompat.numerology.score} />

            <p className="text-xs text-[#c4a882] text-center mt-2">Védico aproximado sin hora de nacimiento</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CompareSelector({ personas, current, onSelect, onCancel }) {
  const others = personas.filter(p => p.id !== current.id).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-[#faf5eb] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 max-h-[70vh] overflow-auto">
        <h2 className="text-xl font-bold text-[#2d1f0e] mb-4">Comparar {current.nombre} con...</h2>
        {others.length === 0 ? (
          <p className="text-[#8d6e63] text-center py-8">Agrega más personas para comparar</p>
        ) : (
          <div className="space-y-2">
            {others.map(p => {
              const z = getChineseZodiac(p.fecha_nacimiento);
              return (
                <button key={p.id} onClick={() => onSelect(p)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-all">
                  <span className="text-2xl">{z.emoji}</span>
                  <span className="font-medium text-[#2d1f0e]">{p.nombre}</span>
                </button>
              );
            })}
          </div>
        )}
        <button onClick={onCancel} className="w-full mt-4 py-3 rounded-xl border border-[#f0e6d3] text-[#8d6e63]">Cancelar</button>
      </div>
    </div>
  );
}

function NoteEditor({ currentNote, onSave, onCancel }) {
  const [nota, setNota] = useState(currentNote || '');
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#faf5eb] w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6">
        <h2 className="text-lg font-bold text-[#2d1f0e] mb-4">Nota</h2>
        <input type="text" value={nota} onChange={e => setNota(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#f0e6d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4a843] text-[#2d1f0e]"
          placeholder="Ej: vecina del 3B, compañera de yoga..." autoFocus />
        <div className="flex gap-3 mt-4">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl border border-[#f0e6d3] text-[#8d6e63]">Cancelar</button>
          <button onClick={() => onSave(nota || null)} className="flex-1 py-3 rounded-xl gradient-mystic text-white font-medium">Guardar</button>
        </div>
      </div>
    </div>
  );
}

function AffinityMap({ personas, onBack, onSelectPerson }) {
  const personsByAnimal = {};
  personas.forEach(p => {
    const z = getChineseZodiac(p.fecha_nacimiento);
    if (!personsByAnimal[z.name]) personsByAnimal[z.name] = [];
    personsByAnimal[z.name].push(p);
  });

  const triangles = [
    { animals: ['Rata', 'Dragón', 'Mono'], label: 'Acción', color: '#c62828' },
    { animals: ['Buey', 'Serpiente', 'Gallo'], label: 'Intelecto', color: '#1565c0' },
    { animals: ['Tigre', 'Caballo', 'Perro'], label: 'Coraje', color: '#2e7d32' },
    { animals: ['Conejo', 'Cabra', 'Cerdo'], label: 'Diplomacia', color: '#7b1fa2' },
  ];

  const opposites = [
    ['Rata', 'Caballo'], ['Buey', 'Cabra'], ['Tigre', 'Mono'],
    ['Conejo', 'Gallo'], ['Dragón', 'Perro'], ['Serpiente', 'Cerdo'],
  ];

  const getEmoji = (name) => ZODIAC_ANIMALS.find(a => a.name === name)?.emoji || '';

  return (
    <div className="min-h-screen bg-[#faf5eb]">
      <div className="gradient-mystic text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">←</button>
          <div>
            <h1 className="text-xl font-bold">Mapa de Afinidades</h1>
            <p className="text-white/60 text-sm">Aliados y opuestos en tu círculo</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 pb-8">
        {/* Triangles */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm font-semibold text-[#2d1f0e] mb-1">🤝 Triángulos de Afinidad</p>
          <p className="text-xs text-[#c4a882] mb-4">Los 3 signos de cada triángulo son aliados naturales</p>
          <div className="space-y-4">
            {triangles.map(tri => {
              const hasAny = tri.animals.some(a => (personsByAnimal[a]?.length || 0) > 0);
              return (
                <div key={tri.label} className={`p-3 rounded-xl border ${hasAny ? 'border-[#d4a843]/30 bg-[#faf5eb]' : 'border-[#f0e6d3] opacity-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: tri.color }}>{tri.label}</span>
                    <span className="text-sm">{tri.animals.map(a => getEmoji(a)).join(' ')}</span>
                  </div>
                  <div className="flex gap-4">
                    {tri.animals.map(animal => {
                      const people = personsByAnimal[animal] || [];
                      return (
                        <div key={animal} className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#8d6e63]">{getEmoji(animal)} {animal}</p>
                          {people.length > 0 ? (
                            <div className="mt-1 space-y-0.5">
                              {people.map(p => (
                                <button key={p.id} onClick={() => onSelectPerson(p)}
                                  className="block text-xs text-[#2d1f0e] hover:text-[#d4a843] truncate w-full text-left">
                                  {p.nombre}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-[#c4a882] mt-1">—</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Opposites */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm font-semibold text-[#2d1f0e] mb-1">⚡ Pares Opuestos</p>
          <p className="text-xs text-[#c4a882] mb-4">Signos que se desafían mutuamente — requieren paciencia</p>
          <div className="space-y-3">
            {opposites.map(([a1, a2]) => {
              const p1 = personsByAnimal[a1] || [];
              const p2 = personsByAnimal[a2] || [];
              const hasConflict = p1.length > 0 && p2.length > 0;
              return (
                <div key={a1 + a2} className={`flex items-center gap-3 p-3 rounded-xl border ${hasConflict ? 'border-red-200 bg-red-50/50' : 'border-[#f0e6d3]'}`}>
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-sm">{getEmoji(a1)} {a1}</p>
                    {p1.map(p => (
                      <button key={p.id} onClick={() => onSelectPerson(p)}
                        className="block text-xs text-[#8d6e63] hover:text-[#d4a843] truncate w-full text-right">
                        {p.nombre}
                      </button>
                    ))}
                    {p1.length === 0 && <p className="text-xs text-[#c4a882]">—</p>}
                  </div>
                  <span className="text-lg shrink-0">{hasConflict ? '⚡' : '·'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{getEmoji(a2)} {a2}</p>
                    {p2.map(p => (
                      <button key={p.id} onClick={() => onSelectPerson(p)}
                        className="block text-xs text-[#8d6e63] hover:text-[#d4a843] truncate w-full text-left">
                        {p.nombre}
                      </button>
                    ))}
                    {p2.length === 0 && <p className="text-xs text-[#c4a882]">—</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [personas, setPersonas] = useState([]);
  const [view, setView] = useState('list');
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [comparePair, setComparePair] = useState(null);
  const [showCompareSelect, setShowCompareSelect] = useState(false);
  const [showCategoryChanger, setShowCategoryChanger] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterZodiac, setFilterZodiac] = useState('all');
  const [showZodiacFilter, setShowZodiacFilter] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    getPersonas().then(p => { setPersonas(p); setLoading(false); });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAdd = async (data) => {
    const p = await addPersona(data);
    setPersonas(prev => [p, ...prev]);
    setShowAdd(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta persona?')) return;
    await deletePersona(id);
    setPersonas(prev => prev.filter(p => p.id !== id));
    setView('list');
    setSelected(null);
  };

  const handleChangeCategory = async (newCat) => {
    if (!selected) return;
    const updated = await updatePersona(selected.id, { categoria: newCat });
    if (updated) {
      const updatedPerson = { ...selected, categoria: newCat };
      setPersonas(prev => prev.map(p => p.id === selected.id ? updatedPerson : p));
      setSelected(updatedPerson);
    }
    setShowCategoryChanger(false);
  };

  const handleEditNota = async (newNota) => {
    if (!selected) return;
    const updated = await updatePersona(selected.id, { nota: newNota });
    if (updated) {
      const updatedPerson = { ...selected, nota: newNota };
      setPersonas(prev => prev.map(p => p.id === selected.id ? updatedPerson : p));
      setSelected(updatedPerson);
    }
    setShowNoteEditor(false);
  };

  const handleEdit = async (data) => {
    if (!selected) return;
    const updated = await updatePersona(selected.id, data);
    if (updated) {
      const updatedPerson = { ...selected, ...data };
      setPersonas(prev => prev.map(p => p.id === selected.id ? updatedPerson : p));
      setSelected(updatedPerson);
    }
    setShowEdit(false);
  };

  const handleInstall = async () => {
    if (installPrompt) { installPrompt.prompt(); setInstallPrompt(null); }
  };

  const filtered = personas.filter(p => {
    const matchSearch = !search || p.nombre.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.categoria === filterCat;
    const matchZodiac = filterZodiac === 'all' || getChineseZodiac(p.fecha_nacimiento).name === filterZodiac;
    return matchSearch && matchCat && matchZodiac;
  }).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  if (view === 'profile' && selected) {
    return (
      <>
        <PersonProfile persona={selected}
          allPersonas={personas}
          onBack={() => { setView('list'); setSelected(null); }}
          onCompare={() => setShowCompareSelect(true)}
          onDelete={() => handleDelete(selected.id)}
          onChangeCategory={() => setShowCategoryChanger(true)}
          onEditNota={() => setShowNoteEditor(true)}
          onEdit={() => setShowEdit(true)} />
        {showCompareSelect && (
          <CompareSelector personas={personas} current={selected}
            onSelect={(p2) => { setComparePair([selected, p2]); setShowCompareSelect(false); setView('compare'); }}
            onCancel={() => setShowCompareSelect(false)} />
        )}
        {showCategoryChanger && (
          <CategoryChanger currentCat={selected.categoria}
            onChangeCat={handleChangeCategory}
            onCancel={() => setShowCategoryChanger(false)} />
        )}
        {showNoteEditor && (
          <NoteEditor currentNote={selected.nota}
            onSave={handleEditNota}
            onCancel={() => setShowNoteEditor(false)} />
        )}
        {showEdit && (
          <AddPersonForm initial={selected}
            onSave={handleEdit}
            onCancel={() => setShowEdit(false)} />
        )}
      </>
    );
  }

  if (view === 'compare' && comparePair) {
    return <CompareView person1={comparePair[0]} person2={comparePair[1]}
      onBack={() => { setView('profile'); setComparePair(null); }} />;
  }

  if (view === 'affinity') {
    return <AffinityMap personas={personas}
      onBack={() => setView('list')}
      onSelectPerson={(p) => { setSelected(p); setView('profile'); }} />;
  }

  return (
    <div className="min-h-screen bg-[#faf5eb] pb-24">
      <div className="gradient-mystic text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Mi Círculo</h1>
            <p className="text-white/60 text-sm mt-1">4 tradiciones · Zodiaco · Numerología</p>
          </div>
          {installPrompt && (
            <button onClick={handleInstall} className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20">
              📲 Instalar
            </button>
          )}
        </div>
        <div className="relative">
          <input type="text" placeholder="Buscar persona..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d4a843]" />
          <span className="absolute left-3 top-3.5 text-white/40">🔍</span>
        </div>
      </div>

      <div className="px-4 mt-4 flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => setFilterCat('all')}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${filterCat === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
          Todos ({personas.length})
        </button>
        {CATEGORIES.map(c => {
          const count = personas.filter(p => p.categoria === c.value).length;
          return (
            <button key={c.value} onClick={() => setFilterCat(c.value)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${filterCat === c.value ? 'text-white' : 'bg-white border border-[#f0e6d3]'}`}
              style={filterCat === c.value ? { background: c.color } : { color: c.color }}>
              {c.label.split(' ')[0]} {c.label.split(' ').slice(1).join(' ')} ({count})
            </button>
          );
        })}
      </div>

      {/* Zodiac filter */}
      <div className="px-4 mt-2 flex gap-2 flex-wrap">
        <button onClick={() => setShowZodiacFilter(!showZodiacFilter)}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${filterZodiac !== 'all' ? 'bg-[#d4a843] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
          {filterZodiac !== 'all' ? `${ZODIAC_ANIMALS.find(a => a.name === filterZodiac)?.emoji} ${filterZodiac}` : '🐲 Filtrar por signo'} {showZodiacFilter ? '▲' : '▼'}
        </button>
        {personas.length >= 2 && (
          <button onClick={() => setView('affinity')}
            className="px-4 py-1.5 rounded-full text-sm bg-white text-[#8d6e63] border border-[#f0e6d3] hover:border-[#d4a843] transition-all">
            🤝 Aliados y Opuestos
          </button>
        )}
      </div>
      {showZodiacFilter && (
        <div className="px-4 mt-2 grid grid-cols-4 gap-1.5">
          <button onClick={() => { setFilterZodiac('all'); setShowZodiacFilter(false); }}
            className={`px-2 py-2 rounded-xl text-xs text-center transition-all ${filterZodiac === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-white border border-[#f0e6d3] text-[#8d6e63]'}`}>
            Todos
          </button>
          {ZODIAC_ANIMALS.map(a => {
            const count = personas.filter(p => getChineseZodiac(p.fecha_nacimiento).name === a.name).length;
            return (
              <button key={a.name} onClick={() => { setFilterZodiac(a.name); setShowZodiacFilter(false); }}
                className={`px-2 py-2 rounded-xl text-xs text-center transition-all ${filterZodiac === a.name ? 'bg-[#d4a843] text-white' : 'bg-white border border-[#f0e6d3] text-[#2d1f0e]'}`}>
                {a.emoji} {a.name} {count > 0 && <span className="opacity-60">({count})</span>}
              </button>
            );
          })}
        </div>
      )}

      <div className="px-4 mt-4 space-y-3">
        {loading ? (
          <div className="text-center py-16 text-[#8d6e63]">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔮</div>
            <p className="text-[#8d6e63]">{personas.length === 0 ? 'Agrega tu primera persona' : 'Sin resultados'}</p>
          </div>
        ) : (
          filtered.map(p => (
            <PersonCard key={p.id} persona={p} onClick={() => { setSelected(p); setView('profile'); }} />
          ))
        )}
      </div>

      <button onClick={() => setShowAdd(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-mystic text-white text-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all z-40">
        +
      </button>

      <div className="fixed bottom-0 left-0 right-0 text-center py-2 text-xs text-[#c4a882] bg-[#faf5eb]/80 backdrop-blur">
        Hecho por duendes.app 2026
      </div>

      {showAdd && <AddPersonForm onSave={handleAdd} onCancel={() => setShowAdd(false)} />}
    </div>
  );
}
