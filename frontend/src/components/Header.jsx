export function Header({ countOpen, countTotal }) {
  return (
    <header class="header">
      <div>
        <h1>Todo-List (Preact)</h1>
        <div class="subtitle">
          Erstellt von Gruppe E – Fatih Kaya (fakait01), Selin Kaya (sekait06), Mason Schönherr (mascit43)
        </div>
      </div>

      <div class="meta">
        Offen: <b>{countOpen}</b> / Gesamt: <b>{countTotal}</b>
      </div>
    </header>
  );
}
