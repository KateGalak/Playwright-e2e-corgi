import { expect, type Locator, type Page } from "@playwright/test";

export class SideBarMenu {
  readonly page: Page;

  readonly getLogoBtn: Locator;
  readonly getPinIcon: Locator;

  readonly getDashboardsBtn: Locator;
  readonly getDashboardsIcon: Locator;
  readonly getAccountsBtn: Locator;
  readonly getDatacentersBtn: Locator;
  readonly getPartnersBtn: Locator;

  readonly getExplorerToolsBtn: Locator;
  readonly getExplorerToolsIcon: Locator;
  readonly getExploreBtn: Locator;
  readonly getQueriesBtn: Locator;

  readonly getAdminAreaBtn: Locator;
  readonly getAdminAreaIcon: Locator;
  readonly getDatabasesBtn: Locator;
  readonly getUsersBtn: Locator;
  readonly getInvitationsBtn: Locator;
  readonly getPingServicesBtn: Locator;
  readonly getPingCredentialsBtn: Locator;
  readonly getSettingsBtn: Locator;

  readonly getToolsBtn: Locator;
  readonly getToolsIcon: Locator;
  readonly getPingToolBtn: Locator;

  readonly getLayoutSidebarOpen: Locator;
  readonly getSidebarWight: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getLogoBtn = page.locator('a[data-testid="Corgi-logo-btn"]');
    this.getPinIcon = page.locator('svg[data-testid="MenuOpenIcon"]');

    this.getDashboardsBtn = page.locator(
      'div[data-testid="Dashboards-List-padding"]'
    );
    this.getDashboardsIcon = page.locator('svg[data-testid="DashboardIcon"]');
    this.getAccountsBtn = page.locator(
      'a[data-testid="Accounts-List-padding"]'
    );
    this.getDatacentersBtn = page.locator(
      'a[data-testid="Datacenter-List-padding"]'
    );
    this.getPartnersBtn = page.locator(
      'a[data-testid="Partners-List-padding"]'
    );

    this.getExplorerToolsBtn = page.locator(
      'div[data-testid="ExplorerTools-List-padding"]'
    );
    this.getExplorerToolsIcon = page.locator('svg[data-testid="ExploreIcon"]');
    this.getExploreBtn = page.locator('a[data-testid="Explore-List-padding"]');
    this.getQueriesBtn = page.locator('a[data-testid="Queries-List-padding"]');

    this.getAdminAreaBtn = page.locator(
      'div[data-testid="AdminArea-List-padding"]'
    );
    this.getAdminAreaIcon = page.locator(
      'svg[data-testid="AdminPanelSettingsIcon"]'
    );
    this.getDatabasesBtn = page.locator(
      'a[data-testid="Databases-List-padding"]'
    );
    this.getUsersBtn = page.locator('a[data-testid="UsersList-List-padding"]');
    this.getInvitationsBtn = page.locator(
      'a[data-testid="Invitation-List-padding"]'
    );
    this.getPingServicesBtn = page.locator(
      'a[data-testid="PINGservices-List-padding"]'
    );
    this.getPingCredentialsBtn = page.locator(
      'a[data-testid="PINGcredential-List-padding"]'
    );
    this.getSettingsBtn = page.locator(
      'a[data-testid="Settings-List-padding"]'
    );

    this.getToolsBtn = page.locator('div[data-testid="Tools-List-padding"]');
    this.getToolsIcon = page.locator('svg[data-testid="ConstructionIcon"]');
    this.getPingToolBtn = page.locator(
      'a[data-testid="PINGtool-List-padding"]'
    );

    this.getLayoutSidebarOpen = page.locator(".MuiBox-root.css-koy2sy");
    this.getSidebarWight = page.locator(".MuiBox-root.css-t710z7");
  }

  async menuLogo() {
    await expect(this.getLogoBtn).toBeVisible();
    await expect(this.getLogoBtn).toHaveText("Corgi");
  }

  async menuBtnVisibility() {
    await expect(this.getDashboardsBtn).toBeVisible();
    await this.getDashboardsBtn.click();
    await expect(this.getAccountsBtn).toBeVisible();
    await expect(this.getDatacentersBtn).toBeVisible();
    await expect(this.getPartnersBtn).toBeVisible();

    await expect(this.getExplorerToolsBtn).toBeVisible();
    await this.getExplorerToolsBtn.click();
    await expect(this.getExploreBtn).toBeVisible();
    await expect(this.getQueriesBtn).toBeVisible();

    await expect(this.getAdminAreaBtn).toBeVisible();
    await this.getAdminAreaBtn.click();
    await expect(this.getDatabasesBtn).toBeVisible();
    await expect(this.getUsersBtn).toBeVisible();
    await expect(this.getInvitationsBtn).toBeVisible();
    await expect(this.getPingServicesBtn).toBeVisible();
    await expect(this.getPingCredentialsBtn).toBeVisible();
    await expect(this.getSettingsBtn).toBeVisible();

    await expect(this.getToolsBtn).toBeVisible();
    await this.getToolsBtn.click();
    await expect(this.getPingToolBtn).toBeVisible();
  }

  async menuBtnText() {
    await expect(this.getDashboardsBtn).toHaveText("Dashboards");
    await this.getDashboardsBtn.click();
    await expect(this.getAccountsBtn).toHaveText("Accounts");
    await expect(this.getDatacentersBtn).toHaveText("Datacenters");
    await expect(this.getPartnersBtn).toHaveText("Partners");

    await expect(this.getExplorerToolsBtn).toHaveText("Explorer tools");
    await this.getExplorerToolsBtn.click();
    await expect(this.getExploreBtn).toHaveText("Explore");
    await expect(this.getQueriesBtn).toHaveText("Queries");

    await expect(this.getAdminAreaBtn).toHaveText("Admin area");
    await this.getAdminAreaBtn.click();
    await expect(this.getDatabasesBtn).toHaveText("Databases");
    await expect(this.getUsersBtn).toHaveText("Users");
    await expect(this.getInvitationsBtn).toHaveText("Invitations");
    await expect(this.getPingServicesBtn).toHaveText("Ping services");
    await expect(this.getPingCredentialsBtn).toHaveText("Ping credentials");
    await expect(this.getSettingsBtn).toHaveText("Settings");

    await expect(this.getToolsBtn).toHaveText("Tools");
    await this.getToolsBtn.click();
    await expect(this.getPingToolBtn).toHaveText("Ping tool");
  }

  async menuIconVisibility() {
    await expect(this.getDashboardsIcon).toBeVisible();
    await expect(this.getExplorerToolsIcon).toBeVisible();
    await expect(this.getAdminAreaIcon).toBeVisible();
    await expect(this.getToolsIcon).toBeVisible();
  }

  async menuSlide() {
    await this.getPinIcon.click();
    await expect(this.page.locator(".MuiBox-root.css-1d1tzxy")).toBeVisible();
    await this.getPinIcon.click();
    await expect(this.page.locator(".MuiBox-root.css-t710z7")).toHaveCSS(
      "width",
      "260px"
    );
    await expect(this.page.locator(".MuiBox-root.css-1ai734v")).toBeVisible();
  }
}
