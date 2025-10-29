import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TasksProvider } from './contexts/TasksContext';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import Loading from './components/ui/Loading';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <Loading 
          size="xl" 
          text="Carregando..." 
        />
      </div>
    );
  }

  return isAuthenticated ? (
    <TasksProvider>
      <Dashboard />
    </TasksProvider>
  ) : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
