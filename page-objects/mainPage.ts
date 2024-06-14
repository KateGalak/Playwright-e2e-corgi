import { expect, type Locator, type Page } from "@playwright/test";

export class MainPage {
  readonly page: Page;

  readonly getClearDBbtn: Locator;
  readonly getAddDatabaseBtn: Locator;
  readonly getDatabaseDropdown: Locator;
  readonly getDatabaseField: Locator;
  readonly getTableField: Locator;
  readonly getArrowDropDownIcon: Locator;

  readonly getShareDatabasesBtn: Locator;
  readonly getSaveDatabasesBtn: Locator;
  readonly getRunDatabasesBtn: Locator;

  readonly getExploreTitile: Locator;
  readonly getDatabasesTitle: Locator;
  readonly getResultsTitle: Locator;

  readonly getSQLqueryTitle: Locator;
  readonly getSQLField: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getClearDBbtn = page.locator(
      "button[data-testid='ClearDatabases-btn']"
    );
    this.getAddDatabaseBtn = page.locator(
      "button[data-testid='AddDatabases-btn']"
    );
    this.getDatabaseDropdown = page.locator(
      "div[data-testid='Databases-dropdwn-exp']"
    );
    this.getDatabaseField = page.locator("input[id='explorer[0].database']");
    this.getTableField = page.locator("input[id='explorer[0].rows[0].table']");
    this.getArrowDropDownIcon = page.locator(
      'svg[data-testid="ArrowDropDownIcon"]'
    );
    this.getShareDatabasesBtn = page.locator(
      "button[data-testid='ShareDatabases-btn']"
    );
    this.getSaveDatabasesBtn = page.locator(
      "button[data-testid='SaveDatabases-btn']"
    );
    this.getRunDatabasesBtn = page.locator(
      "button[data-testid='RunDatabases-btn']"
    );
    this.getExploreTitile = page.locator(".MuiBreadcrumbs-li>h2");
    this.getDatabasesTitle = page.locator(
      ".MuiTypography-h2.css-1fa4uo4-MuiTypography-root"
    );
    this.getResultsTitle = page.locator(".css-79jzi4-MuiStack-root>h2");
    this.getSQLqueryTitle = page.locator(".css-3y1137-MuiStack-root>h2");
    this.getSQLField = page.locator(".css-1vw8q6z>span");
  }

  async exploreTitles() {
    await expect(this.getExploreTitile).toHaveText("Explore");
    await expect(this.getDatabasesTitle).toHaveText("Databases");
    await expect(this.getResultsTitle).toHaveText("Results (0)");
  }

  async exploreBtnsVisibility() {
    await expect(this.getClearDBbtn).toBeVisible();
    await expect(this.getAddDatabaseBtn).toBeVisible();
    await expect(this.getShareDatabasesBtn).toBeDisabled();
    await expect(this.getSaveDatabasesBtn).toBeDisabled();
    await expect(this.getRunDatabasesBtn).toBeDisabled();
  }

  async exploreBtnsText() {
    await expect(this.getClearDBbtn).toHaveText("Clear");
    await expect(this.getAddDatabaseBtn).toHaveText("Add database");
    await expect(this.getShareDatabasesBtn).toHaveText("Share");
    await expect(this.getSaveDatabasesBtn).toHaveText("Save");
    await expect(this.getRunDatabasesBtn).toHaveText("Run");
  }

  async exploreFieldsText() {
    await expect(
      this.page.locator("label[id='explorer[0].database-label']")
    ).toHaveText("Database");
    await expect(
      this.page.locator("div[data-testid='Table-dropdwn-exp']>label")
    ).toHaveText("Table");
    await expect(
      this.page.locator("div[data-testid='Fields-dropdwn-exp']>label")
    ).toHaveText("Fields");
    await expect(
      this.page.locator("div[data-testid='Fields-dropdwn-exp']>label")
    ).toBeDisabled();
    await expect(this.getSQLqueryTitle).toHaveText("SQL query");
    await expect(this.getSQLField).toHaveText("No data found");
  }
}
