// src/components/Modal/GlobalModal.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa'; // Importing the cross icon from react-icons
import components from './Index';
import { closeModal } from '../redux/features/modal/modal.slice';

const GlobalModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal);
  const { isOpen, componentName, componentProps } = modal;

  if (!isOpen || !componentName) return null;

  const ComponentToRender = components[componentName];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => dispatch(closeModal())}
        >
          <FaTimes size={24} />
        </button>
        <ComponentToRender {...componentProps} />
      </div>
    </div>
  );
};

export default GlobalModal;
