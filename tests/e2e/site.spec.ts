import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('home', () => {
  test('renders the English home page by default', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AI Engineer & Systems Architect/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('AI‑native');
    await expect(page.locator('#work li')).toHaveCount(5);
  });

  test('serves the Spanish version under /es/', async ({ page }) => {
    await page.goto('/es/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('nativos de IA');
  });

  test('declares hreflang alternates and a canonical URL', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', 'https://r3b0rnjhs.github.io/es/');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://r3b0rnjhs.github.io/');
  });

  test('never exposes a phone number', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  });
});

test.describe('navigation', () => {
  test('opens a case study and moves to the next one', async ({ page }) => {
    await page.goto('/');
    await page.locator('#work a[href="/work/pet-defense/"]').click();
    await expect(page).toHaveURL(/\/work\/pet-defense\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Pet Defense');
    await expect(page.getByText('AI in the loop')).toBeVisible();
    await page.locator('.next__link').click();
    await expect(page).toHaveURL(/\/work\/yoqze-agents\/$/);
  });

  test('switches language while keeping the current page', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Language switch is in the header on all sizes; one viewport is enough.');
    await page.goto('/work/aion2-companion/');
    await page.getByRole('link', { name: 'Leer en español' }).click();
    await expect(page).toHaveURL(/\/es\/work\/aion2-companion\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  });

  test('renders a friendly 404', async ({ page }) => {
    const response = await page.goto('/this-node-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Signal lost');
  });
});

test.describe('interactions', () => {
  test('toggles and persists the colour theme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('[data-theme-toggle]').first().click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('command palette filters and navigates', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard shortcut is a desktop affordance.');
    await page.goto('/');
    await page.keyboard.press('ControlOrMeta+k');
    const input = page.getByRole('combobox');
    await expect(input).toBeFocused();
    await input.fill('aion');
    await expect(page.getByRole('option').first()).toContainText('Aion 2 Companion');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/work\/aion2-companion\/$/);
  });

  test('mobile menu opens and closes', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only.');
    await page.goto('/');
    const toggle = page.locator('[data-menu-toggle]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.locator('[data-menu-link]').filter({ hasText: 'Contact' }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('accessibility', () => {
  for (const path of ['/', '/es/', '/work/pet-defense/', '/es/work/naruto-online-companion/']) {
    test(`${path} has no serious axe violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }
});
