import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase = null;
let useLocalStorage = false;

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

export async function getPersonas() {
  if (useLocalStorage || !supabase) {
    return getFromLS();
  }
  try {
    const { data, error } = await supabase.from('mi_circulo').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch {
    return getFromLS();
  }
}

export async function addPersona(persona) {
  const newP = { ...persona, id: persona.id || crypto.randomUUID(), created_at: new Date().toISOString() };
  
  if (useLocalStorage || !supabase) {
    const all = getFromLS();
    all.unshift(newP);
    saveToLS(all);
    return newP;
  }
  try {
    const { data, error } = await supabase.from('mi_circulo').insert([newP]).select().single();
    if (error) throw error;
    return data;
  } catch {
    const all = getFromLS();
    all.unshift(newP);
    saveToLS(all);
    return newP;
  }
}

export async function updatePersona(id, updates) {
  if (useLocalStorage || !supabase) {
    const all = getFromLS();
    const idx = all.findIndex(p => p.id === id);
    if (idx >= 0) { all[idx] = { ...all[idx], ...updates }; saveToLS(all); return all[idx]; }
    return null;
  }
  try {
    const { data, error } = await supabase.from('mi_circulo').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  } catch { return null; }
}

export async function deletePersona(id) {
  if (useLocalStorage || !supabase) {
    const all = getFromLS().filter(p => p.id !== id);
    saveToLS(all);
    return true;
  }
  try {
    const { error } = await supabase.from('mi_circulo').delete().eq('id', id);
    if (error) throw error;
    return true;
  } catch { return false; }
}
