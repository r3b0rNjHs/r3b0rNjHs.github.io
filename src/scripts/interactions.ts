import { clamp } from '@/lib/math';
import { formatClock } from '@/lib/time';
import type { Lang } from '@/i18n/ui';

type Cleanup = () => void;
let cleanups: Cleanup[] = [];

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Wires every progressive-enhancement behaviour on the current page.
 * Runs on each `astro:page-load` and tears the previous page's listeners down first,
 * so client-side navigation never leaks observers or global handlers.
 */
export function initInteractions(): void {
  for (const off of cleanups) off();
  cleanups = [];

  cleanups.push(revealOnScroll(), magnetic(), countUp(), localClock(), copyButtons(), themeToggles(), scrollProgress());
}

export function toggleTheme(): void {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  const swap = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage may be unavailable (private mode) — the theme still applies for this visit */
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: next }));
  };
  // Use a view transition for a smooth cross-fade where supported.
  if ('startViewTransition' in document && !reducedMotion()) {
    (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(swap);
  } else swap();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function toast(message: string): void {
  let el = document.querySelector<HTMLElement>('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.append(el);
  }
  el.textContent = message;
  el.classList.add('is-visible');
  window.clearTimeout(Number(el.dataset.timer));
  el.dataset.timer = String(window.setTimeout(() => el?.classList.remove('is-visible'), 2200));
}

// ───────────────────────── behaviours ─────────────────────────

function revealOnScroll(): Cleanup {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]');
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0 },
  );
  targets.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** Buttons and links marked `data-magnetic` drift toward the pointer. */
function magnetic(): Cleanup {
  if (!finePointer() || reducedMotion()) return () => {};
  const offs: Cleanup[] = [];
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.3;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => (el.style.transform = '');
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    offs.push(() => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
  return () => offs.forEach((off) => off());
}

/** Animate numbers marked `data-count` when they scroll into view. */
function countUp(): Cleanup {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      io.unobserve(el);
      const target = Number(el.dataset.count);
      if (reducedMotion()) {
        el.textContent = String(target);
        continue;
      }
      const start = performance.now();
      const duration = 1600;
      const tick = (now: number) => {
        const t = clamp((now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  });
  document.querySelectorAll('[data-count]').forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function localClock(): Cleanup {
  const els = document.querySelectorAll<HTMLElement>('[data-clock]');
  if (!els.length) return () => {};
  const lang = (document.documentElement.lang as Lang) || 'en';
  const update = () => els.forEach((el) => (el.textContent = formatClock(new Date(), el.dataset.clock!, lang)));
  update();
  const id = window.setInterval(update, 15_000);
  return () => window.clearInterval(id);
}

function copyButtons(): Cleanup {
  const handler = async (e: Event) => {
    const button = (e.target as HTMLElement).closest<HTMLElement>('[data-copy]');
    if (!button) return;
    e.preventDefault();
    const ok = await copyToClipboard(button.dataset.copy!);
    if (ok) toast(button.dataset.copied ?? 'Copied');
    else window.location.href = `mailto:${button.dataset.copy}`;
  };
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}

function themeToggles(): Cleanup {
  const handler = (e: Event) => {
    if ((e.target as HTMLElement).closest('[data-theme-toggle]')) toggleTheme();
  };
  document.addEventListener('click', handler);
  return () => document.removeEventListener('click', handler);
}

/** Exposes scroll progress as a CSS variable for scroll-linked styling without layout thrash. */
function scrollProgress(): Cleanup {
  let frame = 0;
  const update = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty('--scroll', String(max > 0 ? window.scrollY / max : 0));
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(frame);
  };
}
