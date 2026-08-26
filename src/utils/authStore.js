const AUTH_KEY = "campus_auth_user";

export function loginUser(user) {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(user)
  );
}

export function getLoggedInUser() {
  const user = localStorage.getItem(AUTH_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}