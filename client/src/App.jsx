import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'search'
  const [editBook, setEditBook] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Toaster position="top-right" />
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setEditBook(null);
          setActiveTab(tab);
        }}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'list' && (
          <BookList
            key={refreshKey}
            onEdit={handleEdit}
            onRefresh={handleRefresh}
          />
        )}
        {activeTab === 'add' && (
          <BookForm
            existingBook={editBook}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
          />
        )}
        {activeTab === 'search' && <SearchBar onEdit={handleEdit} />}
      </main>
    </div>
  );
}

export default App;
