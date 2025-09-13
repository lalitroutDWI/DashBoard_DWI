// src/components/common/DataTable.jsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const DataTable = () => {
  const books = [
    { title: 'Advanced Physics', author: 'Dr. Smith', category: 'Science', isbn: '978-0-123456-78-9', stock: 15, available: 12 },
    { title: 'Modern Chemistry', author: 'Prof. Johnson', category: 'Science', isbn: '978-0-234567-89-0', stock: 20, available: 18 },
    { title: 'Calculus Fundamentals', author: 'Dr. Brown', category: 'Mathematics', isbn: '978-0-345678-90-1', stock: 12, available: 10 },
    { title: 'World History', author: 'Prof. Davis', category: 'History', isbn: '978-0-456789-01-2', stock: 8, available: 6 }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Book Catalog</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900">Book Details</th>
              <th className="text-left p-4 font-medium text-gray-900">Category</th>
              <th className="text-left p-4 font-medium text-gray-900">ISBN</th>
              <th className="text-left p-4 font-medium text-gray-900">Stock</th>
              <th className="text-left p-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">
                  <p className="font-medium text-gray-900">{book.title}</p>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {book.category}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{book.isbn}</td>
                <td className="p-4">
                  <p className="text-sm">Total: {book.stock}</p>
                  <p className="text-sm text-green-600">Available: {book.available}</p>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;