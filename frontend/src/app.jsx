import { useMemo, useState } from "preact/hooks";
import "./styles/ui.css";
import { useTodos } from "./hooks/useTodos";

import { Header } from "./components/Header";
import { ErrorBanner } from "./components/ErrorBanner";
import { TodoForm } from "./components/TodoForm";
import { FilterBar } from "./components/FilterBar";
import { TodoList } from "./components/TodoList";
import { LoadingState } from "./components/LoadingState";

export function App() {
  const { todos, loading, err, add, toggle, save, remove, setErr } = useTodos();

  const [filter, setFilter] = useState("all"); // all | open | done
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new"); // new | old | title

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = todos.slice();

    if (q) {
      list = list.filter((t) => {
        const a = (t.title ?? "").toLowerCase();
        const b = (t.description ?? "").toLowerCase();
        return a.includes(q) || b.includes(q);
      });
    }

    if (filter === "open") list = list.filter((t) => !t.completed);
    if (filter === "done") list = list.filter((t) => !!t.completed);

    if (sort === "new") list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    if (sort === "old") list.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    if (sort === "title") list.sort((a, b) => String(a.title ?? "").localeCompare(String(b.title ?? "")));

    return list;
  }, [todos, filter, query, sort]);

  const countOpen = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  return (
    <main class="container">
      <Header countOpen={countOpen} countTotal={todos.length} />

      <ErrorBanner message={err} onClear={() => setErr("")} />

      <TodoForm onAdd={add} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
      />

      {loading ? (
        <LoadingState />
      ) : (
        <TodoList todos={filtered} onToggle={toggle} onDelete={remove} onSave={save} />
      )}
    </main>
  );
}
