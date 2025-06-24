import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/odontologos';

export default function OdontologoDashboard() {
  const [odontologos, setOdontologos] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', contraseña: '' });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState('');

  // Cargar lista
  const fetchOdontologos = async () => {
    const res = await fetch(API_URL);
    setOdontologos(await res.json());
  };

  useEffect(() => { fetchOdontologos(); }, []);

  // Manejar cambios en el formulario
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Crear o actualizar
  const handleSubmit = async e => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMensaje(editId ? 'Odontólogo actualizado' : 'Odontólogo creado');
      setForm({ nombre: '', apellido: '', email: '', telefono: '', contraseña: '' });
      setEditId(null);
      fetchOdontologos();
    } else {
      setMensaje('Error al guardar');
    }
  };

  // Editar
  const handleEdit = o => {
    setForm({ nombre: o.nombre, apellido: o.apellido, email: o.email, telefono: o.telefono || '', contraseña: '' });
    setEditId(o.id_odontologo);
  };

  // Eliminar
  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar odontólogo?')) return;
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMensaje('Odontólogo eliminado');
      fetchOdontologos();
    } else {
      setMensaje('Error al eliminar');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Dashboard Odontólogos</h2>
      {mensaje && <div style={{ color: 'green', marginBottom: 10 }}>{mensaje}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20, border: '1px solid #ccc', padding: 16 }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required style={{ marginRight: 8 }} />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required style={{ marginRight: 8 }} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ marginRight: 8 }} />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} style={{ marginRight: 8 }} />
        <input name="contraseña" placeholder="Contraseña" value={form.contraseña} onChange={handleChange} type="password" required={!editId} style={{ marginRight: 8 }} />
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', apellido: '', email: '', telefono: '', contraseña: '' }); }}>Cancelar</button>}
      </form>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {odontologos.map(o => (
            <tr key={o.id_odontologo}>
              <td>{o.nombre}</td>
              <td>{o.apellido}</td>
              <td>{o.email}</td>
              <td>{o.telefono || ''}</td>
              <td>
                <button onClick={() => handleEdit(o)}>Editar</button>
                <button onClick={() => handleDelete(o.id_odontologo)} style={{ marginLeft: 8 }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
