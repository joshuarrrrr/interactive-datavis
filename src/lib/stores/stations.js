import { writable, get } from "svelte/store";

export const active = writable();
export const selected = writable(new Set());

export function toggle(id) {
  if (!get(selected).has(id)) {
    selected.update((set) => set.add(id));
  } else {
    selected.update((set) => {
      set.delete(id);
      return set;
    });
  }
}

export function reset() {
  selected.set(new Set());
}
