import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { MainPage } from "../page-objects/mainPage";
import { SideBarMenu } from "../page-objects/sidebarMenu";
import { QueriesPage } from "../page-objects/queriesPage";
import { SAVED_USERS_URL } from "../test-data/constants";
import { BASE_URL, MAIN_PAGE_URL, LOGIN_PAGE_URL, USERS_LIST_URL,} from "../test-data/constants";
import { randomURL } from "../test-data/math-random-data";
import { checkToaster } from "../page-objects/general";
import { UsersPage } from "../page-objects/usersPage";

test("Login page & reset password UI checks", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.loginPageUI();
  await loginPage.resetPassword();
  await loginPage.loginInvalidData();
  await loginPage.resetPassPage();
});

test("URL redirect after login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const getRandomUrl = randomURL;

  await page.goto(`${BASE_URL}${getRandomUrl}`);
  await expect(page).toHaveURL(LOGIN_PAGE_URL);
  await loginPage.loginAdmin();
  await expect(page).toHaveURL(`${BASE_URL}${getRandomUrl}`);
});

test.describe("Tests for login user", () => {
  test.beforeEach("Login as admin", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAdmin();
  });

  test("test URL & title", async ({ page }) => {
    await expect(page).toHaveURL(MAIN_PAGE_URL);
    await expect(page).toHaveTitle("Cprgi-Zorro");
  });

  test("Checks for Explore page", async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.exploreTitles();
    await mainPage.exploreBtnsVisibility();
    await mainPage.exploreBtnsText();
    await mainPage.exploreFieldsText();
  });

  test("Checks for SideMenu", async ({ page }) => {
    const sidebarMenu = new SideBarMenu(page);

    await sidebarMenu.menuLogo();
    await sidebarMenu.menuBtnVisibility();
    await sidebarMenu.menuBtnText();
    await sidebarMenu.menuIconVisibility();
  });

  test("Sidebar pin", async ({ page }) => {
    const sidebarMenu = new SideBarMenu(page);

    await sidebarMenu.menuSlide();
  });

  test("Checks for Queries page", async ({ page }) => {
    const sidebarMenu = new SideBarMenu(page);
    const queriesPage = new QueriesPage(page);

    await sidebarMenu.getQueriesBtn.click();
    await queriesPage.breadCrumbsQueries();
    await queriesPage.savedQueriesPage();
    await queriesPage.sharedQueriesPage();
  });

  test("Query retention check", async ({ page }) => {
    const mainPage = new MainPage(page);
    const queriesPage = new QueriesPage(page);

    await mainPage.getDatabaseDropdown.click();
    await queriesPage.selectDatabaseData();
    await mainPage.getRunDatabasesBtn.click();
    await mainPage.getSaveDatabasesBtn.click();
    await queriesPage.saveDatabaseQueries();
    await checkToaster(page, "You successfully added new query");
    await page.goto(SAVED_USERS_URL);
    await queriesPage.checksSavedQueriesData();
    await queriesPage.queriesIsShared();
    await checkToaster(
      page,
      "You successfully changed query Save-queries-data-test"
    );
    await queriesPage.queriesDuplicate();
    await queriesPage.deleteQueriesData();
    await checkToaster(page, "Query was deleted successfully");
    await queriesPage.getSharedQueriesBtn.click({ timeout: 10000 });
    await queriesPage.checksSharedQueriesData();
    await queriesPage.deleteQueriesData();
    await checkToaster(page, "Query was deleted successfully");
  });

  test("Users list checks", async ({ page }) => {
    const sidebarMenu = new SideBarMenu(page);
    const usersPage = new UsersPage(page);

    await sidebarMenu.getAdminAreaBtn.click();
    await sidebarMenu.getUsersBtn.click();
    await expect(page).toHaveURL(USERS_LIST_URL);
    await usersPage.userListBreadcrumb();
    await usersPage.usersTableColTitle();
  });
});
