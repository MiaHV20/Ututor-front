const BASE_URL = "http://<ruta_balanceador>"; // <- Cambiar cuando tengas la ruta real

// Registro de usuario
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Obtener lista de usuarios (para login)
export const listUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

// Obtener usuario por ID (para perfil)
export const getUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
};

// Actualizar usuario por ID (para perfil)
export const updateUser = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
};

// Obtener materias (con filtros opcionales)
export const getMaterias = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/materias?${query}`);
  if (!res.ok) throw new Error("Error al obtener materias");
  return res.json();
};

// Obtener materia por ID
export const getMateriaById = async (id) => {
  const res = await fetch(`${BASE_URL}/materias/${id}`);
  if (!res.ok) throw new Error("Materia no encontrada");
  return res.json();
};