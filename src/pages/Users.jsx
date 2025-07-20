import { useState } from "react";
import {
  FaSearch,
  FaUser,
  FaUserCheck,
  FaUserTimes,
  FaShieldAlt,
} from "react-icons/fa";

const Users = () => {
  const allUsers = [
    {
      id: 1,
      nombre: "María L.",
      correo: "maria@safy.com",
      rol: "Administrador",
      activo: true,
      ultimoAcceso: "2025-07-13 10:35",
    },
    {
      id: 2,
      nombre: "Carlos T.",
      correo: "carlos@safy.com",
      rol: "Usuario",
      activo: false,
      ultimoAcceso: "2025-07-09 22:15",
    },
    {
      id: 3,
      nombre: "Ana P.",
      correo: "ana@safy.com",
      rol: "Usuario",
      activo: true,
      ultimoAcceso: "2025-07-12 08:47",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredUsers = allUsers.filter((u) =>
    u.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h4 className="mb-4 d-flex align-items-center gap-2">
        Usuarios registrados
      </h4>

      <div className="input-group mb-3">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card p-3 shadow-sm">
        <table className="table align-middle">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Último acceso</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td className="text-muted">{u.correo}</td>
                  <td>
                    {u.rol === "Administrador" ? (
                      <span className="badge bg-danger d-flex align-items-center gap-1">
                        <FaShieldAlt /> {u.rol}
                      </span>
                    ) : (
                      <span className="badge bg-primary d-flex align-items-center gap-1">
                        <FaUser /> {u.rol}
                      </span>
                    )}
                  </td>
                  <td>
                    {u.activo ? (
                      <span className="badge bg-success d-flex align-items-center gap-1">
                        <FaUserCheck /> Activo
                      </span>
                    ) : (
                      <span className="badge bg-secondary d-flex align-items-center gap-1">
                        <FaUserTimes /> Inactivo
                      </span>
                    )}
                  </td>
                  <td className="text-muted">{u.ultimoAcceso}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
