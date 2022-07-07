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

export function multiToggle(ids) {
  const crrntSelected = get(selected);
  const difference = new Set([...ids].filter((id) => !crrntSelected.has(id)));

  if (!difference.size) {
    // all of the ids are already selected, so we want to deselected all of them
    selected.set(new Set([...crrntSelected].filter((id) => !ids.has(id))));
  } else {
    // add all ids to the selection
    selected.set(new Set([...crrntSelected, ...ids]));
  }
}
