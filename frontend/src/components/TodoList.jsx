import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";

export function TodoList({ todos, onToggle, onDelete, onSave }) {
  if (!todos.length) return <EmptyState />;
  return (
    <ul class="list">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={() => onToggle(t)} onDelete={() => onDelete(t)} onSave={(patch) => onSave(t, patch)} />
      ))}
    </ul>
  );
}
