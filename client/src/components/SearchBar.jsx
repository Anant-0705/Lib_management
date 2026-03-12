import { useState } from 'react';
import toast from 'react-hot-toast';
import { searchBooks, deleteBook } from '../services/bookService';
import BookCard from './BookCard';

const SearchBar = ({ onEdit, isAdmin }) => {
  const [searchType, setSearchType] = useState('title');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter a search term');
      return;
    }
    setLoading(true);
    try {
      const params = { [searchType]: query.trim() };
      const res = await searchBooks(params);
      setResults(res.data.data);
      setSearched(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      toast.success('Book deleted');
      setResults((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Search Books</h2>
        <p className="text-sm text-gray-500 mt-0.5">Find books by title or author name</p>
      </div>

      <form onSubmit={handleSearch} className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={searchType}
            onChange={(e) => { setSearchType(e.target.value); setSearched(false); setResults([]); }}
            className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-32 bg-white"
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter ${searchType} to search...`}
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium px-5 py-2 rounded text-sm transition-colors duration-150"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {searched && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-gray-800">{results.length}</span> result{results.length !== 1 ? 's' : ''} for
            {' '}<span className="text-gray-800 font-medium">"{query}"</span>
          </p>

          {results.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg bg-white">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600">No results found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different keyword or search type.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((book) => (
                  <BookCard
                  key={book._id}
                  book={book}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="text-center py-20 border border-dashed border-gray-300 rounded-lg bg-white">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-600">Search the catalog</p>
          <p className="text-xs text-gray-400 mt-1">Select a filter and enter a keyword to find books.</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
