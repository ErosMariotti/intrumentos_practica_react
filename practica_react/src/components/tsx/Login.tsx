// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

interface LoginResponse {
  id: number;
  nombreUsuario: string;
  rol: string;
}

export const Login: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreUsuario, clave }),
      });
      if (res.ok) {
        const usuario: LoginResponse = await res.json();
        // Guardar en localStorage (sin clave)
       localStorage.setItem('usuario', JSON.stringify({
        id: usuario.id,
        nombreUsuario: usuario.nombreUsuario,
        rol: usuario.rol
        }));
        // Redirigir a la ruta principal (ej. /avm-producto)
        navigate('/avm-producto');
      } else {
        const texto = await res.text();
        setErrorMsg(texto);
      }
    } catch (err) {
      setErrorMsg('Error de conexión. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {errorMsg && <div className="login-error">{errorMsg}</div>}

        <label>
          Usuario
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </label>

        <label>
          Clave
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};
