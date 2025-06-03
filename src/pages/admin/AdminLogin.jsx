import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { setIsAuthenticated } from '../../App';

function AdminLogin() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px'
  };

  const logoStyle = {
    fontSize: '60px',
    marginBottom: '15px'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '8px'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#4a5568'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2d3748'
  };

  const inputStyle = {
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '10px'
  };

  const errorStyle = {
    padding: '12px',
    backgroundColor: '#fed7d7',
    color: '#742a2a',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center'
  };

  const credentialsStyle = {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#4a5568'
  };

  const backLinkStyle = {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '500',
    backdropFilter: 'blur(10px)'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email() === 'admin@ccb.do' && password() === 'admin123') {
        localStorage.setItem('auth_token', 'demo_token_12345');
        setIsAuthenticated(true);
        navigate('/admin/dashboard');
      } else {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={containerStyle}>
      <a href="/" style={backLinkStyle}>
        ← Volver al Kiosco
      </a>

      <div style={formContainerStyle}>
        <header style={headerStyle}>
          <div style={logoStyle}>🏛️</div>
          <h1 style={titleStyle}>Panel Administrativo</h1>
          <p style={subtitleStyle}>Centro Cultural Banreservas</p>
        </header>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              style={inputStyle}
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              placeholder="admin@ccb.do"
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              style={inputStyle}
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error() && (
            <div style={errorStyle}>
              {error()}
            </div>
          )}

          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: isLoading() ? '#a0aec0' : '#4299e1',
              cursor: isLoading() ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading()}
          >
            {isLoading() ? '🔄 Verificando...' : '🔑 Iniciar Sesión'}
          </button>
        </form>

        <div style={credentialsStyle}>
          <strong>Credenciales de Prueba:</strong><br />
          📧 Email: admin@ccb.do<br />
          🔒 Contraseña: admin123
        </div>
      </div>
    </div>
  );
}

export default AdminLogin; 