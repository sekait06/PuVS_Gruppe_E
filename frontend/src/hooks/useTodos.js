import { useEffect, useMemo, useState } from "preact/hooks";
import { todosApi } from "../api/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await todosApi.list();
      setTodos(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add({ title, description }) {
    setErr("");
    await todosApi.create({ title, description, completed: false });
    await load();
  }

  async function toggle(todo) {
    setErr("");
    await todosApi.update(todo.id, {
      title: todo.title ?? "",
      description: todo.description ?? "",
      completed: !todo.completed,
    });
    await load();
  }

  async function save(todo, patch) {
    setErr("");
    await todosApi.update(todo.id, {
      title: patch.title,
      description: patch.description,
      completed: !!todo.completed,
    });
    await load();
  }

  async function remove(todo) {
    setErr("");
    await todosApi.remove(todo.id);
    await load();
  }

  return { todos, loading, err, load, add, toggle, save, remove, setErr };
}
