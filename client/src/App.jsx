import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function MainApp() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('list');
  const [editBook, setEditBook] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [authPage, setAuthPage] = useState('login'); // 'login' | 'register'

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  const handleEdit = (book) => {
    setEditBook(book);
    setActiveTab('add');
  };

  const handleFormSuccess = () => {
    setEditBook(null);
    setActiveTab('list');
    handleRefresh();
  };

  const handleCancelForm = () => {
    setEditBook(null);
    setActiveTab('list');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return authPage === 'login'
      ? <LoginPage onSwitchToRegister={() => setAuthPage('register')} />
      : <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />;
  }

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Toaster position="top-right" />
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setEditBook(null);
          setActiveTab(tab);
        }}
        isAdmin={isAdmin}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'list' && (
          <BookList
            key={refreshKey}
            onEdit={handleEdit}
            onRefresh={handleRefresh}
            isAdmin={isAdmin}
          />
        )}
        {activeTab === 'add' && isAdmin && (
          <BookForm
            existingBook={editBook}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
          />
        )}
        {activeTab === 'search' && (
          <SearchBar onEdit={handleEdit} isAdmin={isAdmin} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
