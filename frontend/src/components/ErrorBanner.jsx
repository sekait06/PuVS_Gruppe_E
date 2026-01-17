export function ErrorBanner({ message, onClear }) {
  if (!message) return null;
  return (
    <div class="error">
      <div>{message}</div>
      <button class="btn" type="button" onClick={onClear}>OK</button>
    </div>
  );
}
