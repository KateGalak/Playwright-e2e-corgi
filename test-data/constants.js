const PROTOCOL = "https";
const DOMAIN = "zorro.corgi.com";
const LOGIN_URI = "login";
const MAIN_PAGE_URI = "main-page";
const SAVED_USERS_URI = "saved-users";
const USERS_LIST_URI = "users-list";

export const BASE_URL = PROTOCOL + "://" + DOMAIN + "/";
export const LOGIN_PAGE_URL = BASE_URL + LOGIN_URI + "/";
export const MAIN_PAGE_URL = BASE_URL + MAIN_PAGE_URI + "/";
export const SAVED_USERS_URL = BASE_URL + SAVED_USERS_URI + "/";
export const USERS_LIST_URL = BASE_URL + USERS_LIST_URI + "/";
