import { useState } from 'react';
import toast from 'react-hot-toast';
import { borrowBook, returnBook } from '../services/bookService';

const BookCard = ({ book: initialBook, onEdit, onDelete, isAdmin }) => {
  const [book, setBook] = useState(initialBook);
  const [actionLoading, setActionLoading] = useState(false);
  const isAvailable = book.status === 'Available';

  const handleBorrow = async () => {
    setActionLoading(true);
    try {
      const res = await borrowBook(book._id);
      setBook(res.data.data);
      toast.success('Book borrowed successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to borrow');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturn = async () => {
    setActionLoading(true);
    try {
      const res = await returnBook(book._id);
      setBook(res.data.data);
      toast.success('Book returned successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to return');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 flex-1">
            {book.title}
          </h3>
          <span
            className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded ${
              isAvailable
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'
            }`}
          >
            {book.status}
          </span>
        </div>
        <p className="text-xs text-gray-500">{book.author}</p>
      </div>

      {/* Badges */}
      <div className="px-5 pt-3 flex flex-wrap gap-1.5">
        <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 font-medium">
          {book.bookType}
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-gray-50 text-gray-600 border border-gray-200">
          {book.genre}
        </span>
      </div>

      {/* Details */}
      <div className="px-5 py-3 flex-1 space-y-0">
        <div className="field-row">
          <span className="field-label">ISBN</span>
          <span className="field-value font-mono">{book.isbn}</span>
        </div>
        <div className="field-row">
          <span className="field-label">Publisher</span>
          <span className="field-value">{book.publisher}</span>
        </div>
        {book.publicationYear && (
          <div className="field-row">
            <span className="field-label">Year</span>
            <span className="field-value">{book.publicationYear}</span>
          </div>
        )}
        <div className="field-row">
          <span className="field-label">Copies</span>
          <span className="field-value">
            {book.availableCopies}{' '}
            <span className="text-gray-400 font-normal">/ {book.totalCopies}</span>
          </span>
        </div>
        {book.shelfLocation && (
          <div className="field-row">
            <span className="field-label">Shelf</span>
            <span className="field-value">{book.shelfLocation}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 pb-4 pt-2 flex gap-2">
        {isAdmin ? (
          <>
            <button
              onClick={() => onEdit(book)}
              className="flex-1 border border-gray-300 hover:border-blue-400 hover:text-blue-600 text-gray-600 text-xs font-medium py-2 rounded transition-colors duration-150"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book._id)}
              className="flex-1 border border-gray-300 hover:border-red-400 hover:text-red-600 text-gray-600 text-xs font-medium py-2 rounded transition-colors duration-150"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleBorrow}
              disabled={!isAvailable || book.bookType === 'Reference' || actionLoading}
              className="flex-1 border border-gray-300 hover:border-blue-400 hover:text-blue-600 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium py-2 rounded transition-colors duration-150"
            >
              {actionLoading ? '...' : 'Borrow'}
            </button>
            <button
              onClick={handleReturn}
              disabled={book.availableCopies >= book.totalCopies || actionLoading}
              className="flex-1 border border-gray-300 hover:border-green-500 hover:text-green-600 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium py-2 rounded transition-colors duration-150"
            >
              {actionLoading ? '...' : 'Return'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
