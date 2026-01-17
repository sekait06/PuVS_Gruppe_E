import { useEffect, useState } from "preact/hooks";

export function TodoItem({ todo, onToggle, onDelete, onSave }) {
  const [title, setTitle] = useState(todo.title ?? "");
  const [desc, setDesc] = useState(todo.description ?? "");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTitle(todo.title ?? "");
    setDesc(todo.description ?? "");
    setDirty(false);
  }, [todo.id, todo.title, todo.description]);

  const done = !!todo.completed;

  return (
    <li class={`item ${done ? "done" : ""}`}>
      <div class="row between">
        <label class="row">
          <input type="checkbox" checked={done} onChange={onToggle} />
          <span class="id">#{todo.id}</span>
        </label>

        <div class="row">
          <span class="badge">{done ? "erledigt" : "offen"}</span>
          <button class="btn danger" type="button" onClick={onDelete}>Löschen</button>
        </div>
      </div>

      <input
        class="input"
        value={title}
        onInput={(e) => { setTitle(e.currentTarget.value); setDirty(true); }}
      />

      <textarea
        class="textarea"
        value={desc}
        rows={3}
        onInput={(e) => { setDesc(e.currentTarget.value); setDirty(true); }}
      />

      <div class="row">
        <button class="btn" type="button" disabled={!dirty} onClick={() => onSave({ title, description: desc })}>
          Speichern
        </button>
      </div>
    </li>
  );
}
