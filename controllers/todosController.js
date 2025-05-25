import supabase from '../db.js';

export async function getTodos(req, res) {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
}

export async function addTodo(req, res) {
  const { text } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ text }]).select();
  if (error) return res.status(500).json({ error });
  res.status(201).json(data[0]);
}

export async function deleteTodo(req, res) {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.status(204).send();
}
