import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { addBook, updateBook } from '../services/bookService';

const emptyForm = {
  title: '',
  author: '',
  isbn: '',
  genre: '',
  publisher: '',
  publicationYear: '',
  totalCopies: '',
  availableCopies: '',
  shelfLocation: '',
  bookType: 'Circulating',
  status: 'Available',
};

const BookForm = ({ existingBook, onSuccess, onCancel }) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const isEditing = !!existingBook;

  useEffect(() => {
    if (existingBook) {
      setForm({
        title: existingBook.title || '',
        author: existingBook.author || '',
        isbn: existingBook.isbn || '',
        genre: existingBook.genre || '',
        publisher: existingBook.publisher || '',
        publicationYear: existingBook.publicationYear || '',
        totalCopies: existingBook.totalCopies || '',
        availableCopies: existingBook.availableCopies || '',
        shelfLocation: existingBook.shelfLocation || '',
        bookType: existingBook.bookType || 'Circulating',
        status: existingBook.status || 'Available',
      });
    }
  }, [existingBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        publicationYear: form.publicationYear ? Number(form.publicationYear) : undefined,
        totalCopies: Number(form.totalCopies),
        availableCopies: form.availableCopies !== '' ? Number(form.availableCopies) : Number(form.totalCopies),
      };

      if (isEditing) {
        await updateBook(existingBook._id, payload);
        toast.success('Book updated successfully!');
      } else {
        await addBook(payload);
        toast.success('Book added successfully!');
      }
      onSuccess();
    } catch (err) {
      const msg =
        err.response?.data?.errors?.join(', ') ||
        err.response?.data?.message ||
        'Operation failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white';

  const labelClass = 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <div className="mb-7 pb-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Book Record' : 'Add New Book'}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {isEditing ? 'Update the details below and save.' : 'Fill in the details below to add a book to the catalog.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className={inputClass}
                placeholder="Book title"
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                className={inputClass}
                placeholder="Author name"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                ISBN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 978-3-16-148410-0"
                required
              />
            </div>
            <div>
              <label className={labelClass}>
                Genre / Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Fiction, Science, History"
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Publisher <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                className={inputClass}
                placeholder="Publisher name"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Publication Year</label>
              <input
                type="number"
                name="publicationYear"
                value={form.publicationYear}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 2023"
                min="1000"
                max="2100"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Total Copies <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="totalCopies"
                value={form.totalCopies}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 5"
                min="1"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Available Copies</label>
              <input
                type="number"
                name="availableCopies"
                value={form.availableCopies}
                onChange={handleChange}
                className={inputClass}
                placeholder="Defaults to total copies"
                min="0"
              />
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Shelf Location</label>
              <input
                type="text"
                name="shelfLocation"
                value={form.shelfLocation}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. A1-Row3"
              />
            </div>
            <div>
              <label className={labelClass}>Book Type</label>
              <select
                name="bookType"
                value={form.bookType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Circulating">Circulating</option>
                <option value="Reference">Reference</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Available">Available</option>
                <option value="Checked Out">Checked Out</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2.5 px-6 rounded text-sm transition-colors duration-150"
            >
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Book'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 font-medium py-2.5 px-6 rounded text-sm transition-colors duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
