'use client';
import { useState, useEffect } from 'react';
import { calcLifeNumber, getLifeNumberMeaning, getChineseZodiac, getChineseElement, calcCompatibility, getChineseYear_export, ZODIAC_ANIMALS, calcFullCompatibility, getWesternSign, getNakshatra, getYinYang, calcSoulNumber, calcDestinyNumber, getAllies, getEnemy, matchRelationships, LIFE_NUMBER_MEANINGS, AFFINITY_TRIANGLES, OPPOSITES, calcKairosFlow, KAIROS_MEANINGS } from '@/lib/numerology';
import { getPersonas, addPersona, updatePersona, deletePersona, subscribeToChanges } from '@/lib/supabase';
import { LangToggle, useLang } from '@/lib/i18n';

const CATEGORIES = [
  { value: 'familia', label: '👨‍👩‍👧 Familia', color: '#c62828', group: 'persona' },
  { value: 'amigo', label: '💛 Amigo', color: '#f9a825', group: 'persona' },
  { value: 'cliente', label: '💼 Cliente', color: '#1565c0', group: 'persona' },
  { value: 'conocido', label: '👋 Conocido', color: '#2e7d32', group: 'persona' },
  { value: 'marca', label: '🏷️ Marca', color: '#7b1fa2', group: 'marca' },
  { value: 'equipo', label: '⚽ Equipo', color: '#388e3c', group: 'equipo' },
  { value: 'pais', label: '🌎 País', color: '#00695c', group: 'pais' },
  { value: 'estado', label: '🏛️ Estado', color: '#0277bd', group: 'pais' },
];

const GROUPS = [
  { value: 'persona', label: '👤 Personas', color: '#c62828', cats: ['familia','amigo','cliente','conocido'] },
  { value: 'marca', label: '🏷️ Marcas', color: '#7b1fa2', cats: ['marca'] },
  { value: 'equipo', label: '⚽ Equipos', color: '#388e3c', cats: ['equipo'] },
  { value: 'pais', label: '🌎 Países', color: '#00695c', cats: ['pais','estado'] },
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
  const [hora, setHora] = useState(initial?.hora_nacimiento || '');
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
            <label className="block text-sm font-medium text-[#8d6e63] mb-1">Hora de nacimiento <span className="text-[#c4a882] font-normal">(opcional — mejora Nakshatra)</span></label>
            <input type="time" value={hora} onChange={e => setHora(e.target.value)}
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
          <button onClick={() => { if (nombre && fecha) onSave({ nombre, fecha_nacimiento: fecha, hora_nacimiento: hora || null, categoria, nota: nota || null }); }}
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
  const [relFilter, setRelFilter] = useState('persona');
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
  const nakshatra = getNakshatra(persona.fecha_nacimiento, persona.hora_nacimiento || null);
  const allies = getAllies(zodiac.name);
  const enemy = getEnemy(zodiac.name);
  const relationships = allPersonas ? matchRelationships(persona, allPersonas) : null;

  // Filtrar personas en relaciones por categoría seleccionada
  const filterPeople = (people) => {
    if (relFilter === 'all') return people;
    const group = GROUPS.find(g => g.value === relFilter);
    if (group) return people.filter(p => group.cats.includes(p.categoria));
    return people.filter(p => p.categoria === relFilter);
  };

  const filteredRelationships = relationships ? {
    allies: relationships.allies.map(a => ({ ...a, people: filterPeople(a.people) })),
    enemy: { ...relationships.enemy, people: filterPeople(relationships.enemy.people) },
  } : null;

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
          <p className="text-white/70 mt-1">{birthDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}{persona.hora_nacimiento ? ` · ${persona.hora_nacimiento} hrs` : ''}</p>
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

        {/* Nakshatra Védico */}
        <div className="bg-white rounded-2xl p-5 card-glow">
          <p className="text-sm text-[#8d6e63] mb-2">Nakshatra Védico</p>
          <div className="flex items-center gap-4">
            <span className="text-4xl">🪷</span>
            <div>
              <h3 className="font-bold text-[#2d1f0e]">{nakshatra.name}</h3>
              <p className="text-sm text-[#8d6e63] mt-1">Pada {nakshatra.pada} · Grupo: {nakshatra.group}</p>
              <p className="text-xs text-[#c4a882] mt-1">
                {nakshatra.precision === 'buena' ? '✓ Precisión buena (con hora)' : '≈ Aproximado (sin hora de nacimiento)'}
              </p>
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
        <details className="bg-white rounded-2xl card-glow">
          <summary className="px-5 pt-5 pb-3 cursor-pointer flex items-center justify-between">
            <p className="text-sm text-[#8d6e63]">Aliados y Opuestos</p>
            <span className="text-xs text-[#c4a882]">▼</span>
          </summary>
          <div className="px-5 pb-5">

          {/* Filtro por categoría */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {GROUPS.map(g => (
              <button key={g.value}
                onClick={() => setRelFilter(g.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${relFilter === g.value ? 'text-white' : 'bg-[#faf5eb] text-[#8d6e63] hover:bg-[#f0e6d6]'}`}
                style={relFilter === g.value ? { backgroundColor: g.color } : {}}
              >{g.label}</button>
            ))}
            <button
              onClick={() => setRelFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${relFilter === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-[#faf5eb] text-[#8d6e63] hover:bg-[#f0e6d6]'}`}
            >Todos</button>
          </div>

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
              {filteredRelationships && filteredRelationships.allies.some(a => a.people.length > 0) && (
                <div className="mt-2 text-xs text-[#2e7d32]">
                  {filteredRelationships.allies.filter(a => a.people.length > 0).map(a => (
                    <span key={a.animal}>{a.emoji} {a.people.map(p => p.nombre).join(', ')} · </span>
                  ))}
                </div>
              )}
              {filteredRelationships && filteredRelationships.allies.every(a => a.people.length === 0) && relFilter !== 'all' && (
                <p className="mt-2 text-xs text-[#c4a882] italic">Sin aliados en esta categoría</p>
              )}
            </div>
            {enemy && (
              <div>
                <p className="text-xs text-[#c4a882] mb-1.5">⚡ Opuesto</p>
                <span className="px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm">
                  {ZODIAC_ANIMALS.find(z => z.name === enemy)?.emoji} {enemy}
                </span>
                {filteredRelationships && filteredRelationships.enemy.people.length > 0 && (
                  <p className="mt-2 text-xs text-[#c62828]">
                    {filteredRelationships.enemy.people.map(p => p.nombre).join(', ')}
                  </p>
                )}
                {filteredRelationships && filteredRelationships.enemy.people.length === 0 && relFilter !== 'all' && (
                  <p className="mt-2 text-xs text-[#c4a882] italic">Sin opuestos en esta categoría</p>
                )}
              </div>
            )}
          </div>
          </div>
        </details>

        {/* Top 5 Afinidad & Bottom 5 Opuestos */}
        {allPersonas && allPersonas.length > 1 && (() => {
          const others = allPersonas.filter(p => p.id !== persona.id);
          const filtered = relFilter === 'all' ? others : (() => {
            const group = GROUPS.find(g => g.value === relFilter);
            return group ? others.filter(p => group.cats.includes(p.categoria)) : others;
          })();
          if (filtered.length === 0) return null;
          const scored = filtered.map(p => ({
            ...p,
            score: calcCompatibility(persona, p).overall,
            fullScore: calcFullCompatibility(persona, p)
          })).sort((a, b) => b.score - a.score);
          const top5 = scored.slice(0, 5);
          const bottom5 = scored.slice(-5).reverse();
          return (
            <details className="bg-white rounded-2xl card-glow">
              <summary className="px-5 pt-5 pb-3 cursor-pointer flex items-center justify-between">
                <p className="text-sm text-[#8d6e63]">🏆 Mejores 5 y ⚡ Menores 5</p>
                <span className="text-xs text-[#c4a882]">▼</span>
              </summary>
              <div className="px-5 pb-5">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#c4a882] mb-2">🏆 Mejores 5 — Mayor afinidad</p>
                  <div className="space-y-1.5">
                    {top5.map((p, i) => {
                      const z = getChineseZodiac(p.fecha_nacimiento);
                      return (
                        <details key={p.id} className="group">
                          <summary className="flex items-center justify-between px-3 py-2 rounded-xl bg-green-50 cursor-pointer list-none">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-green-700">{i + 1}</span>
                              <span className="text-sm">{z.emoji}</span>
                              <span className="text-sm text-[#2d1f0e]">{p.nombre}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-green-700">{p.score}</span>
                              <span className="text-xs text-[#c4a882] group-open:rotate-180 transition-transform">▼</span>
                            </div>
                          </summary>
                          <div className="mt-1 mx-1 px-3 py-2 rounded-lg bg-[#faf5eb] text-xs text-[#8d6e63] grid grid-cols-2 gap-1">
                            <span>🐲 Chino: {p.fullScore.chinese.score}</span>
                            <span>♈ Occidental: {p.fullScore.western.score}</span>
                            <span>🪷 Védico: {p.fullScore.vedic.score}</span>
                            <span>🔢 Numerología: {p.fullScore.numerology.score}</span>
                            <span className="col-span-2 text-[#c4a882] mt-1">Ponderado 4 tradiciones: {p.fullScore.overall.toFixed(1)}</span>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#c4a882] mb-2">⚡ Menores 5 — Menor afinidad</p>
                  <div className="space-y-1.5">
                    {bottom5.map((p, i) => {
                      const z = getChineseZodiac(p.fecha_nacimiento);
                      return (
                        <details key={p.id} className="group">
                          <summary className="flex items-center justify-between px-3 py-2 rounded-xl bg-red-50 cursor-pointer list-none">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-red-700">{scored.length - 4 + i}</span>
                              <span className="text-sm">{z.emoji}</span>
                              <span className="text-sm text-[#2d1f0e]">{p.nombre}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-red-700">{p.score}</span>
                              <span className="text-xs text-[#c4a882] group-open:rotate-180 transition-transform">▼</span>
                            </div>
                          </summary>
                          <div className="mt-1 mx-1 px-3 py-2 rounded-lg bg-[#faf5eb] text-xs text-[#8d6e63] grid grid-cols-2 gap-1">
                            <span>🐲 Chino: {p.fullScore.chinese.score}</span>
                            <span>♈ Occidental: {p.fullScore.western.score}</span>
                            <span>🪷 Védico: {p.fullScore.vedic.score}</span>
                            <span>🔢 Numerología: {p.fullScore.numerology.score}</span>
                            <span className="col-span-2 text-[#c4a882] mt-1">Ponderado 4 tradiciones: {p.fullScore.overall.toFixed(1)}</span>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              </div>
              </div>
            </details>
          );
        })()}

        {/* Kairos Flow — solo para personas */}
        {['familia','amigo','cliente','conocido'].includes(persona.categoria) && (() => {
          const kairos = calcKairosFlow(persona.fecha_nacimiento);
          const legacy = kairos[8];
          return (
            <details className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
              <summary className="px-5 py-4 cursor-pointer flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔱</span>
                  <div>
                    <div className="font-bold text-sm">Kairos Flow</div>
                    <div className="text-xs opacity-70">9 posiciones numerológicas</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60">Legado</span>
                  <span className={`text-lg font-black ${legacy.isMaster ? 'text-amber-300' : 'text-white'}`}>
                    {legacy.isMaster ? `☆${legacy.value}` : legacy.value}
                  </span>
                  <span className="text-xs opacity-40 ml-1">▼</span>
                </div>
              </summary>
              <div className="px-4 pb-4">
                <div className="grid gap-1.5">
                  {kairos.map(k => {
                    const meaning = KAIROS_MEANINGS[k.value] || KAIROS_MEANINGS[k.value > 9 ? k.value : k.value];
                    return (
                      <details key={k.pos} className={`rounded-xl ${k.pos === 9 ? 'bg-white/15 border border-amber-400/30' : 'bg-white/8'}`}>
                        <summary className="flex items-center justify-between px-3 py-2 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="text-sm w-5 text-center opacity-50 text-white">{k.pos}</span>
                            <span className="text-base">{k.emoji}</span>
                            <div>
                              <div className="text-xs font-semibold text-white">{k.name}</div>
                              <div className="text-[10px] opacity-50 text-white">{k.desc}</div>
                            </div>
                          </div>
                          <span className={`text-lg font-black min-w-[2.5rem] text-right ${k.isMaster ? 'text-amber-300' : 'text-white/90'}`}>
                            {k.isMaster ? `☆${k.value}` : k.value}
                          </span>
                        </summary>
                        {meaning && (
                          <div className="px-3 pb-3 pt-1 border-t border-white/10 mx-2 mb-1">
                            <div className={`text-sm font-bold mb-1 ${k.isMaster ? 'text-amber-300' : 'text-white/90'}`}>
                              {meaning.title}
                            </div>
                            <div className="text-[10px] text-amber-200/60 mb-1.5">{meaning.keywords}</div>
                            <div className="text-xs text-white/70 leading-relaxed">{meaning.desc}</div>
                          </div>
                        )}
                      </details>
                    );
                  })}
                </div>
                <div className="mt-3 text-center text-[10px] text-white/30">
                  Kairos Flow · Basado en fecha de nacimiento · Números maestros (11, 22, 33) no se reducen
                </div>
              </div>
            </details>
          );
        })()}

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

            {/* Radar Chart */}
            <div className="flex justify-center">
              <svg viewBox="0 0 200 200" width="220" height="220">
                {/* Background grid */}
                {[0.25, 0.5, 0.75, 1].map((scale, i) => {
                  const r = 70 * scale;
                  const points = [0, 1, 2, 3].map(j => {
                    const angle = (Math.PI / 2) * j - Math.PI / 2;
                    return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                  }).join(' ');
                  return <polygon key={i} points={points} fill="none" stroke="#f0e6d3" strokeWidth={i === 3 ? 1.5 : 0.5} />;
                })}
                {/* Axis lines */}
                {[0, 1, 2, 3].map(j => {
                  const angle = (Math.PI / 2) * j - Math.PI / 2;
                  return <line key={j} x1="100" y1="100" x2={100 + 70 * Math.cos(angle)} y2={100 + 70 * Math.sin(angle)} stroke="#f0e6d3" strokeWidth="0.5" />;
                })}
                {/* Data polygon */}
                {(() => {
                  const scores = [fullCompat.chinese.score, fullCompat.western.score, fullCompat.vedic.score, fullCompat.numerology.score];
                  const points = scores.map((s, j) => {
                    const angle = (Math.PI / 2) * j - Math.PI / 2;
                    const r = (s / 10) * 70;
                    return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                  }).join(' ');
                  return (
                    <>
                      <polygon points={points} fill="rgba(212,168,67,0.2)" stroke="#d4a843" strokeWidth="2" />
                      {scores.map((s, j) => {
                        const angle = (Math.PI / 2) * j - Math.PI / 2;
                        const r = (s / 10) * 70;
                        return <circle key={j} cx={100 + r * Math.cos(angle)} cy={100 + r * Math.sin(angle)} r="4" fill="#d4a843" />;
                      })}
                    </>
                  );
                })()}
                {/* Labels */}
                <text x="100" y="18" textAnchor="middle" fontSize="11" fill="#8d6e63">🐲 Chino</text>
                <text x="185" y="104" textAnchor="start" fontSize="11" fill="#8d6e63">♈ Occ.</text>
                <text x="100" y="192" textAnchor="middle" fontSize="11" fill="#8d6e63">🪷 Védico</text>
                <text x="15" y="104" textAnchor="end" fontSize="11" fill="#8d6e63">🔢 Num.</text>
              </svg>
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
  const [compareGroup, setCompareGroup] = useState('persona');
  const [compareSearch, setCompareSearch] = useState('');
  const others = personas.filter(p => {
    if (p.id === current.id) return false;
    if (compareGroup !== 'all') {
      const g = GROUPS.find(gr => gr.value === compareGroup);
      if (g && !g.cats.includes(p.categoria)) return false;
    }
    if (compareSearch && !p.nombre.toLowerCase().includes(compareSearch.toLowerCase())) return false;
    return true;
  }).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-[#faf5eb] w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold text-[#2d1f0e] mb-3">Comparar {current.nombre} con...</h2>
        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
          {GROUPS.map(g => {
            const count = personas.filter(p => p.id !== current.id && g.cats.includes(p.categoria)).length;
            return (
              <button key={g.value} onClick={() => setCompareGroup(g.value)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${compareGroup === g.value ? 'text-white' : 'bg-white border border-[#f0e6d3]'}`}
                style={compareGroup === g.value ? { background: g.color } : { color: g.color }}>
                {g.label} ({count})
              </button>
            );
          })}
          <button onClick={() => setCompareGroup('all')}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${compareGroup === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
            Todos
          </button>
        </div>
        <input type="text" value={compareSearch} onChange={e => setCompareSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-[#f0e6d3] bg-white focus:outline-none focus:ring-2 focus:ring-[#d4a843] text-[#2d1f0e] text-sm mb-3"
          placeholder="🔍 Buscar..." />
        <div className="overflow-auto flex-1">
          {others.length === 0 ? (
            <p className="text-[#8d6e63] text-center py-8">Sin resultados</p>
          ) : (
            <div className="space-y-1">
              {others.map(p => {
                const z = getChineseZodiac(p.fecha_nacimiento);
                const cat = CATEGORIES.find(c => c.value === p.categoria);
                return (
                  <button key={p.id} onClick={() => onSelect(p)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white transition-all">
                    <span className="text-2xl">{z.emoji}</span>
                    <div className="flex-1 text-left min-w-0">
                      <span className="font-medium text-[#2d1f0e] truncate block">{p.nombre}</span>
                      {cat && <span className="text-xs" style={{ color: cat.color }}>{cat.label}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <button onClick={onCancel} className="w-full mt-3 py-3 rounded-xl border border-[#f0e6d3] text-[#8d6e63]">Cancelar</button>
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
  const [filterCat, setFilterCat] = useState('all');

  const filtered = filterCat === 'all' ? personas : personas.filter(p => {
    const g = GROUPS.find(gr => gr.value === filterCat);
    return g ? g.cats.includes(p.categoria) : false;
  });

  const personsByAnimal = {};
  filtered.forEach(p => {
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
        <div className="flex gap-2 overflow-x-auto pb-1 mt-2">
          <button onClick={() => setFilterCat('all')}
            className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${filterCat === 'all' ? 'bg-white text-[#2d1f0e] font-semibold' : 'bg-white/10 text-white/70'}`}>
            Todos ({personas.length})
          </button>
          {GROUPS.map(g => {
            const count = personas.filter(p => g.cats.includes(p.categoria)).length;
            return (
              <button key={g.value} onClick={() => setFilterCat(g.value)}
                className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${filterCat === g.value ? 'bg-white text-[#2d1f0e] font-semibold' : 'bg-white/10 text-white/70'}`}>
                {g.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4 pb-8">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 card-glow text-center">
            <p className="text-4xl mb-3">🔮</p>
            <p className="text-[#8d6e63]">No hay personas en esta categoría</p>
          </div>
        ) : (
          <>
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

        {/* Rankings por Categoría */}
        {filtered.length >= 2 && (() => {
          const PairRow = ({ pair, rank }) => (
            <div className="flex items-center gap-2 py-2">
              <span className="text-xs text-[#c4a882] w-5 text-right shrink-0">{rank}</span>
              <span className="text-lg shrink-0">{pair.z1.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#2d1f0e] truncate">{pair.p1.nombre} + {pair.p2.nombre}</p>
              </div>
              <span className="text-lg shrink-0">{pair.z2.emoji}</span>
              <div className="w-12 text-right shrink-0">
                <span className="text-sm font-bold" style={{
                  color: pair.score >= 7 ? '#2e7d32' : pair.score >= 5 ? '#d4a843' : '#c62828'
                }}>{pair.score}</span>
              </div>
            </div>
          );

          const calcPairs = (list) => {
            const pairs = [];
            for (let i = 0; i < list.length; i++) {
              for (let j = i + 1; j < list.length; j++) {
                const c = calcCompatibility(list[i], list[j]);
                pairs.push({ p1: list[i], p2: list[j], score: c.overall,
                  z1: getChineseZodiac(list[i].fecha_nacimiento),
                  z2: getChineseZodiac(list[j].fecha_nacimiento) });
              }
            }
            return pairs;
          };

          // Global top/bottom from filtered
          const allPairs = calcPairs(filtered);
          const globalTop = [...allPairs].sort((a, b) => b.score - a.score).slice(0, 10);
          const globalBottom = [...allPairs].sort((a, b) => a.score - b.score).slice(0, 10);

          // Per-category rankings
          const catGroups = GROUPS.map(g => {
            const catPersonas = filtered.filter(p => g.cats.includes(p.categoria));
            if (catPersonas.length < 2) return null;
            const pairs = calcPairs(catPersonas);
            return { cat: g, top: [...pairs].sort((a, b) => b.score - a.score).slice(0, 5),
              bottom: [...pairs].sort((a, b) => a.score - b.score).slice(0, 5) };
          }).filter(Boolean);

          return (
            <>
              <div className="bg-white rounded-2xl p-5 card-glow">
                <p className="text-sm font-semibold text-[#2d1f0e] mb-1">💚 Top 10 Afinidades</p>
                <p className="text-xs text-[#c4a882] mb-3">Pares con mayor compatibilidad</p>
                <div className="divide-y divide-[#f0e6d3]">
                  {globalTop.map((pair, i) => <PairRow key={`t-${pair.p1.id}-${pair.p2.id}`} pair={pair} rank={i + 1} />)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 card-glow">
                <p className="text-sm font-semibold text-[#2d1f0e] mb-1">⚡ Top 10 Opuestos</p>
                <p className="text-xs text-[#c4a882] mb-3">Pares que requieren más paciencia</p>
                <div className="divide-y divide-[#f0e6d3]">
                  {globalBottom.map((pair, i) => <PairRow key={`b-${pair.p1.id}-${pair.p2.id}`} pair={pair} rank={i + 1} />)}
                </div>
              </div>

              {catGroups.length > 0 && catGroups.map(({ cat, top, bottom }) => (
                <div key={cat.value} className="bg-white rounded-2xl p-5 card-glow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: cat.color }}>{cat.label}</span>
                    <span className="text-xs text-[#c4a882]">Rankings internos</span>
                  </div>
                  <p className="text-xs font-medium text-[#2e7d32] mb-2">💚 Top 5 Afinidades</p>
                  <div className="divide-y divide-[#f0e6d3] mb-4">
                    {top.map((pair, i) => <PairRow key={`ct-${pair.p1.id}-${pair.p2.id}`} pair={pair} rank={i + 1} />)}
                  </div>
                  <p className="text-xs font-medium text-[#c62828] mb-2">⚡ Top 5 Opuestos</p>
                  <div className="divide-y divide-[#f0e6d3]">
                    {bottom.map((pair, i) => <PairRow key={`cb-${pair.p1.id}-${pair.p2.id}`} pair={pair} rank={i + 1} />)}
                  </div>
                </div>
              ))}
            </>
          );
        })()}
          </>
        )}
      </div>
    </div>
  );
}

function GroupCompareView({ personas, onBack }) {
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchGroup, setSearchGroup] = useState('');
  const [groupFilter, setGroupFilter] = useState('all');

  const available = personas.filter(p => {
    if (groupMembers.find(m => m.id === p.id)) return false;
    if (searchGroup && !p.nombre.toLowerCase().includes(searchGroup.toLowerCase())) return false;
    if (groupFilter !== 'all') {
      const g = GROUPS.find(gr => gr.value === groupFilter);
      if (g && !g.cats.includes(p.categoria)) return false;
    }
    return true;
  }).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  const addMember = (p) => { if (groupMembers.length < 6) setGroupMembers([...groupMembers, p]); };
  const removeMember = (id) => setGroupMembers(groupMembers.filter(m => m.id !== id));

  // Calcular compatibilidad de todos los pares
  const pairs = [];
  for (let i = 0; i < groupMembers.length; i++) {
    for (let j = i + 1; j < groupMembers.length; j++) {
      const compat = calcCompatibility(groupMembers[i], groupMembers[j]);
      const full = calcFullCompatibility(groupMembers[i], groupMembers[j]);
      pairs.push({ p1: groupMembers[i], p2: groupMembers[j], score: compat.overall, full });
    }
  }
  const avgScore = pairs.length > 0 ? (pairs.reduce((s, p) => s + p.score, 0) / pairs.length) : 0;
  const bestPair = pairs.length > 0 ? pairs.reduce((a, b) => a.score > b.score ? a : b) : null;
  const worstPair = pairs.length > 0 ? pairs.reduce((a, b) => a.score < b.score ? a : b) : null;

  // Análisis de signos
  const signs = groupMembers.map(m => getChineseZodiac(m.fecha_nacimiento));
  const elements = groupMembers.map(m => getChineseElement(m.fecha_nacimiento));
  const uniqueSigns = [...new Set(signs.map(s => s.name))];
  const uniqueElements = [...new Set(elements.map(e => e.name))];

  // Detectar triángulos
  const triangleGroups = AFFINITY_TRIANGLES.map(tri => {
    const members = groupMembers.filter(m => tri.includes(getChineseZodiac(m.fecha_nacimiento).name));
    return { triangle: tri, members, coverage: [...new Set(members.map(m => getChineseZodiac(m.fecha_nacimiento).name))].length };
  }).filter(t => t.members.length >= 2).sort((a, b) => b.coverage - a.coverage);

  // Detectar opuestos
  const oppositesPairs = [];
  for (let i = 0; i < groupMembers.length; i++) {
    for (let j = i + 1; j < groupMembers.length; j++) {
      const s1 = getChineseZodiac(groupMembers[i].fecha_nacimiento).name;
      const s2 = getChineseZodiac(groupMembers[j].fecha_nacimiento).name;
      if (getEnemy(s1) === s2) oppositesPairs.push([groupMembers[i], groupMembers[j]]);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf5eb]">
      <div className="gradient-mystic text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">←</button>
          <h1 className="text-xl font-bold">👥 Compatibilidad Grupal</h1>
        </div>
        <p className="text-white/60 text-sm">Selecciona 3-6 personas para analizar como equipo</p>
      </div>

      <div className="px-4 -mt-4 space-y-4 pb-24">
        {/* Miembros seleccionados */}
        <div className="bg-white rounded-2xl p-4 card-glow">
          <p className="text-xs text-[#c4a882] mb-2">Equipo ({groupMembers.length}/6)</p>
          {groupMembers.length === 0 ? (
            <p className="text-sm text-[#c4a882] italic">Agrega personas desde la lista de abajo</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {groupMembers.map(m => {
                const z = getChineseZodiac(m.fecha_nacimiento);
                return (
                  <button key={m.id} onClick={() => removeMember(m.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#faf5eb] text-sm hover:bg-red-50 hover:text-red-700 transition-all">
                    {z.emoji} {m.nombre.split(' ')[0]} <span className="text-xs opacity-50">✕</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selector de personas */}
        {groupMembers.length < 6 && (
          <div className="bg-white rounded-2xl p-4 card-glow">
            <div className="flex gap-2 mb-3 overflow-x-auto">
              <button onClick={() => setGroupFilter('all')}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${groupFilter === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-[#faf5eb] text-[#8d6e63]'}`}>
                Todos
              </button>
              {GROUPS.map(g => (
                <button key={g.value} onClick={() => setGroupFilter(g.value)}
                  className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${groupFilter === g.value ? 'text-white' : 'bg-[#faf5eb] text-[#8d6e63]'}`}
                  style={groupFilter === g.value ? { backgroundColor: g.color } : {}}>
                  {g.label}
                </button>
              ))}
            </div>
            <input type="text" value={searchGroup} onChange={e => setSearchGroup(e.target.value)}
              placeholder="Buscar..." className="w-full px-4 py-2 rounded-xl bg-[#faf5eb] text-sm mb-3 outline-none" />
            <div className="max-h-48 overflow-y-auto space-y-1">
              {available.slice(0, 20).map(p => {
                const z = getChineseZodiac(p.fecha_nacimiento);
                return (
                  <button key={p.id} onClick={() => addMember(p)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#faf5eb] transition-all text-left">
                    <span>{z.emoji}</span>
                    <span className="text-sm text-[#2d1f0e]">{p.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Resultados */}
        {groupMembers.length >= 3 && (
          <>
            {/* Score general */}
            <div className="bg-white rounded-2xl p-5 card-glow text-center">
              <p className="text-xs text-[#c4a882] mb-2">Compatibilidad del Equipo</p>
              <span className={`text-5xl font-bold ${avgScore >= 7 ? 'text-green-600' : avgScore >= 5 ? 'text-[#d4a843]' : 'text-red-600'}`}>
                {avgScore.toFixed(1)}
              </span>
              <p className="text-sm text-[#8d6e63] mt-2">
                Promedio de {pairs.length} pares · {uniqueSigns.length} signos · {uniqueElements.length} elementos
              </p>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl p-5 card-glow">
              <p className="text-sm text-[#8d6e63] mb-3">🔮 Insights del Equipo</p>
              <div className="space-y-2 text-sm">
                {triangleGroups.length > 0 && (
                  <div className="px-3 py-2 rounded-xl bg-green-50 text-green-700">
                    🤝 {triangleGroups[0].members.length} miembros del triángulo {triangleGroups[0].triangle.map(a => {
                      const animal = ZODIAC_ANIMALS.find(z => z.name === a);
                      return animal?.emoji + ' ' + a;
                    }).join(' - ')}
                  </div>
                )}
                {oppositesPairs.length > 0 && (
                  <div className="px-3 py-2 rounded-xl bg-red-50 text-red-700">
                    ⚡ {oppositesPairs.length} par{oppositesPairs.length > 1 ? 'es' : ''} opuesto{oppositesPairs.length > 1 ? 's' : ''}: {oppositesPairs.map(([a, b]) => `${a.nombre.split(' ')[0]} ↔ ${b.nombre.split(' ')[0]}`).join(', ')}
                  </div>
                )}
                {uniqueElements.length === 1 && (
                  <div className="px-3 py-2 rounded-xl bg-[#faf5eb] text-[#8d6e63]">
                    {elements[0].emoji} Todo el equipo es {elements[0].name} — mucha energía concentrada
                  </div>
                )}
                {uniqueElements.length >= 4 && (
                  <div className="px-3 py-2 rounded-xl bg-[#faf5eb] text-[#8d6e63]">
                    🌈 {uniqueElements.length} elementos distintos — equipo equilibrado
                  </div>
                )}
                {bestPair && (
                  <div className="px-3 py-2 rounded-xl bg-green-50 text-green-700">
                    💚 Mejor par: {bestPair.p1.nombre.split(' ')[0]} + {bestPair.p2.nombre.split(' ')[0]} = {bestPair.score}
                  </div>
                )}
                {worstPair && worstPair !== bestPair && (
                  <div className="px-3 py-2 rounded-xl bg-red-50 text-red-700">
                    ⚡ Par más tenso: {worstPair.p1.nombre.split(' ')[0]} + {worstPair.p2.nombre.split(' ')[0]} = {worstPair.score}
                  </div>
                )}
              </div>
            </div>

            {/* Tabla de pares */}
            <div className="bg-white rounded-2xl p-5 card-glow">
              <p className="text-sm text-[#8d6e63] mb-3">📊 Todos los Pares</p>
              <div className="space-y-1.5">
                {pairs.sort((a, b) => b.score - a.score).map((pair, i) => {
                  const z1 = getChineseZodiac(pair.p1.fecha_nacimiento);
                  const z2 = getChineseZodiac(pair.p2.fecha_nacimiento);
                  return (
                    <details key={i} className="group">
                      <summary className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer list-none ${pair.score >= 7 ? 'bg-green-50' : pair.score >= 5 ? 'bg-[#faf5eb]' : 'bg-red-50'}`}>
                        <div className="flex items-center gap-1 text-sm">
                          <span>{z1.emoji}</span>
                          <span className="text-[#2d1f0e]">{pair.p1.nombre.split(' ')[0]}</span>
                          <span className="text-[#c4a882] mx-1">×</span>
                          <span>{z2.emoji}</span>
                          <span className="text-[#2d1f0e]">{pair.p2.nombre.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${pair.score >= 7 ? 'text-green-700' : pair.score >= 5 ? 'text-[#d4a843]' : 'text-red-700'}`}>{pair.score}</span>
                          <span className="text-xs text-[#c4a882] group-open:rotate-180 transition-transform">▼</span>
                        </div>
                      </summary>
                      <div className="mt-1 mx-1 px-3 py-2 rounded-lg bg-[#faf5eb] text-xs text-[#8d6e63] grid grid-cols-2 gap-1">
                        <span>🐲 Chino: {pair.full.chinese.score}</span>
                        <span>♈ Occidental: {pair.full.western.score}</span>
                        <span>🪷 Védico: {pair.full.vedic.score}</span>
                        <span>🔢 Numerología: {pair.full.numerology.score}</span>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {groupMembers.length > 0 && groupMembers.length < 3 && (
          <div className="text-center py-8">
            <p className="text-[#c4a882] text-sm">Selecciona al menos 3 personas para ver el análisis</p>
          </div>
        )}
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
  const [filterCat, setFilterCat] = useState(null);
  const [filterSubCat, setFilterSubCat] = useState('all');
  const [filterZodiac, setFilterZodiac] = useState('all');
  const [showZodiacFilter, setShowZodiacFilter] = useState(false);
  const [filterNumber, setFilterNumber] = useState('all');
  const [showNumberFilter, setShowNumberFilter] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getPersonas().then(p => { setPersonas(p); setLoading(false); });
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    const handler = (e) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);

    // Realtime: escuchar cambios de otro dispositivo
    const unsubscribe = subscribeToChanges(
      (newPersona) => {
        setPersonas(prev => {
          if (prev.some(p => p.id === newPersona.id)) return prev;
          setToast({ type: 'add', nombre: newPersona.nombre });
          return [newPersona, ...prev];
        });
      },
      (oldPersona) => {
        setPersonas(prev => {
          const existed = prev.some(p => p.id === oldPersona.id);
          if (existed) setToast({ type: 'del', nombre: oldPersona.nombre || '?' });
          return prev.filter(p => p.id !== oldPersona.id);
        });
      }
    );

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

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
    if (filterCat === null && !search) return false;
    const activeGroup = GROUPS.find(g => g.value === filterCat);
    const matchCat = filterCat === null || filterCat === 'all' || (activeGroup ? activeGroup.cats.includes(p.categoria) : false);
    const matchSubCat = filterSubCat === 'all' || p.categoria === filterSubCat;
    const matchZodiac = filterZodiac === 'all' || getChineseZodiac(p.fecha_nacimiento).name === filterZodiac;
    const matchNumber = filterNumber === 'all' || calcLifeNumber(p.fecha_nacimiento) === parseInt(filterNumber);
    return matchSearch && matchCat && matchSubCat && matchZodiac && matchNumber;
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

  if (view === 'groupCompare') {
    return <GroupCompareView personas={personas}
      onBack={() => setView('list')} />;
  }

  return (
    <div className="min-h-screen bg-[#faf5eb] pb-24">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
          <div className="bg-[#2d1f0e] text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm"
            style={{ animation: 'toastSlide 3.5s ease-in-out' }}>
            <span>{toast.type === 'add' ? '✨' : '👋'}</span>
            <span>{toast.type === 'add' ? `${toast.nombre} se unió al círculo` : `${toast.nombre} fue eliminado`}</span>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes toastSlide {
          0% { opacity: 0; transform: translateY(-10px); }
          8% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
      <div className="gradient-mystic text-white p-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Mi Círculo</h1>
            <p className="text-white/60 text-sm mt-1">4 tradiciones · Zodiaco · Numerología</p>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
            {installPrompt && (
              <button onClick={handleInstall} className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20">
                📲 Instalar
              </button>
            )}
          </div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Buscar persona..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#d4a843]" />
          <span className="absolute left-3 top-3.5 text-white/40">🔍</span>
        </div>
      </div>

      <div className="px-4 mt-4 flex gap-2 overflow-x-auto pb-2">
        <button onClick={() => { setFilterCat('all'); setFilterSubCat('all'); }}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${filterCat === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
          Todos ({personas.length})
        </button>
        {GROUPS.map(g => {
          const count = personas.filter(p => g.cats.includes(p.categoria)).length;
          return (
            <button key={g.value} onClick={() => { setFilterCat(g.value); setFilterSubCat('all'); }}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${filterCat === g.value ? 'text-white' : 'bg-white border border-[#f0e6d3]'}`}
              style={filterCat === g.value ? { background: g.color } : { color: g.color }}>
              {g.label} ({count})
            </button>
          );
        })}
      </div>
      {filterCat && filterCat !== 'all' && (() => {
        const activeGroup = GROUPS.find(g => g.value === filterCat);
        if (!activeGroup || activeGroup.cats.length <= 1) return null;
        const subCats = CATEGORIES.filter(c => activeGroup.cats.includes(c.value));
        return (
          <div className="px-4 mt-1 flex gap-1.5 overflow-x-auto pb-1">
            <button onClick={() => setFilterSubCat('all')}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${filterSubCat === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
              Todos
            </button>
            {subCats.map(c => {
              const count = personas.filter(p => p.categoria === c.value).length;
              return (
                <button key={c.value} onClick={() => setFilterSubCat(c.value)}
                  className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all ${filterSubCat === c.value ? 'text-white' : 'bg-white border border-[#f0e6d3]'}`}
                  style={filterSubCat === c.value ? { background: c.color } : { color: c.color }}>
                  {c.label} ({count})
                </button>
              );
            })}
          </div>
        );
      })()}

      {/* Zodiac filter */}
      <div className="px-4 mt-2 flex gap-2 flex-wrap">
        <button onClick={() => { setShowZodiacFilter(!showZodiacFilter); setShowNumberFilter(false); }}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${filterZodiac !== 'all' ? 'bg-[#d4a843] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
          {filterZodiac !== 'all' ? `${ZODIAC_ANIMALS.find(a => a.name === filterZodiac)?.emoji} ${filterZodiac}` : '🐲 Filtrar por signo'} {showZodiacFilter ? '▲' : '▼'}
        </button>
        <button onClick={() => { setShowNumberFilter(!showNumberFilter); setShowZodiacFilter(false); }}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${filterNumber !== 'all' ? 'bg-[#7b1fa2] text-white' : 'bg-white text-[#8d6e63] border border-[#f0e6d3]'}`}>
          {filterNumber !== 'all' ? `#${filterNumber}` : '🔢 Filtrar por número'} {showNumberFilter ? '▲' : '▼'}
        </button>
        {personas.length >= 2 && (
          <button onClick={() => setView('affinity')}
            className="px-4 py-1.5 rounded-full text-sm bg-white text-[#8d6e63] border border-[#f0e6d3] hover:border-[#d4a843] transition-all">
            🤝 Aliados y Opuestos
          </button>
        )}
        {personas.length >= 3 && (
          <button onClick={() => setView('groupCompare')}
            className="px-4 py-1.5 rounded-full text-sm bg-white text-[#8d6e63] border border-[#f0e6d3] hover:border-[#d4a843] transition-all">
            👥 Grupo
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
      {showNumberFilter && (
        <div className="px-4 mt-2 grid grid-cols-5 gap-1.5">
          <button onClick={() => { setFilterNumber('all'); setShowNumberFilter(false); }}
            className={`px-2 py-2 rounded-xl text-xs text-center transition-all ${filterNumber === 'all' ? 'bg-[#2d1f0e] text-white' : 'bg-white border border-[#f0e6d3] text-[#8d6e63]'}`}>
            Todos
          </button>
          {[1,2,3,4,5,6,7,8,9,11,22,33].map(n => {
            const count = personas.filter(p => calcLifeNumber(p.fecha_nacimiento) === n).length;
            return (
              <button key={n} onClick={() => { setFilterNumber(String(n)); setShowNumberFilter(false); }}
                className={`px-2 py-2 rounded-xl text-xs text-center transition-all ${filterNumber === String(n) ? (n > 9 ? 'bg-[#d4a843] text-white' : 'bg-[#7b1fa2] text-white') : 'bg-white border border-[#f0e6d3] text-[#2d1f0e]'}`}>
                {n > 9 ? '✨' : '#'}{n} {count > 0 && <span className="opacity-60">({count})</span>}
              </button>
            );
          })}
        </div>
      )}

      <div className="px-4 mt-4 space-y-3">
        {loading ? (
          <div className="text-center py-16 text-[#8d6e63]">Cargando...</div>
        ) : filterCat === null && !search ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔮</div>
            <p className="text-[#8d6e63] font-medium">Mi Círculo</p>
            <p className="text-sm text-[#c4a882] mt-2">Selecciona un grupo o busca por nombre</p>
            <p className="text-xs text-[#c4a882] mt-1">{personas.length} registros</p>
          </div>
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


