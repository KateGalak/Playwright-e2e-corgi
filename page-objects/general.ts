import { Page, expect } from "@playwright/test";

export async function checkToaster(page, expectedMessage) {
  const toaster = page.locator(".Toastify__toast-body");
  await expect(toaster).toBeVisible();
  await expect(toaster).toHaveText(expectedMessage);
  await expect(toaster).toBeHidden({ timeout: 10000 });
}
