export function getRandomNumber() {
  const number = Math.floor(Math.random() * (999999999999 - 10000 + 1)) + 10000;
  return number.toString();
}

export function generateRandomEmail() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let email = "";
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  email += "@gmail.com";
  return email.toString();
}

const randomUrls = [
  "partners/corgi/",
  'explorer/user-name:["email","key","id","name"]}',
  "partners/zorro/",
  "accounts/zorro-corgi/users/",
  "ping-credentials/789461230/data-user-info",
];
export const randomURL = getRandomUrls(randomUrls);

function getRandomUrls(randomUrls) {
  const randomIndex = Math.floor(Math.random() * randomUrls.length);
  return randomUrls[randomIndex];
}
