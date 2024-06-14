import { expect, type Locator, type Page } from "@playwright/test";

export class UsersPage {
  readonly page: Page;

  readonly getUsersBreadcrumb: Locator;
  readonly getUsersTableTitle: Locator;
  readonly getUsersColumnTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getUsersBreadcrumb = page.locator(".MuiBreadcrumbs-li>h2");
    this.getUsersTableTitle = page.locator(".css-79jzi4-MuiStack-root>h2");
    this.getUsersColumnTitle = page.locator(
      ".MuiDataGrid-columnHeaderTitle.css-t89xny-MuiDataGrid-columnHeaderTitle"
    );
  }

  async userListBreadcrumb() {
    await expect(this.getUsersBreadcrumb).toHaveText("Users");
    await expect(this.getUsersTableTitle).toContainText("Users");
  }

  async usersTableColTitle() {
    await expect(this.getUsersColumnTitle.nth(0)).toHaveText("Avatar");
    await expect(this.getUsersColumnTitle.nth(1)).toHaveText("Username");
    await expect(this.getUsersColumnTitle.nth(2)).toHaveText("Email");
    await expect(this.getUsersColumnTitle.nth(3)).toHaveText("First name");
    await expect(this.getUsersColumnTitle.nth(4)).toHaveText("Last name");
    await expect(this.getUsersColumnTitle.nth(5)).toHaveText("Date joined");
    await expect(this.getUsersColumnTitle.nth(6)).toHaveText("Admin");
    await expect(this.getUsersColumnTitle.nth(7)).toHaveText("Operator");

    const element = this.page.locator(
      ".MuiDataGrid-scrollbar--horizontal.css-1rtad1"
    );
    await element.evaluate((el) => {
      el.scrollLeft = 500;
    });

    await expect(this.page.getByText("Read only")).toHaveText("Read only");
  }
}
