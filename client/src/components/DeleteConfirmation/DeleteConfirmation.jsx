import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/features/modal/modal.slice';

const DeleteConfirmation = ({ onDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    onDelete();
    dispatch(closeModal());
  };

  return (
    <div className="m-4 w-96 text-center">
      <FaTrashAlt className="w-14 h-14 text-red-500 inline" />
      <h4 className="text-gray-8 text-lg font-semibold mt-4">Are you sure you want to delete it?</h4>
      <p className="text-sm text-gray-6 mt-4">
        This action cannot be undone.
      </p>
      <div className="flex flex-col space-y-2 mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-red-500 hover:bg-red-600 active:bg-red-500"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-gray-8 text-sm tracking-wide bg-gray-3 hover:bg-gray-300 active:bg-gray-3"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
