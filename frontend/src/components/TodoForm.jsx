import { useState } from "preact/hooks";

export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  }

  return (
    <form class="card" onSubmit={submit}>
      <input class="input" value={title} onInput={(e) => setTitle(e.currentTarget.value)} placeholder="Titel" />
      <textarea class="textarea" value={description} onInput={(e) => setDescription(e.currentTarget.value)} placeholder="Beschreibung (optional)" rows={3} />
      <div class="row">
        <button class="btn primary" type="submit">Hinzufügen</button>
        <button class="btn" type="button" onClick={() => { setTitle(""); setDescription(""); }}>Reset</button>
      </div>
    </form>
  );
}
