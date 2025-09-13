// src/components/modals/ModalManager.jsx
import React from 'react';

const ModalManager = ({ activeModal, onCloseModal }) => {
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  const AddBookModal = () => (
    <Modal show={activeModal === 'addBook'} onClose={() => onCloseModal()} title="Add New Book">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter book title" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter author name" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="978-0-123456-78-9" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Science</option>
              <option>Mathematics</option>
              <option>Literature</option>
              <option>History</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              type="number" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="1" 
              min="1" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publisher</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter publisher name" 
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => onCloseModal()} 
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Book
          </button>
        </div>
      </form>
    </Modal>
  );

  const IssueBookModal = () => (
    <Modal show={activeModal === 'issueBook'} onClose={() => onCloseModal()} title="Issue Book">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Member ID</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter student/teacher ID" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book ISBN/Barcode</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Scan or enter ISBN/Barcode" 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue={new Date().toISOString().split('T')[0]} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input 
              type="date" 
              className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              defaultValue={new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]} 
            />
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Member Information</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p>Name: John Doe</p>
            <p>Type: Student</p>
            <p>Books Borrowed: 3/10</p>
            <p>Overdue Books: 0</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => onCloseModal()} 
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Issue Book
          </button>
        </div>
      </form>
    </Modal>
  );

  return (
    <>
      <AddBookModal />
      <IssueBookModal />
    </>
  );
};

export default ModalManager;