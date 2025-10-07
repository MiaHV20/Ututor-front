const USUARIOS_SERVICE_URL = "/api/users";
const MATERIAS_SERVICE_URL = "/api/materias";
const TUTORIAS_SERVICE_URL = "/api/tutorias";
const HISTORIAL_ASESORIAS_URL = "/api/historial_asesorias";

/** ===== USUARIOS ===== **/

// Registro de usuario
export const registerUser = async (userData) => {
  const res = await fetch(`${USUARIOS_SERVICE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

// Obtener lista de usuarios (para login)
export const listUsers = async () => {
  const res = await fetch(`${USUARIOS_SERVICE_URL}`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};

// Obtener usuario por ID (para perfil)
export const getUser = async (id) => {
  const res = await fetch(`${USUARIOS_SERVICE_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
};

// Actualizar usuario por ID (para perfil)
export const updateUser = async (id, updates) => {
  const res = await fetch(`${USUARIOS_SERVICE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
};

/** ===== MATERIAS ===== **/

// Obtener materias (con filtros opcionales)
export const getMaterias = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${MATERIAS_SERVICE_URL}?${query}`);
  if (!res.ok) throw new Error("Error al obtener materias");
  return res.json();
};

// Obtener materia por ID
export const getMateriaById = async (id) => {
  const res = await fetch(`${MATERIAS_SERVICE_URL}/${id}`);
  if (!res.ok) throw new Error("Materia no encontrada");
  return res.json();
};

/** ===== TUTORIAS ===== **/

// Ejemplo de función para reservar una tutoría
export const reservarTutoria = async (data) => {
  const res = await fetch(`${TUTORIAS_SERVICE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

/** ===== HISTORIAL DE ASESORÍAS ===== **/

// Ejemplo: obtener historial de asesorías por usuario
export const getHistorialAsesorias = async (userId) => {
  const res = await fetch(`${HISTORIAL_ASESORIAS_URL}?userId=${userId}`);
  if (!res.ok) throw new Error("Error al obtener historial");
  return res.json();
};