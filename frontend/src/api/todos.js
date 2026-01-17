import { request } from "./client";

const MOCK = false; // <- später auf false setzen, wenn Backend läuft

let mockTodos = [
  { id: 1, title: "Frontend bauen", description: "Preact + Vite", completed: false },
  { id: 2, title: "Backend starten", description: "Spring Boot + Postgres", completed: true },
];

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const todosApi = {
  async list() {
    if (MOCK) {
      await delay();
      return mockTodos;
    }
    return request("/todos");
  },

  async get(id) {
    if (MOCK) {
      await delay();
      const found = mockTodos.find((t) => t.id === Number(id));
      if (!found) throw new Error("Todo not found");
      return found;
    }
    return request(`/todos/${id}`);
  },

  async create(todo) {
    if (MOCK) {
      await delay();
      const newTodo = { ...todo, id: Date.now() };
      mockTodos = [newTodo, ...mockTodos];
      return newTodo;
    }
    return request("/todos", { method: "POST", body: JSON.stringify(todo) });
  },

  async update(id, todo) {
    if (MOCK) {
      await delay();
      const numId = Number(id);
      mockTodos = mockTodos.map((t) => (t.id === numId ? { ...t, ...todo, id: t.id } : t));
      return mockTodos.find((t) => t.id === numId);
    }
    return request(`/todos/${id}`, { method: "PUT", body: JSON.stringify(todo) });
  },

  async remove(id) {
    if (MOCK) {
      await delay();
      const numId = Number(id);
      mockTodos = mockTodos.filter((t) => t.id !== numId);
      return;
    }
    return request(`/todos/${id}`, { method: "DELETE" });
  },
};
