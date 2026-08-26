const USERS_KEY = "campus_users";

export function getUsers() {
  const users = localStorage.getItem(USERS_KEY);

  if (!users) {
    return [];
  }

  return JSON.parse(users);
}

export function saveUsers(users) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

export function registerUser(user) {
  const users = getUsers();

  const existingUser = users.find(
    (item) =>
      item.email.toLowerCase() ===
      user.email.toLowerCase()
  );

  if (existingUser) {
    return {
      success: false,
      message: "Email already registered",
    };
  }

  const newUser = {
    id: Date.now(),
    ...user,
    status: "Active",
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);

  return {
    success: true,
    user: newUser,
  };
}

export function authenticateUser(email, password, role) {
  const users = getUsers();

  return users.find(
    (user) =>
      user.email.toLowerCase() ===
        email.toLowerCase() &&
      user.password === password &&
      user.role === role &&
      user.status === "Active"
  );
}