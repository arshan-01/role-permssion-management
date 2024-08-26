import React from 'react';
import { FaUndoAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/features/modal/modal.slice';

const RestoreConfirmation = ({ onRestore }) => {
  const dispatch = useDispatch();

  const handleRestore = () => {
    onRestore();
    dispatch(closeModal());
  };

  return (
    <div className="m-4 w-96 text-center">
      <FaUndoAlt className="w-14 h-14 text-green-500 inline" />
      <h4 className="text-gray-8 text-lg font-semibold mt-4">Are you sure you want to restore it?</h4>
      <p className="text-sm text-gray-6 mt-4">
        This action will reinstate the item.
      </p>
      <div className="flex flex-col space-y-2 mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-white text-sm tracking-wide bg-green-500 hover:bg-green-600 active:bg-green-500"
          onClick={handleRestore}
        >
          Restore
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-gray-8 text-sm tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RestoreConfirmation;
