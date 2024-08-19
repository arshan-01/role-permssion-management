// src/utils/GlobalApiHandler.js
import { useDispatch } from 'react-redux';

export const useGlobalDeleteHandler = ({ thunkFunction, fetchFunction, fetchParams, dispatch, openModal, componentName, componentProps }) => {
  
  const handleDeleteClick = (id) => {
    console.log("🚀 ~ handleDeleteClick ~ id:", id)
    openModal({
      componentName,
      componentProps: {
        ...componentProps,
        onDelete: async () => {
          await dispatch(thunkFunction(id));
          dispatch(fetchFunction(fetchParams));
        },
      },
    });
  };

  return {
    handleDeleteClick,
  };
}; 