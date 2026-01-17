export function FilterBar({ filter, setFilter, query, setQuery, sort, setSort }) {
  return (
    <div class="bar">
      <input
        class="input"
        value={query}
        onInput={(e) => setQuery(e.currentTarget.value)}
        placeholder="Suchen…"
      />

      <select class="select" value={filter} onChange={(e) => setFilter(e.currentTarget.value)}>
        <option value="all">Alle</option>
        <option value="open">Offen</option>
        <option value="done">Erledigt</option>
      </select>

      <select class="select" value={sort} onChange={(e) => setSort(e.currentTarget.value)}>
        <option value="new">Neueste</option>
        <option value="old">Älteste</option>
        <option value="title">Titel A–Z</option>
      </select>
    </div>
  );
}
