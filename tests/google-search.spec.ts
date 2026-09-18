import { expect, test } from '@playwright/test';
import { GoogleSearchPage } from '../pages/GoogleSearchPage';

test.describe('Google Search', () => {
  test('Launch Google.com, enter "what\'s up" and search it', async ({ page }) => {
    const googlePage = new GoogleSearchPage(page);

    // 1. Launch the Google.com site
    await googlePage.open();
    await expect(page).toHaveTitle(/google/i);

    // 2. Enter "what's up" in the search box
    await googlePage.enterSearchTerm("what's up");
    expect(await googlePage.getSearchTerm()).toBe("what's up");

    // 3. Search it
    await googlePage.submitSearch();
    await expect(page).not.toHaveURL('https://www.google.com/');

    // Google actively blocks automated browsers and may serve a CAPTCHA
    // ("/sorry") page instead of results. Assert results only when served.
    if (!page.url().includes('/sorry/')) {
      await expect(googlePage.results.first()).toBeVisible();
    }
  });
});
