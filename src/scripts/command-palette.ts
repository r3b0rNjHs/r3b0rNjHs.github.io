import { navigate } from 'astro:transitions/client';
import { fuzzyFilter } from '@/lib/fuzzy';
import { copyToClipboard, toast, toggleTheme } from './interactions';

export type CommandAction =
  { type: 'go'; href: string } | { type: 'open'; href: string } | { type: 'theme' } | { type: 'copy'; value: string; message: string };

export interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  action: CommandAction;
}

/**
 * ⌘K / Ctrl+K command palette.
 * Global listeners are registered once (module scope survives view transitions);
 * the dialog and its data are re-queried on use because the DOM is swapped per page.
 */
export function initCommandPalette(): void {
  let selected = 0;
  let results: Command[] = [];

  const dom = () => ({
    dialog: document.querySelector<HTMLDialogElement>('[data-cmd]'),
    input: document.querySelector<HTMLInputElement>('[data-cmd-input]'),
    list: document.querySelector<HTMLUListElement>('[data-cmd-list]'),
    empty: document.querySelector<HTMLElement>('[data-cmd-empty]'),
  });

  const commands = (): Command[] => {
    const raw = document.querySelector('[data-cmd-data]')?.textContent;
    return raw ? (JSON.parse(raw) as Command[]) : [];
  };

  const render = () => {
    const { list, empty, input } = dom();
    if (!list || !empty || !input) return;
    results = fuzzyFilter(commands(), input.value, (c) => `${c.label} ${c.group} ${c.hint ?? ''}`);
    selected = Math.min(selected, Math.max(0, results.length - 1));
    empty.hidden = results.length > 0;

    const fragment = document.createDocumentFragment();
    let lastGroup = '';
    results.forEach((cmd, i) => {
      if (cmd.group !== lastGroup && !input.value) {
        const header = document.createElement('li');
        header.className = 'cmd__group';
        header.setAttribute('role', 'presentation');
        header.textContent = cmd.group;
        fragment.append(header);
        lastGroup = cmd.group;
      }
      const item = document.createElement('li');
      item.className = 'cmd__item';
      item.id = `cmd-${cmd.id}`;
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', String(i === selected));
      item.dataset.index = String(i);
      const label = document.createElement('span');
      label.textContent = cmd.label;
      const hint = document.createElement('span');
      hint.className = 'cmd__hint';
      hint.textContent = cmd.hint ?? '';
      item.append(label, hint);
      fragment.append(item);
    });
    list.replaceChildren(fragment);
    input.setAttribute('aria-activedescendant', results[selected] ? `cmd-${results[selected]!.id}` : '');
    list.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  };

  const open = () => {
    const { dialog, input } = dom();
    if (!dialog || !input || dialog.open) return;
    input.value = '';
    selected = 0;
    render();
    dialog.showModal();
    input.focus();
  };

  const close = () => dom().dialog?.close();

  const run = async (cmd: Command | undefined) => {
    if (!cmd) return;
    close();
    const { action } = cmd;
    switch (action.type) {
      case 'go': {
        const target = new URL(action.href, location.href);
        if (target.pathname === location.pathname && target.hash) {
          document.querySelector(target.hash)?.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', target.hash);
        } else await navigate(action.href);
        break;
      }
      case 'open':
        window.open(action.href, '_blank', 'noopener');
        break;
      case 'theme':
        toggleTheme();
        break;
      case 'copy':
        if (await copyToClipboard(action.value)) toast(action.message);
        break;
    }
  };

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const { dialog } = dom();
      if (dialog?.open) close();
      else open();
      return;
    }
    const { dialog } = dom();
    if (!dialog?.open) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const delta = e.key === 'ArrowDown' ? 1 : -1;
      selected = (selected + delta + results.length) % Math.max(1, results.length);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      void run(results[selected]);
    }
  });

  document.addEventListener('input', (e) => {
    if ((e.target as HTMLElement).matches('[data-cmd-input]')) {
      selected = 0;
      render();
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-cmd-open]')) return open();
    const item = target.closest<HTMLElement>('.cmd__item');
    if (item) return void run(results[Number(item.dataset.index)]);
    // Click on the backdrop (the dialog element itself, outside the panel) closes it.
    if (target.matches('[data-cmd]')) close();
  });

  document.addEventListener('astro:before-swap', close);
}
