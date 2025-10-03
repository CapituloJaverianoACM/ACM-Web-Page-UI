export type CancelTypeText = () => void;

export function typeText(
  el: HTMLElement,
  text: string,
  speed = 30,
  onDone?: () => void
): CancelTypeText {
  let i = 0;
  let destroyed = false;
  const timeouts: number[] = [];

  el.innerHTML = "";
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "|";
  el.appendChild(cursor);

  const tick = () => {
    if (destroyed) return;
    if (i < text.length) {
      cursor.before(document.createTextNode(text[i]));
      i++;
      const id = window.setTimeout(tick, speed);
      timeouts.push(id);
    } else {
      cursor.remove();
      onDone?.();
    }
  };

  tick();

  return () => {
    destroyed = true;
    timeouts.forEach((t) => clearTimeout(t));
    if (cursor.isConnected) cursor.remove();
  };
}

