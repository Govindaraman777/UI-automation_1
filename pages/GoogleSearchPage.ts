import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page object for the Google search page and results.
 */
export class GoogleSearchPage extends BasePage {
  private readonly searchBox: Locator;
  private readonly consentAcceptButton: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    super(page);
    this.searchBox = page.locator('textarea[name="q"], input[name="q"]');
    this.consentAcceptButton = page.getByRole('button', {
      name: /accept all|i agree|accept/i,
    });
    this.results = page.locator('#search h3, #rso h3, #main h3');
  }

  async open(): Promise<void> {
    await this.goto('/');
    await this.acceptConsentIfPresent();
  }

  private async acceptConsentIfPresent(): Promise<void> {
    if (await this.consentAcceptButton.first().isVisible().catch(() => false)) {
      await this.consentAcceptButton.first().click();
    }
  }

  /** Type the search term into the search box without submitting. */
  async enterSearchTerm(term: string): Promise<void> {
    await this.searchBox.first().click();
    await this.searchBox.first().fill(term);
  }

  /** Read the current value of the search box. */
  async getSearchTerm(): Promise<string> {
    return this.searchBox.first().inputValue();
  }

  /** Submit the search and wait for navigation to the results page. */
  async submitSearch(): Promise<void> {
    await this.searchBox.first().press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** Convenience method: enter a term and submit it. */
  async search(term: string): Promise<void> {
    await this.enterSearchTerm(term);
    await this.submitSearch();
  }
}
