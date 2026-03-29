'use client';
import { createContext, useContext, useState } from 'react';

const LangContext = createContext({ lang: 'es', setLang: () => {}, t: (k) => k });

// ═══ UI TEXTS ═══
const UI = {
  // Header & navigation
  'mi_circulo': { es: 'Mi Círculo', en: 'My Circle' },
  'buscar_persona': { es: 'Buscar persona...', en: 'Search person...' },
  'buscar': { es: 'Buscar...', en: 'Search...' },
  'selecciona_grupo': { es: 'Selecciona un grupo o busca por nombre', en: 'Select a group or search by name' },
  'registros': { es: 'registros', en: 'records' },
  'todos': { es: 'Todos', en: 'All' },
  'cargando': { es: 'Cargando...', en: 'Loading...' },
  'sin_resultados': { es: 'Sin resultados', en: 'No results' },
  'agrega_primera': { es: 'Agrega tu primera persona', en: 'Add your first person' },

  // Groups
  'personas': { es: '👤 Personas', en: '👤 People' },
  'marcas': { es: '🏷️ Marcas', en: '🏷️ Brands' },
  'equipos': { es: '⚽ Equipos', en: '⚽ Teams' },
  'paises': { es: '🌎 Países', en: '🌎 Countries' },

  // Categories
  'familia': { es: '👨‍👩‍👧 Familia', en: '👨‍👩‍👧 Family' },
  'amigo': { es: '💛 Amigo', en: '💛 Friend' },
  'cliente': { es: '💼 Cliente', en: '💼 Client' },
  'conocido': { es: '👋 Conocido', en: '👋 Acquaintance' },
  'marca': { es: '🏷️ Marca', en: '🏷️ Brand' },
  'equipo': { es: '⚽ Equipo', en: '⚽ Team' },
  'pais': { es: '🌎 País', en: '🌎 Country' },
  'estado': { es: '🏛️ Estado', en: '🏛️ State' },

  // Form
  'nombre': { es: 'Nombre', en: 'Name' },
  'nombre_completo': { es: 'Nombre completo', en: 'Full name' },
  'fecha_nacimiento': { es: 'Fecha de nacimiento', en: 'Date of birth' },
  'hora_nacimiento': { es: 'Hora de nacimiento', en: 'Time of birth' },
  'hora_opcional': { es: '(opcional — mejora Nakshatra)', en: '(optional — improves Nakshatra)' },
  'categoria': { es: 'Categoría', en: 'Category' },
  'nota': { es: 'Nota', en: 'Note' },
  'nota_placeholder': { es: 'Ej: vecina del 3B, compañera de yoga...', en: 'Ex: neighbor from 3B, yoga partner...' },
  'guardar': { es: 'Guardar', en: 'Save' },
  'cancelar': { es: 'Cancelar', en: 'Cancel' },
  'editar': { es: 'Editar', en: 'Edit' },
  'eliminar': { es: 'Eliminar', en: 'Delete' },
  'agregar': { es: 'Agregar', en: 'Add' },
  'editar_form': { es: 'Editar', en: 'Edit' },
  'agregar_form': { es: 'Agregar', en: 'Add' },
  'cambiar_categoria': { es: 'Cambiar categoría', en: 'Change category' },
  'editar_nota': { es: '✎ editar nota', en: '✎ edit note' },
  'agregar_nota': { es: '+ agregar nota', en: '+ add note' },
  'opcional': { es: '(opcional)', en: '(optional)' },

  // Profile sections
  'numero_vida': { es: 'Número de Vida', en: 'Life Number' },
  'zodiaco_chino': { es: 'Zodiaco Chino', en: 'Chinese Zodiac' },
  'elemento_chino': { es: 'Elemento Chino', en: 'Chinese Element' },
  'yin_yang': { es: 'Yin / Yang', en: 'Yin / Yang' },
  'zodiaco_occidental': { es: 'Zodiaco Occidental', en: 'Western Zodiac' },
  'nakshatra_vedico': { es: 'Nakshatra Védico', en: 'Vedic Nakshatra' },
  'numerologia_nombre': { es: 'Numerología del Nombre', en: 'Name Numerology' },
  'num_alma': { es: 'Nº del Alma', en: 'Soul Nº' },
  'num_destino': { es: 'Nº del Destino', en: 'Destiny Nº' },
  'deseos_internos': { es: 'Deseos internos', en: 'Inner desires' },
  'mision_vida': { es: 'Misión de vida', en: 'Life mission' },
  'ano_chino_nota': { es: 'Año chino', en: 'Chinese year' },
  'nacio_antes_lunar': { es: 'nació antes del Año Nuevo Lunar', en: 'born before Lunar New Year' },
  'precision_buena': { es: '✓ Precisión buena (con hora)', en: '✓ Good precision (with time)' },
  'precision_aprox': { es: '≈ Aproximado (sin hora de nacimiento)', en: '≈ Approximate (no birth time)' },

  // Allies & Opposites
  'aliados_opuestos': { es: 'Aliados y Opuestos', en: 'Allies & Opposites' },
  'aliados_triangulo': { es: '🤝 Aliados (triángulo de afinidad)', en: '🤝 Allies (affinity triangle)' },
  'opuesto': { es: '⚡ Opuesto', en: '⚡ Opposite' },
  'sin_aliados_cat': { es: 'Sin aliados en esta categoría', en: 'No allies in this category' },
  'sin_opuestos_cat': { es: 'Sin opuestos en esta categoría', en: 'No opposites in this category' },

  // Top/Bottom rankings
  'mejores_menores': { es: '🏆 Mejores 5 y ⚡ Menores 5', en: '🏆 Top 5 & ⚡ Bottom 5' },
  'mejores_5': { es: '🏆 Mejores 5 — Mayor afinidad', en: '🏆 Top 5 — Highest affinity' },
  'menores_5': { es: '⚡ Menores 5 — Menor afinidad', en: '⚡ Bottom 5 — Lowest affinity' },
  'ponderado_4': { es: 'Ponderado 4 tradiciones', en: 'Weighted 4 traditions' },

  // Kairos Flow
  'kairos_flow': { es: 'Kairos Flow', en: 'Kairos Flow' },
  '9_posiciones': { es: '9 posiciones numerológicas', en: '9 numerological positions' },
  'legado': { es: 'Legado', en: 'Legacy' },
  'kairos_footer': { es: 'Kairos Flow · Basado en fecha de nacimiento · Números maestros (11, 22, 33) no se reducen', en: 'Kairos Flow · Based on date of birth · Master numbers (11, 22, 33) are not reduced' },

  // Compare
  'comparar_con': { es: '🔮 Comparar con...', en: '🔮 Compare with...' },
  'compatibilidad_general': { es: 'Compatibilidad General', en: 'Overall Compatibility' },
  'compatibilidad_4trad': { es: 'Compatibilidad 4 Tradiciones', en: '4 Traditions Compatibility' },
  '4trad_subtitle': { es: '4 tradiciones · Zodiaco · Numerología', en: '4 traditions · Zodiac · Numerology' },
  'de_10': { es: 'de 10', en: 'of 10' },
  'consejos': { es: '✨ Consejos', en: '✨ Tips' },

  // Filters
  'filtrar_signo': { es: '🐲 Filtrar por signo', en: '🐲 Filter by sign' },
  'filtrar_numero': { es: '🔢 Filtrar por número', en: '🔢 Filter by number' },
  'aliados_opp_btn': { es: '🤝 Aliados y Opuestos', en: '🤝 Allies & Opposites' },
  'grupo_btn': { es: '👥 Grupo', en: '👥 Group' },

  // Affinity Map
  'mapa_afinidades': { es: 'Mapa de Afinidades', en: 'Affinity Map' },
  'aliados_opp_circulo': { es: 'Aliados y opuestos en tu círculo', en: 'Allies and opposites in your circle' },
  'triangulos_afinidad': { es: '🤝 Triángulos de Afinidad', en: '🤝 Affinity Triangles' },
  'triangulos_desc': { es: 'Los 3 signos de cada triángulo son aliados naturales', en: 'The 3 signs in each triangle are natural allies' },
  'pares_opuestos': { es: '⚡ Pares Opuestos', en: '⚡ Opposite Pairs' },
  'pares_opp_desc': { es: 'Signos que se desafían mutuamente — requieren paciencia', en: 'Signs that challenge each other — require patience' },
  'top10_afinidades': { es: '💚 Top 10 Afinidades', en: '💚 Top 10 Affinities' },
  'top10_afinidades_sub': { es: 'Pares con mayor compatibilidad', en: 'Pairs with highest compatibility' },
  'top10_opuestos': { es: '⚡ Top 10 Opuestos', en: '⚡ Top 10 Opposites' },
  'top10_opuestos_sub': { es: 'Pares que requieren más paciencia', en: 'Pairs that require more patience' },
  'top5_afinidades': { es: '💚 Top 5 Afinidades', en: '💚 Top 5 Affinities' },
  'top5_opuestos': { es: '⚡ Top 5 Opuestos', en: '⚡ Top 5 Opposites' },
  'rankings_internos': { es: 'Rankings internos', en: 'Internal rankings' },
  'todos_pares': { es: '📊 Todos los Pares', en: '📊 All Pairs' },

  // Group Compare
  'compat_grupal': { es: '👥 Compatibilidad Grupal', en: '👥 Group Compatibility' },
  'compat_equipo': { es: 'Compatibilidad del Equipo', en: 'Team Compatibility' },
  'selecciona_3_6': { es: 'Selecciona 3-6 personas para analizar como equipo', en: 'Select 3-6 people to analyze as a team' },
  'agrega_personas_lista': { es: 'Agrega personas desde la lista de abajo', en: 'Add people from the list below' },
  'selecciona_min3': { es: 'Selecciona al menos 3 personas para ver el análisis', en: 'Select at least 3 people to see the analysis' },
  'insights_equipo': { es: '🔮 Insights del Equipo', en: '🔮 Team Insights' },
  'no_personas_cat': { es: 'No hay personas en esta categoría', en: 'No people in this category' },

  // Zodiac labels
  'chino_label': { es: '🐲 Chino', en: '🐲 Chinese' },
  'occidental_label': { es: '♈ Occidental', en: '♈ Western' },
  'vedico_label': { es: '🪷 Védico', en: '🪷 Vedic' },
  'numerologia_label': { es: '🔢 Numerología', en: '🔢 Numerology' },
  'occ_short': { es: '♈ Occ.', en: '♈ West.' },
  'num_short': { es: '🔢 Num.', en: '🔢 Num.' },
  'vedico_aprox': { es: 'Védico aproximado sin hora de nacimiento', en: 'Vedic approximate without birth time' },

  // Triangle groups
  'accion': { es: 'Acción', en: 'Action' },
  'intelecto': { es: 'Intelecto', en: 'Intellect' },
  'coraje': { es: 'Coraje', en: 'Courage' },
  'diplomacia': { es: 'Diplomacia', en: 'Diplomacy' },

  // Footer
  'footer': { es: 'Hecho por duendes.app 2026', en: 'Made by duendes.app 2026' },
};

// ═══ NUMEROLOGY TEXTS ═══
const NUMEROLOGY = {
  // Zodiac animals
  'z_rata': { es: 'Rata', en: 'Rat' }, 'z_buey': { es: 'Buey', en: 'Ox' },
  'z_tigre': { es: 'Tigre', en: 'Tiger' }, 'z_conejo': { es: 'Conejo', en: 'Rabbit' },
  'z_dragon': { es: 'Dragón', en: 'Dragon' }, 'z_serpiente': { es: 'Serpiente', en: 'Snake' },
  'z_caballo': { es: 'Caballo', en: 'Horse' }, 'z_cabra': { es: 'Cabra', en: 'Goat' },
  'z_mono': { es: 'Mono', en: 'Monkey' }, 'z_gallo': { es: 'Gallo', en: 'Rooster' },
  'z_perro': { es: 'Perro', en: 'Dog' }, 'z_cerdo': { es: 'Cerdo', en: 'Pig' },

  // Zodiac traits
  'zt_rata': { es: 'Ingeniosa, astuta, versátil, encantadora', en: 'Clever, cunning, versatile, charming' },
  'zt_buey': { es: 'Fuerte, confiable, determinado, paciente', en: 'Strong, reliable, determined, patient' },
  'zt_tigre': { es: 'Valiente, competitivo, impredecible, seguro', en: 'Brave, competitive, unpredictable, confident' },
  'zt_conejo': { es: 'Elegante, amable, responsable, prudente', en: 'Elegant, kind, responsible, prudent' },
  'zt_dragon': { es: 'Enérgico, audaz, ambicioso, carismático', en: 'Energetic, bold, ambitious, charismatic' },
  'zt_serpiente': { es: 'Sabia, intuitiva, elegante, misteriosa', en: 'Wise, intuitive, elegant, mysterious' },
  'zt_caballo': { es: 'Libre, activo, enérgico, aventurero', en: 'Free, active, energetic, adventurous' },
  'zt_cabra': { es: 'Creativa, compasiva, gentil, artística', en: 'Creative, compassionate, gentle, artistic' },
  'zt_mono': { es: 'Ingenioso, curioso, juguetón, adaptable', en: 'Ingenious, curious, playful, adaptable' },
  'zt_gallo': { es: 'Observador, trabajador, valiente, práctico', en: 'Observant, hardworking, brave, practical' },
  'zt_perro': { es: 'Leal, honesto, amable, prudente', en: 'Loyal, honest, kind, prudent' },
  'zt_cerdo': { es: 'Generoso, compasivo, diligente, tolerante', en: 'Generous, compassionate, diligent, tolerant' },

  // Life numbers
  'ln1_title': { es: 'El Líder', en: 'The Leader' },
  'ln1_desc': { es: 'Independiente, pionero, ambicioso. Nació para liderar y abrir caminos.', en: 'Independent, pioneer, ambitious. Born to lead and blaze trails.' },
  'ln2_title': { es: 'El Diplomático', en: 'The Diplomat' },
  'ln2_desc': { es: 'Cooperador, sensible, pacificador. Brilla en la armonía y las relaciones.', en: 'Cooperative, sensitive, peacemaker. Shines in harmony and relationships.' },
  'ln3_title': { es: 'El Creativo', en: 'The Creative' },
  'ln3_desc': { es: 'Expresivo, artístico, comunicativo. Su energía inspira y alegra.', en: 'Expressive, artistic, communicative. Their energy inspires and uplifts.' },
  'ln4_title': { es: 'El Constructor', en: 'The Builder' },
  'ln4_desc': { es: 'Práctico, organizado, estable. Construye bases sólidas para todo.', en: 'Practical, organized, stable. Builds solid foundations for everything.' },
  'ln5_title': { es: 'El Aventurero', en: 'The Adventurer' },
  'ln5_desc': { es: 'Libre, adaptable, curioso. Busca experiencias y cambio constante.', en: 'Free, adaptable, curious. Seeks experiences and constant change.' },
  'ln6_title': { es: 'El Protector', en: 'The Protector' },
  'ln6_desc': { es: 'Responsable, amoroso, hogareño. Cuida y nutre a quienes ama.', en: 'Responsible, loving, homebody. Cares for and nurtures those they love.' },
  'ln7_title': { es: 'El Buscador', en: 'The Seeker' },
  'ln7_desc': { es: 'Analítico, espiritual, introspectivo. Busca verdades profundas.', en: 'Analytical, spiritual, introspective. Seeks deep truths.' },
  'ln8_title': { es: 'El Poderoso', en: 'The Powerful' },
  'ln8_desc': { es: 'Ambicioso, eficiente, materialista. Domina el mundo material.', en: 'Ambitious, efficient, materialistic. Masters the material world.' },
  'ln9_title': { es: 'El Humanitario', en: 'The Humanitarian' },
  'ln9_desc': { es: 'Compasivo, generoso, idealista. Vive para servir a los demás.', en: 'Compassionate, generous, idealistic. Lives to serve others.' },
  'ln11_title': { es: 'Maestro Intuitivo', en: 'Intuitive Master' },
  'ln11_desc': { es: 'Visionario, inspirador, iluminado. Canal de energía superior.', en: 'Visionary, inspiring, enlightened. Channel of higher energy.' },
  'ln22_title': { es: 'Maestro Constructor', en: 'Master Builder' },
  'ln22_desc': { es: 'Visionario práctico. Transforma sueños grandes en realidad.', en: 'Practical visionary. Transforms big dreams into reality.' },
  'ln33_title': { es: 'Maestro Sanador', en: 'Master Healer' },
  'ln33_desc': { es: 'Amor incondicional, servicio supremo. Eleva la consciencia colectiva.', en: 'Unconditional love, supreme service. Elevates collective consciousness.' },

  // Kairos positions
  'k1_name': { es: 'La Máscara', en: 'The Mask' },
  'k2_name': { es: 'El Corazón', en: 'The Heart' },
  'k3_name': { es: 'El Don', en: 'The Gift' },
  'k4_name': { es: 'La Herramienta', en: 'The Tool' },
  'k5_name': { es: 'El Alma', en: 'The Soul' },
  'k6_name': { es: 'El Camino', en: 'The Path' },
  'k7_name': { es: 'El Llamado', en: 'The Calling' },
  'k8_name': { es: 'La Sombra', en: 'The Shadow' },
  'k9_name': { es: 'El Legado', en: 'The Legacy' },
  'k1_desc': { es: 'Cómo apareces', en: 'How you appear' },
  'k2_desc': { es: 'Deseos internos', en: 'Inner desires' },
  'k3_desc': { es: 'Talento natural', en: 'Natural talent' },
  'k4_desc': { es: 'Carrera / Acción', en: 'Career / Action' },
  'k5_desc': { es: 'Esencia core', en: 'Core essence' },
  'k6_desc': { es: 'Caminar diario', en: 'Daily walk' },
  'k7_desc': { es: 'Meta de vida', en: 'Life goal' },
  'k8_desc': { es: 'Reto oculto', en: 'Hidden challenge' },
  'k9_desc': { es: 'Resultado final', en: 'Final result' },

  // Kairos meanings
  'km1_title': { es: 'El Pionero', en: 'The Pioneer' },
  'km1_kw': { es: 'Liderazgo · Independencia · Iniciativa', en: 'Leadership · Independence · Initiative' },
  'km1_desc': { es: 'Energía de inicio y creación. Impulso para abrir caminos nuevos, liderar con originalidad y confiar en uno mismo. Fuerza de voluntad pura.', en: 'Energy of beginning and creation. Drive to blaze new trails, lead with originality and trust oneself. Pure willpower.' },
  'km2_title': { es: 'El Diplomático', en: 'The Diplomat' },
  'km2_kw': { es: 'Cooperación · Sensibilidad · Equilibrio', en: 'Cooperation · Sensitivity · Balance' },
  'km2_desc': { es: 'Energía de conexión y armonía. Capacidad natural para mediar, escuchar y crear puentes entre personas. Intuición emocional refinada.', en: 'Energy of connection and harmony. Natural ability to mediate, listen and bridge people. Refined emotional intuition.' },
  'km3_title': { es: 'El Creativo', en: 'The Creative' },
  'km3_kw': { es: 'Expresión · Alegría · Comunicación', en: 'Expression · Joy · Communication' },
  'km3_desc': { es: 'Energía de expresión artística y social. Talento para comunicar ideas, inspirar a otros y encontrar belleza en lo cotidiano.', en: 'Energy of artistic and social expression. Talent for communicating ideas, inspiring others and finding beauty in everyday life.' },
  'km4_title': { es: 'El Constructor', en: 'The Builder' },
  'km4_kw': { es: 'Estructura · Disciplina · Fundamentos', en: 'Structure · Discipline · Foundations' },
  'km4_desc': { es: 'Energía de orden y estabilidad. Capacidad para construir bases sólidas, organizar sistemas y trabajar con paciencia metódica.', en: 'Energy of order and stability. Ability to build solid foundations, organize systems and work with methodical patience.' },
  'km5_title': { es: 'El Aventurero', en: 'The Adventurer' },
  'km5_kw': { es: 'Libertad · Cambio · Adaptabilidad', en: 'Freedom · Change · Adaptability' },
  'km5_desc': { es: 'Energía de movimiento y transformación. Curiosidad insaciable, versatilidad y necesidad de experiencias nuevas. Catalizador de cambio.', en: 'Energy of movement and transformation. Insatiable curiosity, versatility and need for new experiences. Catalyst for change.' },
  'km6_title': { es: 'El Protector', en: 'The Protector' },
  'km6_kw': { es: 'Responsabilidad · Amor · Servicio', en: 'Responsibility · Love · Service' },
  'km6_desc': { es: 'Energía de cuidado y nutrición. Vocación natural de proteger, sanar y crear espacios seguros para los demás. Corazón de hogar.', en: 'Energy of care and nurturing. Natural vocation to protect, heal and create safe spaces for others. Heart of home.' },
  'km7_title': { es: 'El Buscador', en: 'The Seeker' },
  'km7_kw': { es: 'Análisis · Espiritualidad · Profundidad', en: 'Analysis · Spirituality · Depth' },
  'km7_desc': { es: 'Energía de introspección y búsqueda de verdad. Mente analítica con sed espiritual. Necesidad de entender los misterios de la vida.', en: 'Energy of introspection and truth-seeking. Analytical mind with spiritual thirst. Need to understand life\'s mysteries.' },
  'km8_title': { es: 'El Poderoso', en: 'The Powerful' },
  'km8_kw': { es: 'Abundancia · Autoridad · Manifestación', en: 'Abundance · Authority · Manifestation' },
  'km8_desc': { es: 'Energía de poder material y logro. Capacidad para manifestar visiones en realidad, manejar recursos y ejercer influencia con propósito.', en: 'Energy of material power and achievement. Ability to manifest visions into reality, manage resources and wield influence with purpose.' },
  'km9_title': { es: 'El Humanitario', en: 'The Humanitarian' },
  'km9_kw': { es: 'Compasión · Sabiduría · Cierre', en: 'Compassion · Wisdom · Closure' },
  'km9_desc': { es: 'Energía de culminación y servicio universal. Visión panorámica de la vida, generosidad innata y capacidad de soltar para avanzar.', en: 'Energy of culmination and universal service. Panoramic vision of life, innate generosity and ability to let go to move forward.' },
  'km11_title': { es: 'Maestro Intuitivo', en: 'Intuitive Master' },
  'km11_kw': { es: 'Visión · Iluminación · Canal', en: 'Vision · Illumination · Channel' },
  'km11_desc': { es: 'Número maestro. Intuición amplificada al máximo, capacidad casi psíquica de percibir lo invisible. Canal entre lo espiritual y lo terrenal. Doble energía del 1 fusionada con la sensibilidad del 2.', en: 'Master number. Intuition amplified to the maximum, near-psychic ability to perceive the invisible. Channel between the spiritual and the earthly. Double energy of 1 fused with the sensitivity of 2.' },
  'km22_title': { es: 'Maestro Constructor', en: 'Master Builder' },
  'km22_kw': { es: 'Visión práctica · Arquitecto · Legado', en: 'Practical vision · Architect · Legacy' },
  'km22_desc': { es: 'Número maestro. El más poderoso en numerología. Capacidad de transformar sueños grandiosos en realidad tangible. Arquitecto de imperios con propósito espiritual. Doble 2 con la estabilidad del 4.', en: 'Master number. The most powerful in numerology. Ability to transform grand dreams into tangible reality. Architect of empires with spiritual purpose. Double 2 with the stability of 4.' },
  'km33_title': { es: 'Maestro Sanador', en: 'Master Healer' },
  'km33_kw': { es: 'Amor incondicional · Guía · Elevación', en: 'Unconditional love · Guide · Elevation' },
  'km33_desc': { es: 'Número maestro. El más raro y elevado. Amor incondicional expresado como servicio supremo. Guía espiritual que eleva la consciencia colectiva. Doble 3 con el corazón del 6.', en: 'Master number. The rarest and most elevated. Unconditional love expressed as supreme service. Spiritual guide that elevates collective consciousness. Double 3 with the heart of 6.' },
};

const DICT = { ...UI, ...NUMEROLOGY };

// ═══ DATA TRANSLATIONS — for values coming from numerology.js ═══
const DATA_MAP = {
  // Zodiac animal names
  'Rata': 'Rat', 'Buey': 'Ox', 'Tigre': 'Tiger', 'Conejo': 'Rabbit',
  'Dragón': 'Dragon', 'Serpiente': 'Snake', 'Caballo': 'Horse', 'Cabra': 'Goat',
  'Mono': 'Monkey', 'Gallo': 'Rooster', 'Perro': 'Dog', 'Cerdo': 'Pig',
  // Zodiac traits
  'Ingeniosa, astuta, versátil, encantadora': 'Clever, cunning, versatile, charming',
  'Fuerte, confiable, determinado, paciente': 'Strong, reliable, determined, patient',
  'Valiente, competitivo, impredecible, seguro': 'Brave, competitive, unpredictable, confident',
  'Elegante, amable, responsable, prudente': 'Elegant, kind, responsible, prudent',
  'Enérgico, audaz, ambicioso, carismático': 'Energetic, bold, ambitious, charismatic',
  'Sabia, intuitiva, elegante, misteriosa': 'Wise, intuitive, elegant, mysterious',
  'Libre, activo, enérgico, aventurero': 'Free, active, energetic, adventurous',
  'Creativa, compasiva, gentil, artística': 'Creative, compassionate, gentle, artistic',
  'Ingenioso, curioso, juguetón, inteligente': 'Ingenious, curious, playful, intelligent',
  'Observador, trabajador, valiente, puntual': 'Observant, hardworking, brave, punctual',
  'Leal, honesto, amable, prudente': 'Loyal, honest, kind, prudent',
  'Generoso, compasivo, diligente, optimista': 'Generous, compassionate, diligent, optimistic',
  // Elements
  'Madera': 'Wood', 'Fuego': 'Fire', 'Tierra': 'Earth', 'Metal': 'Metal', 'Agua': 'Water',
  // Element influences
  'Crecimiento, creatividad, expansión': 'Growth, creativity, expansion',
  'Pasión, energía, transformación': 'Passion, energy, transformation',
  'Estabilidad, nutrición, armonía': 'Stability, nurturing, harmony',
  'Determinación, rigidez, fuerza': 'Determination, rigidity, strength',
  'Adaptabilidad, sabiduría, intuición': 'Adaptability, wisdom, intuition',
  // Yin Yang
  'Yang': 'Yang', 'Yin': 'Yin',
  'Activo, expansivo, extrovertido': 'Active, expansive, extroverted',
  'Receptivo, introspectivo, intuitivo': 'Receptive, introspective, intuitive',
  // Western signs
  'Aries': 'Aries', 'Tauro': 'Taurus', 'Géminis': 'Gemini', 'Cáncer': 'Cancer',
  'Leo': 'Leo', 'Virgo': 'Virgo', 'Libra': 'Libra', 'Escorpio': 'Scorpio',
  'Sagitario': 'Sagittarius', 'Capricornio': 'Capricorn', 'Acuario': 'Aquarius', 'Piscis': 'Pisces',
  // Western elements & modalities
  'Aire': 'Air', 'Cardinal': 'Cardinal', 'Fijo': 'Fixed', 'Mutable': 'Mutable',
  // Life number meanings
  'El Líder': 'The Leader', 'El Diplomático': 'The Diplomat', 'El Creativo': 'The Creative',
  'El Constructor': 'The Builder', 'El Aventurero': 'The Adventurer', 'El Protector': 'The Protector',
  'El Buscador': 'The Seeker', 'El Poderoso': 'The Powerful', 'El Humanitario': 'The Humanitarian',
  'Maestro Intuitivo': 'Intuitive Master', 'Maestro Constructor': 'Master Builder', 'Maestro Sanador': 'Master Healer',
  'Independiente, pionero, ambicioso. Nació para liderar y abrir caminos.': 'Independent, pioneer, ambitious. Born to lead and blaze trails.',
  'Cooperador, sensible, pacificador. Brilla en la armonía y las relaciones.': 'Cooperative, sensitive, peacemaker. Shines in harmony and relationships.',
  'Expresivo, artístico, comunicativo. Su energía inspira y alegra.': 'Expressive, artistic, communicative. Their energy inspires and uplifts.',
  'Práctico, organizado, estable. Construye bases sólidas para todo.': 'Practical, organized, stable. Builds solid foundations for everything.',
  'Libre, adaptable, curioso. Busca experiencias y cambio constante.': 'Free, adaptable, curious. Seeks experiences and constant change.',
  'Responsable, amoroso, hogareño. Cuida y nutre a quienes ama.': 'Responsible, loving, homebody. Cares for and nurtures those they love.',
  'Analítico, espiritual, introspectivo. Busca verdades profundas.': 'Analytical, spiritual, introspective. Seeks deep truths.',
  'Ambicioso, eficiente, materialista. Domina el mundo material.': 'Ambitious, efficient, materialistic. Masters the material world.',
  'Compasivo, generoso, idealista. Vive para servir a los demás.': 'Compassionate, generous, idealistic. Lives to serve others.',
  'Visionario, inspirador, iluminado. Canal de energía superior.': 'Visionary, inspiring, enlightened. Channel of higher energy.',
  'Visionario práctico. Transforma sueños grandes en realidad.': 'Practical visionary. Transforms big dreams into reality.',
  'Amor incondicional, servicio supremo. Eleva la consciencia colectiva.': 'Unconditional love, supreme service. Elevates collective consciousness.',
  // Kairos positions — Básica (Estructural)
  'El Origen': 'The Origin', 'El Impulsor': 'The Driver', 'El Puente': 'The Bridge',
  'La Corona': 'The Crown', 'El Ancla': 'The Anchor', 'El Catalizador': 'The Catalyst',
  'La Expresión': 'The Expression', 'La Cosecha': 'The Harvest',
  'Talento innato': 'Innate talent', 'Motivación': 'Motivation', 'Crecimiento': 'Growth',
  'Propósito': 'Purpose', 'Estabilidad': 'Stability', 'Cambio': 'Change',
  'Imagen': 'Image', 'Resultado final': 'Final result',
  // Kairos positions — Master Edition
  'La Máscara': 'The Mask', 'El Corazón': 'The Heart', 'El Don': 'The Gift',
  'La Herramienta': 'The Tool', 'El Alma': 'The Soul', 'El Camino': 'The Path',
  'El Llamado': 'The Calling', 'La Sombra': 'The Shadow', 'El Legado': 'The Legacy',
  'Cómo apareces': 'How you appear', 'Deseos internos': 'Inner desires',
  'Talento natural': 'Natural talent', 'Carrera / Acción': 'Career / Action',
  'Esencia core': 'Core essence', 'Caminar diario': 'Daily walk',
  'Meta de vida': 'Life goal', 'Reto oculto': 'Hidden challenge', 'Resultado final': 'Final result',
  // Kairos meanings
  'El Pionero': 'The Pioneer',
  'Liderazgo · Independencia · Iniciativa': 'Leadership · Independence · Initiative',
  'Energía de inicio y creación. Impulso para abrir caminos nuevos, liderar con originalidad y confiar en uno mismo. Fuerza de voluntad pura.': 'Energy of beginning and creation. Drive to blaze new trails, lead with originality and trust oneself. Pure willpower.',
  'Cooperación · Sensibilidad · Equilibrio': 'Cooperation · Sensitivity · Balance',
  'Energía de conexión y armonía. Capacidad natural para mediar, escuchar y crear puentes entre personas. Intuición emocional refinada.': 'Energy of connection and harmony. Natural ability to mediate, listen and bridge people. Refined emotional intuition.',
  'Expresión · Alegría · Comunicación': 'Expression · Joy · Communication',
  'Energía de expresión artística y social. Talento para comunicar ideas, inspirar a otros y encontrar belleza en lo cotidiano.': 'Energy of artistic and social expression. Talent for communicating ideas, inspiring others and finding beauty in everyday life.',
  'Estructura · Disciplina · Fundamentos': 'Structure · Discipline · Foundations',
  'Energía de orden y estabilidad. Capacidad para construir bases sólidas, organizar sistemas y trabajar con paciencia metódica.': 'Energy of order and stability. Ability to build solid foundations, organize systems and work with methodical patience.',
  'Libertad · Cambio · Adaptabilidad': 'Freedom · Change · Adaptability',
  'Energía de movimiento y transformación. Curiosidad insaciable, versatilidad y necesidad de experiencias nuevas. Catalizador de cambio.': 'Energy of movement and transformation. Insatiable curiosity, versatility and need for new experiences. Catalyst for change.',
  'Responsabilidad · Amor · Servicio': 'Responsibility · Love · Service',
  'Energía de cuidado y nutrición. Vocación natural de proteger, sanar y crear espacios seguros para los demás. Corazón de hogar.': 'Energy of care and nurturing. Natural vocation to protect, heal and create safe spaces for others. Heart of home.',
  'Análisis · Espiritualidad · Profundidad': 'Analysis · Spirituality · Depth',
  'Energía de introspección y búsqueda de verdad. Mente analítica con sed espiritual. Necesidad de entender los misterios de la vida.': 'Energy of introspection and truth-seeking. Analytical mind with spiritual thirst. Need to understand life\'s mysteries.',
  'Abundancia · Autoridad · Manifestación': 'Abundance · Authority · Manifestation',
  'Energía de poder material y logro. Capacidad para manifestar visiones en realidad, manejar recursos y ejercer influencia con propósito.': 'Energy of material power and achievement. Ability to manifest visions into reality, manage resources and wield influence with purpose.',
  'Compasión · Sabiduría · Cierre': 'Compassion · Wisdom · Closure',
  'Energía de culminación y servicio universal. Visión panorámica de la vida, generosidad innata y capacidad de soltar para avanzar.': 'Energy of culmination and universal service. Panoramic vision of life, innate generosity and ability to let go to move forward.',
  'Visión · Iluminación · Canal': 'Vision · Illumination · Channel',
  'Número maestro. Intuición amplificada al máximo, capacidad casi psíquica de percibir lo invisible. Canal entre lo espiritual y lo terrenal. Doble energía del 1 fusionada con la sensibilidad del 2.': 'Master number. Intuition amplified to the maximum, near-psychic ability to perceive the invisible. Channel between the spiritual and the earthly. Double energy of 1 fused with the sensitivity of 2.',
  'Visión práctica · Arquitecto · Legado': 'Practical vision · Architect · Legacy',
  'Número maestro. El más poderoso en numerología. Capacidad de transformar sueños grandiosos en realidad tangible. Arquitecto de imperios con propósito espiritual. Doble 2 con la estabilidad del 4.': 'Master number. The most powerful in numerology. Ability to transform grand dreams into tangible reality. Architect of empires with spiritual purpose. Double 2 with the stability of 4.',
  'Amor incondicional · Guía · Elevación': 'Unconditional love · Guide · Elevation',
  'Número maestro. El más raro y elevado. Amor incondicional expresado como servicio supremo. Guía espiritual que eleva la consciencia colectiva. Doble 3 con el corazón del 6.': 'Master number. The rarest and most elevated. Unconditional love expressed as supreme service. Spiritual guide that elevates collective consciousness. Double 3 with the heart of 6.',
  // Kairos Master Edition positions
  'Tu impacto externo': 'Your external impact', 'Lo que tu alma anhela': 'What your soul yearns for',
  'Tu superpoder innato': 'Your innate superpower', 'Tu método de trabajo': 'Your work method',
  'Centro de gravedad': 'Center of gravity', 'Tu estilo de vida': 'Your lifestyle',
  'Misión espiritual': 'Spiritual mission', 'Apego emocional': 'Emotional attachment',
  'Liberación final': 'Final liberation',
  // Personal Year
  'La Semilla': 'The Seed', 'La Conexión': 'The Connection', 'La Expresión': 'The Expression',
  'Los Cimientos': 'The Foundation', 'El Cambio': 'The Change', 'El Hogar': 'The Home',
  'La Introspección': 'The Introspection', 'El Poder': 'The Power', 'La Conclusión': 'The Conclusion',
  'Despertar': 'Awakening', 'Construcción Maestra': 'Master Construction', 'Servicio Supremo': 'Supreme Service',
  'Nuevos comienzos, identidad, fuerza de voluntad': 'New beginnings, identity, willpower',
  'Cooperación, paciencia, relaciones, diplomacia': 'Cooperation, patience, relationships, diplomacy',
  'Creatividad, comunicación, alegría, expansión social': 'Creativity, communication, joy, social expansion',
  'Trabajo duro, estructura, disciplina, bases sólidas': 'Hard work, structure, discipline, solid foundations',
  'Libertad, aventura, transformación, adaptabilidad': 'Freedom, adventure, transformation, adaptability',
  'Responsabilidad, familia, amor, servicio, armonía': 'Responsibility, family, love, service, harmony',
  'Análisis, espiritualidad, soledad productiva, verdad': 'Analysis, spirituality, productive solitude, truth',
  'Abundancia, logros materiales, autoridad, cosecha': 'Abundance, material achievements, authority, harvest',
  'Cierre de ciclos, soltar, sabiduría, humanitarismo': 'Closing cycles, letting go, wisdom, humanitarianism',
  'Iluminación, intuición amplificada, año de visiones': 'Illumination, amplified intuition, year of visions',
  'Manifestar lo imposible, arquitectura de legado': 'Manifesting the impossible, legacy architecture',
  'Guía espiritual, amor incondicional, elevación colectiva': 'Spiritual guidance, unconditional love, collective elevation',
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState('es');
  const t = (key) => DICT[key]?.[lang] || key;
  const tData = (val) => lang === 'en' && DATA_MAP[val] ? DATA_MAP[val] : val;
  return (
    <LangContext.Provider value={{ lang, setLang, t, tData }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={`text-base ${lang === 'es' ? 'opacity-100' : 'opacity-40'}`}>🇲🇽</span>
      <span className={`text-base ${lang === 'en' ? 'opacity-100' : 'opacity-40'}`}>🇺🇸</span>
    </button>
  );
}
