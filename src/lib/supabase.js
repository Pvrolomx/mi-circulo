import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;
let useLocalStorage = false;
let knownColumns = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  useLocalStorage = true;
}

const LS_KEY = 'mi_circulo_personas';

function getFromLS() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch { return []; }
}

function saveToLS(data) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }
}

async function detectColumns() {
  if (knownColumns) return knownColumns;
  if (!supabase) return null;
  try {
    const { data } = await supabase.from('mi_circulo').select('*').limit(1);
    if (data && data.length > 0) {
      knownColumns = Object.keys(data[0]);
    } else {
      knownColumns = ['id', 'nombre', 'fecha_nacimiento', 'categoria', 'created_at'];
    }
    return knownColumns;
  } catch { return null; }
}

function stripToSchema(obj, columns) {
  if (!columns) return obj;
  const cleaned = {};
  for (const key of Object.keys(obj)) {
    if (columns.includes(key)) cleaned[key] = obj[key];
  }
  return cleaned;
}

export async function getPersonas() {
  if (useLocalStorage || !supabase) return getFromLS();
  try {
    const { data, error } = await supabase.from('mi_circulo').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    if (data && data.length > 0 && !knownColumns) knownColumns = Object.keys(data[0]);
    if (data) saveToLS(data);
    return data || [];
  } catch {
    return getFromLS();
  }
}

export async function addPersona(persona) {
  const newP = { ...persona, id: persona.id || crypto.randomUUID(), created_at: new Date().toISOString() };
  if (useLocalStorage || !supabase) {
    const all = getFromLS(); all.unshift(newP); saveToLS(all); return newP;
  }
  try {
    const cols = await detectColumns();
    const safeP = stripToSchema(newP, cols);
    const { data, error } = await supabase.from('mi_circulo').insert([safeP]).select().single();
    if (error) throw error;
    const merged = { ...newP, ...data };
    const all = getFromLS(); all.unshift(merged); saveToLS(all);
    return merged;
  } catch {
    const all = getFromLS(); all.unshift(newP); saveToLS(all); return newP;
  }
}

export async function updatePersona(id, updates) {
  const all = getFromLS();
  const idx = all.findIndex(p => p.id === id);
  if (idx >= 0) { all[idx] = { ...all[idx], ...updates }; saveToLS(all); }

  if (useLocalStorage || !supabase) return idx >= 0 ? all[idx] : null;
  try {
    const cols = await detectColumns();
    const safeUpdates = stripToSchema(updates, cols);
    if (Object.keys(safeUpdates).length > 0) {
      const { data, error } = await supabase.from('mi_circulo').update(safeUpdates).eq('id', id).select().single();
      if (error) throw error;
      const merged = { ...(idx >= 0 ? all[idx] : {}), ...data };
      return merged;
    }
    return idx >= 0 ? all[idx] : null;
  } catch { return idx >= 0 ? all[idx] : null; }
}

export async function deletePersona(id) {
  const all = getFromLS().filter(p => p.id !== id);
  saveToLS(all);
  if (useLocalStorage || !supabase) return true;
  try {
    await supabase.from('mi_circulo').delete().eq('id', id);
    return true;
  } catch { return true; }
}
