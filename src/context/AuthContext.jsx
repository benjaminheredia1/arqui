import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Intentar conectar con el backend
      const response = await authService.login(email, password);
      
      if (response && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: 'Respuesta inválida del servidor' };
    } catch (error) {
      // Modo desarrollo: si no hay backend, permitir login con cualquier credencial
      if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || !error.response) {
        console.warn('Backend no disponible, usando modo desarrollo');
        
        // Validación básica para desarrollo
        if (!email || !password) {
          return { success: false, error: 'Por favor ingresa email y contraseña' };
        }
        
        // Simular respuesta exitosa para desarrollo
        const mockUser = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'admin'
        };
        
        const mockToken = 'dev-token-' + Date.now();
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        setIsAuthenticated(true);
        
        return { success: true };
      }
      
      // Error del servidor (credenciales incorrectas, etc.)
      const errorMessage = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

