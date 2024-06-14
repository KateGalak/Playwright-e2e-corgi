import { expect, type Locator, type Page } from "@playwright/test";
import { MainPage } from "./mainPage";
import { SideBarMenu } from "./sidebarMenu";
import { checkToaster } from "./general";

export class QueriesPage {
  readonly page: Page;

  readonly getSavedQueriesBtn: Locator;
  readonly getSharedQueriesBtn: Locator;
  readonly getBreadCrumbExplorer: Locator;
  readonly getBreadCrumbQueries: Locator;
  readonly getColumns: Locator;
  readonly getFilters: Locator;
  readonly getSharedCheckBox: Locator;
  readonly getDeleteQuerieIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getSavedQueriesBtn = page.locator(
      "div[data-testid='SavedQueries-btn']"
    );
    this.getSharedQueriesBtn = page.locator(
      "div[data-testid='SharedQueries-btn']"
    );
    this.getBreadCrumbExplorer = page.locator("li>a[href*='/explorer/']");
    this.getBreadCrumbQueries = page.locator(
      "li>.MuiTypography-root.MuiTypography-h2.css-1wetm9o-MuiTypography-root"
    );
    this.getColumns = page.locator("svg[data-testid='ColumnIconIcon']");
    this.getFilters = page.locator(".MuiBadge-root.css-1c32n2y-MuiBadge-root");
    this.getSharedCheckBox = page.locator("#is_shared");
    this.getDeleteQuerieIcon = page.locator(
      'svg[data-testid="DeleteOutlinedIcon"]'
    );
  }

  async breadCrumbsQueries() {
    await expect(this.getBreadCrumbExplorer).toHaveText("Explorer");
    await expect(this.getBreadCrumbQueries).toHaveText("Queries");
  }

  async savedQueriesPage() {
    await expect(this.getSavedQueriesBtn).toHaveText("Saved queries");
    await expect(
      this.page.locator(".css-79jzi4-MuiStack-root>h2")
    ).toContainText("Saved queries");
    await expect(this.page.getByText("Name")).toBeVisible();
    await expect(this.page.getByText("Created")).toBeVisible();
    await expect(this.page.getByText("Updated")).toBeVisible();
    await expect(this.page.getByText("Actions")).toBeVisible();
  }

  async sharedQueriesPage() {
    await this.getSharedQueriesBtn.click();
    await expect(this.getSharedQueriesBtn).toHaveText("Shared queries");
    await expect(
      this.page.locator(".css-79jzi4-MuiStack-root>h2")
    ).toContainText("Shared queries");
  }

  async selectDatabaseData() {
    const mainPage = new MainPage(this.page);

    await mainPage.getDatabaseField.fill("compass_notification_service");
    await this.page.getByText("compass_notification_service").click();
    await mainPage.getTableField.first().fill("Email sender");
    await this.page.getByText("Email sender").click();
    await mainPage.getArrowDropDownIcon.nth(6).click();
    await this.page.getByText("Email").click();
    await this.page.getByText("Id").click();
    await this.page.getByText("Key").click();
    await this.page.getByText("Name").click();
    await this.page.getByText("Org code").click();
  }

  async saveDatabaseQueries() {
    await this.page.locator("#name").fill("Save-queries-data-test");
    await this.page.getByRole("button", { name: "Save" }).click();
  }

  async checksSavedQueriesData() {
    const dateNow = new Date();
    const dateCreated = dateNow.toISOString().split("T")[0];

    await expect(this.page.locator(".css-79jzi4-MuiStack-root>h2")).toHaveText(
      "Saved queries (1)"
    );
    await expect(
      this.page.locator(".MuiDataGrid-cell.MuiDataGrid-cell--textLeft").nth(0)
    ).toHaveText("Save-queries-data-test");
    await expect(
      this.page.locator(".MuiDataGrid-cell.MuiDataGrid-cell--textLeft").nth(1)
    ).toHaveText(`${dateCreated}`);
  }

  async queriesIsShared() {
    const mainPage = new MainPage(this.page);

    await this.page.locator('[role="presentation"]').nth(15).click();
    await mainPage.getSaveDatabasesBtn.click();
    await expect(this.page.locator('[role="dialog"]>h2')).toHaveText(
      "Save query"
    );
    await this.getSharedCheckBox.click();
    await this.page.locator('button[data-testid="SaveQuery-btn"]').click();
  }

  async queriesDuplicate() {
    const mainPage = new MainPage(this.page);
    const sidebarMenu = new SideBarMenu(this.page);

    await mainPage.getSaveDatabasesBtn.click();
    await this.page.locator("#name").fill("Save-queries-data-test-Duplicate");
    await this.getSharedCheckBox.click();
    await this.page
      .locator('button[data-testid="DuplicateQuery-btn"]')
      .click({ timeout: 5000 });
    await checkToaster(this.page, "You successfully added new query");
    await sidebarMenu.getQueriesBtn.click();
    await expect(
      this.page.locator(".MuiDataGrid-cell.MuiDataGrid-cell--textLeft").nth(0)
    ).toHaveText("Save-queries-data-test-Duplicate");
  }

  async deleteQueriesData() {
    await this.getDeleteQuerieIcon.first().click();
    await expect(
      this.page.locator(
        ".MuiDialogTitle-root.css-e5j8bd-MuiTypography-root-MuiDialogTitle-root"
      )
    ).toHaveText("Delete query");
    await expect(
      this.page.locator(
        ".MuiDialogContent-root.css-ypiqx9-MuiDialogContent-root"
      )
    ).toContainText("Are you sure you want to delete this query named");
    await expect(
      this.page.getByRole("button", { name: "Delete" })
    ).toBeVisible();
    await expect(
      this.page.locator('svg[data-testid="CloseIcon"]')
    ).toBeVisible();
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async checksSharedQueriesData() {
    await expect(
      this.page.locator(".MuiDataGrid-cell.MuiDataGrid-cell--textLeft").nth(0)
    ).toHaveText("Save-queries-data-test");
    await expect(
      this.page.locator(".MuiDataGrid-cell.MuiDataGrid-cell--textLeft").nth(1)
    ).toHaveText("test-aqakuser@gmail.com");
  }
}
