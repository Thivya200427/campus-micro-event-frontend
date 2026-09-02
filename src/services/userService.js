import api from "./api";

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function createUser(user) {
  const response = await api.post("/users/admin-create", user);
  return response.data;
}

export async function registerClubUser(user) {
  const response = await api.post("/auth/register", {
    name: user.name,
    email: user.email,
    password: user.password,
  });
  return response.data;
}

export async function updateUser(id, user) {
  const response = await api.put(`/users/${id}`, user);
  return response.data;
}

export async function deleteUser(id) {
  await api.delete(`/users/${id}`);
}
